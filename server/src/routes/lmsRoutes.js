const express = require('express');
const router = express.Router();
const lmsController = require('../controllers/lmsController');

router.get('/dashboard/stats', lmsController.getDashboardStats);
router.get('/search', lmsController.getGlobalSearch);
router.get('/programs', lmsController.getPrograms);
router.post('/programs', lmsController.createProgram);
router.put('/programs/:id', lmsController.updateProgram);
router.get('/trainers', lmsController.getTrainers);
router.get('/batches', lmsController.getBatches);
router.post('/batches', lmsController.createBatch);
router.get('/batches/:id/trainees', lmsController.getBatchTrainees);
router.post('/batches/:id/enroll', lmsController.bulkEnroll);
router.get('/students', lmsController.getAllStudents);
router.get('/sessions', lmsController.getSessions);
router.post('/sessions', lmsController.createSession);
router.get('/sessions/:id/attendance', lmsController.getSessionAttendance);
router.post('/sessions/:id/attendance', lmsController.markAttendance);
router.get('/batches/:id/analytics', lmsController.getBatchAnalytics);
router.post('/assessments/scores', lmsController.recordAssessmentScore);
router.get('/reports/overview', lmsController.getReportsOverview);
router.get('/integrations/status', lmsController.getIntegrationStatus);

module.exports = router;
