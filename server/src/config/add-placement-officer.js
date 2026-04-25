const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function run() {
  try {
    await pool.query("INSERT INTO roles (name) VALUES ('PLACEMENT_OFFICER') ON CONFLICT DO NOTHING");
    const roleRes = await pool.query("SELECT id FROM roles WHERE name = 'PLACEMENT_OFFICER'");
    const roleId = roleRes.rows[0].id;
    await pool.query(`
      INSERT INTO users (email, mobile, password_hash, role_id, category, status) 
      VALUES ('placement@asap.com', '9898989898', 'psw', $1, 'ALL', 'active') 
      ON CONFLICT (email) DO NOTHING
    `, [roleId]);
    console.log('✅ Placement Officer user created: placement@asap.com / psw');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

run();
