const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');
const Logger = require('../utils/Logger');

const logger = new Logger('mongoose');

mongoose.connection.on('connected', () => {
    logger.log('Database is connected');
})

mongoose.connection.on('error', (err) => {
    logger.log(`Connection error: ${ err }`);
    process.exit(1);
});

module.exports = {
    connect: () => {
        mongoose.connect(MONGODB_URI, {
            keepAlive: 1,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        mongoose.set('useCreateIndex', true);
        
        return mongoose.connection;
    }
}