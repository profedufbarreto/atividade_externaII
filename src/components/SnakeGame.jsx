import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Trophy, Heart, RotateCcw, Home, Play, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import './SnakeGame.css';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const BASE_SPEED = 150;

export default function SnakeGame({ onBack }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState('idle'); // idle, playing, hit, gameover
  const [speed, setSpeed] = useState(BASE_SPEED);
  
  const gameLoopRef = useRef();
  const nextDirectionRef = useRef(INITIAL_DIRECTION);

  // Synthesize Sound
  const playSound = (type) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      if (type === 'eat') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
      } else if (type === 'hit') {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(220, audioCtx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(110, audioCtx.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.3);
      } else if (type === 'gameover') {
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
        oscillator.frequency.linearRampToValueAtTime(50, audioCtx.currentTime + 0.5);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.5);
      }
    } catch (e) {
      console.error("Audio error", e);
    }
  };

  const generateFood = useCallback((currentSnake) => {
    let newFood;
    while(true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      // Check if food on snake
      const conflict = currentSnake.some(seg => seg.x === newFood.x && seg.y === newFood.y);
      if (!conflict) break;
    }
    return newFood;
  }, []);

  const resetPosition = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    nextDirectionRef.current = INITIAL_DIRECTION;
  };

  const moveSnake = useCallback(() => {
    if (gameState !== 'playing') return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const nextDir = nextDirectionRef.current;
      const newHead = { x: head.x + nextDir.x, y: head.y + nextDir.y };

      // Wall Collision
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        handleHit();
        return prevSnake;
      }

      // Self Collision
      if (prevSnake.some(seg => seg.x === newHead.x && seg.y === newHead.y)) {
        handleHit();
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Food Collision
      if (newHead.x === food.x && newHead.y === food.y) {
        playSound('eat');
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
        // Slightly increase speed
        setSpeed(s => Math.max(80, s - 2));
      } else {
        newSnake.pop();
      }

      setDirection(nextDir);
      return newSnake;
    });
  }, [food, gameState, generateFood]);

  const handleHit = () => {
    playSound('hit');
    const newLives = lives - 1;
    if (newLives > 0) {
      setLives(newLives);
      setGameState('hit');
      setTimeout(() => {
        resetPosition();
        setGameState('playing');
      }, 1000);
    } else {
      setLives(0);
      setGameState('gameover');
      playSound('gameover');
    }
  };

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(moveSnake, speed);
    } else {
      clearInterval(gameLoopRef.current);
    }
    return () => clearInterval(gameLoopRef.current);
  }, [gameState, moveSnake, speed]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (direction.y === 0) nextDirectionRef.current = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (direction.y === 0) nextDirectionRef.current = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (direction.x === 0) nextDirectionRef.current = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (direction.x === 0) nextDirectionRef.current = { x: 1, y: 0 };
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setSpeed(BASE_SPEED);
    resetPosition();
    setGameState('playing');
  };

  return (
    <div className="glass-panel fade-enter snake-game-container">
      <div className="game-header">
        <div className="game-stat">
          <Trophy className="text-secondary" size={20} />
          <span>{score}</span>
        </div>
        <div className="game-stat">
          <Heart className="text-danger" size={20} />
          <div className="lives-dots">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`live-dot ${i < lives ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="game-board-container">
        <div className="snake-grid">
          {/* Static rendering of the grid for a clean look */}
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isSnake = snake.some(seg => seg.x === x && seg.y === y);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isFood = food.x === x && food.y === y;

            return (
              <div 
                key={i} 
                className={`grid-cell ${isSnake ? 'snake' : ''} ${isHead ? 'head' : ''} ${isFood ? 'food' : ''}`}
                style={{ 
                  backgroundColor: isSnake ? (isHead ? 'var(--secondary)' : 'var(--primary)') : '',
                  transform: isFood ? 'scale(0.8)' : ''
                }}
              />
            );
          })}
        </div>

        {gameState === 'idle' && (
          <div className="game-overlay">
            <h2>Jogo da Cobrinha</h2>
            <p>Use as setas ou W-A-S-D para jogar</p>
            <button className="btn-primary" onClick={startGame}>
              <Play size={20} /> Começar
            </button>
          </div>
        )}

        {gameState === 'hit' && (
          <div className="game-overlay hit">
            <h2 className="text-danger">Oops!</h2>
            <p>Você perdeu uma vida</p>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="game-overlay game-over">
            <h2 className="text-danger">Fim de Jogo!</h2>
            <p>Sua pontuação final:</p>
            <div className="final-score">{score}</div>
            <button className="btn-primary" onClick={startGame}>
              <RotateCcw size={20} /> Tentar de Novo
            </button>
          </div>
        )}
      </div>

      <div className="mobile-controls">
        <button className="ctrl-btn up" onClick={() => direction.y === 0 && (nextDirectionRef.current = { x: 0, y: -1 })}><ArrowUp /></button>
        <div className="mid-ctrls">
          <button className="ctrl-btn left" onClick={() => direction.x === 0 && (nextDirectionRef.current = { x: -1, y: 0 })}><ArrowLeft /></button>
          <button className="ctrl-btn right" onClick={() => direction.x === 0 && (nextDirectionRef.current = { x: 1, y: 0 })}><ArrowRight /></button>
        </div>
        <button className="ctrl-btn down" onClick={() => direction.y === 0 && (nextDirectionRef.current = { x: 0, y: 1 })}><ArrowDown /></button>
      </div>

      <button className="btn-secondary" onClick={onBack} style={{ marginTop: '20px', width: '100%' }}>
        <Home size={20} /> Voltar ao Início
      </button>
    </div>
  );
}
