const express = require('express');
const { body } = require('express-validator');
const { googleLogin } = require('../controllers/firebaseAuthController');

const router = express.Router();

// Validation rules
const googleLoginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('uid')
    .notEmpty()
    .withMessage('Firebase UID is required'),
  body('name')
    .optional()
    .trim(),
  body('emailVerified')
    .optional()
    .isBoolean()
];

// Routes
router.post('/google-login', googleLoginValidation, googleLogin);

module.exports = router;
