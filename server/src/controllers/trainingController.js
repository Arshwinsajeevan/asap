// Mock DB logic until Postgres connection is live
const getBatches = async (req, res) => {
  try {
    // In a real scenario, this would be: 
    // const batches = await pool.query('SELECT * FROM batches');
    const mockBatches = [
      { id: 'DIR-B01', courseTitle: 'Full Stack Development', trainerName: 'Dr. John Doe', startDate: '2023-12-01', capacity: 40, enrolled: 38, mode: 'Hybrid' },
      { id: 'INS-B09', courseTitle: 'Cyber Security', trainerName: 'Sarah Smith', startDate: '2023-12-15', capacity: 30, enrolled: 12, mode: 'Online' }
    ];
    res.status(200).json(mockBatches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBatch = async (req, res) => {
  const { courseId, trainerId, startDate, mode } = req.body;
  try {
    // DB Insert Logic here
    res.status(201).json({ message: 'Batch produced successfully', batchId: `NEW-${Math.floor(Math.random()*1000)}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getBatches,
  createBatch
};
