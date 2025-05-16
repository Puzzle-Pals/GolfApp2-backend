const express = require('express');
const router = express.Router();
const Score = require('../models/Score');
const Player = require('../models/Player');

router.get('/', async (req, res) => {
  try {
    const scores = await Score.find().populate('event');
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { week, winners, secondPlace, highestScore, closestToPin, deucePot, event } = req.body;

    if (!winners || !secondPlace || !highestScore || !closestToPin || !deucePot || !event) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const allPlayers = [...winners, ...secondPlace, ...highestScore, closestToPin, deucePot];
    const playersExist = await Player.find({ name: { $in: allPlayers } });
    if (playersExist.length !== allPlayers.length) {
      return res.status(400).json({ message: 'One or more players not found' });
    }

    const score = new Score({
      week,
      winners,
      secondPlace,
      highestScore,
      closestToPin,
      deucePot,
      event
    });

    await Promise.all([
      Player.updateMany({ name: { $in: winners } }, { $inc: { wins: 1 } }),
      Player.updateMany({ name: { $in: secondPlace } }, { $inc: { secondPlace: 1 } }),
      Player.updateMany({ name: { $in: highestScore } }, { $inc: { highestScore: 1 } }),
      Player.updateOne({ name: closestToPin }, { $inc: { closestToPin: 1 } }),
      Player.updateOne({ name: deucePot }, { $inc: { deucePotWins: 1 } })
    ]);

    const newScore = await score.save();
    res.status(201).json(newScore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;