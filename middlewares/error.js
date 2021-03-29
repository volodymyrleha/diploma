const error = (error, req, res, next) => {
    res.status(error.status).json({ error: error.message });
    next();
}

module.exports = error;