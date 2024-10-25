const jwt = require('jsonwebtoken');
const User = require('../models/users.model.js');

const jwtSecret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (token) {

    try {

      const decoded = jwt.verify(token, jwtSecret);
      req.user = await User.findById(decoded.id).select('-password');
      next();

    } catch (error) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  } else {
    return res.status(401).json({ message: 'Authorization token missing' });
  }
};

module.exports = { auth };
