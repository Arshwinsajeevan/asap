const express = require('express');
const router = express.Router();
const lmsController = require('../controllers/lmsController');

router.get('/dashboard/stats', lmsController.getDashboardStats);
router.get('/search', lmsController.getGlobalSearch);

module.exports = router;
