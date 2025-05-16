const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  team: { player1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }, player2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' } },
  scores: [{ hole: Number, score: Number }],
  totalScore: { type: Number, required: true },
  birdies: [{ hole: Number }],
  closestToPin: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
});

module.exports = mongoose.model('Score', scoreSchema);