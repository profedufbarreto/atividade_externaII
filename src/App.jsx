import React, { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { questions as allQuestions } from './questions';

function App() {
  const [currentScreen, setCurrentScreen] = useState('intro'); // intro, quiz, result
  const [userName, setUserName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);

  const [scores, setScores] = useState({
    Health: 0,
    IT: 0,
    Fashion: 0,
    Tech: 0,
    Massage: 0,
    Communication: 0,
    EAD: 0
  });

  const handleStart = (name) => {
    setUserName(name);
    // Embaralha e pega 10 perguntas
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, 10));
    
    setCurrentScreen('quiz');
  };

  const handleAnswer = (category) => {
    setScores(prev => ({
      ...prev,
      [category]: prev[category] + 1
    }));

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setCurrentScreen('result');
    }
  };

  const handleRestart = () => {
    setUserName('');
    setCurrentQuestionIndex(0);
    setScores({ Health: 0, IT: 0, Fashion: 0, Tech: 0, Massage: 0, Communication: 0, EAD: 0 });
    setCurrentScreen('intro');
  };

  return (
    <>
      {currentScreen === 'intro' && (
        <IntroScreen onStart={handleStart} />
      )}

      {currentScreen === 'quiz' && quizQuestions.length > 0 && (
        <QuizScreen
          questions={quizQuestions}
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
