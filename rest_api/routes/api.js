const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Question = require('../models/question');
const Study = require('../models/study');
const Answer = require('../models/answer');
var bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken');
var app = express();
const cron = require('node-cron');
const {PubSub} = require('@google-cloud/pubsub');
require('dotenv').config();
var admin = require('firebase-admin');

var request = require('request');

var serviceAccount = require("../key-firebase.json");

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const pubsub = new PubSub('testprojectchris');

app.set('superSecret', 'someSecret');

// cron job
cron.schedule("* * * * *", async function() {
  Study.find().then(async function(studies){
    for (var i = 0; i < studies.length; i++) {
      for (var j = 0; j < studies[i].questions.length; j++) {
        var condition = "'study_"+ studies[i].id+"' in topics";
        var title = "Study '" + studies[i].title + "' has a new question to answer";
        var question = await (Question.findOne({_id: studies[i].questions[j]}))
        // console.log(studies[i].title);

        var currentTime = new Date();
        var hours = ('0'+currentTime.getHours()).slice(-2);
        var mins = ('0'+currentTime.getMinutes()).slice(-2);
        var time = hours + ":" + mins;
        currentUserTime = Date.parse(currentTime);

        // console.log(question);

        if (question.time != null){

          var questionDate = Date.parse(question.time);
          var difference = Math.abs((currentUserTime - questionDate));

          if (difference <= 30000){
            var message = {
              notification: {
                title: title,
                body: question.title + " is available to answer"
              },
              topic: "study_"+studies[i].id
            };

            admin.messaging().send(message)
            .then((response) => {
              // Response is a message ID string.
              console.log('Successfully sent message:', response);
            })
            .catch((error) => {
              console.log('Error sending message:', error);
            });
          }
        } else if (question.daily.length != 0 && currentUserTime < Date.parse(question.terminationDate)){
          for (var k = 0; k < question.daily.length; k++) {
            // console.log(time + ": " + question.daily[k]);
            if (time === question.daily[k]) {
              // console.log(question._id);
              var message = {
                notification: {
                  title: title,
                  body: question.title + " is available to answer"
                },
                condition: condition
              };
              // console.log(message);

              admin.messaging().send(message)
              .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
              })
              .catch((error) => {
                console.log('Error sending message:', error);
              });
            }
          }
        } else if (question.weeklyDay.length != 0 && question.weeklyTime.length != 0 && currentUserTime < Date.parse(question.terminationDate)){
          // console.log("In weekly branch");
          for (var k = 0; k < question.weeklyDay.length; k++) {
            // console.log("TIME:"+ time);
            // console.log("Question TIme: " + question.weeklyTime);
            if (time == question.weeklyTime) {
              // console.log("weeklyTime test passed");
              for (var l = 0; l < Question.days.length; l++) {
                if (currentTime.getDay() == l && question.weeklyDay[k] == Question.days[l]){
                  var message = {
                    notification: {
                      title: title,
                      body: question.title + " is available to answer"
                    },
                    condition: condition
                  };

                  admin.messaging().send(message)
                  .then((response) => {
                    // Response is a message ID string.
                    console.log('Successfully sent message:', response);
                  })
                  .catch((error) => {
                    console.log('Error sending message:', error);
                  });
                  break;
                }
              }

            }
          }
        }
      }
    }
  });
});


// reference endpoints

// all return array of strings
router.get('/references/users/genders', function(req, res, next){
  res.status(200).send(JSON.stringify({array: User.genders}));
});

router.get('/references/users/usertypes', function(req, res, next){
  res.status(200).send(User.userTypes);
});

router.get('/references/users/countries', function(req, res, next){
  res.status(200).send(JSON.stringify({array: User.countries}));
});

router.get('/references/users/jobroles', function(req, res, next){
  res.status(200).send(JSON.stringify({array: User.jobRoles}));
});

router.get('/references/users/salaries', function(req, res, next){
  res.status(200).send(JSON.stringify({array: User.salaries}));
});

router.get('/references/users/industry', function(req, res, next){
  res.status(200).send(JSON.stringify({array: User.industries}));
});

router.get('/references/users/timezone', function(req, res, next){
  res.status(200).send(JSON.stringify({array: User.timezone}));
});

router.get('/references/questions/questiontypes', function(req, res, next){
  res.status(200).send(JSON.stringify({array: Question.questionTypes}));
});

router.get('/references/study/genres', function(req, res, next){
  res.status(200).send(JSON.stringify({array: Study.genres}));
});

