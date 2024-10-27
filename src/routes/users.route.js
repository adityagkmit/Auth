const express = require('express');
const router = express.Router();
const { currentUser, getNationality, getUser } = require('../controllers/users.controller.js');
const { auth } = require('../middlewares/auth.middleware.js');
const validate = require('../middlewares/validator.middleware.js');
const userIdValidateSchema = require('../validators/user/id.user.validator.js');

router.get('/current', auth, currentUser);
router.get('/nationality', auth, getNationality);
router.get('/:id', auth, validate(userIdValidateSchema, true), getUser) 

module.exports = router;
