const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function test() {
  try {
    const result = await pool.query(`
      SELECT u.id, u.email, u.mobile, tp.qualifications, tp.experience_years, tp.specializations,
             COALESCE((
               SELECT AVG(f.rating) 
               FROM feedbacks f 
               JOIN enrollments e ON f.enrollment_id = e.id 
               JOIN batches b ON e.batch_id = b.id 
               WHERE b.trainer_id = u.id
             ), 0) as avg_rating,
             COALESCE((SELECT SUM(amount) FROM finance_salaries WHERE user_id = u.id), 0) as total_payout,
             (SELECT count(*) FROM batches WHERE trainer_id = u.id) as active_batches
      FROM users u
      LEFT JOIN trainer_profiles tp ON u.id = tp.user_id
      JOIN roles r ON u.role_id = r.id
      WHERE r.name = 'TRAINER'
      ORDER BY u.email ASC
    `);
    console.log('Trainers returned:', result.rows.length);
    console.log(JSON.stringify(result.rows, null, 2));
  } catch (err) {
    console.error('QUERY FAILED:', err);
  } finally {
    process.exit();
  }
}

test();
