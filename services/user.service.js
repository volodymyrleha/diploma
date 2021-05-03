const UserModel = require('../models/user');
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
                reject(new BadRequestError('Id is not correct'));

            try {
                const user = await UserModel.findById(id);

                if (!user)
                    reject(new NotFoundError('User not found'));

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
}

module.exports = UserService;