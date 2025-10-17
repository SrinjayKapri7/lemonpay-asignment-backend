const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = {};
    error.statusCode = 400;
    const errMessages = errors.array().map(err => err.msg);
    return res.status(error.statusCode).json({ messages: errMessages });
  }
  next();
};

module.exports = validate;
