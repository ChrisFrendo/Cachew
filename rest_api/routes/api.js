const express = require('express');
const router = express.Router();
const Participant = require('../models/participant');
const Question = require('../models/question');
const Study = require('../models/study');

// Participant DB ROUTES

// get a list of participants from the db
router.get('/participant', function(req, res, next){
  // Participant.findOne({username: req.query.username}).then(function(participants){
  //   console.log(participants.password);
  //   res.send(participants.password);
  // }).catch(next);
});

router.get('/login', function(req, res, next){
  console.log('here');
  Participant.findOne({username: req.query.username, password: req.query.password}).then(function(participant){
    console.log(participant);
    if (participant !== null){
      res.status(200);
    } else {
      res.status(400);
    }
  }).catch(next);
});

//  add a new participants to the db
router.post('/participant', function(req, res, next){
  Participant.create(req.body).then(function(participant){
    console.log("successfuly handled participant post request");
    res.status(200).send(participant);
  }).catch(next);
});

// update a participants in the db
router.put('/participant/:id', function(req, res, next){
  res.send({type: 'PUT'});
});

// delete a participants from the db
router.delete('/participant/:id', function(req, res, next){
  Participant.findOneAndDelete({_id: req.params.id}).then(function(student){
    res.send(student);
  });
});

// Question DB ROUTES

// get a list of questions from the db
router.get('/question', function(req, res, next){
  res.send({type: 'GET'});
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
