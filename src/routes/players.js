const express = require('express');
const Player = require('../models/Player');
const router = express.Router();

// POST: Create or update multiple players
router.post('/', async (req, res) => {
  const players = req.body.players;
  const operations = players.map(player =>
    Player.findOneAndUpdate({ name: player.name }, player, { upsert: true, new: true })
  );

  try {
    const updatedPlayers = await Promise.all(operations);
    res.status(200).json(updatedPlayers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save players' });
  }
});

// GET: All players with stats
router.get('/', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch players' });
  }
});

module.exports = router;
