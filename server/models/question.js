const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    category: { type: String},
    answer: { type: String },
    aaa: { type: String },
    abc: { type: String },

});

module.exports = mongoose.model('Question', QuestionSchema);