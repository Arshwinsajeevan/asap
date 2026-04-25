const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  const client = await pool.connect();
  try {
    console.log('Running Assessment & Evaluation Migrations...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS assessments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        course_id UUID REFERENCES courses(id),
        assessment_type VARCHAR(20) DEFAULT 'POST', -- PRE, POST, MID
        title VARCHAR(255),
        total_marks INT DEFAULT 100,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS assessment_scores (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        enrollment_id UUID REFERENCES enrollments(id),
        assessment_id UUID REFERENCES assessments(id),
        marks_obtained INT,
        evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(enrollment_id, assessment_id)
      );

      -- Add weightage columns to courses for global calc settings
      ALTER TABLE courses ADD COLUMN IF NOT EXISTS attendance_weight INT DEFAULT 20;
      ALTER TABLE courses ADD COLUMN IF NOT EXISTS assessment_weight INT DEFAULT 60;
      ALTER TABLE courses ADD COLUMN IF NOT EXISTS feedback_weight INT DEFAULT 20;
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
