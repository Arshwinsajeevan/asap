const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  const client = await pool.connect();
  try {
    console.log('Running migrations...');
    await client.query(`
      ALTER TABLE courses ADD COLUMN IF NOT EXISTS description TEXT;
      ALTER TABLE courses ADD COLUMN IF NOT EXISTS level VARCHAR(20);
      ALTER TABLE courses ADD COLUMN IF NOT EXISTS skills TEXT[];
      ALTER TABLE courses ADD COLUMN IF NOT EXISTS objectives TEXT;
      ALTER TABLE courses ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';
      ALTER TABLE batches ADD COLUMN IF NOT EXISTS end_date DATE;
    `);
    console.log('Migration successful');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    client.release();
    process.exit();
  }
}

migrate();
