const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

router.get('/', async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

router.post('/', async (req, res) => {
  const player = new Player(req.body);
  await player.save();
  res.json(player);
});

module.exports = router;