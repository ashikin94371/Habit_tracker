const express = require('express');
const Habit = require('../models/Habit');
const router = express.Router();

// POST /api/habits - Create habit
router.post('/habits', async (req, res) => {
  try {
    const { userId, name } = req.body;
    const habit = new Habit({ userId, name });
    await habit.save();
    res.status(201).json({ message: 'Habit created', habit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/habits/:userId - Get user's habits
router.get('/habits/:userId', async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.params.userId });
    res.status(200).json(habits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