router.get('/references/study/targets', function(req, res, next){
  res.status(200).send(JSON.stringify({array: Study.targets}));
});

router.get('/references/question/days', function(req, res, next){
  res.status(200).send(JSON.stringify({array: Question.days}));
});

router.get('/references/question/times', function(req, res, next){
  res.status(200).send(JSON.stringify({array: Question.times}));
});

router.get('/usernamegen', function(req, res, next){
  var generateName = require('sillyname');
  var sillyName = generateName();

  var username = sillyName.split(" ");

  res.status(200).send({username: username[0]});
});

router.get('/login/participant', function(req, res, next){
  validateLogin('participant', req, res, next);
});

router.get('/login/researcher', function(req, res, next){
  validateLogin('researcher', req, res, next);
});

function validateLogin(userTypeCheck, req, res, next){
  var username = req.query.username;
  var password = req.query.password;

  console.log(username);

  User.findOne({username: username})
  .then(function(user) {
    if (user.usertype === userTypeCheck){
      return bcrypt.compare(password, user.password);
    } else {
      return false;
    }
  }).catch(function(err){

    return false;
  })
  .then(function(samePassword) {
    console.log(samePassword);
    if(!samePassword) {
      res.status(403).send("Username or password Incorrect");
    } else {

      const payload = {
        username: username
      };
      var token = jwt.sign(payload, app.get('superSecret'), {
        expiresIn: 86400
      });

      console.log("tokenised successfuly");
      res.status(200).send({token: token});
    }
  })
  .catch(function(error){
    console.log("Error authenticating user");
    console.log(error);
    next();
  });
}

//  add a new participants to the db
router.post('/register', function(req, res, next){
  // console.log(req.body);

  var password = req.body.password;
  var BCRYPT_SALT_ROUNDS = 12;

  bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
  .then(function(hashedPassword) {
    req.body.password = hashedPassword;
    return User.create(req.body).then(function(user){
      console.log("successfuly handled user post request");
      res.status(200).send(user);
    }).catch(function(error){
      console.log(error);
      res.status(400).send(error.message);
    });
  })
  .then(function() {
    res.send();
  })
  .catch(function(error){
    console.log("Error saving user: ");
    console.log(error);
    next();
  });
});

// route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err){
        res.send({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }

});

// Get username
router.get('/users/username', function(req, res, next){
  var username = req.decoded.username;
  res.status(200).send(username);
});

// Get user id
router.get('/users/userID', function(req, res, next){
  User.findOne({username: req.decoded.username}, {_id: 1}).then(function(user) {
    res.status(200).send(user._id);
  })
});

//  add a new question to the db
router.post('/question', function(req, res, next){

  console.log(req.body);
  if(req.body.type === Question.questionTypes[3]){
    req.body.multiple = req.body.multiple.split('\n');
  }
  User.findOne({username: req.decoded.username}, function(err, user){
    var gmtUser;
    if (user.timezones.includes("+")){
      gmtUser = parseInt(user.timezones.split("+").pop());
    } else {
      gmtUser = parseInt("-"+user.timezones.split("-").pop());
    }
    gmtUser = 2-gmtUser;

    if (req.body.time != null){
      var test = new Date(req.body.time);
      console.log(test);
      test.setHours(test.getHours()+gmtUser);
      req.body.time = test;
    } else {

      if (req.body.daily.length != 0){
        var termination = new Date(req.body.terminationDate);
        termination.setHours(termination.getHours()+gmtUser);
        req.body.terminationDate = termination;
        for (var k = 0; k < req.body.daily.length; k++) {
          var time = new Date('1970-01-01T' + req.body.daily[k] + 'Z');
          console.log(time);
          console.log(gmtUser);
          time.setHours(time.getHours()+gmtUser-1);
          console.log(time);
          var hours = ('0'+time.getHours()).slice(-2);
          var mins = ('0'+time.getMinutes()).slice(-2);
          req.body.daily[k] = (hours + ":" + mins);
          console.log(req.body.daily[k]);
        }
      } else if (req.body.weeklyDay.length != 0 && req.body.weeklyTime.length != 0){
        var termination = new Date(req.body.terminationDate);
        termination.setHours(termination.getHours()+gmtUser);
        req.body.terminationDate = termination;
        var time = new Date('1970-01-20T' + req.body.weeklyTime + 'Z');
        console.log(time);
        console.log(gmtUser);
        time.setHours(time.getHours()+gmtUser-1);
        console.log(time);
        var hours = ('0'+time.getHours()).slice(-2);
        var mins = ('0'+time.getMinutes()).slice(-2);
        req.body.weeklyTime = (hours + ":" + mins);

        if (time.getDate()-20 != 0){
          for (var k = 0; k < req.body.weeklyDay.length; k++) {
            for (var p = 0; p < Question.days.length; p++) {
              if (req.body.weeklyDay[k] === Question.days[p]){
                req.body.weeklyDay[k] = Question.days[(p+(time.getDate()-20)%p)];
              }
            }
          }
        }

      }
    }

    Question.create(req.body, function(err, question){

      if(err){
        res.status(400).send(err.message);
        next();
      } else {
        res.status(200).send(question);
        console.log(question);
        console.log("successfuly handled question post request");
      }
    });
  });

});

