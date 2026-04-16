import React, { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { questions } from './questions';

function App() {
  const [currentScreen, setCurrentScreen] = useState('intro'); // intro, quiz, result
  const [userName, setUserName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [scores, setScores] = useState({
    Tech: 0,
    Massage: 0,
    Communication: 0,
    EAD: 0
  });

  const handleStart = (name) => {
    setUserName(name);
    setCurrentScreen('quiz');
  };

  const handleAnswer = (category) => {
    setScores(prev => ({
      ...prev,
      [category]: prev[category] + 1
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentScreen('result');
    }
  };

  const handleRestart = () => {
    setUserName('');
    setCurrentQuestionIndex(0);
    setScores({ Tech: 0, Massage: 0, Communication: 0, EAD: 0 });
    setCurrentScreen('intro');
  };

  return (
    <>
      {currentScreen === 'intro' && (
        <IntroScreen onStart={handleStart} />
      )}

      {currentScreen === 'quiz' && (
        <QuizScreen
          currentQuestionIndex={currentQuestionIndex}
          onAnswer={handleAnswer}
        />
      )}

      {currentScreen === 'result' && (
        <ResultScreen
          name={userName}
          scores={scores}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

export default App;
