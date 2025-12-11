const CheckIn = require('../models/CheckIn');
const Goal = require('../models/Goal');

// @desc    Create or update daily check-in
// @route   POST /api/checkins
// @access  Private
exports.createCheckIn = async (req, res) => {
  try {
    const { goalId, progress, note, mood } = req.body;

    // Verify goal exists and belongs to user
    const goal = await Goal.findOne({ _id: goalId, user: req.user.id });
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (goal.status !== 'active') {
      return res.status(400).json({ message: 'Cannot check in on inactive goal' });
    }

    // Get today's date (midnight UTC)
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Check if check-in already exists for today
    let checkIn = await CheckIn.findOne({
      goal: goalId,
      date: today,
    });

    if (checkIn) {
      // Update existing check-in
      checkIn.progress = progress;
      checkIn.note = note || checkIn.note;
      checkIn.mood = mood || checkIn.mood;
      await checkIn.save();
    } else {
      // Create new check-in
      checkIn = await CheckIn.create({
        user: req.user.id,
        goal: goalId,
        date: today,
        progress,
        note,
        mood,
      });
    }

    // Update goal progress to latest check-in value
    goal.progress = progress;
    await goal.save();

    res.status(200).json({
      message: checkIn.isNew ? 'Check-in created' : 'Check-in updated',
      checkIn,
    });
  } catch (error) {
    console.error('Create check-in error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get check-ins for a goal
// @route   GET /api/checkins/:goalId
// @access  Private
exports.getCheckIns = async (req, res) => {
  try {
    const { goalId } = req.params;

    // Verify goal belongs to user
    const goal = await Goal.findOne({ _id: goalId, user: req.user.id });
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    const checkIns = await CheckIn.find({ goal: goalId })
      .sort({ date: -1 })
      .limit(30); // Last 30 check-ins

    res.status(200).json({ checkIns });
  } catch (error) {
    console.error('Get check-ins error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get today's check-in for active goal
// @route   GET /api/checkins/today
// @access  Private
exports.getTodayCheckIn = async (req, res) => {
  try {
    // Get user's active goal
    const goal = await Goal.findOne({ user: req.user.id, status: 'active' });
    if (!goal) {
      return res.status(404).json({ message: 'No active goal found' });
    }

    // Get today's date
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const checkIn = await CheckIn.findOne({
      goal: goal._id,
      date: today,
    });

    res.status(200).json({ checkIn, goal });
  } catch (error) {
    console.error('Get today check-in error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get check-in streak
// @route   GET /api/checkins/streak
// @access  Private
exports.getStreak = async (req, res) => {
  try {
    // Get user's active goal
    const goal = await Goal.findOne({ user: req.user.id, status: 'active' });
    if (!goal) {
      return res.status(200).json({ streak: 0 });
    }

    // Get all check-ins sorted by date descending
    const checkIns = await CheckIn.find({ goal: goal._id })
      .sort({ date: -1 })
      .select('date');

    if (checkIns.length === 0) {
      return res.status(200).json({ streak: 0 });
    }

    let streak = 0;
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Check if user checked in today or yesterday
    const lastCheckIn = new Date(checkIns[0].date);
    lastCheckIn.setUTCHours(0, 0, 0, 0);

    const daysSinceLastCheckIn = Math.floor((today - lastCheckIn) / (1000 * 60 * 60 * 24));

    // If last check-in was more than 1 day ago, streak is broken
    if (daysSinceLastCheckIn > 1) {
      return res.status(200).json({ streak: 0 });
    }

    // Start counting from the most recent check-in
    let expectedDate = new Date(lastCheckIn);

    for (const checkIn of checkIns) {
      const checkInDate = new Date(checkIn.date);
      checkInDate.setUTCHours(0, 0, 0, 0);

      if (checkInDate.getTime() === expectedDate.getTime()) {
        streak++;
        // Move to previous day
        expectedDate.setDate(expectedDate.getDate() - 1);
      } else {
        break; // Streak broken
      }
    }

    res.status(200).json({ streak });
  } catch (error) {
    console.error('Get streak error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get check-in statistics
// @route   GET /api/checkins/stats
// @access  Private
exports.getStats = async (req, res) => {
  try {
    // Get user's active goal
    const goal = await Goal.findOne({ user: req.user.id, status: 'active' });
    if (!goal) {
      return res.status(200).json({
        totalCheckIns: 0,
        avgProgress: 0,
        moodDistribution: {},
      });
    }

    const checkIns = await CheckIn.find({ goal: goal._id });

    // Calculate statistics
    const totalCheckIns = checkIns.length;
    const avgProgress = totalCheckIns > 0
      ? Math.round(checkIns.reduce((sum, c) => sum + c.progress, 0) / totalCheckIns)
      : 0;

    const moodDistribution = checkIns.reduce((acc, c) => {
      if (c.mood) {
        acc[c.mood] = (acc[c.mood] || 0) + 1;
      }
      return acc;
    }, {});

    res.status(200).json({
      totalCheckIns,
      avgProgress,
      moodDistribution,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
