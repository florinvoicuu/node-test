'use strict';

var sanitize  = require('sanitize-html');
var jwt       = require('jsonwebtoken');

var config    = require('./config');

module.exports = function (app, express) {
    app.all('/*', addUser);  // Add authenticated user to req
    
    app.use('/api/user', require(config.root + '/api/user')(express));
    app.use('/api/comment', require(config.root + '/api/comment')(express));

    app.post('/contact', contact);

    app.get('/*', (req, res) => res.sendFile(config.root + '/public/index.html'));
};

function addUser(req, res, next) {
    jwt.verify(req.cookies['jwt'], config.session_secret, function(err, user) {
        req.user = user || {};
        next();
    });
}

function contact(res, req) {
    transport(config.mail).sendMail({
        from: sanitize(req.body.name) + ' <' + config.mail.auth.user + '>',
        to: 'contact@scoutech.ro',
        subject: "Mesaj - node-test",
        text: sanitize(req.body.message) + '\n\nEmail: ' + sanitize(req.body.email)
    }, (err, info) => err ? res.status(500).send(err) : res.json(info));
}