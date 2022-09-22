const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const room = require("../routes/room");
const player = require("../routes/player");
const app = express()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
mongodb_conn_module.connect();

app.use('/api/room', room);
app.use('/api/player', player);




app.listen(process.env.PORT || 8081)