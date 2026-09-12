const mongoose = require('mongoose');

const sevaSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  default_amount: { type: Number, required: true },
  preset_amounts: [{ type: Number }],
  duration_label: { type: String, default: 'Per Cow / Per Day' },
  recommended: { type: Boolean, default: false },
  allow_custom_amount: { type: Boolean, default: true },
  image_url: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Seva', sevaSchema);
