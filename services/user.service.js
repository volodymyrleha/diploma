const UserModel = require('../models/user');
const { NoteModel } = require('../models/note');
const ObjectId = require('mongoose').Types.ObjectId;
const { BadRequestError, NotFoundError, ServerError } = require('../utils/error-handler');
const PasswordHasher = require('../utils/password-hasher');
const Logger = require('../utils/logger');

const logger = new Logger('userservice');
const hasher = new PasswordHasher();

class UserService {
    getById(id) {
        return new Promise(async (resolve, reject) => {
            if (!ObjectId.isValid(id))
                return reject(new BadRequestError('Id is not correct'));

            try {
                const user = await UserModel.findById(id);

                if (!user)
                    return reject(new NotFoundError('User not found'));

                resolve(user);

            } catch (err) {
                reject(new ServerError());
                logger.log(err);
            }
        });
    }

    updatePassword(id, body) {
        return new Promise(async (resolve, reject) => {
            if (!body.password || !body.newPassword)
                return reject(new BadRequestError('New and old password is required'));

            if (!UserModel.isValidPassword(body.newPassword))
                return reject(new BadRequestError('Password does not match the criteria'));

            const user = await UserModel.findById(id).exec();

            if (!user)
                return reject(new NotFoundError('User not found'));

            try {
                await hasher.compare(body.password, user.password);
            } catch (err) {
                return reject(new BadRequestError('Password is not correct'));
            }

            const hash = await hasher.hash(body.newPassword);
                
            try {
                user.password = hash;
                await user.save();
                resolve();

            } catch (err) {
                reject(new ServerError());
                logger.log(err);
            }
        });
    }

    getNotes(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findById(id);

                if (!user)
                    return reject(new NotFoundError('User not found'));

                resolve(user.notes);

            } catch (err) {
                reject(new ServerError());
                logger.log(err);
            }
        });
    }

    createNote(id, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findById(id);

                if (!user)
                    return reject(new NotFoundError('User not found'));

                if (!body.title)
                    return reject(new BadRequestError(`'title' field is required`));

                const note = await new NoteModel({
                    title: body.title,
                    description: body.description ? body.description : ''
                });

                user.notes.push(note);

                user.save();
                resolve(note);

            } catch (err) {
                reject(new ServerError());
                logger.log(err);
            }
        });
    }

    updateNote(userId, noteId, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findById(userId);

                if (!user)
                    return reject(new NotFoundError('User not found'));

                const note = user.notes.filter(note => note._id.toString() === noteId)[0];

                if (!note)
                    return reject(new NotFoundError('Note not found'));

                if (!body.title)
                    return reject(new BadRequestError(`'title' field is required`));

                note.title = body.title;
                note.description = body.description ? body.description : '';

                user.save();

                resolve(note);

            } catch (err) {
                reject(new ServerError());
                logger.log(err);
            }
        });
    }

    deleteNote(userId, noteId) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findById(userId);

                if (!user)
                    return reject(new NotFoundError('User not found'));

                const note = user.notes.filter(note => note._id.toString() === noteId)[0];

                if (!note)
                    return reject(new NotFoundError('Note not found'));


                user.notes = user.notes.filter(note => note._id.toString() !== noteId);

                user.save();

                resolve(user.notes);

            } catch (err) {
                reject(new ServerError());
                logger.log(err);
            }
        });
    }
}

module.exports = UserService;