// used to retrieve a list of available questions which have not already been answered
router.get('/question', async function(req, res, next){
  Study.findOne({_id: req.query.studyID}, async function(err, study){
    User.findOne({username: req.decoded.username}, async function(err2, user){

      // console.log(user);

      if(err){
        res.status(400).send(err.message);
        next();
      } else if (err2){
        res.status(400).send(err2.message);
        next();
      }
      var questions =[];
      // console.log("STUDY ID" + req.query.studyID);

      for (var j = 0; j < study.questions.length; j++) {
        await (Question.findOne({_id: study.questions[j]}).then( async function(question){
          var answered = false;
          if (question != null){

            if (question.time != null){

              currentUserTime = new Date();

              var gmtUser;
              if (user.timezones.includes("+")){
                gmtUser = parseInt(user.timezones.split("+").pop());
              } else {
                gmtUser = parseInt("-"+user.timezones.split("-").pop());
              }
              gmtUser = 2-gmtUser;

              currentUserTime.setHours(currentUserTime.getHours()+gmtUser)

              console.log("USERTIME: " + currentUserTime);
              console.log("QUESTION TIME: " + question.time);

              currentUserTime = Date.parse(currentUserTime);


              var questionDate = Date.parse(question.time);
              console.log("Question time: " +(questionDate));

              var difference = Math.abs((currentUserTime - questionDate));

              if (difference <= 300000){
                if (question.answers != []){
                  for (var i = 0; i < question.answers.length; i++) {
                    await (Answer.findOne({_id: question.answers[i], user: req.decoded.username}).then( async function(answer) {
                      if(answer){
                        answered = true;
                      }
                    }));
                    if (answered){
                      break;
                    }
                  }
                  if (!answered){
                    questions[j] = question;
                  }  else {
                    questions[j] = null;
                  }
                } else {
                  questions[j] = question;
                }
              }
            } else if (question.daily.length != 0){
              if (Date.parse(new Date()) < Date.parse(question.terminationDate)){

                for (var k = 0; k < question.daily.length; k++) {
                  var currentUserTime = new Date();
                  var questionTime = new Date('1970-01-01T' + question.daily[k] + 'Z');
                  // console.log("USER MINS " + currentUserTime.getMinutes());
                  // console.log("QUESTION MINS " + questionTime.getMinutes());
                  var minsDifference = Math.abs(currentUserTime.getMinutes() - questionTime.getMinutes());
                  questionTime.setHours(questionTime.getHours() - 1);

                  if (questionTime.getHours() === currentUserTime.getHours() && minsDifference <= 2) {
                    questions[j] = question;
                  }
                }
              }
            } else if (question.weeklyDay.length != 0 && question.weeklyTime.length != 0){
              if (Date.parse(new Date()) < Date.parse(question.terminationDate)){
                for (var k = 0; k < question.weeklyDay.length; k++) {
                  // console.log("TIME:"+ time);
                  // console.log("Question TIme: " + question.weeklyTime);
                  var currentUserTime = new Date();
                  var questionTime = new Date('1970-01-01T' + question.weeklyTime + 'Z');
                  var minsDifference = Math.abs(currentUserTime.getMinutes() - questionTime.getMinutes());

                  if (minsDifference <= 2) {
                    // console.log("weeklyTime test passed");
                    for (var l = 0; l < Question.days.length; l++) {
                      if (currentUserTime.getDay() == l && question.weeklyDay[k] == Question.days[l]){
                        questions[j] = question;
                        break;
                      }
                    }

                  }
                }
              }
            } else {
              if (question.answers != []){
                for (var i = 0; i < question.answers.length; i++) {
                  await (Answer.findOne({_id: question.answers[i], user: req.decoded.username}).then( async function(answer) {
                    if(answer){
                      answered = true;
                    }
                  }));
                  if (answered){
                    break;
                  }
                }
                if (!answered){
                  questions[j] = question;
                }  else {
                  questions[j] = null;
                }
              } else {
                questions[j] = question;
              }
            }
          }
        }));
      }

      if (questions == null){
        // console.log("NULL");
        res.send(200).send(null);
      } else {
        // console.log(questions);
        res.status(200).send({array : questions});
      }
    });
  });
});

