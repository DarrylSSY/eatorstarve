const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
const db = mongodb_conn_module.connect();

var Room = require("../models/room");

app.get('/', (req, res) => {
    Room.find(function (err, rooms) {
        if (err) console.error(err)
        res.json(rooms)
    })
})

app.get('/:id', (req, res) => {
    Room.findById(req.params.id, function (err, room) {
        if (err) console.error(err);
        res.send(room)
    })
})

app.post('/', (req, res) => {
    Room.create(req.body, function (err, room) {
        if (err) console.log(err)
        res.send(room)
    })
})

app.put('/:id', (req, res) => {
    Room.findByIdAndUpdate(req.params.id, req.body, function (err, room) {
        if (err) console.log(err)
        res.send(room)
    })
})

app.delete('/:id', (req, res) => {
    Room.findByIdAndRemove(req.params.id, req.body, function (err, room){
        if (err) console.log(err)
        res.send(room)
    })
})

app.listen(process.env.PORT || 8081)