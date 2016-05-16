'use strict';

var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');

var config       = require('./config');

var csrf         = require('csurf');

module.exports = function (app, express) {
    app.set('trust proxy', true);
    app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
    app.use(bodyParser.json({limit: '10mb'}));
    app.use(cookieParser());
    app.use(express.static(config.root + '/public'));
    app.use(csrf({ cookie: true }));
    app.use(function(req, res, next) {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        next();
    });
}; 