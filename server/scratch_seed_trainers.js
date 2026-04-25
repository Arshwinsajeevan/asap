const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Seeding more Trainers...');
    const roleRes = await client.query("SELECT id FROM roles WHERE name = 'TRAINER'");
    const trainerRoleId = roleRes.rows[0].id;

    const trainers = [
      ['dr.sarah@asap.com', '9876543210', 'psw', 'PhD in AI, 10+ Yrs Exp'],
      ['rahul.m@asap.com', '9876543211', 'psw', 'Fullstack Architect'],
      ['priya.s@asap.com', '9876543212', 'psw', 'Certified Cloud Expert']
    ];

    for (const [email, mobile, psw, qual] of trainers) {
      const userRes = await client.query(
        'INSERT INTO users (email, mobile, password_hash, role_id) VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO UPDATE SET email=EXCLUDED.email RETURNING id',
        [email, mobile, psw, trainerRoleId]
      );
      const userId = userRes.rows[0].id;
      
      await client.query(
        'INSERT INTO trainer_profiles (user_id, qualifications, experience_years, specializations) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id) DO NOTHING',
        [userId, qual, Math.floor(Math.random() * 10) + 2, ['Technical', 'Soft Skills']]
      );

      // Add some mock payouts
      await client.query(
        'INSERT INTO finance_salaries (employee_type, employee_name, amount, month, status, user_id) VALUES ($1, $2, $3, $4, $5, $6)',
        ['TRAINER', email.split('@')[0], 45000 + (Math.random() * 10000), 'April 2026', 'PAID', userId]
      );
    }

    console.log('Seeding successful');
  } catch (err) {
    console.error('Seed failed:', err);
  } finally {
    client.release();
    process.exit();
  }
}

seed();
