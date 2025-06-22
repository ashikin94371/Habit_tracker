const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const habitRoutes = require('./routes/habits');
app.use('/api', authRoutes);
app.use('/api', habitRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('🚀 Habit Tracker API is running');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});