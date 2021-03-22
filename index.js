const server = require('./services/server.js');
const mongoose = require('./services/mongoose');

mongoose.connect();
server.run();