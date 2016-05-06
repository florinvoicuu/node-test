'use strict';

var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');

var config       = require('./config');

module.exports = function (app, express) {
    app.set('trust proxy', true);
    app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
    app.use(bodyParser.json({limit: '10mb'}));
    app.use(cookieParser());
    app.use(express.static(config.root + '/public'));
};