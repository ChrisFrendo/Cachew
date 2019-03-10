const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create question Schema & model
const AnswerSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  }
});

const Answer = mongoose.model('answer', AnswerSchema);

module.exports = Answer;
