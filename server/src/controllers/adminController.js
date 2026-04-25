const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const getPartners = async (req, res) => {
  const { category } = req.query;
  try {
    let queryStr = `
      SELECT u.id, u.email, u.mobile as phone, u.status, u.created_at as "createdAt",
             u.category as "adminCategory"
      FROM users u
      WHERE u.role_id = (SELECT id FROM roles WHERE name='PARTNER_PM')
    `;
    const params = [];
    
    if (category && category !== 'ALL') {
      queryStr += ` AND u.category = $1`;
      params.push(category);
    }
    
    queryStr += ` ORDER BY u.created_at DESC`;
    
    const result = await pool.query(queryStr, params);
    
    // Enrich with some mock institution data for the developer's UI
    const enriched = result.rows.map(row => ({
      ...row,
      name: row.email.split('@')[0],
      instituteName: `${row.category || 'ASAP'} Training Centre`,
      gstNumber: '32AAAAA0000A1Z5',
      panNumber: 'ABCDE1234F',
      address: 'ASAP Skill Park, Kerala',
      coordinatorName: 'Senior Coordinator',
      spocEmail: row.email
    }));
    
    res.json(enriched);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStats = async (req, res) => {
  const { category } = req.query;
  try {
    let query = `SELECT status, COUNT(*) FROM users WHERE role_id = (SELECT id FROM roles WHERE name='PARTNER_PM')`;
    const params = [];
    
    if (category && category !== 'ALL') {
      query += ` AND category = $1`;
      params.push(category);
    }
    
    query += ` GROUP BY status`;
    
    const result = await pool.query(query, params);
    
    const stats = {
      total: 0,
      active: 0,
      pending: 0
    };
    
    result.rows.forEach(row => {
      const count = parseInt(row.count);
      stats.total += count;
      if (row.status === 'active') stats.active += count;
      if (row.status === 'enrolling' || row.status === 'audit_round_1') stats.pending += count;
    });
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePartnerStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await pool.query('UPDATE users SET status = $1 WHERE id = $2', [status.toLowerCase(), id]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPartners,
  getStats,
  updatePartnerStatus
};
