const crypto = require('crypto');
const { validationResult } = require('express-validator');
const User = require('../models/User');
// ...existing code...
const { asyncHandler } = require('../middleware/errorHandler');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, firstName, lastName } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email: email.toLowerCase() });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }


  // Create user (set isVerified: true by default for now)
  const user = await User.create({
    email: email.toLowerCase(),
    password,
    name: `${firstName} ${lastName}`.trim(),
    firstName,
    lastName,
    isVerified: true,
  });

  res.status(201).json({
    success: true,
    message: 'Registration successful. You can now log in.',
  });
});

// Email verification removed

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  console.log('Login attempt for:', email);

  // Check if user exists (include password for comparison)
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user) {
    console.log('User not found');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  console.log('User found:', {
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
    hasPassword: !!user.password
  });

  // Check if password matches
  const isMatch = await user.comparePassword(password);
  console.log('Password match:', isMatch);
  
  if (!isMatch) {
    console.log('Password does not match');
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // ...existing code...

  console.log('About to generate token...');
  
  // Generate token
  const token = user.generateAuthToken();
  console.log('Token generated:', !!token);

  // Set cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  console.log('Sending success response');

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
    },
  });
});

// ...existing code...

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// ...existing code...
