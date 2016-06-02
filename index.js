'use strict';

var express         = require('express');
var mongoose        = require('mongoose');

var config          = require('./config/config');
var configExpress   = require('./config/express');
var configRoutes    = require('./config/routes');

mongoose.connect(config.mongodb.uri);
//mongoose.connect(config.mongodb.uri, config.mongodb.options);   //Ce face Options aici ?

var app = express();

configExpress(app, express);
configRoutes(app, express);
//app.use(express.static(`${__dirname}/public`));


// Start the server/Listen for requests on the desired port
var server = app.listen(config.port, function () {
    return console.log(`Dollars listening on port ${config.port} in ${config.env} mode`);
});

module.exports = server;



/*
'use strict';

var express  = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require("jsonwebtoken");
var csrf = require("csurf");

// mongoose.connect('mongodb://localhost/test-db'); // uncomment when ready to use the database

mongoose.connect('mongodb://localhost/node-test');
//mongoose.connect(config.mongodb.uri, config.mongodb.options);


var app = express();

// Configure express settings

// The usual for websites; Find out what each does, 'npm install ...' them and uncomment
app.set('trust proxy', true);
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(cookieParser());

app.use(csrf({ cookie: true }));
app.use(function(req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
});

app.use(express.static(`${__dirname}/public`));

app.use('/!*', (req, res, next) => jwt.verify(req.cookies['jwt'], 'florin', (err, user) => {
    req.user = user;
    next();
}));

// Configure routes
app.use('/api/user', require(`${__dirname}/api/user`)(express)); // requests to '/user' should work now (after setting up the controller as well)
app.use('/api/comment', require(`${__dirname}/api/comment`)(express));
// ...
app.all('/!*', (req, res) => res.sendFile(`${__dirname}/public/index.html`)); // Lastly, you serve the index.html

// Start the server/Listen for requests on the desired port
var server = app.listen(3000, function () {
    return console.log('Hello World!');
});

module.exports = server;








/!*'use strict';

var express         = require('express');
var mongoose        = require('mongoose');

var config          = require('./config/config');
var configExpress   = require('./config/express');
var configRoutes    = require('./config/routes');

mongoose.connect('mongodb://localhost/node-test');
//mongoose.connect(config.mongodb.uri, config.mongodb.options);

var app = express();

configExpress(app, express);
configRoutes(app, express);
//app.use(express.static(`${__dirname}/public`));


// Start the server/Listen for requests on the desired port
var server = app.listen(3000, function () {
    return console.log(`node-test listening on port 3000 in ${config.env} mode`);
});

module.exports = server;
*!/
/!*'use strict';

var express      = require('express');
var mongoose     = require('mongoose');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt          = require('jsonwebtoken');
/!*
var config        = require('./config/config');
var configExpress = require('./config/express');
var configRoutes  = require('./config/routes');*!/

mongoose.connect('mongodb://localhost/node-test');

var app = express();

/!*configExpress(app, express);
configRoutes(app, express);*!/

app.set('trust proxy', true);
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));

app.use('/!*', (req, res, next) => jwt.verify(req.cookies['jwt'], 'test', (err, user) => {
    req.user = user;
    next();
}));

app.use('/api/user', require(`${__dirname}/api/user`)(express));
app.get('/!*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));


var server = app.listen(3000, function () {
    return console.log('Hello World!');
});

module.exports = server;*!/
*/
