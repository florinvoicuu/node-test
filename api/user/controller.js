
'use strict';

var jwt = require("jsonwebtoken");

var User = require('./model');

var config = require('../../config/config');
var sanitize = require('sanitize-html');

module.exports = {
    create: (req, res, next) => {
        User.create({
            email: sanitize(req.body.email),
            password: req.body.password,
            color: sanitize(req.body.color)

        }, (err, user) => {
            if (err)
                return res.status(500).send(err);

            res.cookie('jwt', jwt.sign({ _id: user._id }, config.session_secret, { expiresIn: 5 * 60 * 60 }));

            res.location('/api/user/' + user._id).status(201).json(user);
        });
    },
    retrieve: (req, res, next) => {
        let id = req.params.id || (req.user ? req.user._id : null);

        if (!id) {
            return res.json({});
        }

        User.findById(id, (err, user) => {
            if (err)
                return res.status(500).send(err);

            if (!user)
                return res.status(404).end();

            res.json(user);
        });
    },
    update: (req, res, next) => {
        User.findByIdAndUpdate(req.params.id, { $set: {
            email: sanitize(req.body.email),
            password: req.body.password,
            color: sanitize(req.body.color)
        }}, { lean: true, new: true }, (err, user) => {
            if (err)
                return res.status(500).send(err);

            res.json(user);
        });
    },
    delete: (req, res, next) => {
        User.findByIdAndRemove(req.params.id, (err, user) => {
            if (err)
                return res.status(500).send(err);

            res.status(204).end();
        });
    },
    authenticate: (req, res, next) => {
        if (!req.body.email)
            return res.status(400).send('Email required');

        User.findOne({ email: req.body.email }, '+salt +hashed_password', (err, user) => {
            if (!user)
                return res.status(404).send('User with specified email not found');

            if (!user.authenticate(req.body.password))
                return res.status(400).send('Incorrect password');

            res.cookie('jwt', jwt.sign({ _id: user._id }, config.session_secret, { expiresIn: 5 /* hours */ * 60 * 60 }));

            res.json(user);
        });
    }
}