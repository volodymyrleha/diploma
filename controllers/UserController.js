const UserService = require('../services/UserService');
const ObjectId = require('mongoose').Types.ObjectId;

const userService = new UserService();

class UserController {
    getById(req, res) {
        try {
            const id = req.params.id;

            if (!ObjectId.isValid(id))
                return res.status(400).json({ error: "Id is not correct" });

            userService.getById(id)
            .then(user => {
                if (!user)
                    res.status(404).json({ error: "User not found" });
                else
                    res.status(200).json(user);
            })
            .catch(err => {
                res.status(500).json({ error: "server error" });
                console.log(`[UserConroller] ${ err }`);
            });

        } catch(err) {
            res.status(500).json({ error: "server error" });
            console.log(`[UserConroller] ${ err }`);
        }
    }

    create(req, res) {
        try {
            if (!req.body.email || !req.body.name)
                return res.status(400).json({ error: "email and name is required" });

            userService.create(req.body)
            .then(user => {
                res.status(201).json(user);
            }).catch(err => {
                res.status(500).json({ error: "server error" });
                console.log(`[UserConroller] ${ err }`);
            });            

        } catch (err) {
            res.status(500).json({ error: "server error" });
            console.log(`[UserConroller] ${ err }`);
        }
    }
}

module.exports = UserController;