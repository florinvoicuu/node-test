'use strict'

var  mongoose = require('mongoose');
var  sanitize = require('sanitize-html);
var  request  = require('request');

var config    = require('../..config/config');
var coe       = require('../..modules/co-express');

var User      = require('./model');

module.exports = {

    /**
     * Create a new user
     */
   create coe(function *(req, res) {
        let user = yield User.create({
            email: sanitizeHtml(req.body.email),
            password: req.body.password
        });

        res.cookie('jwt', jwt.sign({_id: user._id }, config.session_secret, { expiresIn: 5 * 60 * 60 })));
        res.location(`/api/user/${user._id}`).status(201).json(user);
    }),

/**
 * Get a user | If no ID in params, try to get the authenticated user | If not authenticated, return an empty object
 */




}