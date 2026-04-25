const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  const client = await pool.connect();
  try {
    console.log('Running Session & Attendance Migrations...');
    await client.query(`
      ALTER TABLE lessons ADD COLUMN IF NOT EXISTS session_type VARCHAR(20) DEFAULT 'ONLINE';
      ALTER TABLE lessons ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'SCHEDULED';
      
      CREATE TABLE IF NOT EXISTS attendance (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        enrollment_id UUID REFERENCES enrollments(id),
        lesson_id UUID REFERENCES lessons(id),
        status VARCHAR(20) DEFAULT 'PRESENT', -- PRESENT, ABSENT, EXCUSED
        marked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(enrollment_id, lesson_id)
      );
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
