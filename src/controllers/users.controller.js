const jwt = require('jsonwebtoken');
const { registerUser, loginUser, predictNationality } = require('../services/users.service.js');

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

exports.currentUser = (req, res) => {
  res.json(req.user);  
};

exports.logout = (req, res) => {
  res.json({ message: 'Logged out successfully. Please remove the token from client storage.' });
};


exports.getNationality = async (req, res) => {
  const { name } = req.user; 
  if (!name) {
    return res.status(400).json({ message: 'Name is required.' });
  }

  try {
    const nationalityData = await predictNationality(name);
    res.json(nationalityData);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to fetch nationality prediction' });
  }
};
