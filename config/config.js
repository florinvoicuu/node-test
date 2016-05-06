'use strict';

var path = require('path');

module.exports = {
    env: process.env.NODE_ENV === 'test',
    root: path.normalize(__dirname + '/..'),
    port: process.env.TEST_PORT || 3000,
    ip: process.env.IP || null,
    mongodb: {
        uri:  process.env.NODE_ENV === 'test' ?
            'mongodb://localhost/node-test-test':
            (process.env.TEST_MONGODB || 'mongodb://localhost//node-test'),
        options: {
            db: {
                safe: true
            }
        }
    },
    mail: {
        service: 'Zoho',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    },
    session_secret: process.env.SESSION_SECRET || 'mysecretsession'
};