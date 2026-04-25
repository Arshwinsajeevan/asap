const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function runFixAndSeed() {
  try {
    console.log("1. Adding 'name' column to students table...");
    await pool.query("ALTER TABLE students ADD COLUMN IF NOT EXISTS name TEXT");

    console.log("2. Creating Course & Batch...");
    const courseRes = await pool.query(
      "INSERT INTO courses (title, duration_hours, fee) VALUES ('Advanced Robotics & AI', 120, 15000) RETURNING id"
    );
    const courseId = courseRes.rows[0].id;
    
    // Ensure 'batches' table is used as per init-db.sql
    const batchRes = await pool.query(
      "INSERT INTO batches (batch_code, course_id, start_date) VALUES ($1, $2, '2026-05-01') RETURNING id", 
      [`BATCH-AI-${Math.floor(Math.random() * 1000)}`, courseId]
    );
    const batchId = batchRes.rows[0].id;

    console.log("3. Seeding 110 students...");
    const names = ["Rahul", "Anjali", "Sreejith", "Lakshmi", "Arjun", "Kavya", "Vivek", "Meera", "Adarsh", "Sneha"];
    const surnames = ["Nair", "Menon", "Kurup", "Pillai", "Varma"];

    for (let i = 1; i <= 110; i++) {
        const name = `${names[i % 10]} ${surnames[i % 5]} ${i}`;
        const phone = `91${Math.floor(1000000000 + Math.random() * 9000000000)}`;
        const aadhaar = `${Math.floor(1000 + Math.random() * 9000)}${Math.floor(1000 + Math.random() * 9000)}${Math.floor(1000 + Math.random() * 9000)}`;
        const tagId = `DIR-${10000 + i}`;

        // Insert student
        const stuRes = await pool.query(
          "INSERT INTO students (aadhaar_hash, student_tag_id, category, skill_coin_balance, name) VALUES ($1, $2, 'DIR', 100, $3) RETURNING id", 
          [aadhaar, tagId, name]
        );
        const stuId = stuRes.rows[0].id;

        // Create enrollment
        await pool.query(
          "INSERT INTO enrollments (student_id, batch_id, payment_status) VALUES ($1, $2, 'SUCCESS')", 
          [stuId, batchId]
        );
    }

    console.log("SUCCESS: 110 students and enrollments created!");
    process.exit(0);
  } catch (err) {
    console.error("SEED ERROR:", err);
    process.exit(1);
  }
}

runFixAndSeed();
