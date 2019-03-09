const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create participant Schema & model
const UserSchema = new Schema({
username:{
  type:String,
  unique: true,
  required:[true, 'Username field is required']
},
password:{
  type:String,
  required:[true, 'Password field is required']
},
usertype: {
  type: String,
  // required: [true, 'UserType field is required'],
  enum: ['participant', 'researcher'],
  default: 'researcher' // remove this after front-ends explicitly code this in their post request body
},
dob:{
  type:Date
  // required:[true, 'Date of Birth is required to sign up']
},
salary:{
  type:Number
  // required:[true, 'Salary field is required']
},
industry:{
  type:String
  // required:[true, 'Industry field is required']
}
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
