'use strict';

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var _           = require('lodash');

var BadgeSchema = new Schema ({
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: "Badge must be connected to a user."
    },
    type: {
        type: String,
        required: "Badge requires a type.",
        trim: true
    },
    comment: {
        type: Schema.ObjectId,
        ref: "Comment"
    }
}, { timestamps: { createdAt: 'created' , updatedAt: 'updated' } });

module.exports = mongoose.model('Badge', BadgeSchema);

