import React, { useState } from 'react';
import { ArrowLeft, Brain, Sparkles, Heart, AlertTriangle } from 'lucide-react';
import LeveMente from './LeveMente';
import EmotionalRecognition from './EmotionalRecognition';
import BreathingExercise from './BreathingExercise';
import { Wind } from 'lucide-react';

export default function LeveMenteHub({ onBack }) {
  const [activeGame, setActiveGame] = useState(null); // null, 'daily', 'emotions', 'breathe'

  if (activeGame === 'daily') {
    return <LeveMente onBack={() => setActiveGame(null)} />;
  }

  if (activeGame === 'emotions') {
    return <EmotionalRecognition onBack={() => setActiveGame(null)} />;
  }

  if (activeGame === 'breathe') {
    return <BreathingExercise onBack={() => setActiveGame(null)} />;
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

        <button 
          onClick={() => setActiveGame('breathe')}
          className="option-btn launch-card"
        >
          <div className="icon-wrapper levemente">
            <Wind size={40} />
          </div>
          <span className="card-title">Respira</span>
          <span className="card-desc">Exercício de foco e relaxamento</span>
        </button>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '15px', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', gap: '15px', textAlign: 'left' }}>
        <AlertTriangle size={32} color="#f87171" style={{ flexShrink: 0 }} />
        <p style={{ fontSize: '0.9rem', color: '#fca5a5', margin: 0, lineHeight: '1.4' }}>
          <strong>Aviso de Conteúdo:</strong> As atividades neste espaço (LeveMente) exploram temas relacionados a emoções, ansiedade e saúde mental. Elas têm propósito educativo e de autoconhecimento, mas <strong>não substituem acompanhamento profissional</strong>. Se estiver em sofrimento, procure um psicólogo ou psiquiatra.
        </p>
      </div>

      <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '20px', border: '1px solid rgba(245, 158, 11, 0.1)' }}>
        <p style={{ fontSize: '0.9rem', color: '#fbbf24', margin: 0 }}>
          <Heart size={16} inline style={{ marginBottom: '-3px', marginRight: '5px' }} />
          O Programa LeveMente é uma iniciativa do Senac-RS para promover a saúde mental.
        </p>
      </div>
    </div>
  );
}
