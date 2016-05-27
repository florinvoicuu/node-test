'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

var Schema   = mongoose.Schema;

/**
 * Comment Schema
 */

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

module.exports = mongoose.model('Comment', CommentSchema);