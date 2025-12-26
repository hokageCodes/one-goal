const cron = require('node-cron');
const User = require('../models/User');
const Goal = require('../models/Goal');
const CheckIn = require('../models/CheckIn');
// Email notification dependencies removed

// Check if user checked in today
const hasCheckedInToday = async (userId) => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const checkIn = await CheckIn.findOne({
    user: userId,
    date: today,
  });

  return !!checkIn;
};

// Get user's current streak
const getUserStreak = async (userId) => {
  const activeGoal = await Goal.findOne({ user: userId, status: 'active' });
  if (!activeGoal) return 0;

  const checkIns = await CheckIn.find({ goal: activeGoal._id })
    .sort({ date: -1 })
    .select('date');

  if (checkIns.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const lastCheckIn = new Date(checkIns[0].date);
  lastCheckIn.setUTCHours(0, 0, 0, 0);

  const daysSinceLastCheckIn = Math.floor((today - lastCheckIn) / (1000 * 60 * 60 * 24));

  if (daysSinceLastCheckIn > 1) return 0;

  let expectedDate = new Date(lastCheckIn);

  for (const checkIn of checkIns) {
    const checkInDate = new Date(checkIn.date);
    checkInDate.setUTCHours(0, 0, 0, 0);

    if (checkInDate.getTime() === expectedDate.getTime()) {
      streak++;
      expectedDate.setDate(expectedDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

// All notification jobs and exports removed
