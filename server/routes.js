const express = require('express');
const router = express.Router();
require('mongoose');
const axios = require("axios");
const Answer = require("./models/answer");
const Question = require("./models/question");

// get list of rooms
router.post('/places', (req, res) => {
    axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+req.body["parameters"]+'&key=AIzaSyCDluC6rpLOcgskAumfnCWAOdGrAE1bb5M&type=restaurant')
        .then(response => res.json({

            "name1": response.data["results"][0]["name"],
            "address1": response.data["results"][0]["formatted_address"],
            "name2": response.data["results"][1]["name"],
            "address2": response.data["results"][1]["formatted_address"],
            "name3": response.data["results"][2]["name"],
            "address3": response.data["results"][2]["formatted_address"],
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
// get list of username by room code
router.get('/room/:code', (req, res) => {
  // get JSON object of unique usernames with key by room code
    Answer.find({code: req.params.code})
        .then(answers => {
            const usernames = answers.map(answer => answer.username);
            const uniqueUsernames = [...new Set(usernames)];
            res.json(uniqueUsernames);
        })
        .catch(err => res.json(err));
})


// get most popular answer from a category
router.get('/room/:code/:category', (req, res) => {
    Answer.find({code: req.params.code, category: req.params.category})
        .then(answers => {
            const answersByCategory = answers.map(answer => answer.answer);
            const mostPopularAnswer = answersByCategory.sort((a,b) =>
                answersByCategory.filter(v => v===a).length
                - answersByCategory.filter(v => v===b).length
            ).pop();
            res.json(mostPopularAnswer);
        })
        .catch(err => res.json(err));
})

module.exports = router;