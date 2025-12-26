const { validationResult } = require('express-validator');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');

// Google OAuth removed

  // Generate JWT token (our own backend token)
  const token = user.generateAuthToken();

  // Set cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      authProvider: user.authProvider,
      isVerified: user.isVerified
    },
    isNewUser: !user.lastLogin || user.lastLogin === user.createdAt
  });
});
