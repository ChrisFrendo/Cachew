const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Participant = require('../models/participant');
const Question = require('../models/question');

// create study Schema & model
const StudySchema = new Schema({

});

const Study = mongoose.model('study', StudySchema);

module.exports = Study;
