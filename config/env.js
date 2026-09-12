require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/gousevamaatraseva',
  JWT_SECRET: process.env.JWT_SECRET || 'gouseva_maatra_seva_secret_key_2026',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'superadmin@gousevamaatraseva.com',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'admin123',
  
  // APITxT SMS API
  APITXT_API_KEY: process.env.APITXT_API_KEY || '2pE7HEjDwTcfnlnxzKEgvyghQS5DM0sq-STsmDKc_tA',

  // Razorpay Gateway
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || 'rzp_test_Gouseva2026Key',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || 'gouseva_razorpay_secret_2026',
  RAZORPAY_WEBHOOK_SECRET: process.env.RAZORPAY_WEBHOOK_SECRET || process.env.WEBHOOK_SECRET || 'gouseva_webhook_secret_2026',
  MERCHANT_NAME: process.env.MERCHANT_NAME || 'Gouseva Maatra Seva',
  MERCHANT_LOGO: process.env.MERCHANT_LOGO || 'https://gousevamaatraseva.com/logo.png',
  ENVIRONMENT: process.env.ENVIRONMENT || 'test'
};
