'use strict';

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var _           = require('lodash');

var BadgeSchema = new Schema ({
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: "Comment requires an user (id)."
    },
    type: {
        type: String,
        required: "Post requires content.",
        trim: true
    },
    comment: {
        type: Schema.ObjectId,
        ref: "Comment"
    }
}, { timestamps: { createdAt: 'created' , updatedAt: 'updated' } });

module.exports = mongoose.model('Badge', BadgeSchema);

