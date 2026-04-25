const express = require('express');
const router = express.Router();
const { getCoinsConfig, updateMemberships } = require('../controllers/tbbController');

router.get('/coins/config', getCoinsConfig);
router.post('/memberships', updateMemberships);

module.exports = router;
