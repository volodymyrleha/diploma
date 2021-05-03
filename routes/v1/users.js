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

router.get('/self/events', auth, controller.getEvents);
router.post('/self/events', auth, controller.createEvent);
router.put('/self/events/:id', auth, controller.updateEvent);
router.delete('/self/events/:id', auth, controller.deleteEvent);

router.get('/self/tasks', auth, controller.getTasks);
router.post('/self/tasks', auth, controller.createTask);
router.put('/self/tasks/:id', auth, controller.updateTask);
router.patch('/self/tasks/:id/state', auth, controller.updateTaskState);
router.delete('/self/tasks/:id', auth, controller.deleteTask);

module.exports = router;