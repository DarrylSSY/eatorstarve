const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    category: { type: String},
    answer: { type: String },

});

module.exports = mongoose.model('Question', QuestionSchema);