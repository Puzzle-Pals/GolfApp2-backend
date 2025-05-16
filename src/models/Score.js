const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  week: { type: Number, required: true },
  winners: [{ type: String, required: true }],
  secondPlace: [{ type: String, required: true }],
  highestScore: [{ type: String, required: true }],
  closestToPin: { type: String, required: true },
  deucePot: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', scoreSchema);