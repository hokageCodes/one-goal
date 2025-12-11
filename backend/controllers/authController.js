const crypto = require('crypto');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');
const verificationEmail = require('../templates/verificationEmail');
const resetPasswordEmail = require('../templates/resetPasswordEmail');
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

  // Create user
  const user = await User.create({
    email: email.toLowerCase(),
    password,
    name: `${firstName} ${lastName}`.trim(),
    firstName,
    lastName,
  });

  // Generate verification token
  const verificationToken = user.generateVerificationToken();
  await user.save();

  // Create verification URL
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

  // Send verification email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Verify Your Email - One Goal',
      html: verificationEmail(verificationUrl, firstName),
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful. Check your email to verify your account.',
    });
  } catch (error) {
    // If email fails, delete the user
    await User.findByIdAndDelete(user._id);
    console.error('Email send error:', error);
    return res.status(500).json({ message: 'Error sending verification email. Please try again.' });
  }
});

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
exports.verifyEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  // Hash token
  const verificationToken = crypto.createHash('sha256').update(token).digest('hex');

  // Find user with valid token
  const user = await User.findOne({
    verificationToken,
    verificationTokenExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired verification token' });
  }

  // Update user
  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpire = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Email verified successfully. You can now log in.',
  });
});

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

  // Check if email is verified
  if (!user.isVerified) {
    console.log('Email not verified');
    return res.status(401).json({ message: 'Please verify your email before logging in' });
  }

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

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
});

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

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    // Don't reveal if user exists
    return res.status(200).json({
      success: true,
      message: 'If an account exists with that email, you will receive a password reset link.',
    });
  }

  // Generate reset token
  const resetToken = user.generateResetToken();
  await user.save();

  // Create reset URL
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  // Send email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request - One Goal',
      html: resetPasswordEmail(resetUrl, user.firstName),
    });

    res.status(200).json({
      success: true,
      message: 'If an account exists with that email, you will receive a password reset link.',
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    console.error('Email send error:', error);
    return res.status(500).json({ message: 'Error sending email. Please try again.' });
  }
});

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Validate input
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { token } = req.params;
  const { password } = req.body;

  // Hash token
  const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

  // Find user with valid token
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired reset token' });
  }

  // Set new password
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  // Generate new auth token
  const authToken = user.generateAuthToken();

  // Set cookie
  res.cookie('token', authToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    success: true,
    message: 'Password reset successful',
    token: authToken,
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  });
});
