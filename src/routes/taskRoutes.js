const express = require('express');
const { body } = require('express-validator');
const { authMiddleware } = require('../middlewares/authMiddleware');
const  validate  = require('../middlewares/validateMiddleware');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
  
} = require('../controllers/taskController');


const router = express.Router();

router.use(authMiddleware);

router.get('/', getTasks);

router.post(
  '/',
  [
    body('taskName').notEmpty().withMessage('Task name is required'),
    body('dueDate').isISO8601().withMessage('Valid due date is required')
  ],
  validate,
  createTask
);

router.put(
  '/:id',
  [
    body('taskName').notEmpty().withMessage('Task name is required'),
    body('dueDate').isISO8601().withMessage('Valid due date is required')
  ],
  validate,
  updateTask
);

router.delete('/:id', deleteTask);

 




module.exports = router;
