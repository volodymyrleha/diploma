const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { UnauthorizedError } = require('../utils/ErrorHandler');

const auth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token)
        return next(new UnauthorizedError('Token is required'));

    try {
        const decoded = jwt.verify(token, JWT_SECRET);        
        req.userId = decoded._id;        

        return next();

    } catch (err) {
        return next(new UnauthorizedError('Token is not valid'));
    }
}

module.exports = auth;