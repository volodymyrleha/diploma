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
}

module.exports = UserController;