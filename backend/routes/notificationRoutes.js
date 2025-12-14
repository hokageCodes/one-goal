const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  triggerCheckInReminder,
  triggerStreakCheck,
  triggerDeadlineCheck,
} = require('../services/notificationScheduler');

// All routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

// POST /api/notifications/test/check-in - Trigger check-in reminders
router.post('/test/check-in', async (req, res) => {
  try {
    await triggerCheckInReminder();
    res.status(200).json({ message: 'Check-in reminders sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/notifications/test/streak - Trigger streak milestone check
router.post('/test/streak', async (req, res) => {
  try {
    await triggerStreakCheck();
    res.status(200).json({ message: 'Streak milestone check completed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/notifications/test/deadline - Trigger deadline warnings
router.post('/test/deadline', async (req, res) => {
  try {
    await triggerDeadlineCheck();
    res.status(200).json({ message: 'Deadline warnings sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
