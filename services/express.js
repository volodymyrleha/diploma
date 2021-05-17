const express = require('express');
const compression = require('compression');
const router = require('../routes/v1/');
const errorMiddleware = require('../middlewares/error');

const app = express();

const dev = app.get('env') === 'development';;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json())

app.use('/api/v1', router);

app.use(errorMiddleware);

if (!dev) {
    app.disable('x-powered-by');

    app.use(function(req, res, next){
        if (req.headers['x-forwarded-proto'] == 'http') {
            return res.redirect('https://' + req.headers.host + req.url);
        } else {
            return next();
        }
    });

    app.use(compression());

    app.use(express.static(path.resolve(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
    });
}

module.exports = app;