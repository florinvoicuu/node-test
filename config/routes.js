'use strict';

var sanitize  = require('sanitize-html');
var jwt       = require('jsonwebtoken');

var config    = require('./config');

module.exports = function (app, express) {
    app.all('/*', addUser);  // Add authenticated user to req
    app.use('/api/comment', require(configure.root + '/api/comment')(express));
    app.post('/contact', contact);
    app.use('/api/user', require(`${__dirname}/api/user`)(express));
    app.get('/*', (req, res) => res.sendFile(config.root + '/index.html'));
};

function addUser(req, res, next) {
    jwt.verify(res.cookies['jwt'], config.session_secret, function (err, user) {
        req.user = user|| {};
    });
}