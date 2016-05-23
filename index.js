'use strict';

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
/*'use strict';

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

module.exports = server;*/
