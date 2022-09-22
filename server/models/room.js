const mongoose = require("mongoose")

const RoomSchema = new mongoose.Schema({
    pin: { type: String },
    hostId: { type: String },
    roomLive: { type: String },
    roomData: { type: JSON },
    created_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Room', RoomSchema)
