const AuthService = require('../services/auth.service');

const authService = new AuthService();

class AuthController {
    async login (req, res, next) {
        try {
            const data = await authService.login(req.body);
            res.status(200).json(data);
            
        } catch (err) {
            next(err);
        }
    }

    async register(req, res, next) {
        try {
            const data = await authService.register(req.body);
            res.status(201).json(data);

        } catch (err) {
            next(err)
        }
    }
}

module.exports = AuthController;