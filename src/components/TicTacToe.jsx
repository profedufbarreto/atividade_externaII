import React, { useState, useEffect } from 'react';
import { X, Circle, RotateCcw, Home, Brain, Zap } from 'lucide-react';
import './TicTacToe.css';

export default function TicTacToe({ onBack }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [difficulty, setDifficulty] = useState('hard'); // easy, hard

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const minimax = (tempBoard, depth, isMaximizing) => {
    const result = calculateWinner(tempBoard);
    if (result) return result.winner === 'O' ? 10 - depth : depth - 10;
    if (!tempBoard.includes(null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!tempBoard[i]) {
          tempBoard[i] = 'O';
          const score = minimax(tempBoard, depth + 1, false);
          tempBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (!tempBoard[i]) {
          tempBoard[i] = 'X';
          const score = minimax(tempBoard, depth + 1, true);
          tempBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  // Returns all moves ranked by minimax score (best to worst)
  const getRankedMoves = (currentBoard) => {
    const moves = [];
    for (let i = 0; i < 9; i++) {
      if (!currentBoard[i]) {
        currentBoard[i] = 'O';
        const score = minimax(currentBoard, 0, false);
        currentBoard[i] = null;
        moves.push({ index: i, score });
      }
    }
    return moves.sort((a, b) => b.score - a.score);
  };

  // Hard: plays best move 65% of the time, otherwise picks a non-optimal but strategic move
  const findHardMove = (currentBoard) => {
    const ranked = getRankedMoves(currentBoard);
    if (ranked.length === 0) return -1;

    // Always block an immediate win by the player (never look stupid)
    const blockWin = ranked.find(m => {
      const test = [...currentBoard];
      test[m.index] = 'X';
      return calculateWinner(test) !== null;
    });

    // Always take a winning move if available
    const takeWin = ranked.find(m => {
      const test = [...currentBoard];
      test[m.index] = 'O';
      return calculateWinner(test) !== null;
    });
    if (takeWin) return takeWin.index;
    if (blockWin) return blockWin.index;

    // 65% chance to play best move, otherwise play 2nd or 3rd best
    if (Math.random() < 0.65 || ranked.length === 1) {
      return ranked[0].index;
    }
    // Pick randomly among the suboptimal options (not the very best)
    const suboptimal = ranked.slice(1);
    return suboptimal[Math.floor(Math.random() * suboptimal.length)].index;
  };

  // Easy: purely random
  const findRandomMove = (currentBoard) => {
    const emptyCells = currentBoard.map((cell, i) => cell === null ? i : null).filter(val => val !== null);
    if (emptyCells.length === 0) return -1;
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  const makeMove = (i) => {
    if (board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    } else if (!board.includes(null)) {
      setWinner('Draw');
    }
  }, [board]);

  // Computer Turn Effect
  useEffect(() => {
    if (!isXNext && !winner) {
      setIsThinking(true);
      const timer = setTimeout(() => {
        let move = -1;
        if (difficulty === 'hard') {
          move = findHardMove([...board]);
        } else {
          move = findRandomMove([...board]);
        }

        if (move !== -1) {
          makeMove(move);
        }
        setIsThinking(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isXNext, winner, board, difficulty]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
    setIsThinking(false);
  };

  return (
    <div className="glass-panel fade-enter tictactoe-container">
      <h1>Tic-Tac-Toe</h1>

      <div className="difficulty-selector">
        <button
          className={`dif-btn ${difficulty === 'easy' ? 'active easy' : ''}`}
          onClick={() => { setDifficulty('easy'); resetGame(); }}
        >
          <Zap size={16} />
          Fácil
        </button>
        <button
          className={`dif-btn ${difficulty === 'hard' ? 'active hard' : ''}`}
          onClick={() => { setDifficulty('hard'); resetGame(); }}
        >
          <Brain size={16} />
          Difícil
        </button>
      </div>

      <p className="status-text">
        {winner
          ? (winner === 'Draw' ? 'Empate!' : (winner === 'X' ? 'Você Venceu!' : 'Computador Venceu!'))
          : (isThinking ? 'Computador pensando...' : 'Sua vez (X)')
        }
      </p>

      <div className="game-board" style={{ pointerEvents: !isXNext || winner ? 'none' : 'auto' }}>
        {board.map((square, i) => (
          <button
            key={i}
            className={`cell ${winningLine.includes(i) ? 'winner' : ''} ${square ? 'occupied' : ''}`}
            onClick={() => makeMove(i)}
          >
            {square === 'X' && <X size={40} color="#6366f1" className="player-icon" />}
            {square === 'O' && <Circle size={36} color="#ec4899" className="player-icon" />}
          </button>
        ))}
      </div>

      <div className="controls">
        <button className="btn-secondary" onClick={resetGame}>
          <RotateCcw size={20} />
          Reiniciar
        </button>
        <button className="btn-primary" onClick={onBack}>
          <Home size={20} />
          Voltar ao Início
        </button>
      </div>
    </div>
  );
}
