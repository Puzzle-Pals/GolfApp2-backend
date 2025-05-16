const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

router.get('/', async (req, res) => {
  const scores = await Score.find().populate('event team.player1 team.player2 closestToPin');
  res.json(scores);
});

router.post('/', async (req, res) => {
  const score = new Score(req.body);
  await score.save();
  res.json(score);
});

module.exports = router;