'use strict';

var expect   = require('chai').expect;
var mongoose = require('mongoose');
var co       = require('co');
var _        = require('lodash');

var config  = require('../config/config');
var request = require('./request');
var CRUD    = require('./CRUD');
var sample  = require('./sample')(request);
var util    = require('./util');

require('..'); // Start it up

var uri = '/api/badge';
var crud = new CRUD({
    uri: uri,
    request: request,
    properties: ['user', 'type', 'comment']
});

describe('Badge', function () {
    this.timeout(10000);

    before(done => co(function *() {
        yield new Promise(resolve => mongoose.connection.collections['users'].drop(resolve));
        yield new Promise(resolve => mongoose.connection.collections['comments'].drop(resolve));
        yield new Promise(resolve => mongoose.connection.collections['badges'].drop(resolve));
        yield request({ uri: '' });

        done();
    }));

    // CRUD
    let res;
    describe(`POST ${uri}`, () => {
        it(`should create an badge`, () => co (function *() {
            res = yield crud.createResource(sample.badge());
        }));
    });

    describe(`GET ${uri}/:id`, () => {
        it(`should retrieve an badge`, () => co (function *() {
            yield crud.retrieveResource();
        }));
    });

    describe(`PUT ${uri}/:id`, () => {
        it(`should update an badge`, () => co (function *() {
            yield crud.updateResource(sample.badge(res.body.user, res.body.comment));
        }));
    });

    describe(`DELETE ${uri}/:id`, () => {
        it(`should delete an badge`, () => co (function *() {
            yield crud.deleteResource();
        }));
    });
});