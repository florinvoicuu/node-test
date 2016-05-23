'use strict';

var _        = require('lodash');
var sanitize = require('sanitize-html');
var crypto   = require('crypto');

var config   = require('../../config/config');
var coe      = require('../../modules/coe');

var Comment = require('./model');
var User    = require('../user/model');

module.exports = {
    /**
     * Creates a new Comment in the DB.
     */
    create: coe(function *(req, res) {
        if (!req.user)
            return res.status(401).send("Not authenticated");

        let comment = yield Comment.create(_.assign(sanitizeComment(req.body), { user: req.user._id }));

        comment = (yield Comment.populate(comment, { path: 'user' })).toObject();

        res.location(`/api/comment/${comment._id}`).status(201).json(comment);
    }),
    /**
     * Get a single Comment
     */
    retrieve: coe(function *(req, res) {
        if (!req.params.id)
            return res.status(400).send('ID required');

        let comment = yield Comment.findById(req.params.id, null, { lean: true, populate: 'user' });

        if (!comment)
            return res.status(404).end();


        res.json(comment);
    }),

    /**
     * Get an array of Comments
     */
    retrieve: coe(function *(req, res) {

        let comments = yield Comments.find(query, content, { lean: true, populate: 'comment' });

        if (!comments)
            return res.status(404).end();


        res.json(comments);
    }),


    /**
     * Updates an existing Comment in the DB.
     */
    update: coe(function *(req, res) {
        if (!req.params.id)
            return res.status(400).send('ID required');

        let comment = yield Comment.findByIdAndUpdate(req.params.id, { $set: sanitizeComment(req.body) }, { lean: true, new: true, populate: 'user' });

        res.json(comment);
    }),

    /**
     * Deletes a Comment
     */
    delete: coe(function *(res, req) {
        if (!req.params.id)
            return res.status(400).send('ID required');

        yield Comment.findByIdAndRemove(res.params.id);

        res.status(204).end();
    }),

    /**
     * Retrieve Comments in Range; search by content; sort by date created
     */
    retrieveRange: coe(function *(req, res) {
        let query = {};

        if (req.query.content)
            query.content = { $regex: req.query.content, $options: 'i' }; // must contain string in content (case insensitive)

        let range = parseRange(req.headers['range']);

        let comments = yield Comment.find(query, { lean: true, skip: range.skip, limit: range.limit, sort: '-created', populate: 'user' });
        let count    = yield Comment.count(query);

        res.set("Accept-Ranges", 'comments');

        if (count && _.isEmpty(comments)) {
            res.set("Content-Range", `comments */${count}`);
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
}