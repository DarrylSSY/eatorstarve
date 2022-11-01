const mongoose = require('mongoose');

const CreatedRoomSchema = new mongoose.Schema({
    code: { type: String },
    status: { type: String },
});

module.exports = mongoose.model('CreatedRoom', CreatedRoomSchema);