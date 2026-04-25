const pool = require('../config/db');

const registerStudent = async (req, res) => {
  const { aadhaar, mobile, fullName, category, partnerId } = req.body;
  
  try {
    // 1. In a real scenario, hash Aadhaar and check DB
    // const exists = await pool.query('SELECT id FROM students WHERE aadhaar_hash = $1', [hashedAadhaar]);
    
    // 2. Generate Tag ID (e.g. DIR-12345 or TBB-67890)
    const prefix = category || 'DIR';
    const tagId = `${prefix}-${Math.floor(10000 + Math.random() * 90000)}`;

    // 3. Create User & Student (Transaction)
    // const newUser = await pool.query('INSERT INTO users ...');
    
    // 4. Initial Coin Credit (Vertical 1 logic)
    const welcomeCoins = 100;

    res.status(201).json({
      success: true,
      message: 'Registration successful! 100 Skill Coins credited.',
      data: {
        tagId,
        coinsEarned: welcomeCoins,
        membership: 'Basic'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  const { mobile, otp } = req.body;
  if (otp === '123456') {
    res.json({ success: true, message: 'Mobile verified' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
};


const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // 1. Query database for user and their role
    const result = await pool.query(`
      SELECT u.id, u.email, u.password_hash, u.category, u.status, r.name as role_name
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.email = $1
    `, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Identity not found in ASAP Registry' });
    }

    const user = result.rows[0];

    // 2. Simple password check (In production, use bcrypt.compare)
    if (password === user.password_hash) {
      return res.json({
        token: `token-${user.id}`,
        user: { 
          id: user.id, 
          name: email.split('@')[0].toUpperCase(), 
          email: user.email, 
          role: user.role_name,
          category: user.category,
          status: user.status
        }
      });
    } else {
      return res.status(401).json({ message: 'Secure access denied: Invalid credentials' });
    }
  } catch (err) {
    console.error('Auth Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  registerStudent,
  verifyOTP,
  loginUser
};
