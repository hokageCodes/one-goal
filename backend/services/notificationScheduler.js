const cron = require('node-cron');
const User = require('../models/User');
const Goal = require('../models/Goal');
const CheckIn = require('../models/CheckIn');
const sendEmail = require('../utils/sendEmail');
const emailTemplates = require('../utils/emailTemplates');

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

// Send daily check-in reminders (runs at 8 PM daily)
const sendCheckInReminders = async () => {
  try {
    console.log('Running check-in reminder job...');

    // Get all users with active goals
    const activeGoalUsers = await Goal.find({ status: 'active' }).distinct('user');
    const users = await User.find({ _id: { $in: activeGoalUsers } });

    for (const user of users) {
      const hasCheckedIn = await hasCheckedInToday(user._id);

      if (!hasCheckedIn) {
        const template = emailTemplates.checkInReminder(user);
        await sendEmail({
          to: user.email,
          subject: template.subject,
          html: template.html,
        });
        console.log(`Sent check-in reminder to ${user.email}`);
      }
    }

    console.log('Check-in reminder job completed');
  } catch (error) {
    console.error('Check-in reminder job error:', error);
  }
};

// Check for streak milestones (runs daily at 11 PM)
const checkStreakMilestones = async () => {
  try {
    console.log('Running streak milestone job...');

    const activeGoalUsers = await Goal.find({ status: 'active' }).distinct('user');
    const users = await User.find({ _id: { $in: activeGoalUsers } });

    const milestones = [3, 7, 14, 30, 60, 100];

    for (const user of users) {
      const streak = await getUserStreak(user._id);

      if (milestones.includes(streak)) {
        const template = emailTemplates.streakMilestone(user, streak);
        await sendEmail({
          to: user.email,
          subject: template.subject,
          html: template.html,
        });
        console.log(`Sent ${streak}-day milestone to ${user.email}`);
      }
    }

    console.log('Streak milestone job completed');
  } catch (error) {
    console.error('Streak milestone job error:', error);
  }
};

// Send deadline warnings (runs daily at 9 AM)
const sendDeadlineWarnings = async () => {
  try {
    console.log('Running deadline warning job...');

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    // Find goals with deadlines in 1, 3, or 7 days
    const goals = await Goal.find({ status: 'active' }).populate('user');

    for (const goal of goals) {
      const deadline = new Date(goal.deadline);
      deadline.setUTCHours(0, 0, 0, 0);

      const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));

      if ([1, 3, 7].includes(daysLeft)) {
        const template = emailTemplates.deadlineWarning(goal.user, goal, daysLeft);
        await sendEmail({
          to: goal.user.email,
          subject: template.subject,
          html: template.html,
        });
        console.log(`Sent ${daysLeft}-day warning to ${goal.user.email} for goal: ${goal.title}`);
      }
    }

    console.log('Deadline warning job completed');
  } catch (error) {
    console.error('Deadline warning job error:', error);
  }
};

// Initialize cron jobs
const initializeScheduler = () => {
  // Daily check-in reminder at 8 PM (20:00)
  cron.schedule('0 20 * * *', sendCheckInReminders, {
    timezone: 'UTC',
  });

  // Streak milestone check at 11 PM (23:00)
  cron.schedule('0 23 * * *', checkStreakMilestones, {
    timezone: 'UTC',
  });

  // Deadline warnings at 9 AM (09:00)
  cron.schedule('0 9 * * *', sendDeadlineWarnings, {
    timezone: 'UTC',
  });

  console.log('Notification scheduler initialized');
};

// Manual trigger functions (for testing)
const triggerCheckInReminder = sendCheckInReminders;
const triggerStreakCheck = checkStreakMilestones;
const triggerDeadlineCheck = sendDeadlineWarnings;

module.exports = {
  initializeScheduler,
  triggerCheckInReminder,
  triggerStreakCheck,
  triggerDeadlineCheck,
  emailTemplates,
};
