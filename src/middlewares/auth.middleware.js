const jwt = require('jsonwebtoken');
const User = require('../models/Users.js');

const jwtSecret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const token = req.cookies.accessToken || req.headers['authorization']?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = { auth };
