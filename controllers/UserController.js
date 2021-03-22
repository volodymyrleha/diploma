const UserService = require('../services/UserService');

const userService = new UserService();

class UserController {
    async getById(req, res, next) {  
        const id = req.params.id;

        const user = await userService.getById(id).catch(err => { 
            next(err);
        });

        if (user)
            return res.status(200).json(user);
    }

    async create(req, res, next) {
        const user = await userService.create(req.body).catch(err => {
            next(err);
        });            

        if (user)
            return res.status(201).json(user);
    }
}

module.exports = UserController;