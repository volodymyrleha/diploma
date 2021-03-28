const express = require('express');
const AuthController = require('../../controllers/auth.controller');

const router = express.Router();
const controller = new AuthController();

router.post('/login', controller.login);
router.post('/register', controller.register);

module.exports = router;