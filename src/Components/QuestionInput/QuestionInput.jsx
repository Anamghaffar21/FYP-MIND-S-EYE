import React, { useState } from 'react';
import './QuestionInput.css';  // Assuming the CSS is saved in this file

const QuestionInput = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(question);
    setQuestion('');
  };

  return (
    <div className="question-input-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question"
        />
        <button type="submit">Submit Question</button>
      </form>
    </div>
  );
};

export default QuestionInput;
