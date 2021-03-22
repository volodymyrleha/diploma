const http = require('http');
const app = require('./services/express');
const { PORT } = require('./config');

const server = http.createServer(app);

module.exports = {
    run: () => {
        server.listen(PORT, () => {
            console.log(`Server is running on PORT: ${PORT}`);
        });
    }
};