// Study DB ROUTES
// get a list of subscribed to studies from the db
router.get('/study/subscribed', async function(req, res, next){
  Study.find({subscribers: req.decoded.username}, {title: 1, questions: 1}, async function(err, studies){
    if (err){
      res.status(400).send(err.message);
      next();
    }
    // console.log(studies);
    var notifs = [];
    var flag = [];
    for (var i = 0; i < studies.length; i++) {
      notifs[i] = 0;
      flag[i] = false;
      for (var j = 0; j < studies[i].questions.length; j++) {

        await (Question.findOne({_id: studies[i].questions[j]}).then( async function(question){
          var answered = false;

          if (question != null){
            await User.findOne({username: req.decoded.username}).then( async function(user){
              currentUserTime = new Date();

              var gmtUser;
              if (user.timezones.includes("+")){
                gmtUser = parseInt(user.timezones.split("+").pop());
              } else {
                gmtUser = parseInt("-"+user.timezones.split("-").pop());
              }
              gmtUser = 2-gmtUser;

              currentUserTime.setHours(currentUserTime.getHours()+gmtUser)
              currentUserTime = Date.parse(currentUserTime);

              if (question.time != null){
                if (question.daily.length == 0){
                  var questionDate = Date.parse(question.time);

                  var difference = Math.abs((currentUserTime - questionDate));

                  if (difference <= 300000){
                    if (question.answers != []){
                      for (var l = 0; l < question.answers.length; l++) {
                        var answer = await (Answer.findOne({_id: question.answers[l]}));
                        // console.log("ANSWER" + answer);
                        if (answer == null){
                          answered = false;
                        } else if (answer.user == req.decoded.username){
                          answered = true;
                          break;
                        }
                      }
                      if (!answered){
                        notifs[i]++;
                      }
                    } else {
                      console.log("HERE2");
                      notifs[i]++;
                    }
                  } else if (questionDate > currentUserTime){
                    flag[i] = true;
                  }
                }
              } else if (question.daily.length != 0){
                if (Date.parse(new Date()) < Date.parse(question.terminationDate)){
                  for (var k = 0; k < question.daily.length; k++) {
                    var currentUserTime = new Date();
                    var questionTime = new Date('1970-01-01T' + question.daily[k] + 'Z');
                    // console.log("USER MINS " + currentUserTime.getMinutes());
                    // console.log("QUESTION MINS " + questionTime.getMinutes());
                    var minsDifference = Math.abs(currentUserTime.getMinutes() - questionTime.getMinutes());
                    questionTime.setHours(questionTime.getHours() - 1);


                    if (questionTime.getHours() === currentUserTime.getHours() && minsDifference <= 2) {
                      notifs[i]++;
                    } else if (questionTime.getHours() >= currentUserTime.getHours()){
                      flag[i] = true;
                    }
                  }
                }
              }  else if (question.weeklyDay.length != 0 && question.weeklyTime.length != 0){
                if (Date.parse(new Date()) < Date.parse(question.terminationDate)){

                  for (var k = 0; k < question.weeklyDay.length; k++) {
                    // console.log("TIME:"+ time);
                    // console.log("Question TIme: " + question.weeklyTime);
                    var currentUserTime = new Date();
                    var questionTime = new Date('1970-01-01T' + question.weeklyTime + 'Z');
                    var minsDifference = Math.abs(currentUserTime.getMinutes() - questionTime.getMinutes());

                    if (minsDifference <= 2) {
                      // console.log("weeklyTime test passed");
                      for (var l = 0; l < Question.days.length; l++) {
                        if (currentUserTime.getDay() == l && question.weeklyDay[k] == Question.days[l]){
                          notifs[i]++;
                          break;
                        }
                      }
                    } else {
                      flag[i] = true;
                    }
                  }
                }
              } else {
                if (question.answers != []){
                  for (var l = 0; l < question.answers.length; l++) {
                    var answer = await (Answer.findOne({_id: question.answers[l]}));
                    // console.log("ANSWER" + answer);
                    if (answer == null){
                      answered = false;
                    } else if (answer.user == req.decoded.username){
                      // console.log("ANSWERED");
                      answered = true;
                      break;
                    }
                  }
                  if (!answered){
                    // console.log("HERE");
                    notifs[i]++;
                  }
                } else {
                  // console.log("HERE2");
                  notifs[i]++;
                }
                // console.log(notifs);
              }
            });

          }
        }));
      }
    }

    res.status(200).send({array: studies, notifications: notifs, flag: flag});
  });
});

