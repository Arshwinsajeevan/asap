const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function run() {
  try {
    const sqlPath = path.join(__dirname, 'src', 'config', 'init-db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('Running SQL script...');
    await pool.query(sql);
    console.log('Database initialized successfully!');
  } catch (err) {
    console.error('Error running SQL script:', err);
  } finally {
    await pool.end();
  }
}

run();
