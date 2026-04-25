const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const getPartnerStats = async (req, res) => {
  const { category } = req.query;
  try {
    let studentQuery = `SELECT COUNT(*) FROM enrollments e JOIN students s ON e.student_id = s.id`;
    let batchQuery = `SELECT COUNT(*) FROM batches`;
    const params = [];

    if (category && category !== 'ALL') {
      studentQuery += ` WHERE s.category = $1`;
      // For batches, we check if any student in that batch belongs to the category
      batchQuery += ` b WHERE EXISTS (SELECT 1 FROM enrollments e JOIN students s ON e.student_id = s.id WHERE e.batch_id = b.id AND s.category = $1)`;
      params.push(category);
    }

    const studentCount = await pool.query(studentQuery, params);
    const batchCount = await pool.query(batchQuery, params);

    res.json({
      totalEnrollments: studentCount.rows[0].count,
      activeBatches: batchCount.rows[0].count,
      completedCourses: Math.floor(studentCount.rows[0].count / 15), // Mock derived stat
      inspectionStatus: 'PENDING'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginPartner = async (req, res) => {
  const { username, password } = req.body;
  if (password === 'psw' && username.startsWith('partner')) {
    res.json({
      success: true,
      token: 'mock-jwt-token',
      partnerStatus: username === 'partner1' ? 'audit_round_1' : 'active'
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid partner credentials' });
  }
};

const getPartnerStudents = async (req, res) => {
  const { category } = req.query;
  
  try {
    let queryStr = `
      SELECT e.*, u.email as student_name, u.mobile as student_phone, s.category as student_category,
             b.batch_code as batch_name, c.title as course_title
      FROM enrollments e
      JOIN students s ON e.student_id = s.id
      JOIN users u ON s.user_id = u.id
      JOIN batches b ON e.batch_id = b.id
      JOIN courses c ON b.course_id = c.id
    `;
    
    const queryParams = [];
    if (category && category !== 'ALL') {
      queryStr += ` WHERE s.category = $1`;
      queryParams.push(category);
    }
    
    queryStr += ` ORDER BY e.id DESC`;
    
    const result = await pool.query(queryStr, queryParams);
    
    const students = result.rows.map(row => ({
      student: { id: row.student_id, name: row.student_name, phone: row.student_phone, category: row.student_category },
      batch: { name: row.batch_name, course: { title: row.course_title } },
      status: row.payment_status
    }));
    
    res.json(students);
  } catch (error) {
    console.error('Fetch Students Error:', error);
    res.status(500).json({ error: error.message });
  }
};

const bulkEnrollment = async (req, res) => {
  const { students } = req.body;
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // 1. Get an active batch ID to enroll into
    const batchRes = await client.query("SELECT id FROM batches WHERE status = 'ACTIVE' LIMIT 1");
    if (batchRes.rows.length === 0) throw new Error("No active batches found for enrollment");
    const batchId = batchRes.rows[0].id;

    let count = 0;
    for (const s of students) {
      const name = s['Student Name'] || s.name;
      const phone = s['Mobile Number'] || s.phone || '0000000000';
      const email = s.email || `${name.toLowerCase().replace(/\s/g, '')}${Date.now()}${count}@asap.com`;
      const aadhaar = s['Aadhar Number'] || s['Aadhaar Number'] || `AUTO-${Date.now()}-${count}`;
      
      // 1. Check if user exists by email or mobile
      let userRes = await client.query('SELECT id FROM users WHERE email = $1 OR mobile = $2', [email, phone]);
      let userId;

      if (userRes.rows.length > 0) {
        userId = userRes.rows[0].id;
        // Optionally update existing user to DIR category
        await client.query('UPDATE users SET category = \'DIR\' WHERE id = $1', [userId]);
      } else {
        userRes = await client.query(`
          INSERT INTO users (email, mobile, password_hash, role_id, category)
          VALUES ($1, $2, 'psw', (SELECT id FROM roles WHERE name='STUDENT'), 'DIR')
          RETURNING id
        `, [email, phone]);
        userId = userRes.rows[0].id;
      }

      // 2. Check if student exists
      let studentRes = await client.query('SELECT id FROM students WHERE user_id = $1 OR aadhaar_hash = $2', [userId, aadhaar]);
      let studentId;

      if (studentRes.rows.length > 0) {
        studentId = studentRes.rows[0].id;
      } else {
        studentRes = await client.query(`
          INSERT INTO students (user_id, aadhaar_hash, student_tag_id, category)
          VALUES ($1, $2, $3, 'DIR')
          RETURNING id
        `, [userId, aadhaar, `ASAP-ST-${Date.now()}-${count}`]);
        studentId = studentRes.rows[0].id;
      }

      // 3. Create Enrollment (Manual Check)
      const enrollmentRes = await client.query('SELECT id FROM enrollments WHERE student_id = $1 AND batch_id = $2', [studentId, batchId]);
      
      if (enrollmentRes.rows.length === 0) {
        await client.query(`
          INSERT INTO enrollments (student_id, batch_id, payment_status)
          VALUES ($1, $2, 'SUCCESS')
        `, [studentId, batchId]);
      }
      
      count++;
    }

    await client.query('COMMIT');
    res.json({ success: true, count, message: `${count} students successfully empanelled.` });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Bulk Enrollment Error:', error);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
};

module.exports = {
  getPartnerStats,
  loginPartner,
  getPartnerStudents,
  bulkEnrollment
};
