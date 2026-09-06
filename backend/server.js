const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo:27017/visitordb';

// CORS allow karo taake frontend (alag container, alag machine) request bhej sake
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  next();
});

// MongoDB se connect
mongoose.connect(MONGO_URL)
  .then(() => console.log('[OK] MongoDB connected'))
  .catch(err => console.error('[FAIL] MongoDB connection error:', err.message));

// Simple schema - ek document mein counter store hoga
const counterSchema = new mongoose.Schema({ count: Number });
const Counter = mongoose.model('Counter', counterSchema);

// Health check - Part 8 wale lab_monitor.sh jaisa concept, sirf API version
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'backend', db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// Main endpoint - har hit pe counter +1
app.get('/api/visits', async (req, res) => {
  try {
    let counter = await Counter.findOne();
    if (!counter) {
      counter = new Counter({ count: 0 });
    }
    counter.count += 1;
    await counter.save();
    res.json({ visits: counter.count });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[OK] Backend running on port ${PORT}`);
});
