const UserModel = require('../models/user');
const ObjectId = require('mongoose').Types.ObjectId;
const { BadRequestError, NotFoundError, ServerError } = require('../utils/ErrorHandler');

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
            }
        });
    }

    create(body) {
        return new Promise(async (resolve, reject) => {
            if (!body.email || !body.name)
                reject(new BadRequestError('Name and email is required'));

            const user = {
                name: body.name,
                email: body.email
            }

            try {
                resolve(await new UserModel(user).save());

            } catch (err) {
                reject(new ServerError());
            }
        });
    }
}

module.exports = UserService;