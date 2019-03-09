const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create question Schema & model
const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["scale", "freetext", "boolean", "multiple"],
    required: true
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
    type: Boolean
  },
  multiple: [{
    type: String
  }],
  content: {
    type: String,
    required: true,
  }
});

const Question = mongoose.model('question', QuestionSchema);

module.exports = Question;
