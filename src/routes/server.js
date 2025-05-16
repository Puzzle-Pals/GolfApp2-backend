const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Configure CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://golfapp2-frontend.vercel.app'
];
app.use(cors({
  origin: function (origin, callback) {
    console.log('CORS request from:', origin); // Debug log
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} from ${req.get('origin')}`);
  next();
});

app.use('/api/events', require('./events'));
app.use('/api/players', require('./players'));
app.use('/api/prizes', require('./prizes'));
app.use('/api/results', require('./results'));
app.use('/api/scores', require('./scores'));

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  .on('error', (err) => {
    console.error('Server startup error:', err);
    process.exit(1);
  });