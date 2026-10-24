const crypto = require('crypto');
const axios = require('axios');
const {
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET,
  MERCHANT_NAME,
  MERCHANT_LOGO,
  ENVIRONMENT
} = require('../../config/env');
const { donations } = require('../../data/store');

/**
 * API-07: Get Razorpay Gateway Configuration
 * GET /api/v1/payments/config
 * Auth: Public
 */
const getPaymentConfig = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: {
        gateway: 'razorpay',
        key_id: RAZORPAY_KEY_ID,
        merchant_name: MERCHANT_NAME,
        merchant_logo: MERCHANT_LOGO,
        theme: {
          color: '#e65100'
        },
        logo_url: MERCHANT_LOGO,
        environment: ENVIRONMENT,
        gateway_active: true
      }
    });
  } catch (error) {
    console.error('Error in getPaymentConfig:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while fetching payment gateway configuration',
      error_code: 'INTERNAL_SERVER_ERROR'
    });
  }
};

/**
 * API-08: Create Razorpay Order
 * POST /api/v1/payments/create-order
 * Auth: Public
 */
const createOrder = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt, description } = req.body;

    if (!amount || amount < 10) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount. Minimum donation is ₹10',
        error_code: 'BAD_REQUEST'
      });
    }

    // Create real Razorpay order via API
    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64');
    
    const orderData = {
      amount: amount * 100, // Convert to paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      description: description || 'Gouseva Maatra Seva Donation'
    };

    const response = await axios.post('https://api.razorpay.com/v1/orders', orderData, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });

    if (response.data && response.data.id) {
      console.log(`[Razorpay] Order created: ${response.data.id}`);
      return res.status(200).json({
        success: true,
        message: 'Order created successfully',
        order: {
          id: response.data.id,
          amount: response.data.amount,
          currency: response.data.currency,
          receipt: response.data.receipt,
          status: response.data.status
        }
      });
    } else {
      throw new Error('Invalid Razorpay response');
    }
  } catch (error) {
    console.error('Error in createOrder:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error_code: 'ORDER_CREATION_FAILED',
      details: error.response?.data?.error?.description || error.message
    });
  }
};

/**
 * API-09: Verify Payment Signature
 * POST /api/v1/payments/verify-payment
 * Auth: Public
 */
const verifyPayment = (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification details',
        error_code: 'BAD_REQUEST'
      });
    }

    // Verify signature
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      console.log(`[Razorpay] Payment verified: ${razorpay_payment_id}`);
      return res.status(200).json({
        success: true,
        message: 'Payment verified successfully',
        payment: {
          order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
          verified: true
        }
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed - Invalid signature',
        error_code: 'INVALID_SIGNATURE'
      });
    }
  } catch (error) {
    console.error('Error in verifyPayment:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while verifying payment',
      error_code: 'INTERNAL_SERVER_ERROR'
    });
  }
};

/**
 * API-10: Razorpay Webhook Handler
 * POST /api/v1/payments/razorpay-webhook
 * Auth: Razorpay Webhook Signature Header
 */
const handleRazorpayWebhook = (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const payload = JSON.stringify(req.body);

    if (RAZORPAY_WEBHOOK_SECRET && RAZORPAY_WEBHOOK_SECRET !== 'gouseva_webhook_secret_2026') {
      const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_WEBHOOK_SECRET)
        .update(payload)
        .digest('hex');

      if (signature !== expectedSignature) {
        return res.status(401).json({
          success: false,
          message: 'Invalid webhook signature',
          error_code: 'UNAUTHORIZED'
        });
      }
    }

    const { event, payload: eventPayload } = req.body;

    console.log(`[Razorpay Webhook Event Received]: ${event}`);

    if (event === 'payment.captured' || event === 'order.paid') {
      const paymentEntity = eventPayload?.payment?.entity || eventPayload?.order?.entity;
      if (paymentEntity) {
        const orderId = paymentEntity.order_id || paymentEntity.id;
        const paymentId = paymentEntity.id;

        const donation = donations.find(d => d.razorpay_order_id === orderId);
        if (donation) {
          donation.status = 'COMPLETED';
          donation.razorpay_payment_id = paymentId;
          console.log(`[Razorpay Webhook]: Updated Donation ${donation.donation_id} to COMPLETED`);
        }
      }
    }

    return res.status(200).json({ status: 'ok' });
  } catch (error) {
    console.error('Error handling Razorpay webhook:', error);
    return res.status(500).json({
      success: false,
      message: 'Webhook processing error',
      error_code: 'INTERNAL_SERVER_ERROR'
    });
  }
};

module.exports = {
  getPaymentConfig,
  createOrder,
  verifyPayment,
  handleRazorpayWebhook
};
