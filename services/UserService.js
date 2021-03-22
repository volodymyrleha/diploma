const UserModel = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const { BadRequestError, NotFoundError, ServerError } = require('../utils/ErrorHandler');
const Logger = require('../utils/Logger');
const PasswordHasher = require('../utils/PasswordHasher');

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

    create(body) {
        return new Promise(async (resolve, reject) => {
            if (!body.email || !body.name || !body.password)
                reject(new BadRequestError('Name, email, password is required'));

            if (await UserModel.findOne({ email: body.email }))
                return reject(new BadRequestError('User is already created'));

            try {
                const hash = await hasher.hash(body.password);

                const user = {
                    name: body.name,
                    email: body.email,
                    password: hash
                }

                const createdUser = await new UserModel(user).save();

                resolve({
                    _id: createdUser._id,
                    name: createdUser.name,
                    email: createdUser.email
                });

            } catch (err) {
                reject(new ServerError());
                logger.log(err);
            }
        });
    }
}

module.exports = UserService;