const mongoose = require('mongoose');

const prizeSchema = new mongoose.Schema({
  week: { type: Number, required: true },
  prizePool: { type: Number, required: true },
  distributions: [{
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    winners: [{ type: String }]
  }],
  deucePotRollover: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prize', prizeSchema);