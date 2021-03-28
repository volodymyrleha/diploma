const UserModel = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const { BadRequestError, NotFoundError, ServerError } = require('../utils/ErrorHandler');
const Logger = require('../utils/Logger');

const logger = new Logger('userservice');

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
}

module.exports = UserService;