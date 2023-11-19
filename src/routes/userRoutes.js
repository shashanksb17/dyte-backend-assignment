const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
require("dotenv").config()

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role });
    await user.save();
    res.status(201).send({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Authentication failed. Password incorrect.' });
    }
    const token = jwt.sign({ sub: user.id, username: user.username, role: user.role },process.env.SECRET, { expiresIn: '1h' });

    res.json({ message: 'Authentication successful', token });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
