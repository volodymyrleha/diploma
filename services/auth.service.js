const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const { JWT_SECRET } = require('../config');
const { BadRequestError, NotFoundError, ServerError } = require('../utils/error-handler');
const Logger = require('../utils/Logger');
const PasswordHasher = require('../utils/password-hasher');

const logger = new Logger('authservice');
const hasher = new PasswordHasher();

class AuthService {
    login(body) {
        return new Promise(async (resolve, reject) => {
            if (!body.password || !body.email)
                return reject(new BadRequestError('\'password\', \'email\' fields are required'));

            const user = await UserModel.findOne({ email: body.email });

            if (!user)
                return reject(new NotFoundError('User not found'));

            try {
                await hasher.compare(body.password, user.password);
            } catch (err) {
                return reject(new BadRequestError('Password is not correct'));
            }

            const token = this.createToken(user._id);

            resolve({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    notes: user.notes,
                    events: user.events
                }, token
            });
        });
    }

    register(body) {
        return new Promise(async (resolve, reject) => {
            if (!body.password || !body.email)
                return reject(new BadRequestError('\'password\', \'email\' fields are required'));

            if (await UserModel.findOne({ email: body.email }))
                return reject(new BadRequestError('User is already created'));

            if (!UserModel.isValidEmail(body.email))
                return reject(new BadRequestError('Email is not correct'));

            if (!UserModel.isValidPassword(body.password))
                return reject(new BadRequestError('Password is not correct'));

            const hash = await hasher.hash(body.password);

            const user = {
                name: body.name,
                email: body.email,
                password: hash,
                notes: []
            }

            try {
                const createdUser = await new UserModel(user).save();

                const token = this.createToken(createdUser._id);

                resolve({
                    user: {
                        _id: createdUser._id,
                        name: createdUser.name,
                        email: createdUser.email,
                        notes: createdUser.notes,
                        events: createdUser.events
                    }, token
                });

            } catch(err) {
                reject(new ServerError());
                logger.log(err);
            }
        });
    }

    createToken(id) {
        return jwt.sign({ _id: id }, JWT_SECRET, {
            expiresIn: 86400
        });
    }
}

module.exports = AuthService;