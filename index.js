'use strict';

var express  = require('express');
var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/test-db'); // uncomment when ready to use the database

var app = express();

// Configure express settings
/*
// The usual for websites; Find out what each does, 'npm install ...' them and uncomment
app.set('trust proxy', true);
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(cookieParser());
app.use(express.static(`${__dirname}/public`));
*/
// ...

// Configure routes
// app.use('/user', require(`${__dirname}/api/user`)(express)); // requests to '/user' should work now (after setting up the controller as well)
// ...
app.all('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`)); // Lastly, you serve the index.html

// Start the server/Listen for requests on the desired port
var server = app.listen(port, function () {
    return console.log('Hello World!');
});

module.exports = server;
