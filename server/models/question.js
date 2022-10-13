const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    category: { type: String},
    answer: { type: String },
    abc = 123,
});

module.exports = mongoose.model('Question', QuestionSchema);