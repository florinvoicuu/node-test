'use strict';

/**
 * Module dependencies.
 */
var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;
var _         = require('lodash');

var CommentSchema = new Schema ({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: "Comment requires an user (id)."
    },
    content: {
        type: String,
        required: "Comment requires content.",
        trim: true
    }

}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

module.exports = mongoose.model('Comment', CommentSchema);
