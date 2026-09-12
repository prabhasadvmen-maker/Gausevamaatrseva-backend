const crypto = require('crypto');
const {
  RAZORPAY_KEY_ID,
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
  handleRazorpayWebhook
};
