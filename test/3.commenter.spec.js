'use strict';

var expect   = require('chai').expect;
var mongoose = require('mongoose');
var co       = require('co');

var config  = require('../config/config');
var request = require('./request');
var CRUD    = require('./CRUD');
var sample  = require('./sample')(request);
var util    = require('./util');

var Commenter    = require(config.root + '/api/commenter/model');

require('..'); // Start it up

var uri = '/api/commenter';
var crud = new CRUD({
    uri: uri,
    request: request,
    properties: ['user', 'name', 'description', 'image', 'badge']
});

describe('Commenter', () => {
    before(done => co(function *() {
        yield new Promise(resolve => mongoose.connection.collections['users'].drop(resolve));
        yield new Promise(resolve => mongoose.connection.collections['comments'].drop(resolve));
        yield new Promise(resolve => mongoose.connection.collections['commenters'].drop(resolve));
        yield request({ uri: '' });

        done();
    }));

    // CRUD
    let res;
    describe(`POST ${uri}`, () => {
        it(`should create an commenter`, () => co (function *() {
            res = yield crud.createResource(sample.commenter());
        }));
    });

    describe(`GET ${uri}/:id`, () => {
        it(`should retrieve an commenter`, () => co (function *() {
            yield crud.retrieveResource();
        }));
    });

    describe(`PUT ${uri}/:id`, () => {
        it(`should update an commenter`, () => co (function *() {
            yield crud.updateResource(sample.commenter(res.body.user));
        }));
    });

    describe(`DELETE ${uri}/:id`, () => {
        it(`should delete an commenter`, () => co (function *() {
            yield crud.deleteResource();
        }));
    });

    // Other
    describe(`GET ${uri}/:id (user)`, () => {
        it('should retrieve an commenter by user (id)', () => co (function *() {
            let commenter = JSON.parse(JSON.stringify(yield Commenter.create(yield sample.commenter()(3))));
            let res = yield request({ uri: `${uri}/${commenter.user}` });

            expect(res.statusCode).to.equal(200, util.errMsg(res, 'body'));
            expect(res.body).to.be.an('object', util.errMsg(res, 'body'));
            expect(res.body).to.eql(commenter, util.errMsg(res, 'body'));
        }));
    });
});
