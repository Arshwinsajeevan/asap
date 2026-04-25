const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initialize() {
  try {
    console.log('--- ASAP KERALA DB INITIALIZATION START ---');
    const sqlPath = path.join(__dirname, 'init-db.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Split by semicolon but handle potential issues with triggers/functions if any
    // For this SQL, simple split is mostly fine
    const commands = sql.split(';').filter(cmd => cmd.trim().length > 0);

    for (const cmd of commands) {
      try {
        await pool.query(cmd);
      } catch (err) {
        if (!err.message.includes('already exists')) {
            console.warn(`WARNING in command: ${cmd.substring(0, 50)}... \nError: ${err.message}`);
        }
      }
    }

    console.log('--- DB INITIALIZATION COMPLETE ---');
    
    // Now seed the partners
    console.log('Seeding core partners...');
    const roles = ['ADMIN', 'PARTNER_PM', 'STUDENT'];
    for (const role of roles) {
       await pool.query('INSERT INTO roles (name) VALUES ($1) ON CONFLICT (name) DO NOTHING', [role]);
    }

    const users = [
      { email: 'admin@asapkerala.org', role: 'ADMIN', category: 'ALL', status: 'active' },
      { email: 'tbb-admin@asap.com', role: 'ADMIN', category: 'TBB', status: 'active' },
      { email: 'frr-admin@asap.com', role: 'ADMIN', category: 'FRR', status: 'active' },
      { email: 'partner1@asap.com', role: 'PARTNER_PM', category: 'DIR', status: 'enrolling' },
      { email: 'partner2@asap.com', role: 'PARTNER_PM', category: 'DIR', status: 'audit_round_1' },
      { email: 'partner3@asap.com', role: 'PARTNER_PM', category: 'DIR', status: 'active' }
    ];

    for (const u of users) {
      await pool.query(`
        INSERT INTO users (email, mobile, password_hash, role_id, category, status)
        VALUES ($1, $2, $3, (SELECT id FROM roles WHERE name=$4), $5, $6)
        ON CONFLICT (email) DO UPDATE SET category = $5, status = $6, role_id = (SELECT id FROM roles WHERE name=$4)
      `, [u.email, `000000000${users.indexOf(u)}`, 'psw', u.role, u.category, u.status]);
    }

    console.log('SUCCESS: All tables and core accounts are now LIVE.');
    process.exit(0);
  } catch (err) {
    console.error('INITIALIZATION FAILED:', err.stack);
    process.exit(1);
  }
}

initialize();
