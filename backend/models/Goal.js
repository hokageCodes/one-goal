const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Goal title is required'],
    trim: true,
    maxlength: [100, 'Goal title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  deadline: {
    type: Date,
    required: [true, 'Goal deadline is required'],
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'archived'],
    default: 'active',
  },
  completedAt: Date,
  archivedAt: Date,
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
}, {
  timestamps: true,
});

// Indexes
goalSchema.index({ user: 1, status: 1 });
goalSchema.index({ user: 1, createdAt: -1 });

// Virtual: days remaining
goalSchema.virtual('daysRemaining').get(function() {
  if (!this.deadline) return null;
  const now = new Date();
  const diff = new Date(this.deadline) - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
});

// Middleware: Enforce single active goal per user
goalSchema.pre('save', async function() {
  if (this.isNew && this.status === 'active') {
    const existingGoal = await mongoose.model('Goal').findOne({
      user: this.user,
      status: 'active',
      _id: { $ne: this._id }
    });

    if (existingGoal) {
      const error = new Error(
        'You can only have one active goal at a time. Please complete or archive your current goal first.'
      );
      throw error;
    }
  }

  // Auto-set completion/archive timestamps
  if (this.isModified('status')) {
    if (this.status === 'completed' && !this.completedAt) {
      this.completedAt = new Date();
    }
    if (this.status === 'archived' && !this.archivedAt) {
      this.archivedAt = new Date();
    }
  }
});

module.exports = mongoose.model('Goal', goalSchema);
