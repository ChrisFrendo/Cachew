const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create participant Schema & model
const ParticipantSchema = new Schema({
  username:{
  type:String,
  required:[true, 'Username field is required'],
  unique:true
},
password:{
  type:String,
  required:[true, 'Password field is required']
},
dob:{
  type:Date,
  required:[true, 'Date of Birth is required to sign up']
},
salary:{
  type:Number,
  required:[true, 'Salary field is required']
},
industry:{
  type:String,
  required:[true, 'Industry field is required']
}
});

const Participant = mongoose.model('participant', ParticipantSchema);

module.exports = Participant;
