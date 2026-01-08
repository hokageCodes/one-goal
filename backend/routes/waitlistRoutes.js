const express = require('express');
const router = express.Router();
const { addToWaitlist, getWaitlist, deleteWaitlistEntry } = require('../controllers/waitlistController');


// POST /api/waitlist
router.post('/', addToWaitlist);

// GET /api/waitlist
router.get('/', getWaitlist);


// DELETE /api/waitlist/:email
router.delete('/:email', deleteWaitlistEntry);

module.exports = router;
