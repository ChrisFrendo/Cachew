const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// create question Schema & model
const AnswerSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  freetextAnswer: {
    type: String
  },
  booleanAnswer: {
    type: String
  },
  multAnswer:[{
    type: String
  }],
  scaleAnswer: {
    type: Number
  }
});

const Answer = mongoose.model('answer', AnswerSchema);

module.exports = Answer;
