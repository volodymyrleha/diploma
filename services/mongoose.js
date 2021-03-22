const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

mongoose.connection.on('connected', () => {
    console.log('MongoDB is connected');
})

mongoose.connection.on('error', (err) => {
    console.log(`Not able to connect to MongoDB: ${ err }`);
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