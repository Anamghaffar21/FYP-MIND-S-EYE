const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  flowchart: { type: String },
}, {
  timestamps: true,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;