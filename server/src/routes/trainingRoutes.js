const express = require('express');
const router = express.Router();
const { getBatches, createBatch } = require('../controllers/trainingController');

router.get('/batches', getBatches);
router.post('/batches', createBatch);

module.exports = router;
