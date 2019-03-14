const mongoose = require('mongoose');
const router = require('../routes/api');
const country = require('country-list');
// const Study = require('../models/study');
const Schema = mongoose.Schema;

var genders = ['Male', 'Female', 'Other'];
var userTypes = ['participant', 'researcher'];
var countries = country.getNames();
var jobRoles = ['.NET Developer', 'Application Developer', 'Application Support Analyst', 'Applications Engineer', 'Associate Developer', 'Chief Information Officer (CIO)', 'Chief Technology Officer (CTO)', 'Cloud Architect', 'Cloud Consultant', 'Cloud Product and Project Manager', 'Cloud Services Developer', 'Cloud Software and Network Engineer', 'Cloud System Administrator', 'Cloud System Engineer', 'Computer Network Architect', 'Computer Programmer', 'Computer Systems Analyst', 'Computer Systems Manager', 'Computer and Information Research Scientist', 'Computer and Information Systems Manager', 'Customer Support Administrator', 'Customer Support Specialist', 'Data Center Support Specialist', 'Data Quality Manager', 'Database Administrator', 'Desktop Support Manager', 'Desktop Support Specialist', 'Developer', 'Director of Technology', 'Front End Developer', 'Help Desk Specialist', 'Help Desk Technician', 'IT Analyst', 'IT Coordinator', 'IT Director', 'IT Manager', 'IT Support Manager', 'IT Support Specialist', 'IT Systems Administrator', 'Information Security', 'Java Developer', 'Junior Software Engineer', 'Management Information Systems Director', 'Network Administrator', 'Network Architect', 'Network Engineer', 'Network Systems Administrator', 'Network and Computer Systems Administrator', 'Programmer Analyst', 'Programmer', 'Security Specialist', 'Senior Applications Engineer', 'Senior Database Administrator', 'Senior Network Architect', 'Senior Network Engineer', 'Senior Network System Administrator', 'Senior Programmer Analyst', 'Senior Programmer', 'Senior Security Specialist', 'Senior Software Engineer', 'Senior Support Specialist', 'Senior System Administrator', 'Senior System Analyst', 'Senior System Architect', 'Senior System Designer', 'Senior Systems Software Engineer', 'Senior Web Administrator', 'Senior Web Developer', 'Software Architect', 'Software Developer', 'Software Engineer', 'Software Quality Assurance Analyst', 'Support Specialist', 'System Architect', 'Systems Administrator', 'Systems Analyst', 'Systems Designer', 'Systems Software Engineer', 'Technical Operations Officer', 'Technical Specialist', 'Technical Support Engineer', 'Technical Support Specialist', 'Telecommunications Specialist', 'Web Administrator', 'Web Developer', 'Webmaster'];
var salaries = [18000, 20000, 22000, 24000, 26000, 28000, 30000, 35000, 40000, 45000, 50000, 60000, 80000, 100000];
var industries = ['Software Developer/Engineer', 'Computer Network Specialist', 'Manufacturing (OEM)',
'IT Engineer', 'iGaming', 'Video Games (Related)', 'Payment Processing', 'Information Technology Leadership',
'Cloud Computing', 'Computer Support', 'Database Administrator', 'Information Technology Analyst',
'Information Security Specialist', 'Web Developer'];

var timezone = ['GMT', 'GMT+1', 'GMT+2', 'GMT+3', 'GMT+3.30', 'GMT+4', 'GMT+4.30', 'GMT+5', 'GMT+5.30', 'GMT+6', 'GMT+6.30', 'GMT+7',
'GMT+8', 'GMT+8', 'GMT+9', 'GMT+9.30', 'GMT+10', 'GMT+10.30', 'GMT+11', 'GMT+11.30', 'GMT+12', 'GMT-1', 'GMT-2',
'GMT-3', 'GMT-3.30', 'GMT-4', 'GMT-5', 'GMT-6', 'GMT-7', 'GMT-8', 'GMT-8.30', 'GMT-9', 'GMT-9.30', 'GMT-10',
'GMT-11', 'GMT-12'];
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
    enum: salaries
  },
  industry:{
    type: String,
    enum:industries
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
  }],
  timezones:{
    type:String,
    enum:timezone,
    required:[true, 'TimeZone is required']
  },
  student: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
module.exports.genders = genders;
module.exports.userTypes = userTypes;
module.exports.countries = countries;
module.exports.jobRoles = jobRoles;
module.exports.industries = industries;
module.exports.timezones = timezone;
module.exports.salaries = salaries;
