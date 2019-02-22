const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create question Schema & model
const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  question_type: {
    type: String,
    enum: ["scale", "freetext", "bool", "mult"],
    required: true
  },
  content: {
    type: String,
    required: true,
  }
});

const Question = mongoose.model('question', QuestionSchema);

module.exports = Question;
