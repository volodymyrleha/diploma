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
}

module.exports = UserController;