'use strict';

var path = require('path');

module.exports = {
    env: process.env.NODE_ENV || 'development',
    root: path.normalize(__dirname + '/..'),
    port: process.env.TEST_PORT || 3000,
    ip: process.env.IP || null,
    mongodb: {
        uri:  process.env.NODE_ENV === 'test' ?
            'mongodb://localhost/node-test-test':
            (process.env.TEST_MONGODB || 'mongodb://localhost/node-test'),
        options: {
            db: {
                safe: true
            }
        }
    },
    mail: {
        service: 'Gmail',
        auth: {
            user: 'Alfa0Beta0Charlie@gmail.com',
            pass: 'Tester123'
        }
    },
    session_secret: process.env.SESSION_SECRET || 'florin'
};