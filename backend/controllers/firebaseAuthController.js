const { validationResult } = require('express-validator');
const User = require('../models/User');
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Google OAuth login (client-side Firebase)
// @route   POST /api/auth/google-login
// @access  Public
exports.googleLogin = asyncHandler(async (req, res, next) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, name, uid, emailVerified } = req.body;

  if (!email || !uid) {
    return res.status(400).json({ message: 'Email and UID are required' });
  }

  // Check if user exists
  let user = await User.findOne({ email: email.toLowerCase() });

  if (user) {
    // User exists - check if they're using the same auth method
    if (user.authProvider !== 'google' && user.firebaseUid !== uid) {
      // User registered with email/password before
      if (user.authProvider === 'email' && !user.firebaseUid) {
        // Link Google to existing email/password account
        user.firebaseUid = uid;
        user.authProvider = 'google';
        user.isVerified = emailVerified !== false;
        await user.save();
      } else {
        return res.status(400).json({ 
          message: 'An account with this email already exists. Please log in with your email and password.' 
        });
      }
    } else {
      // Update last login
      user.lastLogin = Date.now();
      await user.save();
    }
  } else {
    // Create new user from Google OAuth
    const nameParts = name ? name.split(' ') : [email.split('@')[0], ''];
    const firstName = nameParts[0] || 'User';
    const lastName = nameParts.slice(1).join(' ') || '';

    user = await User.create({
      email: email.toLowerCase(),
      name: name || email.split('@')[0],
      firstName,
      lastName,
      authProvider: 'google',
      firebaseUid: uid,
      isVerified: emailVerified !== false,
      lastLogin: Date.now()
    });
  }

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
