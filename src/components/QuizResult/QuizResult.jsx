import React from 'react';
// import './QuizResult.css'; 

const QuizResult = ({ score, totalQuestions, feedback, onNewQuiz }) => (
  <div className="result-section">
    <h3>Quiz Complete!</h3>
    <p>
      Your Score: {score} / {totalQuestions} ({((score / totalQuestions) * 100).toFixed(2)}%)
    </p>
    {feedback.length > 0 && (
      <div>
        <h3>Detailed Feedback:</h3>
        {feedback.map((item) => (
          <div key={item.id} className={`feedback ${item.class}`}>
            <span className="feedback-icon">{item.icon}</span>
            {item.title} <br />
            <span dangerouslySetInnerHTML={{ __html: item.text }} />
          </div>
        ))}
      </div>
    )}
    <button className="btn" onClick={onNewQuiz}>
      Take a New Quiz
    </button>
  </div>
);

export default QuizResult;