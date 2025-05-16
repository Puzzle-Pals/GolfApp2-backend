const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  week: { type: Number, required: true },
  data: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);