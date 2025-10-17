const express = require('express');

const { authMiddleware } = require('../middlewares/authMiddleware');

const { profile } = require('../controllers/userController');

const router = express.Router();

router.use(authMiddleware);


router.get('/profile', profile);


module.exports = router;