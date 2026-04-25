const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function check() {
  try {
    const tables = ['feedbacks', 'batches', 'users', 'trainer_profiles'];
    for (const table of tables) {
      const res = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_name = '${table}'`);
      console.log(`${table} columns:`, res.rows.map(r => r.column_name).join(', '));
    }
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

check();
