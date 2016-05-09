'use strict';

var expect    = require('chai').expect;
var mongoose  = require('mongoose');
var co        = require('co');

var config    = require('../config/config');
var request   = require('./request');
var CRUD      = require('./CRUD');
var sample    = require('./sample')(request);
var util      = require('./util');

var User      = require(config.root + '/api/user/model');

require('..'); //Start it up

var uri = '/api/user';
var crud = new CRUD({
    uri: uri,
    request: request,
    properties: ['email']
});

describe('User', function() {
    // Clear relevant collections
    before(done => co(function *() {
        yield new Promise(resolve => mongoose.connection.collections['users'].drop(resolve));
        yield request({ uri: '' });

        done();
    }));

    // CRUD
    describe(`POST ${uri}`, () => {
        it(`should create a user`, () => co (function *() {
            yield crud.createResource(sample.user);
        }));
    });
});