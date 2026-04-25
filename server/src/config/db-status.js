const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkConnection() {
  try {
    const client = await pool.connect();
    console.log('\x1b[32m%s\x1b[0m', '✅ SUCCESS: Connected to PostgreSQL successfully!');
    const res = await client.query('SELECT current_database(), current_user');
    console.log(`Connected to: ${res.rows[0].current_database} as ${res.rows[0].current_user}`);
    client.release();
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', '❌ ERROR: Could not connect to PostgreSQL.');
    console.error(`Reason: ${err.message}`);
    console.log('\nTip: Ensure PostgreSQL service is running and DATABASE_URL in .env is correct.');
  } finally {
    process.exit();
  }
}

checkConnection();
