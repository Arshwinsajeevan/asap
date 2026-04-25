const express = require('express');
const router = express.Router();
const { getPartnerStats, loginPartner, getPartnerStudents, bulkEnrollment } = require('../controllers/partnerController');

router.post('/login', loginPartner);
router.get('/stats', getPartnerStats);
router.get('/students', getPartnerStudents);
router.post('/bulk-students', bulkEnrollment);

module.exports = router;
