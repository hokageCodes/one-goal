const getClientUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.CLIENT_URL_PROD || 'https://one-goal-ten.vercel.app';
  }
  return process.env.CLIENT_URL || 'http://localhost:3000';
};

const CLIENT_URL = getClientUrl();

const emailTemplates = {
  checkInReminder: (user) => ({
    subject: '⏰ Daily Check-In Reminder - One Goal',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #000; margin-bottom: 20px;">Don't Break Your Streak! 🔥</h1>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Hi ${user.name},
        </p>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          You haven't checked in today yet. Take 2 minutes to log your progress and keep your momentum going!
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${CLIENT_URL}/dashboard/progress" 
             style="background-color: #000; color: #fff; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Check In Now
          </a>
        </div>
        <p style="font-size: 14px; color: #666; margin-top: 30px;">
          Keep focused on what matters,<br/>
          The One Goal Team
        </p>
      </div>
    `,
  }),

  streakMilestone: (user, streak) => ({
    subject: `🎉 ${streak} Day Streak Achieved! - One Goal`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #000; margin-bottom: 20px;">Incredible Achievement! 🎉</h1>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Hi ${user.name},
        </p>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Congratulations! You've reached a <strong>${streak}-day check-in streak</strong>! 🔥
        </p>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Your consistency is paying off. Keep up the amazing work!
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${CLIENT_URL}/dashboard" 
             style="background-color: #000; color: #fff; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            View Dashboard
          </a>
        </div>
        <p style="font-size: 14px; color: #666; margin-top: 30px;">
          Stay focused,<br/>
          The One Goal Team
        </p>
      </div>
    `,
  }),

  deadlineWarning: (user, goal, daysLeft) => ({
    subject: `⏳ ${daysLeft} Days Until Deadline - One Goal`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #000; margin-bottom: 20px;">Deadline Approaching ⏳</h1>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Hi ${user.name},
        </p>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Your goal "<strong>${goal.title}</strong>" is due in <strong>${daysLeft} day${daysLeft > 1 ? 's' : ''}</strong>.
        </p>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Current progress: <strong>${goal.progress}%</strong>
        </p>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Time to push forward and make it happen! 💪
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${CLIENT_URL}/dashboard/goal" 
             style="background-color: #000; color: #fff; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            View Goal
          </a>
        </div>
        <p style="font-size: 14px; color: #666; margin-top: 30px;">
          You've got this,<br/>
          The One Goal Team
        </p>
      </div>
    `,
  }),

  goalCompleted: (user, goal) => ({
    subject: '🎉 Goal Completed! Celebrate Your Win! - One Goal',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #000; margin-bottom: 20px;">You Did It! 🎉🎊</h1>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Hi ${user.name},
        </p>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Congratulations on completing your goal: "<strong>${goal.title}</strong>"!
        </p>
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          This is a huge achievement. Take a moment to celebrate, then get ready to set your next big goal! 🚀
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${CLIENT_URL}/dashboard/goal" 
             style="background-color: #000; color: #fff; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Set New Goal
          </a>
        </div>
        <p style="font-size: 14px; color: #666; margin-top: 30px;">
          Keep achieving greatness,<br/>
          The One Goal Team
        </p>
      </div>
    `,
  }),
};

module.exports = emailTemplates;
