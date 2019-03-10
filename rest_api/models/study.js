const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user');
const Question = require('../models/question');

var genres = ["Front End", "Back End", "Full Stack", "Java", "C", "Web Development", "Android", "Ios"];

// create study Schema & model
const StudySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.ObjectId,
    // required: true
  },
  targets: [{
    type: String,
    enum: User.jobRoles
  }],
  genres: [{
    type: String,
    enum: genres
  }],
  questions: [{
    type: Schema.ObjectId,
  }]
});

const Study = mongoose.model('study', StudySchema);

module.exports = Study;
module.exports.genres = genres;
