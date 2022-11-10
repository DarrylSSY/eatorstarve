const express = require('express');
const router = express.Router();

require('mongoose');
const axios = require("axios");
const Answer = require("./models/answer");
const Question = require("./models/question");
const CreatedRoom = require("./models/createdroom");

// get list of rooms
router.post('/places', (req, res) => {
    axios.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+req.body["parameters"]+'&maxprice='+req.body["maxprice"]+'&minprice='+req.body["minprice"]+'&key=AIzaSyCDluC6rpLOcgskAumfnCWAOdGrAE1bb5M&type=restaurant')
        .then(response =>
            res.json({
                "name1": response.data["results"][0]["name"],
                "address1": response.data["results"][0]["formatted_address"],
                "photo1": response.data["results"][0]["photos"][0]["photo_reference"],
                "rating1": response.data["results"][0]["rating"],
                "placeid1": response.data["results"][0]["place_id"],
                "pricelevel1": response.data["results"][0]["price_level"],
                "userratings1": response.data["results"][0]["user_ratings_total"],
                "name2": response.data["results"][1]["name"],
                "address2": response.data["results"][1]["formatted_address"],
                "photo2": response.data["results"][1]["photos"][0]["photo_reference"],
                "rating2": response.data["results"][1]["rating"],
                "placeid2": response.data["results"][1]["place_id"],
                "pricelevel2": response.data["results"][1]["price_level"],
                "userratings2": response.data["results"][1]["user_ratings_total"],
                "name3": response.data["results"][2]["name"],
                "address3": response.data["results"][2]["formatted_address"],
                "photo3": response.data["results"][2]["photos"][0]["photo_reference"],
                "rating3": response.data["results"][3]["rating"],
                "placeid3": response.data["results"][3]["place_id"],
                "pricelevel3": response.data["results"][3]["price_level"],
                "userratings3": response.data["results"][3]["user_ratings_total"],
            }).catch(err => res.json(err))
        )
});

router.post('/photo', (req, res) => {
  // Acts as a proxy, forward the image over to the client
  axios.get('https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+req.body["photo"]+'&key=AIzaSyCDluC6rpLOcgskAumfnCWAOdGrAE1bb5M').then(response => {
    res.send(response.data);
  })
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

// Create room
router.post('/createdroom', (req, res) => {
    CreatedRoom.create(req.body, function(err, createdroom) {
        if (err) {
            res.send(err);
        } else {
            res.json(createdroom);
        }
    });
})

// Get created room status
router.get('/createdroom/:code', (req, res) => {
    CreatedRoom.find({code: req.params.code})
        .then(createdroom => res.json(createdroom[0]["status"]))
        .catch(err => res.json(err));
});

// See if username exists
router.get('/user/:code/:username', (req, res) => {
    Answer.findOne({code: req.params.code, username: req.params.username})
        .then(username=> {
          if (username != null)
            res.json(1)
          else{
            res.json(0)
          }
        }
)
        .catch(() => res.json("False"));
});

// Change created room status to input
router.post('/createdroom/:code', (req, res) => {
    CreatedRoom.findOneAndUpdate({code: req.params.code}, {status: req.body["status"]}, {new: true})
        .then(createdroom => res.json(createdroom))
        .catch(err => res.json(err));
});

module.exports = router;
