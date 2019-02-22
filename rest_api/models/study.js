const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Participant = require('../models/participant');
const Question = require('../models/question');

// create study Schema & model
const StudySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now(),
  },
  userId: {
    type: Schema.ObjectId,
    required: true
  },
  questions: [{
    type: Schema.ObjectId,
  }]
});

const Study = mongoose.model('study', StudySchema);

module.exports = Study;
