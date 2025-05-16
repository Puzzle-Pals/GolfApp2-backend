const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  handicap: { type: Number, default: 0 },
  stats: {
    wins: { type: Number, default: 0 },
    birdies: { type: Number, default: 0 },
    closestToPin: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 }
  }
});

module.exports = mongoose.model('Player', playerSchema);