const express = require('express');
const UserController = require('../../controllers/UserController');

const router = express.Router();
const controller = new UserController();

router.get('/:id', controller.getById);
router.post('/', controller.create);

module.exports = router;