const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  course: { type: String, required: true },
  teams: [{ player1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }, player2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' } }],
  closestToPinHole: { type: Number, required: true }
});

module.exports = mongoose.model('Event', eventSchema);