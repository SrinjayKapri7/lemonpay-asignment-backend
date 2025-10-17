const express = require('express');
const { body } = require('express-validator');
const { register, login, logout } = require('../controllers/authController');
const  validate = require('../middlewares/validateMiddleware');


const router = express.Router();


router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ],
  validate,
  register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  validate,
  login
);

router.post('/logout', logout);

module.exports = router;
