const express = require('express');
const UserController = require('../../controllers/user.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();
const controller = new UserController();

router.get('/self', auth, controller.getById);
router.patch('/self/password', auth, controller.updatePassword);

router.get('/self/notes', auth, controller.getNotes);
router.post('/self/notes', auth, controller.createNote);
router.put('/self/notes/:id', auth, controller.updateNote);
router.delete('/self/notes/:id', auth, controller.deleteNote);

module.exports = router;