'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RsvpSchema = new Schema({
  barName: String,
  usersGoing: [String]
});

module.exports = mongoose.model('Rsvp', RsvpSchema);
