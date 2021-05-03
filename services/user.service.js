const UserModel = require('../models/user');
const { NoteModel } = require('../models/note');
const { EventModel } = require('../models/event');
const { TaskModel } = require('../models/task');
const ObjectId = require('mongoose').Types.ObjectId;
const { BadRequestError, NotFoundError, ServerError } = require('../utils/error-handler');
const PasswordHasher = require('../utils/password-hasher');
const Logger = require('../utils/logger');

const logger = new Logger('userservice');
const hasher = new PasswordHasher();

const ALL_DAY = 1440;

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

    getEvents(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findById(id);

                if (!user)
                    return reject(new NotFoundError('User not found'));

                resolve(user.events);

            } catch (err) {
                reject(new ServerError());
                logger.log(err);
            }
        });
    }

    createEvent(id, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findById(id);

                if (!user)
                    return reject(new NotFoundError('User not found'));

                if (!body.title || !body.date)
                    return reject(new BadRequestError(`'title' and 'date' fields is required`));

                
                const date = new Date(body.date);

                if (!(date instanceof Date && !isNaN(date)))
                    return reject(new BadRequestError('date is not correct'));

                const event = await new EventModel({
                    title: body.title,
                    description: body.description ? body.description : '',
                    date: new Date(body.date),
                    duration: body.duration ? body.duration : ALL_DAY
                });

                user.events.push(event);

                user.save();
                resolve(event);

            } catch (err) {
                reject(new ServerError());
                logger.log(err);
            }
        });
    }

    updateEvent(userId, eventId, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findById(userId);

                if (!user)
                    return reject(new NotFoundError('User not found'));

                const event = user.events.filter(event => event._id.toString() === eventId)[0];

                if (!event)
                    return reject(new NotFoundError('Event not found'));

                if (!body.title || !body.date)
                    return reject(new BadRequestError(`'title' and 'date' fields are required`));

                const date = new Date(body.date);

                if (!(date instanceof Date && !isNaN(date)))
                    return reject(new BadRequestError('date is not correct'));

                event.title = body.title;
                event.description = body.description ? body.description : '';
                event.date = date;
                event.duration = body.duration ? body.duration : ALL_DAY;

                user.save();

                resolve(event);

            } catch (err) {
                reject(new ServerError());
                logger.log(err);
            }
        });
    }

    deleteEvent(userId, eventId) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findById(userId);

                if (!user)
                    return reject(new NotFoundError('User not found'));

                const event = user.events.filter(event => event._id.toString() === eventId)[0];

                if (!event)
                    return reject(new NotFoundError('Event not found'));

                user.events = user.events.filter(event => event._id.toString() !== eventId);

                user.save();

                resolve(user.events);

            } catch (err) {
                reject(new ServerError());
                logger.log(err);
            }
        });
    }

    getTasks(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findById(id);

                if (!user)
                    return reject(new NotFoundError('User not found'));

                resolve(user.tasks);

            } catch (err) {
                reject(new ServerError());
                logger.log(err);
            }
        });
    }

    createTask(id, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findById(id);

                if (!user)
                    return reject(new NotFoundError('User not found'));

                if (!body.title)
                    return reject(new BadRequestError(`'title' field is required`));

                let deadline = null;

                if (body.deadline) {
                    deadline = new Date(body.deadline);

                    if (!(deadline instanceof Date && !isNaN(deadline)))
                        return reject(new BadRequestError('deadline is not correct'));
                }

                const task = await new TaskModel({
                    title: body.title,
                    description: body.description ? body.description : ''
                });

                if (deadline)   
                    task.deadline = deadline;

                user.tasks.push(task);

                user.save();
                resolve(task);

            } catch (err) {
                reject(new ServerError());
                logger.log(err);
            }
        });
    }

    updateTask(userId, taskId, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findById(userId);

                if (!user)
                    return reject(new NotFoundError('User not found'));

                const task = user.tasks.filter(task => task._id.toString() === taskId)[0];

                if (!task)
                    return reject(new NotFoundError('Task not found'));

                if (!body.title)
                    return reject(new BadRequestError(`'title' field is required`));

                let deadline = null;

                if (body.deadline) {
                    deadline = new Date(body.deadline);

                    if (!(deadline instanceof Date && !isNaN(deadline)))
                        return reject(new BadRequestError('deadline is not correct'));
                }

                let state = null;

                if (body.state) {
                    state = body.state;

                    if (state < 0 || state > 2)
                        return reject(new BadRequestError('state is not correct'));
                }

                task.title = body.title;
                task.description = body.description ? body.description : '';
                
                if (deadline)
                    task.deadline = deadline;

                if (state)
                    task.state = state;

                user.save();

                resolve(task);

            } catch (err) {
                reject(new ServerError());
                logger.log(err);
            }
        });
    }

    updateTaskState(userId, taskId, body) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findById(userId);

                if (!user)
                    return reject(new NotFoundError('User not found'));

                const task = user.tasks.filter(task => task._id.toString() === taskId)[0];

                if (!task)
                    return reject(new NotFoundError('Task not found'));

                if (!body.state)
                    return reject(new BadRequestError(`'state' field is required`));

                const state = body.state;                

                if (state < 0 || state > 2)
                    return reject(new BadRequestError('state is not correct'));

                task.state = state;

                user.save();

                resolve(task);

            } catch (err) {
                reject(new ServerError());
                logger.log(err);
            }
        });
    }

    deleteTask(userId, taskId) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await UserModel.findById(userId);

                if (!user)
                    return reject(new NotFoundError('User not found'));

                const task = user.tasks.filter(task => task._id.toString() === taskId)[0];

                if (!task)
                    return reject(new NotFoundError('Event not found'));

                user.tasks = user.tasks.filter(task => task._id.toString() !== taskId);

                user.save();

                resolve(user.tasks);

            } catch (err) {
                reject(new ServerError());
                logger.log(err);
            }
        });
    }
}

module.exports = UserService;