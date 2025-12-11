const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: function() {
      // Password only required for email/password auth, not OAuth
      return !this.authProvider || this.authProvider === 'email';
    },
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password by default
  },
  authProvider: {
    type: String,
    enum: ['email', 'google'],
    default: 'email'
  },
  firebaseUid: {
    type: String,
    sparse: true, // Allow null but must be unique if present
    unique: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpiry: Date,
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function() {
  // Skip if password not modified or password not present (OAuth users)
  if (!this.isModified('password') || !this.password) {
    return;
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { 
      id: this._id, 
      email: this.email, 
      role: this.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Generate email verification token
userSchema.methods.generateVerificationToken = function() {
  const token = crypto.randomBytes(32).toString('hex');
  this.verificationToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  this.verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  return token;
};

// Generate password reset token
userSchema.methods.generateResetToken = function() {
  const token = crypto.randomBytes(32).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  this.resetPasswordExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
  return token;
};

module.exports = mongoose.model('User', userSchema);