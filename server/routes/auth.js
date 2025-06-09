const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const { name, address, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const isAdmin = (email === 'neethukshine@gmail.com');
    const user = new User({ name, address, email, password: hashed, isAdmin });
    await user.save();
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    res.json({ user });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Get All Users (Admin only)
router.get('/users', async (req, res) => {
  const { email,isAdmin } = req.query;
  if (email === 'neethukshine@gmail.com' && isAdmin === 'true') {
    const users = await User.find();
    res.json(users);
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
});

// Update user details
router.put('/update', async (req, res) => {
  const { email, name, address } = req.body;
  const updatedUser = await User.findOneAndUpdate(
    { email },
    { name, address },
    { new: true }
  );
  res.json(updatedUser);
});

module.exports = router;