// get a list of studies which the user is not subscribed to from the db
router.get('/study/notsubscribed', async function(req, res, next){
  // console.log(req.query.genres);
  if (req.query.genres == "all"){
    Study.find({$and:[{subscribers: {$ne: req.decoded.username}}, {title: {$regex : req.query.title}}]}, {title: 1, targets: 1}, async function(err, studies){
      if (err){
        res.status(400).send(err.message);
        return;
      }
      studies = await (validateTargets(res, req, studies));
      // console.log(studies);
      res.status(200).send({array: studies});
    });
  } else {
    var genres = req.query.genres.split(',');
    // console.log(genres.length);
    Study.find({$and:[{subscribers: {$ne: req.decoded.username}}, {title: {$regex : req.query.title}}, {genres: {$all: genres}}]}, {title: 1, targets: 1}, async function(err, studies){
      if (err){
        res.status(400).send(err.message);
        next();
      }
      studies = await (validateTargets(res, req, studies));
      // console.log(studies);
      res.status(200).send({array: studies});

    });
  }
});

async function validateTargets(res, req, studies){
  await (User.findOne({username: req.decoded.username}, {student: 1, country: 1, gender: 1, salary: 1, industry: 1, jobrole: 1, yearsExp: 1}, async function(err, user){
    if (err){
      res.status(400).send(err.message);
      return;
    }

    var i = 0;
    while (i < studies.length) {
      var deleted = false;
      for (var j = 0; j < studies[i].targets.length; j++) {

        if (studies[i].targets[j].name == Study.targets[0] && user.gender != studies[i].targets[j].value){ // validating Gender
          studies.splice(i,1);
          i = 0;
          deleted=true;
          break;
        } else if (studies[i].targets[j].name == Study.targets[1] && user.student != studies[i].targets[j].value){ //validating student
          studies.splice(i,1);
          i = 0;
          deleted=true;
          break;
        } else if (studies[i].targets[j].name == Study.targets[2] && user.country != studies[i].targets[j].value){ //validating country
          studies.splice(i,1);
          i = 0;
          deleted=true;
          break;
        } else if (studies[i].targets[j].name == Study.targets[3] && user.salary != studies[i].targets[j].value){ //validating salary
          studies.splice(i,1);
          i = 0;
          deleted=true;
          break;
        } else if (studies[i].targets[j].name == Study.targets[4] && user.industry != studies[i].targets[j].value){ //validating industry
          studies.splice(i,1);
          i = 0;
          deleted=true;
          break;
        } else if (studies[i].targets[j].name == Study.targets[5] && user.yearsExp != studies[i].targets[j].value){ //validating years of exp
          studies.splice(i,1);
          i = 0;
          deleted=true;
          break;
        } else if (studies[i].targets[j].name == Study.targets[6] && user.jobrole != studies[i].targets[j].value){ //validating jobrole
          studies.splice(i,1);
          i = 0;
          deleted=true;
          break;
        }
      }
      if (!deleted){
        i++;
      }
    }
    return studies;
  }));
  return studies;
}

//  add a new study to the db
router.post('/study', async function(req, res, next){
  console.log(req.body);
  Study.create(req.body).then( async function(study){
    console.log("successfuly handled study post request");

    var topicName = "study_" + study._id;

    pubsub.createTopic(topicName).catch(err => {
      console.error("ERROR: ", err);
    });
    console.log("Added pubsub topic");

    res.status(200).send(study);
  }).catch(next);
});


router.put('/fcm', async function(req, res, next){
  User.findOneAndUpdate({username: req.decoded.username}, {fcmToken: req.body.fcmToken}).then(function(user){
    console.log(user);
    res.status(200).send();
  });
});

