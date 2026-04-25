const express = require('express');
const router = express.Router();
const { registerStudent, verifyOTP, loginUser } = require('../controllers/authController');

router.post('/register', registerStudent);
router.post('/verify-otp', verifyOTP);
router.post('/login', loginUser);

module.exports = router;
