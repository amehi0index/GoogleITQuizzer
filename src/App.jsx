import React, { useState, useEffect } from 'react';
import CourseSelector from './components/CourseSelector/CourseSelector';
import ModuleSelector from './components/ModuleSelector/ModuleSelector';
import Question from './components/Question/Question';
import QuizResult from './components/QuizResult/QuizResult';
import { generateFeedback } from './utils/feedback'; 
import './App.css';

const App = () => {
  const [courses] = useState([
    { id: 'c1', title: 'Course 1: Technical Support Fundamentals', jsonFile: '/questions.json', disabled: false },
    { id: 'c2', title: 'Course 2: The Bits and Bytes of Computer Networking', jsonFile: '/course2.json', disabled: true },
    { id: 'c3', title: 'Course 3: Operating Systems and You: Becoming a Power User', jsonFile: '/course3.json', disabled: true },
    { id: 'c4', title: 'Course 4: System Administration and IT Infrastructure Services', jsonFile: '/course4.json', disabled: true },
    { id: 'c5', title: 'Course 5: IT Security: Defense Against the Digital Dark Arts', jsonFile: '/course5.json', disabled: true },
  ]);
  
  
  const [selectedCourse, setSelectedCourse] = useState(null);
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
    if (selectedCourse) {
      fetch(selectedCourse.jsonFile)
        .then((response) => response.json())
        .then((data) => {
          setModules(data.course.modules);
        });
    }
  }, [selectedCourse]);

  const handleCourseChange = (e) => {
    const selectedCourseId = e.target.value;
    const course = courses.find((c) => c.id === selectedCourseId);
    setSelectedCourse(course);
    setModules([]);
    setSelectedModule('');
    setSelectedSubmodule('');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setQuizComplete(false);
    setScore(0);
    setFeedback([]);
  };

  const startQuiz = () => {
    let selectedQuestions = [];
    const module = modules.find((mod) => mod.id === selectedModule);
  
    if (module && selectedSubmodule) {
      const submodule = module.subModules.find(
        (sub) => sub.id === selectedSubmodule
      );
      selectedQuestions = submodule ? submodule.questions : [];
    } else if (module) {
      selectedQuestions = module.questions;
    }
  
    if (selectedQuestions.length > 0) {
      const shuffledQuestions = selectedQuestions.sort(() => Math.random() - 0.5);
      
      const questionsToDisplay = shuffledQuestions.slice(0, 10);
      
      setQuestions(questionsToDisplay);
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
        setFeedback(generateFeedback(questions, newAnswers));
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

  return (
    <div className="App">
      <CourseSelector
        courses={courses}
        selectedCourse={selectedCourse?.id || ""}
        onCourseChange={handleCourseChange}
      />

      {selectedCourse && (
        <>
          <h2>{selectedCourse.title}</h2>
          <ModuleSelector
            modules={modules}
            selectedModule={selectedModule}
            selectedSubmodule={selectedSubmodule}
            onModuleChange={handleModuleChange}
            onSubmoduleChange={handleSubmoduleChange}
            onStartQuiz={startQuiz}
            disabled={!selectedModule}
          />
        </>
      )}

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






