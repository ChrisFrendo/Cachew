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
  res.status(200).send(User.countries);
});

router.get('/references/users/jobroles', function(req, res, next){
  res.status(200).send(User.jobRoles);
});

router.get('/references/questions/questiontypes', function(req, res, next){
  res.status(200).send(Question.questionTypes);
});

router.get('/references/study/genres', function(req, res, next){
  res.status(200).send(Study.genres);
});

// user DB ROUTES

// get a list of participants from the db
router.get('/user', function(req, res, next){
  // Participant.findOne({username: req.query.username}).then(function(participants){
  //   console.log(participants.password);
  //   res.send(participants.password);
  // }).catch(next);
});

router.get('/usernamegen', function(req, res, next){
  var generateName = require('sillyname');
  var sillyName = generateName();

  var username = sillyName.split(" ");

  res.status(200).send({username: username[0]});
});

router.post('/login/participant', function(req, res, next){
  validateLogin('participant', req, res, next);
});

router.post('/login/researcher', function(req, res, next){
  validateLogin('researcher', req, res, next);
});

function validateLogin(userTypeCheck, req, res, next){
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username})
    .then(function(user) {
      if (user.usertype === userTypeCheck){
        return bcrypt.compare(password, user.password);
      } else {
        res.status(401).send();
      }
    }).catch(function(err){
      res.status(403).send("Username or password Incorrect");
      next();
    })
    .then(function(samePassword) {
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
  var password = req.body.password;
  var BCRYPT_SALT_ROUNDS = 12;

  bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
    .then(function(hashedPassword) {
      req.body.password = hashedPassword;
        return User.create(req.body).then(function(user){
          console.log("successfuly handled user post request");
          res.status(200).send(user);
        }).catch(function(error){
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

// update a participants in the db
router.put('/user/:id', function(req, res, next){
  res.send({type: 'PUT'});
});

// delete a participants from the db
router.delete('/user/:id', function(req, res, next){
  User.findOneAndDelete({_id: req.params.id}).then(function(student){
    res.send(student);
  });
});

// Question DB ROUTES

// get a list of questions from the db
router.get('/question', function(req, res, next){
  User.findOne({username: req.username}).then(function(user){
    res.send({username: req.decoded.username});
  })

});

//  add a new question to the db
router.post('/question', function(req, res, next){
  Question.create(req.body).then(function(question){
    console.log("successfuly handled question post request");
    res.status(200).send(question);
  }).catch(next);
});

// update a question in the db
router.put('/question/:id', function(req, res, next){
  res.send({type: 'PUT'});
});

// delete a question from the db
router.delete('/question/:id', function(req, res, next){
  Question.findOneAndDelete({_id: req.params.id}).then(function(question){
    res.send(question);
  });
});


// Study DB ROUTES

// get a list of studies from the db
router.get('/study', function(req, res, next){
  res.send({type: 'GET'});
});

//  add a new study to the db
router.post('/study', function(req, res, next){
  Study.create(req.body).then(function(study){
    console.log("successfuly handled study post request");
    res.status(200).send(study);
  }).catch(next);
});

// update a study in the db
router.put('/study/:id', function(req, res, next){
  res.send({type: 'PUT'});
});

// delete a study from the db
router.delete('/study/:id', function(req, res, next){
  Study.findOneAndDelete({_id: req.params.id}).then(function(question){
    res.send(question);
  });
});

module.exports = router;
