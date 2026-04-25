const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  try {
    console.log('Seeding LMS Data...');

    // 1. Roles
    const roles = ['ADMIN', 'STUDENT', 'TRAINER', 'CORPORATE'];
    for (const role of roles) {
      await pool.query('INSERT INTO roles (name) VALUES ($1) ON CONFLICT (name) DO NOTHING', [role]);
    }

    // Get role IDs
    const roleRes = await pool.query('SELECT id, name FROM roles');
    const roleMap = {};
    roleRes.rows.forEach(r => roleMap[r.name] = r.id);

    // 2. Users (Password: psw)
    const users = [
      { email: 'student@asap.com', role: 'STUDENT', category: 'TBB' },
      { email: 'trainer@asap.com', role: 'TRAINER', category: 'ALL' },
      { email: 'lmsadmin@asap.com', role: 'ADMIN', category: 'ALL' },
      { email: 'recruiter@asap.com', role: 'CORPORATE', category: 'FRR' },
    ];

    for (const user of users) {
      await pool.query(`
        INSERT INTO users (email, mobile, password_hash, role_id, category, status)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (email) DO NOTHING
      `, [user.email, Math.floor(1000000000 + Math.random() * 9000000000).toString(), 'psw', roleMap[user.role], user.category, 'active']);
    }

    // 3. Courses
    const courses = [
      ['Cloud Computing Foundation', 40, 5000],
      ['Professional Communication', 20, 2000],
      ['Data Analytics with Python', 60, 8000],
    ];

    for (const c of courses) {
      await pool.query('INSERT INTO courses (title, duration_hours, fee) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING', c);
    }

    // 4. Students
    const userRes = await pool.query('SELECT id FROM users WHERE email = \'student@asap.com\'');
    const studentUserId = userRes.rows[0].id;
    
    await pool.query(`
      INSERT INTO students (user_id, aadhaar_hash, student_tag_id, category, skill_coin_balance, total_skill_score)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT DO NOTHING
    `, [studentUserId, 'hash123', 'TBB-12345', 'TBB', 1250, 840]);

    console.log('✅ Seeding complete!');
    console.log('Credentials:');
    console.log('- Student: student@asap.com / psw');
    console.log('- Trainer: trainer@asap.com / psw');
    console.log('- LMS Admin: lmsadmin@asap.com / psw');
    console.log('- Recruiter: recruiter@asap.com / psw');

  } catch (err) {
    console.error('Seeding Error:', err);
  } finally {
    await pool.end();
  }
}

seed();
