'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

var Schema   = mongoose.Schema;

/**
 * Comment Schema
 */

var CommentSchema = new Schema ({
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: "Comment requires an user (id)."
    },
    content: {
        type: String,
        required: "Post requires content.",
        trim: true
    },
    badge: [{
        type: Schema.ObjectId,
        ref: "Badge"
    }]
}, { timestamps: { createdAt: 'created' , updatedAt: 'updated' } });

module.exports = mongoose.model('Comment', CommentSchema);




/* the old one

var CommentSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: 'User required'
    },
    content: {
        type: String,
        required: 'Content required'
    }
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

module.exports = mongoose.model('Comment', CommentSchema);*/
