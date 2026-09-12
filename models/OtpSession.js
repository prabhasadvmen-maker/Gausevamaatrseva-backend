const mongoose = require('mongoose');

const otpSessionSchema = new mongoose.Schema({
  session_id: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  otp: { type: String, required: true },
  expires_at: { type: Date, required: true },
  resend_count: { type: Number, default: 0 },
  last_sent_at: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('OtpSession', otpSessionSchema);
