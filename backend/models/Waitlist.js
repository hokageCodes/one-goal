const mongoose = require('mongoose');

const WaitlistSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Waitlist', WaitlistSchema);