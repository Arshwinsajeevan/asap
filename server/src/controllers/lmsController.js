const pool = require('../config/db');

const getDashboardStats = async (req, res) => {
  const { userId, role } = req.query; // Using query for now, in real app would be req.user

  try {
    let stats = [];

    switch (role) {
      case 'STUDENT': {
        // 1. Skill Coins
        const studentRes = await pool.query('SELECT skill_coin_balance, total_skill_score FROM students WHERE user_id = $1', [userId]);
        const student = studentRes.rows[0] || { skill_coin_balance: 0, total_skill_score: 0 };

        // 2. Active Programs (ongoing enrollments)
        const enrollRes = await pool.query('SELECT count(*) FROM enrollments WHERE student_id = (SELECT id FROM students WHERE user_id = $1)', [userId]);
        
        stats = [
          { label: 'Skill Coin Balance', value: Math.floor(student.skill_coin_balance || 0).toLocaleString(), trend: `≈ ₹${(student.skill_coin_balance / 10).toFixed(2)} INR Value`, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Skill Score', value: `${student.total_skill_score || 0}/1000`, trend: 'TOP 5% OF KERALA', color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Active Programs', value: enrollRes.rows[0].count || '0', trend: 'Ongoing & Enrolled', color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Attendance Avg', value: '92%', trend: 'CERTIFICATE ELIGIBLE', color: 'text-indigo-500', bg: 'bg-indigo-50' }
        ];
        break;
      }

      case 'TRAINER': {
        const batchRes = await pool.query('SELECT count(*) FROM batches WHERE trainer_id = $1', [userId]);
        const sessionRes = await pool.query('SELECT count(*) FROM lessons WHERE scheduled_at::date = CURRENT_DATE');
        const studentRes = await pool.query('SELECT count(*) FROM enrollments WHERE batch_id IN (SELECT id FROM batches WHERE trainer_id = $1)', [userId]);
        
        stats = [
          { label: 'Sessions Today', value: sessionRes.rows[0].count || '0', trend: 'Next in 45 mins', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Total Trainees', value: studentRes.rows[0].count || '0', trend: 'Under your mentorship', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg Attendance', value: '88%', trend: 'Across all batches', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Evaluations', value: '12', trend: 'Due by this weekend', color: 'text-amber-600', bg: 'bg-amber-50' }
        ];
        break;
      }

      case 'ADMIN': {
        const progRes = await pool.query('SELECT count(*) FROM courses');
        const batchRes = await pool.query('SELECT count(*) FROM batches WHERE status = \'ACTIVE\'');
        
        stats = [
          { label: 'Total Programs', value: progRes.rows[0].count || '0', trend: 'LMS Academic Catalog', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Batches', value: batchRes.rows[0].count || '0', trend: 'Live ongoing training', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Completion Rate', value: '94%', trend: 'Global Certification Avg', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Trainer Performance', value: '4.8/5', trend: 'Based on student feedback', color: 'text-amber-600', bg: 'bg-amber-50' }
        ];
        break;
      }

      case 'CORPORATE': {
        const stuRes = await pool.query('SELECT count(*) FROM students');
        
        stats = [
          { label: 'Active Candidates', value: stuRes.rows[0].count || '0', trend: 'Certified & Job Ready', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Talent Matches', value: '42', trend: 'Based on your JD', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Applications Received', value: '568', trend: '+12% from last week', color: 'text-indigo-600', bg: 'bg-indigo-50' },
        ];
        break;
      }

      case 'PLACEMENT_OFFICER': {
        stats = [
          { label: 'Total Graduates', value: '1,240', trend: '+15% this month', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Job Matches', value: '458', trend: '85% Success Rate', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Active Openings', value: '82', trend: '12 New Today', color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'In Pipeline', value: '320', trend: 'Awaiting Interview', color: 'text-indigo-600', bg: 'bg-indigo-50' }
        ];
        break;
      }

      default:
        return res.status(400).json({ message: 'Invalid role for stats' });
    }

    res.json({ success: true, stats });
  } catch (err) {
    console.error('Stats Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getGlobalSearch = async (req, res) => {
  const { query } = req.query;
  
  if (!query || query.length < 2) {
    return res.json({ success: true, results: [] });
  }

  try {
    const searchTerm = `%${query}%`;
    
    // 1. Search Programs (Courses)
    const coursesRes = await pool.query(
      'SELECT id, title as name, \'Program\' as category, \'/lms-dashboard/programs/\' || id as link FROM courses WHERE title ILIKE $1 LIMIT 5',
      [searchTerm]
    );

    // 2. Search People (Students & Trainers)
    const usersRes = await pool.query(
      `SELECT u.id, u.email as name, r.name as category, '/lms-dashboard/users/' || u.id as link 
       FROM users u 
       JOIN roles r ON u.role_id = r.id 
       WHERE (u.email ILIKE $1 OR u.mobile ILIKE $1) 
       AND r.name IN ('STUDENT', 'TRAINER') 
       LIMIT 5`,
      [searchTerm]
    );

    // 3. Search Batches
    const batchesRes = await pool.query(
      'SELECT id, batch_code as name, \'Batch\' as category, \'/lms-dashboard/batches/\' || id as link FROM batches WHERE batch_code ILIKE $1 LIMIT 5',
      [searchTerm]
    );

    const results = [
      ...coursesRes.rows,
      ...usersRes.rows,
      ...batchesRes.rows
    ];

    res.json({ success: true, results });
  } catch (err) {
    console.error('Search Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getPrograms = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, 
             b.id as batch_id, b.batch_code, b.start_date, b.end_date, b.status as batch_status, b.mode,
             u.email as trainer_email
      FROM courses c
      LEFT JOIN batches b ON c.id = b.course_id
      LEFT JOIN users u ON b.trainer_id = u.id
      ORDER BY c.title ASC
    `);
    res.json({ success: true, programs: result.rows });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch programs' });
  }
};

const createProgram = async (req, res) => {
  const { title, duration_hours, fee, level, skills, objectives, sector, nsqf, start_date, end_date, mode, trainer_id } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    const courseRes = await client.query(
      'INSERT INTO courses (title, duration_hours, fee, level, skills, objectives, metadata) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      [title, duration_hours || 40, fee || 0, level, skills, objectives, { sector, nsqf }]
    );
    
    const courseId = courseRes.rows[0].id;
    const batchCode = `B-${title.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    
    // Ensure trainer_id is null if not provided
    const tid = trainer_id && trainer_id !== '' ? trainer_id : null;
    
    await client.query(
      'INSERT INTO batches (batch_code, course_id, trainer_id, start_date, end_date, mode, status) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [batchCode, courseId, tid, start_date || new Date(), end_date || null, mode || 'ONLINE', 'PLANNED']
    );
    
    await client.query('COMMIT');
    res.json({ success: true, message: 'Program created successfully' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Create Error:', err);
    res.status(500).json({ message: 'Failed to create program' });
  } finally {
    client.release();
  }
};

const updateProgram = async (req, res) => {
  const { id } = req.params;
  const { title, duration_hours, fee, level, skills, objectives, sector, nsqf, batch_id, status, trainer_id } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    await client.query(
      'UPDATE courses SET title=$1, duration_hours=$2, fee=$3, level=$4, skills=$5, objectives=$6, metadata=$7 WHERE id=$8',
      [title, duration_hours, fee, level, skills, objectives, { sector, nsqf }, id]
    );
    
    if (batch_id) {
      const tid = trainer_id && trainer_id !== '' ? trainer_id : null;
      await client.query(
        'UPDATE batches SET status=$1, trainer_id=$2 WHERE id=$3',
        [status || 'PLANNED', tid, batch_id]
      );
    }
    
    await client.query('COMMIT');
    res.json({ success: true });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Update Error:', err);
    res.status(500).json({ message: 'Update failed' });
  } finally {
    client.release();
  }
};

const getTrainers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.id, u.email, u.mobile, tp.qualifications, tp.experience_years, tp.specializations,
             COALESCE((
               SELECT AVG(f.rating) 
               FROM feedbacks f 
               JOIN enrollments e ON f.enrollment_id = e.id 
               JOIN batches b ON e.batch_id = b.id 
               WHERE b.trainer_id = u.id
             ), 0) as avg_rating,
             COALESCE((SELECT SUM(amount) FROM finance_salaries WHERE user_id = u.id), 0) as total_payout,
             (SELECT count(*) FROM batches WHERE trainer_id = u.id) as active_batches
      FROM users u
      LEFT JOIN trainer_profiles tp ON u.id = tp.user_id
      JOIN roles r ON u.role_id = r.id
      WHERE r.name = 'TRAINER'
      ORDER BY u.email ASC
    `);
    res.json({ success: true, trainers: result.rows });
  } catch (err) {
    console.error('getTrainers error:', err);
    res.status(500).json({ message: 'Failed to fetch trainers' });
  }
};

const getBatches = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT b.*, c.title as course_title, u.email as trainer_email,
             (SELECT count(*) FROM enrollments WHERE batch_id = b.id) as trainee_count
      FROM batches b
      JOIN courses c ON b.course_id = c.id
      LEFT JOIN users u ON b.trainer_id = u.id
      ORDER BY b.start_date DESC
    `);
    res.json({ success: true, batches: result.rows });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch batches' });
  }
};

const createBatch = async (req, res) => {
  const { batch_code, course_id, trainer_id, start_date, mode, status } = req.body;
  try {
    const tid = trainer_id && trainer_id !== '' ? trainer_id : null;
    await pool.query(
      'INSERT INTO batches (batch_code, course_id, trainer_id, start_date, mode, status) VALUES ($1, $2, $3, $4, $5, $6)',
      [batch_code, course_id, tid, start_date, mode || 'ONLINE', status || 'PLANNED']
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create batch' });
  }
};

const getBatchTrainees = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT s.*, u.email, e.id as enrollment_id, e.payment_status
      FROM enrollments e
      JOIN students s ON e.student_id = s.id
      JOIN users u ON s.user_id = u.id
      WHERE e.batch_id = $1
    `, [id]);
    res.json({ success: true, trainees: result.rows });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trainees' });
  }
};

const bulkEnroll = async (req, res) => {
  const { id } = req.params; // batch_id
  const { student_ids } = req.body; // array of student UUIDs
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const sid of student_ids) {
      await client.query(
        'INSERT INTO enrollments (student_id, batch_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
        [sid, id]
      );
    }
    await client.query('COMMIT');
    res.json({ success: true });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ message: 'Bulk enrollment failed' });
  } finally {
    client.release();
  }
};

const getAllStudents = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.id, s.student_tag_id, u.email 
      FROM students s
      JOIN users u ON s.user_id = u.id
      ORDER BY u.email ASC
    `);
    res.json({ success: true, students: result.rows });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch students' });
  }
};

const getSessions = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT l.*, b.batch_code, c.title as course_title, u.email as teacher_email
      FROM lessons l
      JOIN batches b ON l.batch_id = b.id
      JOIN courses c ON b.course_id = c.id
      LEFT JOIN users u ON l.teacher_id = u.id
      ORDER BY l.scheduled_at DESC
    `);
    res.json({ success: true, sessions: result.rows });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch sessions' });
  }
};

const createSession = async (req, res) => {
  const { batch_id, topic_name, teacher_id, scheduled_at, session_type } = req.body;
  try {
    const tid = teacher_id && teacher_id !== '' ? teacher_id : null;
    await pool.query(
      'INSERT INTO lessons (batch_id, topic_name, teacher_id, scheduled_at, session_type, status) VALUES ($1, $2, $3, $4, $5, $6)',
      [batch_id, topic_name, tid, scheduled_at, session_type || 'ONLINE', 'SCHEDULED']
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create session' });
  }
};

const getSessionAttendance = async (req, res) => {
  const { id } = req.params; // lesson_id
  try {
    const result = await pool.query(`
      SELECT e.id as enrollment_id, s.student_tag_id, u.email,
             a.status as attendance_status
      FROM enrollments e
      JOIN students s ON e.student_id = s.id
      JOIN users u ON s.user_id = u.id
      JOIN lessons l ON e.batch_id = l.batch_id
      LEFT JOIN attendance a ON a.enrollment_id = e.id AND a.lesson_id = l.id
      WHERE l.id = $1
    `, [id]);
    res.json({ success: true, attendance: result.rows });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch attendance list' });
  }
};

const markAttendance = async (req, res) => {
  const { id } = req.params; // lesson_id
  const { marks } = req.body; // array of { enrollment_id, status }
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const mark of marks) {
      await client.query(`
        INSERT INTO attendance (enrollment_id, lesson_id, status) 
        VALUES ($1, $2, $3)
        ON CONFLICT (enrollment_id, lesson_id) 
        DO UPDATE SET status = EXCLUDED.status, marked_at = CURRENT_TIMESTAMP
      `, [mark.enrollment_id, id, mark.status]);
    }
    
    // Update session status to COMPLETED if marks are provided
    await client.query('UPDATE lessons SET status = $1 WHERE id = $2', ['COMPLETED', id]);
    
    await client.query('COMMIT');
    res.json({ success: true });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ message: 'Failed to mark attendance' });
  } finally {
    client.release();
  }
};

const getBatchAnalytics = async (req, res) => {
  const { id } = req.params; // batch_id
  try {
    // 1. Fetch all enrollments for this batch
    const enrollmentsRes = await pool.query(`
      SELECT e.id as enrollment_id, u.email, s.student_tag_id,
             (SELECT count(*) FROM attendance WHERE enrollment_id = e.id AND status = 'PRESENT') as present_count,
             (SELECT count(*) FROM lessons WHERE batch_id = $1) as total_sessions,
             (SELECT AVG(marks_obtained) FROM assessment_scores WHERE enrollment_id = e.id) as avg_assessment,
             (SELECT rating FROM feedbacks WHERE enrollment_id = e.id ORDER BY created_at DESC LIMIT 1) as latest_feedback
      FROM enrollments e
      JOIN students s ON e.student_id = s.id
      JOIN users u ON s.user_id = u.id
      WHERE e.batch_id = $1
    `, [id]);

    const trainees = enrollmentsRes.rows.map(t => {
      const attendancePct = t.total_sessions > 0 ? (t.present_count / t.total_sessions) * 100 : 0;
      const assessmentPct = t.avg_assessment || 0;
      const feedbackScore = (t.latest_feedback || 5) * 20; // Scale 1-5 to 0-100

      // Final Score Calculation (20% Attendance, 60% Assessment, 20% Feedback)
      const finalScore = (attendancePct * 0.2) + (assessmentPct * 0.6) + (feedbackScore * 0.2);

      return {
        ...t,
        attendancePct,
        assessmentPct,
        finalScore: Math.round(finalScore),
        status: finalScore >= 40 ? 'PASS' : 'FAIL'
      };
    });

    const summary = {
      avgScore: trainees.length > 0 ? trainees.reduce((acc, curr) => acc + curr.finalScore, 0) / trainees.length : 0,
      passCount: trainees.filter(t => t.status === 'PASS').length,
      failCount: trainees.filter(t => t.status === 'FAIL').length,
      totalTrainees: trainees.length
    };

    res.json({ success: true, trainees, summary });
  } catch (err) {
    console.error('Analytics Error:', err);
    res.status(500).json({ message: 'Failed to fetch batch analytics' });
  }
};

const recordAssessmentScore = async (req, res) => {
  const { enrollment_id, assessment_id, marks_obtained } = req.body;
  try {
    await pool.query(`
      INSERT INTO assessment_scores (enrollment_id, assessment_id, marks_obtained)
      VALUES ($1, $2, $3)
      ON CONFLICT (enrollment_id, assessment_id)
      DO UPDATE SET marks_obtained = EXCLUDED.marks_obtained, evaluated_at = CURRENT_TIMESTAMP
    `, [enrollment_id, assessment_id, marks_obtained]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to record score' });
  }
};

const getReportsOverview = async (req, res) => {
  try {
    // 1. Enrollment Trends (Last 6 Months)
    const enrollmentTrends = await pool.query(`
      SELECT TO_CHAR(created_at, 'Mon YYYY') as month, count(*) as count
      FROM enrollments
      WHERE created_at > CURRENT_DATE - INTERVAL '6 months'
      GROUP BY month, DATE_TRUNC('month', created_at)
      ORDER BY DATE_TRUNC('month', created_at)
    `);

    // 2. Trainer Performance Distribution
    const trainerPerformance = await pool.query(`
      SELECT u.email, 
             COALESCE((
               SELECT AVG(f.rating) 
               FROM feedbacks f 
               JOIN enrollments e ON f.enrollment_id = e.id 
               JOIN batches b ON e.batch_id = b.id 
               WHERE b.trainer_id = u.id
             ), 0) as rating
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE r.name = 'TRAINER'
      LIMIT 5
    `);

    // 3. Batch Status Distribution
    const batchStats = await pool.query(`
      SELECT status, count(*) as count 
      FROM batches 
      GROUP BY status
    `);

    // 4. Global Performance metrics
    const performance = await pool.query(`
      SELECT AVG(marks_obtained) as avg_score 
      FROM assessment_scores
    `);

    res.json({
      success: true,
      trends: enrollmentTrends.rows,
      trainers: trainerPerformance.rows,
      batchStats: batchStats.rows,
      avgGlobalScore: Math.round(performance.rows[0]?.avg_score || 0)
    });
  } catch (err) {
    console.error('Reports Error:', err);
    res.status(500).json({ message: 'Failed to generate reports' });
  }
};

const getIntegrationStatus = async (req, res) => {
  try {
    const integrations = [
      { 
        id: 'ATTENDANCE', 
        name: 'Attendance Sync', 
        status: 'SUCCESS', 
        lastSync: new Date().toISOString(), 
        latency: '124ms',
        details: 'Biometric & QR gateway operational'
      },
      { 
        id: 'FINANCE', 
        name: 'Finance Ledger', 
        status: 'SUCCESS', 
        lastSync: new Date(Date.now() - 3600000).toISOString(), 
        latency: '450ms',
        details: 'Payout calculations synchronized with ERP'
      },
      { 
        id: 'PLACEMENT', 
        name: 'Placement Intel', 
        status: 'WARNING', 
        lastSync: new Date(Date.now() - 86400000).toISOString(), 
        latency: 'N/A',
        details: 'Talent pool indexing in progress'
      }
    ];

    const logs = [
      { id: 1, module: 'FINANCE', event: 'Ledger Sync', status: 'SUCCESS', timestamp: new Date(Date.now() - 600000).toISOString() },
      { id: 2, module: 'ATTENDANCE', event: 'Batch Attendance Push', status: 'SUCCESS', timestamp: new Date(Date.now() - 1200000).toISOString() },
      { id: 3, module: 'PLACEMENT', event: 'Job Board Pull', status: 'FAILED', timestamp: new Date(Date.now() - 3600000).toISOString() }
    ];

    res.json({ success: true, integrations, logs });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch integration status' });
  }
};

module.exports = {
  getDashboardStats,
  getGlobalSearch,
  getPrograms,
  createProgram,
  updateProgram,
  getTrainers,
  getBatches,
  createBatch,
  getBatchTrainees,
  bulkEnroll,
  getAllStudents,
  getSessions,
  createSession,
  getSessionAttendance,
  markAttendance,
  getBatchAnalytics,
  recordAssessmentScore,
  getReportsOverview,
  getIntegrationStatus
};
