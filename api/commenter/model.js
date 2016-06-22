'use strict';

var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var _        = require('lodash');

var CommenterSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: "Commenter requires a user (id)."
  },
  name:        {
    type: String,
    required: "Commenter requires a name."
  },
  description: {
    type: String,
    required: "Commenter requires a description."
  },
  badge: {
    type: String,
    required: "Commenter requires a badge."
  },
  image: String
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });

module.exports = mongoose.model('Commenter', CommenterSchema);
