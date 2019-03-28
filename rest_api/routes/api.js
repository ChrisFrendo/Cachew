const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const Question = require('../models/question');
const Study = require('../models/study');
const Answer = require('../models/answers')
var bcrypt = require('bcrypt');
var jwt    = require('jsonwebtoken');
var app = express();

app.set('superSecret', 'someSecret');

// reference endpoints

// all return array of strings
router.get('/references/users/genders', function(req, res, next){
  res.status(200).send(User.genders);
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

       }
       console.log("tokenised successfuly");
       res.status(200).send({token: token});
    })
    .catch(function(error){
        console.log("Error authenticating user");
        console.log(error);
        next();
    });
}

//  add a new participants to the db
router.post('/register', function(req, res, next){
console.log(req.body);

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
if(req.body.type === Question.questionTypes[3]){
  req.body.multiple = req.body.multiple.split('\n');
}
  Question.create(req.body, function(err, question){

    if(err){
    res.status(400).send(err.message);
    next();
  }
  res.status(200).send(question);
  });

    console.log("successfuly handled question post request");
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
        await (Question.findOne({$and: [{_id: studies[i].questions[j]}, {time: null}]}).then( async function(question){
            if (question != null){
              notifs[i]++;
            }
        }));
        await (Question.findOne({$and: [{_id: studies[i].questions[j]}, {time: {$ne: null}}]}).then( async function(question){
            if (question != null){
              flag[i] = true;
            }
        }));
      }
    }

    res.status(200).send({array: studies, notifications: notifs, flag: flag});
  });
});



// get a list of studies which the user is not subscribed to from the db
router.get('/study/notsubscribed', function(req, res, next){
  // console.log(req.query.genres);
  if (req.query.genres == "all"){
    Study.find({$and:[{subscribers: {$ne: req.decoded.username}}, {title: {$regex : req.query.title}}]}, {title: 1}, function(err, studies){
      if (err){
        res.status(400).send(err.message);
        return;
      }
      res.status(200).send({array: studies});
  });
} else {
  Study.find({$and:[{subscribers: {$ne: req.decoded.username}}, {title: {$regex : req.query.title}}, {genres: {$all: req.query.genres}}]}, {title: 1}, function(err, studies){
    if (err){
      res.status(400).send(err.message);
      next();
    }
    res.status(200).send({array: studies});
});
}
});

//  add a new study to the db
router.post('/study', function(req, res, next){
  Study.create(req.body).then(function(study){
    console.log("successfuly handled study post request");
    res.status(200).send(study);
  }).catch(next);
});


// update a subscriber to a study in the db
router.put('/study', function(req, res, next){

    User.findOneAndUpdate({username: req.decoded.username}, {$push: {subscriptions: req.body.studyID}}).then(function(){
      Study.findOneAndUpdate({_id: req.body.studyID}, {$push: {subscribers: req.decoded.username}}).then(function() {
        Study.find({subscribers: {$ne: req.decoded.username}}, {title: 1}, function(err, studies){
          if (err){
            res.status(400).send(err.message);
            next();
          }
          res.status(200).send({array: studies});
        });
      })
    })

});

// remove a subscriber from a study
router.put('/study/subscribed', function(req, res, next){
  User.findOneAndUpdate({username: req.decoded.username}, {$pull: {subscriptions: req.body.studyID}}).then(function(){
    Study.findOneAndUpdate({_id: req.body.studyID}, {$pull: {subscribers: req.decoded.username}}).then(function() {
      Study.find({subscribers: req.decoded.username}, {title: 1}, function(err, studies){
        if (err){
          res.status(400).send(err.message);
          next();
        }
        res.status(200).send({array: studies});
      });
    })
  })
});

module.exports = router;