// update a subscriber to a study in the db
router.put('/study', async function(req, res, next){
  User.findOneAndUpdate({username: req.decoded.username}, {$push: {subscriptions: req.body.studyID}}).then(function(user){
    Study.findOneAndUpdate({_id: req.body.studyID}, {$push: {subscribers: req.decoded.username}}).then(function(study) {
      var topicName = "study_" + study._id;
      var fcmToken = user.fcmToken;
      admin.messaging().subscribeToTopic(fcmToken, topicName).then(function(response){
        console.log('Successfully subscribed to topic:', response);
      }).catch(function(error){
        console.log('Error subscribing to topic: ', error);
      });
      // var subscriptionName = user.username + "_" + study._id;
      // pubsub.topic(topicName).createSubscription(subscriptionName);
      res.status(200).send();
    })
  })

});

// remove a subscriber from a study
router.put('/study/subscribed', function(req, res, next){
  User.findOneAndUpdate({username: req.decoded.username}, {$pull: {subscriptions: req.body.studyID}}).then(function(user){
    Study.findOneAndUpdate({_id: req.body.studyID}, {$pull: {subscribers: req.decoded.username}}).then(function(study) {
      var subscriptionName = user.username + "_" + study._id;
      pubsub.subscription(subscriptionName).delete();
      res.status(200).send();
    })
  })
});

// delete a question from the db
router.delete('/question', function(req, res, next){
  Question.findOneAndDelete({_id: req.body.id}).then(function() {
    res.status(200).send();
  })
});

// add an answer to a question
router.put('/answer', function(req, res, next){
  req.body.answer.user = req.decoded.username;
  Answer.create(req.body.answer).then(function(answer){
    Question.findOneAndUpdate({_id: req.body.id}, {$push: {answers: answer._id}}).then(function(){
      res.status(200).send();
    })
  })
});

router.get('/report', function(req, res, next){
  // console.log("here");
  User.findOne({username : req.decoded.username}, {_id : 1}, function(err, user){
    // console.log(username);
    if(err){
      res.status(400).send(err.message);
      next();
    }

    Study.find({userId : user._id}, {title : 1, questions : 1}, function(err2, studies){
      console.log({array:studies});
      res.status(200).send({array:studies});
      if(err){
        res.status(400).send(err2.message);
        next();
      }
    })
  })

});

router.get('/getData', async function(req,res,next){
  // console.log(req.body.studyID);
  Study.findOne({_id: req.query.studyID}, async function(err, study){
    console.log(req.query.studyID);
    var dataLabels = [];
    var dataValues = [];
    var questionNames = [];
    console.log(study);
    for (var i = 0; i < study.questions.length; i++) {
      var question = await (Question.findOne({_id: study.questions[i]}));
      var labels = [];
      var values = [];
      questionNames[i] = question.title;

      // var answers = question.answers;
      if (question.type == "Boolean"){
        labels[0] = question.boolean.trueValue;
        labels[1] = question.boolean.falseValue;
        // console.log("ANSWER: " + answer.booleanAnswer);
        // console.log("TRUE: " + question.boolean.trueValue);

        values[0] = 0;
        values[1] = 0;
        // console.log(values);
      } else if (question.type == "Multiple Choice"){
        for (var j = 0; j < question.multiple.length; j++) {
          labels[j] = question.multiple[j];
          // console.log("LENGTH: " + labels.length);
          values[j] = 0;
        }
      } else if (question.type == "Scale"){
        for (var j = question.scale.min; j <= question.scale.max; j++) {
          labels[j-question.scale.min] = ""+j;
          values[j-question.scale.min] = 0;
        }
      }

      for (var k = 0; k < question.answers.length; k++) {

        var answer = await (Answer.findOne({_id: question.answers[k]}));

        if (question.type == "Boolean"){
          if (answer.booleanAnswer == question.boolean.trueValue){
            values[0]++;
          } else {
            values[1]++;
          }
        } else if (question.type == "Multiple Choice"){
          for (var j = 0; j < answer.multAnswer.length; j++) {
            for (var o = 0; o < labels.length; o++) {
              if (answer.multAnswer[j] == labels[o]){
                values[o]++;
              }
            }
          }
          // console.log("VALUES: " + values);
        } else if (question.type == "Scale"){
          for (var j = 0; j < labels.length; j++) {
            if ((""+answer.scaleAnswer) == labels[j]){
              values[j]++;
            }
          }
        } else if (question.type == "Free Text"){
          values.push(answer.freetextAnswer);
        }
        // console.log(answer);

      }
      dataLabels[i] = labels;
      dataValues[i] = values;
    }
    console.log("QUESTION NAMES " + questionNames);
    res.status(200).send({labels: dataLabels, values: dataValues, titles: questionNames});
  });
});

module.exports = router;
