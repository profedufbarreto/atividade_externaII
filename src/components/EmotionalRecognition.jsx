import React, { useState } from 'react';
import { ArrowLeft, Brain, Send } from 'lucide-react';
import { emotionalScenarios } from './EmotionalRecognition_scenarios';

export default function EmotionalRecognition({ onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [step, setStep] = useState('situation'); // situation, emotion, action, feedback
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  const scenario = emotionalScenarios[currentIndex];

  const handleNextScenario = () => {
    if (currentIndex < emotionalScenarios.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setStep('situation');
      setSelectedEmotion(null);
      setSelectedAction(null);
    } else {
      onBack(); // End of game
    }
  };

  return (
    <div className="glass-panel fade-enter levemente-container">
      <div className="levemente-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <h1>O Que Estou Sentindo?</h1>
      </div>

      <div className="scenario-card fade-enter" style={{ minHeight: '400px' }}>
        {step === 'situation' && (
          <div className="fade-enter">
            <div className="day-tag" style={{ background: '#818cf8' }}>Situação</div>
            <p className="scenario-text">{scenario.situation}</p>
            <button className="btn-primary" onClick={() => setStep('emotion')}>
              Explorar Sentimentos
            </button>
          </div>
        )}

        {step === 'emotion' && (
          <div className="fade-enter text-center">
            <p className="scenario-text" style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Diante disso, o que você sentiria primeiro?</p>
            <div className="duration-selection" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {scenario.emotions.map((em, i) => (
                <button 
                  key={i} 
                  className={`option-btn ${selectedEmotion === em ? 'active' : ''}`}
                  onClick={() => setSelectedEmotion(em)}
                  style={{ padding: '20px', gap: '10px' }}
                >
                  <span style={{ fontSize: '2rem' }}>{em.emoji}</span>
                  <span style={{ fontWeight: 600 }}>{em.label}</span>
                </button>
              ))}
            </div>
            {selectedEmotion && (
              <button className="btn-primary" style={{ marginTop: '24px' }} onClick={() => setStep('action')}>
                Prosseguir
              </button>
            )}
          </div>
        )}

        {step === 'action' && (
          <div className="fade-enter">
            <p className="scenario-text" style={{ fontSize: '1.1rem' }}>E o que você faria?</p>
            <div className="choices-grid">
              {scenario.actions.map((act, i) => (
                <button 
                  key={i} 
                  className={`choice-btn ${selectedAction === act ? 'active' : ''}`}
                  style={{ borderColor: selectedAction === act ? 'var(--primary)' : '' }}
                  onClick={() => setSelectedAction(act)}
                >
                  {act.label}
                </button>
              ))}
            </div>
            {selectedAction && (
              <button className="btn-primary" style={{ marginTop: '24px' }} onClick={() => setStep('feedback')}>
                Ver Reflexão
              </button>
            )}
          </div>
        )}

        {step === 'feedback' && (
          <div className="fade-enter">
            <div className="day-tag" style={{ background: '#10b981' }}>Reflexão</div>
            
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', marginBottom: '20px', textAlign: 'left' }}>
              <p style={{ color: 'var(--primary)', fontWeight: 800, marginBottom: '8px' }}>Sobre sua ação:</p>
              <p style={{ fontSize: '0.95rem' }}>{selectedAction.interpretation}</p>
            </div>

            <div style={{ background: 'rgba(129, 140, 248, 0.1)', padding: '20px', borderRadius: '16px', marginBottom: '24px', textAlign: 'left', border: '1px solid rgba(129, 140, 248, 0.2)' }}>
              <p style={{ color: '#818cf8', fontWeight: 800, marginBottom: '8px' }}>Dica de Alfabetização Emocional:</p>
              <p style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>{scenario.feedback}</p>
            </div>

            <button className="btn-primary" onClick={handleNextScenario}>
              {currentIndex < emotionalScenarios.length - 1 ? "Próxima Situação" : "Finalizar Prática"}
            </button>
          </div>
        )}
      </div>

      <p className="gallery-footer">Praticar o reconhecimento das emoções nos torna mais empáticos conosco e com os outros.</p>
    </div>
  );
}
