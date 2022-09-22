const express = require('express');
const router = express.Router();
require('mongoose');
const Room = require('../models/room');

// get list of rooms
router.get('/', (req, res, next) => {
    Room.find(function (err, rooms) {
        if (err) return next(err);
        res.json(rooms);
    });
});

// get room
router.get('/:id', function(req, res, next) {
    Room.findOne({pin: req.params.id}, function (err, room) {
        if (err) return next(err);
        res.json(room);
    });
});

// create room
router.post('/', function(req, res, next) {
    let pin = Math.random().toString(36).slice(9)
    const update = {
        ...req.body,
        pin
    }
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    Room.findOneAndUpdate({pin},update, options, function (err, room) {
        if (err) return next(err);
        res.json(room);
    });
});

router.put('/:id', function(req, res, next) {
    Room.findOneAndUpdate({pin:req.params.id}, req.body, function (err, room) {
        if (err) return next(err);
        res.json(room);
    });
});


module.exports = router;