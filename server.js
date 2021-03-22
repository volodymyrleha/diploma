const http = require('http');
const app = require('./services/express');

const server = http.createServer(app);

module.exports = server;