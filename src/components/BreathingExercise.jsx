import React, { useState, useEffect } from 'react';
import { ArrowLeft, Wind, Timer } from 'lucide-react';
import './BreathingExercise.css';

export default function BreathingExercise({ onBack }) {
  const [phase, setPhase] = useState('inhale'); // inhale, hold, exhale
  const [seconds, setSeconds] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let timer;
    if (phase === 'inhale') {
      timer = setTimeout(() => setPhase('hold'), 4000);
    } else if (phase === 'hold') {
      timer = setTimeout(() => setPhase('exhale'), 4000);
    } else {
      timer = setTimeout(() => setPhase('inhale'), 4000);
    }
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const getInstruction = () => {
    if (phase === 'inhale') return "Inspire lentamente...";
    if (phase === 'hold') return "Segure o ar...";
    return "Solte devagar...";
  };

  return (
    <div className="glass-panel fade-enter levemente-container">
      <div className="levemente-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <h1>Respira</h1>
      </div>

      <div className="breathing-container">
        <div className="instruction-text fade-enter" key={phase}>
          {getInstruction()}
        </div>

        <div className="breathing-circle-wrapper">
          <div className="ambient-waves" />
          <div className={`breathing-circle ${phase}`}>
            <span className="breathing-text">
              {phase === 'inhale' ? '↑' : phase === 'exhale' ? '↓' : '•'}
            </span>
          </div>
        </div>

        <div className="timer-minimalist">
          <Timer size={16} />
          <span>Tempo de foco: {formatTime(totalTime)}</span>
        </div>

        <button 
          className="btn-primary" 
          style={{ marginTop: '20px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)' }}
          onClick={onBack}
        >
          Encerrar Prática
        </button>
      </div>

      <p className="gallery-footer">A respiração consciente é a ferramenta mais rápida para acalmar o sistema nervoso.</p>
    </div>
  );
}
