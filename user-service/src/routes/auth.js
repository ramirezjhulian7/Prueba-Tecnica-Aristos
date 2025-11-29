const express = require('express');
const authController = require('../controllers/authController');
const { validate, registerSchema, loginSchema } = require('../middleware/validation');
const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

module.exports = router;
