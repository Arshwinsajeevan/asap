const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkCols() {
  const res = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'students'");
  console.log("COLUMNS IN STUDENTS:", res.rows.map(r => r.column_name));
  process.exit(0);
}

checkCols();
