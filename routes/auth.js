const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    console.log("📩 Incoming register request:", req.body);
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      console.log("⚠️ Missing email or password");
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    console.log("👀 Existing user:", existingUser);

    if (existingUser) {
      console.log("🚫 User already exists:", email);
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 Hashed password created");

    // Save user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    console.log("✅ User saved to DB:", newUser);

    // Create token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(201).json({ message: 'User registered', token });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;