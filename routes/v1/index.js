const express = require('express');
const users = require('./users');
const auth = require('./auth');

const router = express.Router();

router.get('/status', (req, res) => {
    return res.status(200).json({
        message: "ok"
    });
});

router.use('/users', users);
router.use('/auth', auth);

module.exports = router;