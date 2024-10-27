const jwt = require('jsonwebtoken');
const { predictNationality, getUserById } = require('../services/users.service.js');

exports.currentUser = (req, res) => {
  res.json(req.user);  
};

exports.getUser = async (req, res) => {

  const { id } = req.params

  try {
    const user = await getUserById(id);

    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
