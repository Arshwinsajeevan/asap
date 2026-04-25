const getCoinsConfig = async (req, res) => {
  try {
    // Logic to fetch coin multipliers and conversion rates
    res.json({
      conversionRate: 0.1, // 10 Coins = 1 INR
      earningRules: [
        { activity: 'Registration', coins: 100 },
        { activity: 'Profile', coins: 500 }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMemberships = async (req, res) => {
  // Logic to update tiers in DB
  res.json({ message: 'Membership configuration updated' });
};

module.exports = {
  getCoinsConfig,
  updateMemberships
};
