const mongoose = require('mongoose');
const router = require('../routes/api');
const country = require('country-list');
// const Study = require('../models/study');
const Schema = mongoose.Schema;

var genders = ['Male', 'Female', 'Other'];
var userTypes = ['participant', 'researcher'];
var countries = country.getNames();
var jobRoles = ['.NET Developer', 'Application Developer', 'Application Support Analyst', 'Applications Engineer', 'Associate Developer', 'Chief Information Officer (CIO)', 'Chief Technology Officer (CTO)', 'Cloud Architect', 'Cloud Consultant', 'Cloud Product and Project Manager', 'Cloud Services Developer', 'Cloud Software and Network Engineer', 'Cloud System Administrator', 'Cloud System Engineer', 'Computer Network Architect', 'Computer Programmer', 'Computer Systems Analyst', 'Computer Systems Manager', 'Computer and Information Research Scientist', 'Computer and Information Systems Manager', 'Customer Support Administrator', 'Customer Support Specialist', 'Data Center Support Specialist', 'Data Quality Manager', 'Database Administrator', 'Desktop Support Manager', 'Desktop Support Specialist', 'Developer', 'Director of Technology', 'Front End Developer', 'Help Desk Specialist', 'Help Desk Technician', 'IT Analyst', 'IT Coordinator', 'IT Director', 'IT Manager', 'IT Support Manager', 'IT Support Specialist', 'IT Systems Administrator', 'Information Security', 'Java Developer', 'Junior Software Engineer', 'Management Information Systems Director', 'Network Administrator', 'Network Architect', 'Network Engineer', 'Network Systems Administrator', 'Network and Computer Systems Administrator', 'Programmer Analyst', 'Programmer', 'Security Specialist', 'Senior Applications Engineer', 'Senior Database Administrator', 'Senior Network Architect', 'Senior Network Engineer', 'Senior Network System Administrator', 'Senior Programmer Analyst', 'Senior Programmer', 'Senior Security Specialist', 'Senior Software Engineer', 'Senior Support Specialist', 'Senior System Administrator', 'Senior System Analyst', 'Senior System Architect', 'Senior System Designer', 'Senior Systems Software Engineer', 'Senior Web Administrator', 'Senior Web Developer', 'Software Architect', 'Software Developer', 'Software Engineer', 'Software Quality Assurance Analyst', 'Support Specialist', 'System Architect', 'Systems Administrator', 'Systems Analyst', 'Systems Designer', 'Systems Software Engineer', 'Technical Operations Officer', 'Technical Specialist', 'Technical Support Engineer', 'Technical Support Specialist', 'Telecommunications Specialist', 'Web Administrator', 'Web Developer', 'Webmaster'];

// create participant Schema & model
const UserSchema = new Schema({
  username:{
    type:String,
    unique: true,
    required:[true, 'username field is required']
  },
  password:{
    type:String,
    required:[true, 'password field is required']
  },
  usertype: {
    type: String,
    required: [true, 'usertype field is required'],
    enum: userTypes,
  },
  country: {
    type: String,
    enum: countries
  },
  gender: {
    type: String,
    enum: genders
  },
  dob:{
    type: Date
  },
  salary:{
    type: Number,
    min: 0
  },
  industry:{
    type: String
    // to add list here
  },
  yearsExp: {
    type: Number,
    min: 0,
    max: 65
  },
  jobrole: {
    type: String,
    enum: jobRoles
  },
  subscriptions: [{
    type: Schema.ObjectId
  }]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
module.exports.genders = genders;
module.exports.userTypes = userTypes;
module.exports.countries = countries;
module.exports.jobRoles = jobRoles;