const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true, default: 'site_settings' },
  trustName: { type: String, default: "Gouseva Maatra Seva" },
  domain: { type: String, default: "GousevaMaatraSeva.com" },
  subTitle: { type: String, default: "Cow Welfare & Protection Trust" },
  slogan: { type: String, default: "Cow Protection • Compassion • Sanctuary" },
  phone: { type: String, default: "+91 98765 43210" },
  whatsapp: { type: String, default: "+919876543210" },
  email: { type: String, default: "info@gousevamaatraseva.com" },
  address: { type: String, default: "Orchid Center, 3rd Floor, Golf Course Road, SEC-53, Gurugram, HR - 122002, IND" },
  upiId: { type: String, default: "gousevamaatraseva@upi" },
  bankName: { type: String, default: "State Bank of India (SBI)" },
  accountNumber: { type: String, default: "38920100984712" },
  ifsc: { type: String, default: "SBIN0004521" },
  dailyTargetFeedKg: { type: Number, default: 5000 },
  emergencyAlertsEnabled: { type: Boolean, default: true },
  autoReceiptsEnabled: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);
