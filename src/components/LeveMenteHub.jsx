import React, { useState } from 'react';
import { ArrowLeft, Brain, Sparkles, Heart } from 'lucide-react';
import LeveMente from './LeveMente';
import EmotionalRecognition from './EmotionalRecognition';

export default function LeveMenteHub({ onBack }) {
  const [activeGame, setActiveGame] = useState(null); // null, 'daily', 'emotions'

  if (activeGame === 'daily') {
    return <LeveMente onBack={() => setActiveGame(null)} />;
  }

  if (activeGame === 'emotions') {
    return <EmotionalRecognition onBack={() => setActiveGame(null)} />;
  }

  return (
    <div className="glass-panel fade-enter" style={{ textAlign: 'center', maxWidth: '800px' }}>
      <div className="gallery-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1>LeveMente</h1>
          <p>Cuide da sua mente de forma interativa</p>
        </div>
      </div>

      <div className="launchpad-grid" style={{ marginTop: '30px' }}>
        <button
          onClick={() => setActiveGame('daily')}
          className="option-btn launch-card"
        >
          <div className="icon-wrapper quiz">
            <Sparkles size={40} />
          </div>
          <span className="card-title">Um Dia De Cada Vez</span>
          <span className="card-desc">Equilibre suas decisões diárias</span>
        </button>

        <button
          onClick={() => setActiveGame('emotions')}
          className="option-btn launch-card"
        >
          <div className="icon-wrapper gallery">
            <Brain size={40} />
          </div>
          <span className="card-title">O Que Estou Sentindo?</span>
          <span className="card-desc">Pratique seu reconhecimento emocional</span>
        </button>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '20px', border: '1px solid rgba(245, 158, 11, 0.1)' }}>
        <p style={{ fontSize: '0.9rem', color: '#fbbf24', margin: 0 }}>
          <Heart size={16} inline style={{ marginBottom: '-3px', marginRight: '5px' }} />
          O Programa LeveMente é uma iniciativa do Senac-RS para promover a saúde mental.
        </p>
      </div>
    </div>
  );
}
