const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    code: { type: String },
    first: { type: Array },
    second: { type: Array },
    third: { type: Array },
});

module.exports = mongoose.model('Room', RoomSchema);