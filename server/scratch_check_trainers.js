const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function check() {
  const res = await pool.query(`
    SELECT u.email, r.name as role 
    FROM users u 
    JOIN roles r ON u.role_id = r.id 
    WHERE r.name = 'TRAINER'
  `);
  console.log('Trainers found:', res.rows.length);
  res.rows.forEach(t => console.log('-', t.email));
  process.exit();
}

check();
