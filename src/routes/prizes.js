const express = require('express');
const router = express.Router();
const Prize = require('../models/Prize');

router.get('/', async (req, res) => {
  const prizes = await Prize.find().populate('event firstPlace.team.player1 firstPlace.team.player2 secondPlace.team.player1 secondPlace.team.player2 highScore.team.player1 highScore.team.player2 deucePot.team.player1 deucePot.team.player2 closestToPin.player');
  res.json(prizes);
});

router.post('/', async (req, res) => {
  const prize = new Prize(req.body);
  await prize.save();
  res.json(prize);
});

module.exports = router;