const User = require('../models/Users.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');

exports.predictNationality = async (name) => {
  try {
    const response = await axios.get(`https://api.nationalize.io?name=${name}`);
    return response.data; // Return the nationality prediction data
  } catch (error) {
    throw new Error('Failed to fetch nationality prediction');
  }
};

exports.createUser = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  return user;
};

exports.getUserById = async (userId) => {
  const user =  await User.findById(userId).select('-password');

  return user;
};