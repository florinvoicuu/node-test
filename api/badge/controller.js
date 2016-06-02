'use strict';

var _        = require('lodash');
var sanitize = require('sanitize-html');

var Badge    = require('./model');
//var Comment = require('../comment/model');

module.exports = {
    create: (req, res, next) => {
        if (!req.user) {
            return res.status(401).send('Not authenticated');
        }

        Badge.create({
            user: req.user._id,
            type: req.body.type,
            comment: req.body.comment
        }, (err, badge) => {
            if (err)
                return res.status(500).send(err);

            res.location('/api/badge/' + badge._id).status(201).json(badge);
        });
    },

    retrieve: (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).send('ID Required');
        }

        Badge.findById(req.params.id, (err, badge) => {
            if (err)
                return res.status(500).send(err);

            if (!badge)
                return res.status(404).end();

            res.json(badge);
        });
    },

    update: (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).send('ID Required');
        }

        Badge.findByIdAndUpdate(req.params.id, {
            $set: {
                type: req.body.type                      
            }
        }, {lean: true, new: true}, (err, badge) => {
            if (err)
                return res.status(500).send(err);

            res.json(badge);
        });
    },

    delete: (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).send('ID Required');
        }

        Badge.findByIdAndRemove(req.params.id, (err, badge) => {
            if (err)
                return res.status(500).send(err);

            res.status(204).end();
        });
    }
};