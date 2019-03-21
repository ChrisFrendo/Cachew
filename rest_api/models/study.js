const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user');
const Question = require('../models/question');


var genres = ["Front End", "Back End", "Full Stack", "Java", "C", "Web Development", "Android", "Ios"];
var titles = ["Gender", "User Type", "Country", "Salaries", "Industry", "Timezone"];
// create study Schema & model
const StudySchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: Schema.ObjectId,
    // required: true
  },
  genres: [{
    type: String,
    enum: genres
  }],
  questions: [{
    type: Schema.ObjectId,
  }],
  targets: [{
    name:{
      type:String,
      enum:titles
    },
    value:{
      type:Schema.Types.Mixed
    }
  }],
  subscribers: [{
    type: String
  }]
});

const Study = mongoose.model('study', StudySchema);

module.exports = Study;
module.exports.genres = genres;
module.exports.titles = titles;
