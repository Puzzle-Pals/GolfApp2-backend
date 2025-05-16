const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

router.get('/', async (req, res) => {
  try {
    const results = await Result.find();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;