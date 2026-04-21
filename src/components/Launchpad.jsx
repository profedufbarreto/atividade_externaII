import { Gamepad2, GraduationCap, Camera, Heart, Apple, Brain, Shirt } from 'lucide-react';
import { BrandFlight, LogoCircle } from './BrandElements';
import LocationBanner from './LocationBanner';
import MapModal from './MapModal';
import { useState } from 'react';

export default function Launchpad({ onSelect }) {
  const [isMapOpen, setIsMapOpen] = useState(false);
  return (
    <div className="glass-panel fade-enter" style={{ textAlign: 'center', maxWidth: '800px' }}>
      <LogoCircle />
      <BrandFlight className="top-left" style={{ top: '20px', left: '-20px', transform: 'rotate(-15deg)' }} />
      
      <h1 style={{ position: 'relative', zIndex: 1 }}>Sua Jornada no Senac</h1>
      <p style={{ position: 'relative', zIndex: 1 }}>O que você deseja explorar hoje?</p>
      
      <div className="launchpad-grid">
        <button 
          onClick={() => onSelect('intro')}
          className="option-btn launch-card"
        >
          <div className="icon-wrapper quiz">
            <GraduationCap size={40} />
          </div>
          <span className="card-title">Quiz Vocacional</span>
          <span className="card-desc">Descubra sua carreira ideal</span>
        </button>

        <button 
          onClick={() => onSelect('tictactoe')}
          className="option-btn launch-card"
        >
          <div className="icon-wrapper game">
            <Gamepad2 size={40} />
          </div>
          <span className="card-title">Jogo da Velha</span>
          <span className="card-desc">Relaxe com um desafio</span>
        </button>

        <button 
          onClick={() => onSelect('gallery')}
          className="option-btn launch-card"
        >
          <div className="icon-wrapper gallery">
            <Camera size={40} />
          </div>
          <span className="card-title">Conheça o Senac</span>
          <span className="card-desc">Veja nossa infraestrutura</span>
        </button>

        <button 
          onClick={() => onSelect('levemente')}
          className="option-btn launch-card"
        >
          <div className="icon-wrapper levemente">
            <Heart size={40} />
          </div>
          <span className="card-title">LeveMente</span>
          <span className="card-desc">Saúde mental e bem-estar</span>
        </button>

        <button 
          onClick={() => onSelect('snake')}
          className="option-btn launch-card"
        >
          <div className="icon-wrapper game" style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
            <Apple size={40} color="#ef4444" />
          </div>
          <span className="card-title">Jogo da Cobrinha</span>
          <span className="card-desc">Diversão clássica</span>
        </button>

        <button 
          onClick={() => onSelect('logicQuiz')}
          className="option-btn launch-card"
        >
          <div className="icon-wrapper logic" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}>
            <Brain size={40} />
          </div>
          <span className="card-title">Desafio Lógico</span>
          <span className="card-desc">Teste seu raciocínio</span>
        </button>

        <button 
          onClick={() => onSelect('fashionHub')}
          className="option-btn launch-card"
          id="btn-launchpad-fashion"
        >
          <div className="icon-wrapper fashion">
            <Shirt size={40} />
          </div>
          <span className="card-title">Mundo da Moda</span>
          <span className="card-desc">Paleta de cores & estilo</span>
        </button>
      </div>

      <LocationBanner onClick={() => setIsMapOpen(true)} />

      <MapModal isOpen={isMapOpen} onClose={() => setIsMapOpen(false)} />
    </div>
  );
}
