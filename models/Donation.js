const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donation_id: { type: String, required: true, unique: true },
  razorpay_order_id: { type: String, required: true },
  razorpay_payment_id: { type: String, default: null },
  user_id: { type: String, required: true },
  donor_name: { type: String, default: 'Anonymous Donor' },
  donor_phone: { type: String, default: '' },
  donor_email: { type: String, default: '' },
  pan_number: { type: String, default: '' },
  is_anonymous: { type: Boolean, default: false },
  seva_id: { type: String, required: true },
  seva_title: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' },
  receipt_number: { type: String, default: null },
  receipt_url: { type: String, default: null },
  created_at: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
