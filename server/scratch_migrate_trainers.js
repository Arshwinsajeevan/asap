const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  const client = await pool.connect();
  try {
    console.log('Running Trainer Management Migrations...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS trainer_profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES users(id) UNIQUE,
        qualifications TEXT,
        experience_years INT DEFAULT 0,
        specializations TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS feedbacks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        enrollment_id UUID REFERENCES enrollments(id),
        trainer_id UUID REFERENCES users(id),
        rating INT CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
