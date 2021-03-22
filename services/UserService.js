const UserModel = require('../models/user');

class UserService {
    getById(id) {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await UserModel.findById(id));

            } catch (err) {
                reject(err);
            }
        });
    }

    create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const user = {
                    name: data.name,
                    email: data.email
                }
    
                resolve(await new UserModel(user).save());

            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = UserService;