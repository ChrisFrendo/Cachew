const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var questionTypes = ["Free Text", "Scale", "Boolean", "Multiple Choice"];

// create question Schema & model
const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: questionTypes,
    required: true
  },
  time: {
    type: Date,
    default: null
  },
  scale: {
    min:{
      type: Number
    },
    max: {
      type: Number
    }
  },
  boolean: {
    trueValue: {
      type: String
    },
    falseValue: {
      type: String
    }
  },
  multiple: [{
    type: String
  }],
  content: {
    type: String,
    required: true,
  },
  answers: [{
    type: Schema.ObjectId
  }]
});

const Question = mongoose.model('question', QuestionSchema);

module.exports = Question;
module.exports.questionTypes = questionTypes;
