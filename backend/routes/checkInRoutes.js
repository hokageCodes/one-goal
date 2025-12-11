const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const {
  createCheckIn,
  getCheckIns,
  getTodayCheckIn,
  getStreak,
  getStats,
} = require('../controllers/checkInController');

// Validation middleware
const checkInValidation = [
  body('goalId').notEmpty().withMessage('Goal ID is required'),
  body('progress')
    .notEmpty().withMessage('Progress is required')
    .isInt({ min: 0, max: 100 }).withMessage('Progress must be between 0 and 100'),
  body('note').optional().isLength({ max: 500 }).withMessage('Note cannot exceed 500 characters'),
  body('mood').optional().isIn(['great', 'good', 'okay', 'struggling']).withMessage('Invalid mood value'),
];

// All routes require authentication
router.use(protect);

// POST /api/checkins - Create or update today's check-in
router.post('/', checkInValidation, createCheckIn);

// GET /api/checkins/today - Get today's check-in
router.get('/today', getTodayCheckIn);

// GET /api/checkins/streak - Get current streak
router.get('/streak', getStreak);

// GET /api/checkins/stats - Get statistics
router.get('/stats', getStats);

// GET /api/checkins/:goalId - Get check-ins for a goal
router.get('/:goalId', getCheckIns);

module.exports = router;
