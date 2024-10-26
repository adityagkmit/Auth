const express = require('express');
const router = express.Router();
const { currentUser, getNationality, getUser } = require('../controllers/users.controller.js');
const { auth } = require('../middlewares/auth.middleware.js');

router.get('/current', auth, currentUser);
router.get('/nationality', auth, getNationality);
router.get('/:id', auth, getUser) 

module.exports = router;
