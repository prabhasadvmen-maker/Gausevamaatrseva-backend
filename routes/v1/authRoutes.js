const express = require('express');
const router = express.Router();
const authController = require('../../controllers/v1/authController');

// API-01: Send Mobile OTP
router.post('/send-otp', authController.sendOtp);

// API-02: Verify OTP & Login
router.post('/verify-otp', authController.verifyOtp);

// API-03: Resend OTP
router.post('/resend-otp', authController.resendOtp);

module.exports = router;
