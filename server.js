const http = require('http');
const app = require('./services/express');
const { PORT } = require('./config');
const Logger = require('./utils/Logger');

const logger = new Logger('server');

const server = http.createServer(app);

module.exports = {
    run: () => {
        server.listen(PORT, () => {
            logger.log(`Running on PORT: ${ PORT }`);
        });
    }
};