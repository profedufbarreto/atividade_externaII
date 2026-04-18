import React from 'react';
import { Gamepad2, GraduationCap, Camera, Heart } from 'lucide-react';

export default function Launchpad({ onSelect }) {
  return (
    <div className="glass-panel fade-enter" style={{ textAlign: 'center', maxWidth: '800px' }}>
      <h1>Bem-vindo!</h1>
      <p>O que você deseja fazer hoje?</p>
      
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
      </div>
    </div>
  );
}
