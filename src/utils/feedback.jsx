export const generateFeedback = (questions, finalAnswers) => {
    return questions.map((question) => {
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
  };
  