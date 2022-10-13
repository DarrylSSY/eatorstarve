const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    code: { type: String },
    username: { type: String},
    category: { type: String},
    answer: { type: String },
});

module.exports = mongoose.model('Answer', AnswerSchema);