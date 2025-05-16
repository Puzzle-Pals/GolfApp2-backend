const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: String,
  handicap: Number,
  stats: {
    averageScore: { type: Number, default: 0 },
    birdies: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    secondPlace: { type: Number, default: 0 },
    highestScore: { type: Number, default: 0 },
    deucePot: { type: Number, default: 0 },
    closestToPin: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Player', playerSchema);
