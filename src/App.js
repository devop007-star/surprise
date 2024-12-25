import React, { useState } from 'react';
import './App.css';
import emailjs from 'emailjs-com';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const questions = [
    "Do you remember when we talked for the first time?",
    "When was the first time we went out together?",
    "Any memory you would refer to as our best memory?",
    "Write two lines about me, and make them rhyme!"
  ];

  const startGame = () => {
    setGameStarted(true);
  };

  const submitAnswer = () => {
    if (currentAnswer.trim() === '') {
      alert('Please answer the question to continue!');
      return;
    }

    const updatedAnswers = [...userAnswers, { question: questions[questionIndex], answer: currentAnswer }];
    setUserAnswers(updatedAnswers);
    setCurrentAnswer('');

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setGameStarted(false);
      setShowFinalMessage(true);
      sendEmail(updatedAnswers); // Send updated answers
    }
  };

  const sendEmail = (answers) => {
    const formattedAnswers = answers
      .map(
        (item, index) =>
          `<strong>Q${index + 1}:</strong> ${item.question}<br/><strong>A:</strong> ${item.answer}`
      )
      .join('<br/><br/>'); // Format for HTML email

    const templateParams = {
      user_name: 'Sacchi', // Replace as needed
      user_answers: formattedAnswers, // Include formatted answers in HTML format
    };

    emailjs.send(
      'service_hwdaisi', // Replace with your service ID
      'template_gfiqixa', // Replace with your template ID
      templateParams,
      'WDkmSYYLolAxpMHcP' // Replace with your EmailJS user ID
    ).then(
      (response) => {
        console.log('Email sent successfully!', response);
      },
      (error) => {
        console.log('Failed to send email.', error);
      }
    );
  };

  return (
    <div className="App">
      {!gameStarted && !showFinalMessage && (
        <div className="game-intro">
          <h1>Hi Sacchi!</h1>
          <p>Do you want to play a game? Let’s see how well you remember our moments together! 😊</p>
          <button onClick={startGame}>Yes, let’s play!</button>
          <button onClick={() => setShowFinalMessage(true)}>Maybe later...</button>
        </div>
      )}

      {gameStarted && !showFinalMessage && (
        <div className="questions">
          <p>{questions[questionIndex]}</p>
          <textarea
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Your answer here..."
            required
          ></textarea>
          <button onClick={submitAnswer}>Next</button>
        </div>
      )}

      {showFinalMessage && (
        <div className="final-message">
          <h2>Happy New Year in Advance!</h2>
          <p>You’ve been in my thoughts every day, and I want to let you know how much you mean to me.</p>
          <p>Would you like to be the reason behind my smile every day?</p>
          <button onClick={() => setShowPopup(true)}>Do you think it’s over?</button>
        </div>
      )}

      {showPopup && (
        <div className="popup">
          <p>It’s not over yet! <a href="https://qr.me-qr.com/text/8KJEgIUw" className="text-blue-500">Go to the next step</a></p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
