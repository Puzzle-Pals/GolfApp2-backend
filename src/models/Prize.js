const mongoose = require('mongoose');

const prizeSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  firstPlace: { team: { player1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }, player2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' } }, amount: Number },
  secondPlace: { team: { player1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }, player2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' } }, amount: Number },
  highScore: { team: { player1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }, player2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' } }, amount: Number },
  deucePot: [{ team: { player1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }, player2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' } }, amount: Number }],
  closestToPin: { player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }, amount: Number }
});

module.exports = mongoose.model('Prize', prizeSchema);