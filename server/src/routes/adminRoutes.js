const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/partners', adminController.getPartners);
router.get('/stats', adminController.getStats);
router.put('/partners/:id/status', adminController.updatePartnerStatus);

module.exports = router;
