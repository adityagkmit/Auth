const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth.controller.js');
const validate = require('../middlewares/validator.middleware.js');
const { auth } = require('../middlewares/auth.middleware.js');
const loginValidateSchema = require('../validators/auth/login.auth.validator.js');
const registerValidateSchema = require('../validators/auth/register.auth.validator.js');

router.post('/register', validate(registerValidateSchema), register);
router.post('/login', validate(loginValidateSchema),login);
router.post('/logout', auth, logout); 

module.exports = router;
