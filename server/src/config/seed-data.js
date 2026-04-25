const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Initializing tables from SQL...');
    const initSql = fs.readFileSync(path.join(__dirname, 'init-db.sql'), 'utf8');
    await client.query(initSql);
    
    console.log('Seeding Admin User...');
    const hashedPassword = await bcrypt.hash('psw', 10);
    await client.query(`
      INSERT INTO users (email, mobile, password_hash, role_id) 
      VALUES ('admin@asapkerala.org', '0000000000', $1, (SELECT id FROM roles WHERE name='ADMIN'))
      ON CONFLICT (email) DO NOTHING;
    `, [hashedPassword]);

    console.log('Seeding metadata...');
    
    // Seed Courses
    const courseRes = await client.query(`
      INSERT INTO courses (title, duration_hours, fee) VALUES 
      ('Full Stack Development', 120, 15000),
      ('Cyber Security', 80, 20000),
      ('Data Analytics', 60, 10000)
      RETURNING id, title;
    `);
    
    const courses = courseRes.rows;
    console.log(`Seeded ${courses.length} courses.`);

    // Seed Batches
    for (const course of courses) {
      await client.query(`
        INSERT INTO batches (batch_code, course_id, start_date, mode) VALUES 
        ($1, $2, CURRENT_DATE + INTERVAL '10 days', 'Hybrid')
      `, [`${course.title.substring(0,3).toUpperCase()}-B01`, course.id]);
    }

    console.log('Seeding successful!');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    client.release();
    process.exit();
  }
}

seed();
