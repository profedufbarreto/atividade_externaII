import React, { useState, useEffect } from 'react';
import { Brain, SkipForward, Play, Trophy, User, ArrowLeft, CreditCard } from 'lucide-react';
import { logicQuestions } from '../data/logicQuestions';
import './LogicQuiz.css';

export default function LogicQuiz({ onBack }) {
  const [gameState, setGameState] = useState('intro'); // intro, playing, cardSelection, result
  const [playerName, setPlayerName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [skipsLeft, setSkipsLeft] = useState(3);
  const [helpUsed, setHelpUsed] = useState(false); // Can use card help once per game
  const [eliminatedOptions, setEliminatedOptions] = useState([]);
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const savedRanking = JSON.parse(localStorage.getItem('logicRanking') || '[]');
    setRanking(savedRanking);
  }, []);

  const saveScore = (finalScore) => {
    const newEntry = { name: playerName || 'Anônimo', score: finalScore, date: new Date().toLocaleDateString() };
    const updatedRanking = [...ranking, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    localStorage.setItem('logicRanking', JSON.stringify(updatedRanking));
    setRanking(updatedRanking);
  };

  const currentQuestion = logicQuestions[currentIndex];

  const handleStart = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      setGameState('playing');
    }
  };

  const handleAnswer = (optionKey) => {
    const isCorrect = optionKey === currentQuestion.answer;
    let points = 0;
    if (isCorrect) {
      points = currentQuestion.difficulty === 1 ? 10 : currentQuestion.difficulty === 2 ? 20 : 30;
      setScore(s => s + points);
    }

    if (currentIndex < logicQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setEliminatedOptions([]);
    } else {
      saveScore(score + points);
      setGameState('result');
    }
  };

  const handleSkip = () => {
    if (skipsLeft > 0) {
      setSkipsLeft(s => s - 1);
      if (currentIndex < logicQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setEliminatedOptions([]);
      } else {
        saveScore(score);
        setGameState('result');
      }
    }
  };

  const openCardHelp = () => {
    if (!helpUsed) {
      setGameState('cardSelection');
    }
  };

  const selectCard = (cardType) => {
    let toEliminate = [];
    const wrongOptions = Object.keys(currentQuestion.options).filter(opt => opt !== currentQuestion.answer);

    if (cardType === 'A') {
      toEliminate = [wrongOptions[Math.floor(Math.random() * wrongOptions.length)]];
    } else if (cardType === '2') {
      toEliminate = wrongOptions;
    } else if (cardType === 'K') {
      toEliminate = [];
    }

    setEliminatedOptions(toEliminate);
    setHelpUsed(true);
    setGameState('playing');
  };

  const renderIntro = () => (
    <div className="quiz-container fade-enter">
      <Brain size={64} className="main-icon pulse" />
      <h1>Desafio de Lógica</h1>
      <p>Bem-vindo ao teste de raciocínio do Senac! <br /> Começaremos com o básico e logo as coisas ficam sérias.</p>

      <form onSubmit={handleStart} className="name-form">
        <div className="input-group">
          <User className="input-icon" />
          <input
            type="text"
            placeholder="Digite seu nome..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          <Play size={20} /> Jogar Agora
        </button>
      </form>

      <button onClick={onBack} className="btn-back">
        <ArrowLeft size={16} /> Voltar
      </button>
    </div>
  );

  const renderPlaying = () => (
    <div className="quiz-container fade-enter">
      <div className="quiz-header">
        <div className="score-badge">Pontos: {score}</div>
        <div className="progress-info">Questão {currentIndex + 1} de {logicQuestions.length}</div>
      </div>

      <div className="question-card">
        <span className={`difficulty-tag level-${currentQuestion.difficulty}`}>
          Nível {currentQuestion.difficulty}
        </span>
        <h2>{currentQuestion.text}</h2>

        <div className="options-grid">
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleAnswer(key)}
              className={`option-btn ${eliminatedOptions.includes(key) ? 'eliminated' : ''}`}
              disabled={eliminatedOptions.includes(key)}
            >
              <span className="option-key">{key}</span>
              <span className="option-text">{value}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="help-actions">
        <button
          onClick={handleSkip}
          className="help-btn skip"
          disabled={skipsLeft === 0}
        >
          <SkipForward size={20} /> Pular ({skipsLeft})
        </button>

        <button
          onClick={openCardHelp}
          className="help-btn cards"
          disabled={helpUsed}
        >
          <CreditCard size={20} /> Ajuda das Cartas
        </button>
      </div>
    </div>
  );

  const renderCardSelection = () => (
    <div className="quiz-container fade-enter">
      <CreditCard size={64} className="main-icon" />
      <h1>Escolha uma Carta</h1>
      <p>Uma delas pode te salvar, a outra... nem tanto.</p>

      <div className="card-selector">
        <button onClick={() => selectCard('A')} className="magic-card card-a">
          <div className="card-inner">A</div>
          <span className="card-hint">Elimina 1</span>
        </button>
        <button onClick={() => selectCard('2')} className="magic-card card-2">
          <div className="card-inner">2</div>
          <span className="card-hint">Elimina 2</span>
        </button>
        <button onClick={() => selectCard('K')} className="magic-card card-k">
          <div className="card-inner">K</div>
          <span className="card-hint">Sorte pura</span>
        </button>
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="quiz-container fade-enter">
      <Trophy size={64} className="main-icon result-icon" />
      <h1>Fim de Jogo!</h1>
      <div className="final-score-display">
        <span>{playerName}</span>
        <div className="score-number">{score}</div>
        <small>PONTOS TOTAIS</small>
      </div>

      <div className="ranking-section">
        <h3><Trophy size={18} /> Top 10 Ranking</h3>
        <div className="ranking-list">
          {ranking.map((entry, index) => (
            <div key={index} className={`ranking-item ${entry.name === playerName && entry.score === score ? 'current' : ''}`}>
              <span className="rank">#{index + 1}</span>
              <span className="rank-name">{entry.name}</span>
              <span className="rank-score">{entry.score} pts</span>
            </div>
          ))}
          {ranking.length === 0 && <p className="no-data">Seja o primeiro a pontuar!</p>}
        </div>
      </div>

      <button onClick={() => window.location.reload()} className="btn-primary">
        Jogar Novamente
      </button>
      <button onClick={onBack} className="btn-secondary" style={{ marginTop: '10px' }}>
        Voltar ao Início
      </button>
    </div>
  );

  return (
    <div className="logic-quiz-overlay">
      <div className="glass-panel">
        {gameState === 'intro' && renderIntro()}
        {gameState === 'playing' && renderPlaying()}
        {gameState === 'cardSelection' && renderCardSelection()}
        {gameState === 'result' && renderResult()}
      </div>
    </div>
  );
}
