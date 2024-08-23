// App.js
import React, { useState, useEffect } from 'react';
import ModuleSelector from './components/ModuleSelector/ModuleSelector';
import Question from './components/Question/Question';
import QuizResult from './components/QuizResult/QuizResult';
import './App.css';

const App = () => {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedSubmodule, setSelectedSubmodule] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetch('/questions.json')
      .then((response) => response.json())
      .then((data) => {
        setModules(data.course.modules);
      });
  }, []);

  const startQuiz = () => {
    let selectedQuestions = [];
    const module = modules.find((mod) => mod.id === selectedModule);

    if (module && selectedSubmodule) {
      // If a submodule is selected, use its questions
      const submodule = module.subModules.find(
        (sub) => sub.id === selectedSubmodule
      );
      selectedQuestions = submodule ? submodule.questions : [];
    } else if (module) {
      // Otherwise, use the main module's questions
      selectedQuestions = module.questions;
    }

    if (selectedQuestions.length > 0) {
      setQuestions(selectedQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setUserAnswers([]);
      setSelectedAnswer(null);
      setQuizComplete(false);
      setFeedback([]);
    }
  };

  const handleModuleChange = (e) => {
    setSelectedModule(e.target.value);
    setSelectedSubmodule(""); // Reset submodule when a new module is selected
  };

  const handleSubmoduleChange = (e) => {
    setSelectedSubmodule(e.target.value);
  };

  const handleAnswerChange = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleAnswerSubmit = (answerId) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.correct.toString() === answerId.toString();

    setUserAnswers((prevAnswers) => {
      const newAnswers = [
        ...prevAnswers,
        { questionId: currentQuestion.id, selectedAnswer: answerId, isCorrect },
      ];

      if (currentQuestionIndex === questions.length - 1) {
        setQuizComplete(true);
        generateFeedback(newAnswers);
      } else {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
      }

      return newAnswers;
    });

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      handleAnswerSubmit(selectedAnswer);
    }
  };

  const generateFeedback = (finalAnswers) => {
    const feedbackData = questions.map((question) => {
      const selectedAnswer = finalAnswers.find(
        (answer) => answer.questionId === question.id
      )?.selectedAnswer;
      const correctId = question.correct;

      let feedbackClass = '';
      let feedbackIcon = '';
      let feedbackText = '';

      if (selectedAnswer !== undefined) {
        if (selectedAnswer === correctId) {
          feedbackClass = 'correct';
          feedbackIcon = '✔';
          feedbackText = `Correct answer: ${question.answers.find(a => a.id === correctId).answer}`;
        } else {
          feedbackClass = 'incorrect';
          feedbackIcon = '✘';
          feedbackText = `Your answer: ${question.answers.find(a => a.id === selectedAnswer).answer} <br> Correct answer: ${question.answers.find(a => a.id === correctId).answer}`;
        }
      } else {
        feedbackClass = 'incorrect';
        feedbackIcon = '✘';
        feedbackText = `No answer selected. <br> Correct answer: ${question.answers.find(a => a.id === correctId).answer}`;
      }

      return {
        id: question.id,
        title: question.title,
        class: feedbackClass,
        icon: feedbackIcon,
        text: feedbackText,
      };
    });

    setFeedback(feedbackData);
  };

  return (
    <div className="App">
      <h1>Choose a Module</h1>
      <ModuleSelector
        modules={modules}
        selectedModule={selectedModule}
        selectedSubmodule={selectedSubmodule}
        onModuleChange={handleModuleChange}
        onSubmoduleChange={handleSubmoduleChange}
        onStartQuiz={startQuiz}
        disabled={!selectedModule}
      />
      {quizComplete ? (
        <QuizResult
          score={score}
          totalQuestions={questions.length}
          feedback={feedback}
          onNewQuiz={startQuiz}
        />
      ) : (
        <Question
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          selectedAnswer={selectedAnswer}
          onAnswerChange={handleAnswerChange}
          onNextQuestion={handleNextQuestion}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      )}
    </div>
  );
};

export default App;




