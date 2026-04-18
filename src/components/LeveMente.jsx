import React, { useState, useEffect } from 'react';
import { ArrowLeft, Zap, Flame, Smile, Users, Calendar, Sparkles } from 'lucide-react';
import { scenarios, days, periods } from './LeveMente_scenarios';
import './LeveMente.css';

export default function LeveMente({ onBack }) {
  const [gameState, setGameState] = useState('setup'); // setup, playing, feedback, summary
  const [maxDays, setMaxDays] = useState(1);
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [lastFeedback, setLastFeedback] = useState(null);
  
  const [stats, setStats] = useState({
    energy: 50,
    stress: 30,
    mood: 50,
    social: 40
  });

  const [history, setHistory] = useState([]);

  const handleStart = (d) => {
    setMaxDays(d);
    setGameState('playing');
  };

  const currentScenario = scenarios[currentScenarioIndex];

  const handleChoice = (option) => {
    // Update Stats
    setStats(prev => ({
      energy: Math.min(100, Math.max(0, prev.energy + option.result.energy)),
      stress: Math.min(100, Math.max(0, prev.stress + option.result.stress)),
      mood: Math.min(100, Math.max(0, prev.mood + option.result.mood)),
      social: Math.min(100, Math.max(0, prev.social + option.result.social)),
    }));

    setLastFeedback(option.message);
    setHistory(prev => [...prev, option]);
    setGameState('feedback');
  };

  const nextScenario = () => {
    const nextIndex = currentScenarioIndex + 1;
    const nextScenarioObj = scenarios[nextIndex];

    // Check if we reached the max days OR ran out of scenarios
    if (!nextScenarioObj || nextScenarioObj.day >= maxDays) {
      setGameState('summary');
    } else {
      setCurrentScenarioIndex(nextIndex);
      setGameState('playing');
    }
  };

  const renderBar = (type, value, label, Icon) => (
    <div className={`status-item ${type}`}>
      <div className="status-label">
        <span><Icon size={14} style={{ marginRight: '4px' }} /> {label}</span>
        <span>{value}%</span>
      </div>
      <div className="bar-bg">
        <div className="bar-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );

  return (
    <div className="glass-panel fade-enter levemente-container">
      <div className="levemente-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <h1>Um Dia De Cada Vez</h1>
      </div>

      {gameState === 'setup' && (
        <div className="setup-screen fade-enter">
          <p>Gerenciar nossa rotina é uma arte. Por quanto tempo você deseja praticar seu equilíbrio emocional?</p>
          <div className="duration-selection">
            {[1, 2, 3, 7].map(d => (
              <button key={d} className="option-btn dur-btn" onClick={() => handleStart(d)}>
                <Calendar size={32} />
                <span style={{ fontWeight: 800 }}>{d === 7 ? 'Semana Toda' : `${d} ${d === 1 ? 'Dia' : 'Dias'}`}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'feedback') && (
        <>
          <div className="status-bars">
            {renderBar('energy', stats.energy, 'Energia', Zap)}
            {renderBar('stress', stats.stress, 'Estresse', Flame)}
            {renderBar('mood', stats.mood, 'Humor', Smile)}
            {renderBar('social', stats.social, 'Conexão', Users)}
          </div>

          <div className="scenario-card fade-enter">
            <div className="day-tag">
              {days[currentScenario.day]} • {periods[currentScenario.period]}
            </div>
            
            <p className="scenario-text">{currentScenario.text}</p>

            {gameState === 'playing' ? (
              <div className="choices-grid">
                {currentScenario.options.map((opt, i) => (
                  <button key={i} className="choice-btn" onClick={() => handleChoice(opt)}>
                    {opt.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="feedback-section fade-enter">
                <div className="feedback-msg">
                  {lastFeedback}
                </div>
                <button className="btn-primary" style={{ marginTop: '20px' }} onClick={nextScenario}>
                  Continuar jornada
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {gameState === 'summary' && (
        <div className="summary-screen fade-enter" style={{ textAlign: 'center', width: '100%' }}>
          <Sparkles size={48} color="var(--primary)" style={{ marginBottom: '20px' }} />
          <h2>Jornada Finalizada!</h2>
          <p>Você completou {maxDays} {maxDays === 1 ? 'dia' : 'dias'} de escolhas. Veja como você terminou:</p>
          
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-val">{stats.energy}%</span>
              <span className="card-desc">Energia Restante</span>
            </div>
            <div className="summary-item">
              <span className="summary-val">{stats.stress}%</span>
              <span className="card-desc">Nível de Estresse</span>
            </div>
            <div className="summary-item">
              <span className="summary-val">{stats.mood}%</span>
              <span className="card-desc">Humor Geral</span>
            </div>
            <div className="summary-item">
              <span className="summary-val">{stats.social}%</span>
              <span className="card-desc">Conexão Social</span>
            </div>
          </div>

          <p style={{ marginTop: '30px', fontSize: '1rem', color: 'var(--text-secondary)' }}>
            {stats.stress > 70 ? "Cuidado! Seu estresse está muito alto. Lembre-se de descansar mais na próxima." : 
             stats.energy < 20 ? "Você está esgotado(a). Que tal priorizar o sono da próxima vez?" :
             "Você manteve um bom equilíbrio! Continue praticando o autocuidado."}
          </p>

          <button className="btn-primary" style={{ marginTop: '30px' }} onClick={() => window.location.reload()}>
            Voltar ao Menu Principal
          </button>
        </div>
      )}
    </div>
  );
}
