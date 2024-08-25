import React from 'react';
import './Question.css'; 

const Question = ({ questions, currentQuestionIndex, selectedAnswer, onAnswerChange, onNextQuestion, isLastQuestion }) => {
  if (questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="question-section">
      <h3>{currentQuestion.title}</h3>
      {currentQuestion.answers.map((answer) => (
        <label key={answer.id} className="answer-option">
          <input
            type="radio"
            name={`answer-${currentQuestion.id}`}
            value={answer.id}
            checked={selectedAnswer === answer.id}
            onChange={() => onAnswerChange(answer.id)}
          />
          {answer.answer}
        </label>
      ))}
      <button className="btn" onClick={onNextQuestion} disabled={selectedAnswer === null}>
        {isLastQuestion ? "Submit & Finish" : "Next Question"}
      </button>
    </div>
  );
};

export default Question;