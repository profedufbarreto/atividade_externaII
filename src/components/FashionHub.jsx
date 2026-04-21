import { useState } from 'react';
import './FashionHub.css';
import ColorPaletteAnalyzer from './ColorPaletteAnalyzer';
import FashionLookGame from './FashionLookGame';

export default function FashionHub({ onBack }) {
  const [activeGame, setActiveGame] = useState(null);

  if (activeGame === 'palette') {
    return <ColorPaletteAnalyzer onBack={() => setActiveGame(null)} />;
  }
  if (activeGame === 'lookGame') {
    return <FashionLookGame onBack={() => setActiveGame(null)} />;
  }

  return (
    <div className="glass-panel fashion-hub fade-enter">
      <div className="fashion-hub-header">
        <h1 className="fashion-hub-title">✨ Mundo da Moda</h1>
        <p className="fashion-tagline">Descubra seu estilo e explore o universo da colorimetria pessoal</p>
      </div>

      <div className="fashion-hub-grid">
        {/* Card 1 — Analisador de Paleta */}
        <button
          className="fashion-card"
          onClick={() => setActiveGame('palette')}
          id="btn-color-palette"
        >
          <div className="fashion-card-icon">🎨</div>
          <span className="fashion-badge">WEBCAM</span>
          <span className="fashion-card-title">Analisador de Paleta</span>
          <span className="fashion-card-desc">
            Use sua webcam para descobrir as cores que mais combinam com você através da colorimetria pessoal.
          </span>
        </button>

        {/* Card 2 — Qual seria o seu Look? */}
        <button
          className="fashion-card"
          onClick={() => setActiveGame('lookGame')}
          id="btn-look-game"
        >
          <div className="fashion-card-icon">👗</div>
          <span className="fashion-badge">FEMININO & MASCULINO</span>
          <span className="fashion-card-title">Qual seria o seu Look?</span>
          <span className="fashion-card-desc">
            8 situações reais da vida. Escolha o look que você vestiria e descubra seu perfil verdadeiro — feminino ou masculino.
          </span>
        </button>
      </div>

      <button className="fashion-back-btn" onClick={onBack} id="btn-fashion-back">
        ← Voltar ao menu
      </button>
    </div>
  );
}
