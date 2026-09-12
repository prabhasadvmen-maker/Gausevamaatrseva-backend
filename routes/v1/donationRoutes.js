const express = require('express');
const router = express.Router();
const donationController = require('../../controllers/v1/donationController');
const { authenticateV1Token, optionalV1Token } = require('../../middleware/v1AuthMiddleware');

// API-08: Create Razorpay Donation Order
router.post('/create-order', optionalV1Token, donationController.createOrder);

// API-09: Verify Razorpay Payment Signature
router.post('/verify-payment', optionalV1Token, donationController.verifyPayment);

// API-13: Get User Donation History
router.get('/history', authenticateV1Token, donationController.getDonationHistory);

module.exports = router;
