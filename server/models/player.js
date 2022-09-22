const mongoose = require("mongoose")

const PlayerSchema = new mongoose.Schema({
    player: String,
    nickname: String,
    message: String,
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Player', PlayerSchema)
