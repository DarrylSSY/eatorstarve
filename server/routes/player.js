const express = require('express');
const router = express.Router();
require('mongoose');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Player = require('../models/player');

server.listen(4000)
io.on('connection', function (socket) {
    console.log('User connected');
    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
    socket.on('save-message', function (data) {
        console.log(data);
        io.emit('new-message', { message: data });
    });
});
// get list of players
router.get('/', (req, res, next) => {
    Player.find(function (err, rooms) {
        if (err) return next(err);
        res.json(rooms);
    });
});

/* GET ALL CHATS */
router.get('/:roomid', function(req, res, next) {
    Player.find({ room: req.params.roomid }, function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
});

/* GET SINGLE CHAT BY ID */
router.get('/:id', function(req, res, next) {
    Player.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* SAVE CHAT */
router.post('/', function(req, res, next) {
    Player.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE CHAT */
router.put('/:id', function(req, res, next) {
    Player.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE CHAT */
router.delete('/:id', function(req, res, next) {
    Player.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;