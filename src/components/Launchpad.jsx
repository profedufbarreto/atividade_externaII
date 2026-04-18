import React from 'react';
import { Gamepad2, GraduationCap } from 'lucide-react';

export default function Launchpad({ onSelect }) {
  return (
    <div className="glass-panel fade-enter" style={{ textAlign: 'center' }}>
      <h1>Bem-vindo!</h1>
      <p>O que você deseja fazer hoje?</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '20px', 
        marginTop: '20px' 
      }}>
        <button 
          onClick={() => onSelect('intro')}
          className="option-btn"
          style={{ 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '40px 20px',
            textAlign: 'center',
            gap: '15px'
          }}
        >
          <GraduationCap size={48} color="#6366f1" />
          <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>Iniciar Quiz Vocacional</span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Descubra sua carreira ideal</span>
        </button>

        <button 
          onClick={() => onSelect('tictactoe')}
          className="option-btn"
          style={{ 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '40px 20px',
            textAlign: 'center',
            gap: '15px'
          }}
        >
          <Gamepad2 size={48} color="#ec4899" />
          <span style={{ fontWeight: '600', fontSize: '1.2rem' }}>Jogar Jogo da Velha</span>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Relaxe um pouco</span>
        </button>
      </div>
    </div>
  );
}
