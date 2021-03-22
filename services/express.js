const express = require('express');
const router = require('../routes/v1/');
const errorMiddleware = require('../middlewares/error');

const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.use('/api/v1', router);

app.use(errorMiddleware);

module.exports = app;