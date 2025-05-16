const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  event: {
    date: Date,
    course: String
  },
  firstPlace: {
    team: { player1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }, player2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' } },
    amount: Number
  },
  secondPlace: {
    team: { player1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }, player2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' } },
    amount: Number
  },
  highestScore: {
    team: { player1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }, player2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' } },
    amount: Number
  },
  closestToPin: {
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    amount: Number
  },
  deucePot: {
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
    amount: Number
  }
});

module.exports = mongoose.model('Result', resultSchema);
