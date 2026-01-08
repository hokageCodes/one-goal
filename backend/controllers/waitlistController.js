
const Waitlist = require('../models/Waitlist');

async function addToWaitlist(req, res) {
  const { email, name } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required.' });
  }
  if (name && typeof name !== 'string') {
    return res.status(400).json({ error: 'Name must be a string.' });
  }
  try {
    // Check for duplicate
    const existing = await Waitlist.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'Email already on waitlist.' });
    }
    await Waitlist.create({ email, name });
    return res.status(201).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error.' });
  }
}

async function getWaitlist(req, res) {
  try {
    const waitlist = await Waitlist.find().sort({ date: -1 });
    return res.json({ waitlist });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error.' });
  }
}

async function deleteWaitlistEntry(req, res) {
  const { email } = req.params;
  if (!email) return res.status(400).json({ error: 'Email required.' });
  try {
    const result = await Waitlist.deleteOne({ email });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Entry not found.' });
    }
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Server error.' });
  }
}

module.exports = { addToWaitlist, getWaitlist, deleteWaitlistEntry };
