const jwt = require('jsonwebtoken');
const redisClient = require('../config/redisClient');

exports.authMiddleware = async (req, res, next) => {

  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: 'No authentication token found' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const blacklisted = await redisClient.get(decoded.jti);
    if (blacklisted) return res.status(401).json({ message: 'Token is blacklisted' });
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
