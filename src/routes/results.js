const express = require('express');
const Result = require('../models/Result');
const Player = require('../models/Player');
const router = express.Router();

// POST: Submit result
router.post('/', async (req, res) => {
  try {
    const {
      firstPlace, secondPlace, highestScore,
      closestToPin, deucePot, date, course
    } = req.body;

    const getPlayerByName = async (name) => await Player.findOne({ name });

    const teamData = async (players) => ({
      player1: await getPlayerByName(players[0]),
      player2: await getPlayerByName(players[1])
    });

    const result = new Result({
      event: { date, course },
      firstPlace: { team: await teamData(firstPlace), amount: 40 },
      secondPlace: { team: await teamData(secondPlace), amount: 20 },
      highestScore: { team: await teamData(highestScore), amount: 10 },
      closestToPin: {
        player: await getPlayerByName(closestToPin),
        amount: 10
      },
      deucePot: {
        player: await getPlayerByName(deucePot),
        amount: 20
      }
    });

    await result.save();

    // Update player stats
    const updates = [
      ...firstPlace.map(name => Player.updateOne({ name }, { $inc: { 'stats.wins': 1 } })),
      ...secondPlace.map(name => Player.updateOne({ name }, { $inc: { 'stats.secondPlace': 1 } })),
      ...highestScore.map(name => Player.updateOne({ name }, { $inc: { 'stats.highestScore': 1 } })),
      Player.updateOne({ name: closestToPin }, { $inc: { 'stats.closestToPin': 1 } }),
      Player.updateOne({ name: deucePot }, { $inc: { 'stats.deucePot': 1 } })
    ];

    await Promise.all(updates);

    res.status(201).json({ message: 'Result saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save result' });
  }
});

// GET: All results
router.get('/', async (req, res) => {
  try {
    const results = await Result.find()
      .populate('firstPlace.team.player1')
      .populate('firstPlace.team.player2')
      .populate('secondPlace.team.player1')
      .populate('secondPlace.team.player2')
      .populate('highestScore.team.player1')
      .populate('highestScore.team.player2')
      .populate('closestToPin.player')
      .populate('deucePot.player');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

module.exports = router;
