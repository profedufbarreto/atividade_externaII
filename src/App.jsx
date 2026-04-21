import React, { useState } from 'react';
import Launchpad from './components/Launchpad';
import IntroScreen from './components/IntroScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import TicTacToe from './components/TicTacToe';
import Gallery from './components/Gallery';
import BackgroundSlideshow from './components/BackgroundSlideshow';
import LeveMenteHub from './components/LeveMenteHub';
import SnakeGame from './components/SnakeGame';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import SenacGuide from './components/SenacGuide';
import LogicQuiz from './components/LogicQuiz';
import FashionHub from './components/FashionHub';
import { questions as allQuestions } from './questions';

function App() {
  const [currentScreen, setCurrentScreen] = useState('launchpad'); // launchpad, intro, quiz, result, tictactoe, gallery
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
      <CustomCursor />
      <ParticleBackground />
      <BackgroundSlideshow />
      <SenacGuide currentScreen={currentScreen} />
      {currentScreen === 'launchpad' && (
        <Launchpad onSelect={setCurrentScreen} />
      )}

      {currentScreen === 'intro' && (
        <IntroScreen onStart={handleStart} onBack={() => setCurrentScreen('launchpad')} />
      )}

      {currentScreen === 'tictactoe' && (
        <TicTacToe onBack={() => setCurrentScreen('launchpad')} />
      )}

      {currentScreen === 'gallery' && (
        <Gallery onBack={() => setCurrentScreen('launchpad')} />
      )}

      {currentScreen === 'levemente' && (
        <LeveMenteHub onBack={() => setCurrentScreen('launchpad')} />
      )}

      {currentScreen === 'snake' && (
        <SnakeGame onBack={() => setCurrentScreen('launchpad')} />
      )}

      {currentScreen === 'logicQuiz' && (
        <LogicQuiz onBack={() => setCurrentScreen('launchpad')} />
      )}

      {currentScreen === 'fashionHub' && (
        <FashionHub onBack={() => setCurrentScreen('launchpad')} />
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
