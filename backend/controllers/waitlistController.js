const fs = require('fs');
const path = require('path');

// Simple file-based storage for demo; replace with DB in production
const WAITLIST_FILE = path.join(__dirname, '../data/waitlist.json');

function addToWaitlist(req, res) {
  const { email, name } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required.' });
  }
  // Name is optional but if present, must be string
  if (name && typeof name !== 'string') {
    return res.status(400).json({ error: 'Name must be a string.' });
  }

  // Read existing waitlist
  let waitlist = [];
  if (fs.existsSync(WAITLIST_FILE)) {
    waitlist = JSON.parse(fs.readFileSync(WAITLIST_FILE, 'utf8'));
  }

  // Prevent duplicate emails
  if (waitlist.some(entry => entry.email === email)) {
    return res.status(409).json({ error: 'Email already on waitlist.' });
  }

  // Add new entry
  waitlist.push({ email, name: name || '', date: new Date().toISOString() });
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify(waitlist, null, 2));

  return res.status(201).json({ success: true });
}

function getWaitlist(req, res) {
  let waitlist = [];
  if (fs.existsSync(WAITLIST_FILE)) {
    waitlist = JSON.parse(fs.readFileSync(WAITLIST_FILE, 'utf8'));
  }
  return res.json({ waitlist });
}

function deleteWaitlistEntry(req, res) {
  const { email } = req.params;
  if (!email) return res.status(400).json({ error: 'Email required.' });
  let waitlist = [];
  if (fs.existsSync(WAITLIST_FILE)) {
    waitlist = JSON.parse(fs.readFileSync(WAITLIST_FILE, 'utf8'));
  }
  const initialLength = waitlist.length;
  waitlist = waitlist.filter(entry => entry.email !== email);
  if (waitlist.length === initialLength) {
    return res.status(404).json({ error: 'Entry not found.' });
  }
  fs.writeFileSync(WAITLIST_FILE, JSON.stringify(waitlist, null, 2));
  return res.json({ success: true });
}

module.exports = { addToWaitlist, getWaitlist, deleteWaitlistEntry };
