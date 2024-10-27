const jwt = require('jsonwebtoken');
const authService = require('../services/auth.service.js');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { token, user } = await authService.registerUser({ name, email, password });
    
    // Set token in cookie
    res.cookie('accessToken', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // 1 hour expiry
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.loginUser({ email, password });
    
    // Set token in cookie
    res.cookie('accessToken', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // 1 hour expiry
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.logout = (req, res) => {
  // Clear token from cookies
  res.clearCookie('accessToken');
  res.json({ message: 'Logged out successfully.' });
};
