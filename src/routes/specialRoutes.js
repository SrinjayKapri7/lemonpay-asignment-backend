const express = require('express');
const { clearCache } = require('../controllers/specialController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/', clearCache);


module.exports = router;