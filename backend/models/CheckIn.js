const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  progress: {
    type: Number,
    required: [true, 'Progress percentage is required'],
    min: 0,
    max: 100,
  },
  note: {
    type: String,
    trim: true,
    maxlength: [500, 'Note cannot exceed 500 characters'],
  },
  mood: {
    type: String,
    enum: ['great', 'good', 'okay', 'struggling'],
  },
}, {
  timestamps: true,
});

// Indexes
checkInSchema.index({ user: 1, date: -1 });
checkInSchema.index({ goal: 1, date: -1 });
checkInSchema.index({ user: 1, goal: 1, date: -1 });

// Ensure one check-in per day per goal
checkInSchema.index({ goal: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('CheckIn', checkInSchema);
