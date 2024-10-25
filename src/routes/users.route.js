const express = require('express');
const router = express.Router();
const { register, login, logout, currentUser, getNationality } = require('../controllers/users.controller.js');
const { auth } = require('../middlewares/auth.middleware.js');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout); 
router.get('/current-user', auth, currentUser); 
router.get('/nationality', auth, getNationality);

module.exports = router;
