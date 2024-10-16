const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  requesterName: { type: String, required: true },
  relation: { type: String, required: true },
  bloodType: { type: String, required: true },
  urgency: { type: String, required: true },
  location: { type: String, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.models.BloodRequest || mongoose.model('BloodRequest', bloodRequestSchema);
