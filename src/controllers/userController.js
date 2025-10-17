const User = require('../models/User');



exports.profile = async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.status(201).json({ id: user._id, email: user.email, createdAt: user.createdAt });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };