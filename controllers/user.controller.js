const UserService = require('../services/user.service');

const userService = new UserService();

class UserController {
    async getById(req, res, next) {  
        const id = req.userId;

        try {
            const user = await userService.getById(id);
            return res.status(200).json(user);

        } catch (err) {
            next(err);
        }
    }

    async updatePassword(req, res, next) {
        const id = req.userId;

        try {
            await userService.updatePassword(id, req.body);
            return res.status(200).json({ msg: "password changed" });

        } catch (err) {
            next(err);
        }
    }

    async getNotes(req, res, next) {
        const id = req.userId;

        try {
            const notes = await userService.getNotes(id);
            return res.status(200).json(notes);

        } catch (err) {
            next(err);
        }
    }

    async createNote(req, res, next) {
        const id = req.userId;

        try {
            const note = await userService.createNote(id, req.body);
            return res.status(200).json(note);

        } catch (err) {
            next(err);
        }
    }    

    async updateNote(req, res, next) {
        const userId = req.userId;
        const noteId = req.params.id;

        try {
            const note = await userService.updateNote(userId, noteId, req.body);
            return res.status(200).json(note);

        } catch (err) {
            next(err);
        }
    }    

    async deleteNote(req, res, next) {
        const userId = req.userId;
        const noteId = req.params.id;

        try {
            const notes = await userService.deleteNote(userId, noteId);
            return res.status(200).json(notes);

        } catch (err) {
            next(err);
        }
    }

    async getEvents(req, res, next) {
        const id = req.userId;

        try {
            const events = await userService.getEvents(id);
            return res.status(200).json(events);

        } catch (err) {
            next(err);
        }
    }

    async createEvent(req, res, next) {
        const id = req.userId;

        try {
            const event = await userService.createEvent(id, req.body);
            return res.status(200).json(event);

        } catch (err) {
            next(err);
        }
    }

    async updateEvent(req, res, next) {
        const userId = req.userId;
        const eventId = req.params.id;

        try {
            const event = await userService.updateEvent(userId, eventId, req.body);
            return res.status(200).json(event);

        } catch (err) {
            next(err);
        }
    }

    async deleteEvent(req, res, next) {
        const userId = req.userId;
        const eventId = req.params.id;

        try {
            const events = await userService.deleteEvent(userId, eventId);
            return res.status(200).json(events);

        } catch (err) {
            next(err);
        }
    }
}

module.exports = UserController;