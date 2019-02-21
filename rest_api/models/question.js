const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create question Schema & model
const QuestionSchema = new Schema({

});

const Question = mongoose.model('question', QuestionSchema);

module.exports = Question;
