require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Basic Route
app.get('/', (req, res) => {
  res.send('ASAP Kerala Unified Portal API is running...');
});

const trainingRoutes = require('./routes/trainingRoutes');
const tbbRoutes = require('./routes/tbbRoutes');
const authRoutes = require('./routes/authRoutes');
const partnerRoutes = require('./routes/partnerRoutes');
const adminRoutes = require('./routes/adminRoutes');
const lmsRoutes = require('./routes/lmsRoutes');


// Vertical Specific Routes
app.use('/api/auth', authRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/tbb', tbbRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/lms', lmsRoutes);
app.use('/api/frr', (req, res) => res.json({ message: 'FRR API Ready' }));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
