const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/golf-league');

app.use('/api/players', require('./routes/players'));
app.use('/api/results', require('./routes/results'));

// Additional endpoints: events, scores, etc.

app.listen(5000, () => console.log('Server running on port 5000'));
