const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  handicap: { type: Number, default: 0 },
  email: { type: String, required: true, unique: true },
  wins: { type: Number, default: 0 },
  secondPlace: { type: Number, default: 0 },
  highestScore: { type: Number, default: 0 },
  deucePotWins: { type: Number, default: 0 },
  closestToPin: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Player', playerSchema);