const express = require('express');
const router = express.Router();
require('mongoose');
const axios = require("axios");
const Answer = require("./models/answer");
const Question = require("./models/question");

// get list of rooms
router.post('/places', (req, res) => {
    axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+req.body["parameters"]+'&inputtype=textquery&key=AIzaSyCDluC6rpLOcgskAumfnCWAOdGrAE1bb5M&fields=formatted_address,name,geometry')
        .then(response => res.json({
            "name": response.data["candidates"][0]["name"],
            "address": response.data["candidates"][0]["formatted_address"],
        }))
        .catch(err => res.json(err));
});

// get list of answers
router.get('/answers', (req, res) => {
    Answer.find(function (err, answers) {
        res.json(answers);
    });
});

// get list of answers by room code
router.get('/answers/:code', (req, res) => {
    Answer.find({code: req.params.code})
        .then(answers => res.json(answers))
        .catch(err => res.json(err));
});

// add answer
router.post('/answers', (req, res) => {
    Answer.create(req.body, function(err, answer) {
        if (err) {
          res.send(err);
        } else {
          res.json(answer);
        }
    });
});

// get list of questions
router.get('/questions', (req, res) => {
    Question.find(function (err, questions) {
        res.json(questions);
    });
});

// get list of questions by category
router.get('/questions/:category', (req, res) => {
    Question.find({category: req.params.category})
        .then(questions => res.json(questions))
        .catch(err => res.json(err));
});
// add question
router.post('/questions', (req, res) => {
    Question.create(req.body, function(err, question) {
      if (err) {
        res.send(err);
      } else {
        res.json(question);
      }
    });
});

module.exports = router;