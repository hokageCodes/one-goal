const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  createGoal,
  getGoals,
  getActiveGoal,
  getGoal,
  updateGoal,
  completeGoal,
  archiveGoal,
  deleteGoal,
} = require('../controllers/goalController');
const { protect, requireVerified } = require('../middleware/auth');

// Validation rules
const goalValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Goal title is required')
    .isLength({ max: 100 })
    .withMessage('Goal title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('deadline')
    .notEmpty()
    .withMessage('Deadline is required')
    .isISO8601()
    .withMessage('Deadline must be a valid date'),
];


// Allow unauthenticated OPTIONS requests for CORS preflight
router.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// All routes require authentication
router.use(protect);
router.use(requireVerified);

// Goal routes
router.post('/', goalValidation, createGoal);
router.get('/', getGoals);
router.get('/active', getActiveGoal);
router.get('/:id', getGoal);
router.put('/:id', updateGoal);
router.put('/:id/complete', completeGoal);
router.put('/:id/archive', archiveGoal);
router.delete('/:id', deleteGoal);

module.exports = router;
