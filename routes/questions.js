const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Question = require('../models/Question');

router.get('/', (req, res) => {
  Question.find()
    .then(questions => res.json(questions))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', auth, (req, res) => {
  const { question, answer, flowchart } = req.body;
  const newQuestion = new Question({ question, answer, flowchart });
  newQuestion.save()
    .then(() => res.json('Question added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/:id', (req, res) => {
  Question.findById(req.params.id)
    .then(question => res.json(question))
    .catch(err => res.status(500).json('Error: ' + err));
});

router.put('/:id', auth, (req, res) => {
  Question.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(question => res.json(question))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.delete('/:id', auth, (req, res) => {
  Question.findByIdAndDelete(req.params.id)
    .then(() => res.json('Question deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
