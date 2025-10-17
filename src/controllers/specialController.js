const redisClient = require('../config/redisClient');

exports.clearCache = async (req, res) => {
    try {
      await redisClient.flushAll();
      res.json({ message: 'Cache cleared' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  