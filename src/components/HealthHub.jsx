import { useState } from 'react';
import './HealthHub.css';
import ReflexGame from './ReflexGame';
import MemoryGame from './MemoryGame';
import LifestyleCheck from './LifestyleCheck';

export default function HealthHub({ onBack }) {
  const [activeGame, setActiveGame] = useState(null);

  if (activeGame === 'reflex')    return <ReflexGame    onBack={() => setActiveGame(null)} />;
  if (activeGame === 'memory')    return <MemoryGame    onBack={() => setActiveGame(null)} />;
  if (activeGame === 'lifestyle') return <LifestyleCheck onBack={() => setActiveGame(null)} />;

  return (
    <div className="glass-panel health-hub fade-enter">
      <div>
        <h1 className="health-hub-title">🩺 Saúde & Bem-estar</h1>
        <p className="health-tagline">Explore sua saúde de forma interativa e aprenda sobre seu corpo</p>
      </div>

      <div className="health-hub-grid">
        {/* Card 1 — Reflexos */}
        <button
          className="health-card"
          onClick={() => setActiveGame('reflex')}
          id="btn-health-reflex"
        >
          <div className="health-card-icon">⚡</div>
          <span className="health-badge">NEUROLOGIA</span>
          <span className="health-card-title">Teste de Reflexos</span>
          <span className="health-card-desc">
            Clique no momento certo e descubra sua velocidade de reação em milissegundos. Saiba o que isso diz sobre seu sistema nervoso.
          </span>
        </button>

        {/* Card 2 — Memória */}
        <button
          className="health-card"
          onClick={() => setActiveGame('memory')}
          id="btn-health-memory"
        >
          <div className="health-card-icon">🧠</div>
          <span className="health-badge">COGNIÇÃO</span>
          <span className="health-card-title">Memória Cognitiva</span>
          <span className="health-card-desc">
            Memorize e repita sequências de cores em ordem crescente. Teste os limites da sua memória de curto prazo!
          </span>
        </button>

        {/* Card 3 — Lifestyle (span full row) */}
        <button
          className="health-card"
          onClick={() => setActiveGame('lifestyle')}
          id="btn-health-lifestyle"
          style={{ gridColumn: 'span 3' }}
        >
          <div className="health-card-icon">📋</div>
          <span className="health-badge">5 DIMENSÕES</span>
          <span className="health-card-title">Check-up do Estilo de Vida</span>
          <span className="health-card-desc">
            10 perguntas sobre sono, hidratação, movimento, nutrição e saúde mental. Receba um relatório personalizado com dicas práticas para melhorar cada área.
          </span>
        </button>
      </div>

      <button className="health-back-btn" onClick={onBack} id="btn-health-back">
        ← Voltar ao menu
      </button>
    </div>
  );
}
