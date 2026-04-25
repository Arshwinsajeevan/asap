const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  try {
    console.log('--- ASAP KERALA INSTITUTIONAL DATA SEEDING (V4) ---');
    
    // 1. Create a Base Course (Manual check since title is not UNIQUE in schema)
    let courseId;
    const existingCourse = await pool.query("SELECT id FROM courses WHERE title = 'Python Full Stack Development'");
    
    if (existingCourse.rows.length > 0) {
        courseId = existingCourse.rows[0].id;
        console.log('Course already exists, using existing ID.');
    } else {
        const courseRes = await pool.query(`
          INSERT INTO courses (title, duration_hours, fee)
          VALUES ('Python Full Stack Development', 120, 15000)
          RETURNING id
        `);
        courseId = courseRes.rows[0].id;
        console.log('New course created.');
    }

    // 2. Create a Base Batch
    let batchId;
    const existingBatch = await pool.query("SELECT id FROM batches WHERE batch_code = 'B-2026-PYTHON-01'");
    
    if (existingBatch.rows.length > 0) {
        batchId = existingBatch.rows[0].id;
        console.log('Batch already exists, using existing ID.');
    } else {
        const batchRes = await pool.query(`
          INSERT INTO batches (batch_code, course_id, start_date, status)
          VALUES ('B-2026-PYTHON-01', $1, NOW(), 'ACTIVE')
          RETURNING id
        `, [courseId]);
        batchId = batchRes.rows[0].id;
        console.log('New batch created.');
    }

    // 3. Clear existing students/enrollments
    await pool.query('DELETE FROM enrollments');
    await pool.query('DELETE FROM students');

    // 4. Seed 110 Students
    console.log('Seeding 110 students for Partner 3 (DIR)...');
    for (let i = 1; i <= 110; i++) {
        const email = `student${i}@asap.com`;
        
        // Use UPSERT for users (Email DOES have a UNIQUE constraint)
        const userId = (await pool.query(`
            INSERT INTO users (email, password_hash, role_id, category, mobile)
            VALUES ($1, 'psw', (SELECT id FROM roles WHERE name='STUDENT'), 'DIR', $2)
            ON CONFLICT (email) DO UPDATE SET category = 'DIR'
            RETURNING id
        `, [email, `9000000${i.toString().padStart(3, '0')}`])).rows[0].id;

        const studentId = (await pool.query(`
            INSERT INTO students (user_id, aadhaar_hash, student_tag_id, category)
            VALUES ($1, $2, $3, 'DIR')
            ON CONFLICT (aadhaar_hash) DO UPDATE SET category = 'DIR'
            RETURNING id
        `, [userId, `AADHAAR-${i}`, `ASAP-ST-${i}`])).rows[0].id;

        await pool.query(`
            INSERT INTO enrollments (student_id, batch_id, payment_status)
            VALUES ($1, $2, 'SUCCESS')
        `, [studentId, batchId]);
    }
    
    console.log('SUCCESS: 110 students correctly linked and fully operational.');
    process.exit(0);
  } catch (err) {
    console.error('SEEDING FAILED:', err.stack);
    process.exit(1);
  }
}

seed();
