const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  try {
    console.log('--- ASAP KERALA FINAL STAGE ALIGNMENT ---');
    
    // 1. Correct Mapping
    const stages = [
      { email: 'partner1@asap.com', status: 'enrolling' },           // Interest Only -> Step 1
      { email: 'partner2@asap.com', status: 'audit_round_1' },       // Post 25k -> Step 2
      { email: 'partner3@asap.com', status: 'active' }               // Post 75k -> Fully Active
    ];

    for (const p of stages) {
      await pool.query('UPDATE users SET status = $1 WHERE email = $2', [p.status, p.email]);
    }
    
    console.log('SUCCESS: Stages re-aligned to Step 1, Step 2, and Active Dashboard.');
    process.exit(0);
  } catch (err) {
    console.error('SYNC FAILED:', err.message);
    process.exit(1);
  }
}

migrate();
