const http = require('http');
const app = require('./express');
const { PORT } = require('../config');

const server = http.createServer(app);

module.exports = {
    run: () => {
        server.listen(PORT, () => {
            console.log(`[SERVER] Running on PORT: ${PORT}`);
        });
    }
};