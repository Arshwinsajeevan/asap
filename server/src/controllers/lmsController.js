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

module.exports = {
  getDashboardStats,
  getGlobalSearch
};
