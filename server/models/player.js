const mongoose = require("mongoose")

const PlayerSchema = new mongoose.Schema({
    player: { type: JSON },
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Player', PlayerSchema)
