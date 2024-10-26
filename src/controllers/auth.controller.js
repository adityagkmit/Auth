const jwt = require('jsonwebtoken');
const { registerUser, loginUser } = require('../services/auth.service.js');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { token, user } = await registerUser({ name, email, password });
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser({ email, password });
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.logout = (req, res) => {
  res.json({ message: 'Logged out successfully. Please remove the token from client storage.' });
};