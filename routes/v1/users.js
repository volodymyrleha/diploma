const express = require('express');
const UserController = require('../../controllers/user.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();
const controller = new UserController();

router.get('/self', auth, controller.getById);

module.exports = router;