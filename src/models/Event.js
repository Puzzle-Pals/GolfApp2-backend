const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  course: { type: String, required: true },
  par3Hole: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);