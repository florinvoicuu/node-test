'use strict';

var _        = require('lodash');
var sanitize = require('sanitize-html');

var Comment = require('./model');

module.exports = {
    create: (req, res, next) => {
        if (!req.user) {
            return res.status(401).send('Not authenticated');
        }

        Comment.create({
            user: req.user._id,
            content: sanitize(req.body.content, {allowedTags: sanitize.defaults.allowedTags.concat(['img'])})
        }, (err, comment) => {
            if (err)
                return res.status(500).send(err);

            res.location('/api/comment/' + comment._id).status(201).json(comment);
        });
    },

    retrieve: (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).send('ID Required');
        }

        Comment.findById(req.params.id, (err, comment) => {
            if (err)
                return res.status(500).send(err);
            
            if (!comment)
                return res.status(404).end();

            res.json(comment);
        });
    },

    update: (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).send('ID Required');
        }

        Comment.findByIdAndUpdate(req.params.id, { $set: {
            content: sanitize(req.body.content, {allowedTags: sanitize.defaults.allowedTags.concat(['img'])})
        }}, { lean: true, new: true }, (err, comment) => {
            if (err)
                return res.status(500).send(err);

            res.json(comment);
        });
    },

    delete: (req, res, next) => {
        if (!req.params.id) {
            return res.status(400).send('ID Required');
        }

        Comment.findByIdAndRemove(req.params.id, (err, comment) => {
            if (err)
                return res.status(500).send(err);

            res.status(204).end();
        });
    },

    retrieveRange: (req, res, next) => {
        let query = {};

        let range = parseRange(req.headers['range']);

        Comment.find(query, '', { lean: true, skip: range.skip, limit: range.limit, sort: '-created', populate: 'user' }, (err, comments) => {
            if (err)
                return res.status(500).send(err);

            Comment.count(query, (err, count) => {
                if (err)
                    return res.status(500).send(err);

                res.set("Accept-Ranges", 'comments');

                if (count && _.isEmpty(comments)) {
                    res.set("Content-Range", `comments */${count}`);
                    return res.status(416).end();
                }

                res.set("Content-Range", `comments ${range.skip}-${range.skip + range.limit}/${count}`);

                res.status(206).json(comments);
            });
        });
    }
};

function parseRange(range) {
    const MAX_PER_PAGE = 100;
    const DEFAULT_PER_PAGE = 10;

    let skip = 0;
    let limit = DEFAULT_PER_PAGE;
    if (range) {
        range = range.split('=')[1].split('-');
        if (range[0])
            skip = range[0] * 1; // make it a number

        let requestedLimit = range[1] - skip;
        if (requestedLimit <= MAX_PER_PAGE && requestedLimit > 0)
            limit = requestedLimit;
    }

    return {
        skip: skip,
        limit: limit
    };
}

/*
'use strict';

var _        = require('lodash');
var sanitize = require('sanitize-html');
var crypto   = require('crypto');

var config   = require('../../config/config');
var coe      = require('../../modules/coe');

var Comment = require('./model');
var User    = require('../user/model');

module.exports = {
    /!**
     * Creates a new Comment in the DB.
     *!/
    create: coe(function *(req, res) {
        if (!req.user)
            return res.status(401).send("Not authenticated");

        let comment = yield Comment.create(_.assign(sanitizeComment(req.body), { user: req.user._id }));

        comment = (yield Comment.populate(comment, { path: 'user' })).toObject();

        res.location(`/api/comment/${comment._id}`).status(201).json(comment);
    }),
    /!**
     * Get a single Comment
     *!/
    retrieve: coe(function *(req, res) {
        if (!req.params.id)
            return res.status(400).send('ID required');

        let comment = yield Comment.findById(req.params.id, null, { lean: true, populate: 'user' });

        if (!comment)
            return res.status(404).end();


        res.json(comment);
    }),

    /!**
     * Updates an existing Comment in the DB.
     *!/
    update: coe(function *(req, res) {
        if (!req.params.id)
            return res.status(400).send('ID required');

        let comment = yield Comment.findByIdAndUpdate(req.params.id, { $set: sanitizeComment(req.body) }, { lean: true, new: true, populate: 'user' });

        res.json(comment);
    }),

    /!**
     * Deletes a Comment
     *!/
    delete: coe(function *(res, req) {
        if (!req.params.id)
            return res.status(400).send('ID required');

        yield Comment.findByIdAndRemove(res.params.id);

        res.status(204).end();
    }),

    /!**
     * Retrieve Comments in Range; search by content; sort by date created
     *!/
    retrieveRange: coe(function *(req, res) {
        let query = {};

        if (req.query.content)
            query.content = { $regex: req.query.content, $options: 'i' }; // must contain string in content (case insensitive)

        let range = parseRange(req.headers['range']);

        let comments = yield Comment.find(query, { lean: true, skip: range.skip, limit: range.limit, sort: '-created', populate: 'user' });
        let count    = yield Comment.count(query);

        res.set("Accept-Ranges", 'comments');

        if (count && _.isEmpty(comments)) {
            res.set("Content-Range", `comments *!/${count}`);
            return res.status(416).end();
        }

        res.set("Content-Range", `comments ${range.skip}-${range.skip + range.limit}/${count}`);

        res.status(206).json(comments);
    })
};

function  sanitizeComment(comment) {
    return _.pickBy({
        content: sanitize(comment.content, { allowedTags: sanitize.defaults.allowedTags.concat(['img]']) })
    });
}*/
