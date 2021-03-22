const express = require('express');
const router = require('../routes/v1/');

const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.use('/api/v1', router);

module.exports = app;