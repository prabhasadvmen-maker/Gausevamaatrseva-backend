const express = require('express');
const router = express.Router();
const paymentController = require('../../controllers/v1/paymentController');

// API-07: Get Razorpay Gateway Configuration
router.get('/config', paymentController.getPaymentConfig);

// API-08: Create Razorpay Order
router.post('/create-order', paymentController.createOrder);

// API-09: Verify Payment Signature
router.post('/verify-payment', paymentController.verifyPayment);

// API-10: Razorpay Payment Webhook
router.post('/razorpay-webhook', paymentController.handleRazorpayWebhook);

module.exports = router;
