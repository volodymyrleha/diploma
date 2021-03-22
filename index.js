const server = require('./server.js');
const mongoose = require('./services/mongoose');

mongoose.connect();
server.run();