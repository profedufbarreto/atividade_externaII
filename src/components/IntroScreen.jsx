import React, { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { BrandFlight, LogoCircle } from './BrandElements';

export default function IntroScreen({ onStart, onBack }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="glass-panel fade-enter">
      <LogoCircle />
      <BrandFlight style={{ bottom: '10%', right: '-5%', transform: 'rotate(-5deg) scale(1.5)', opacity: 0.05 }} />
      
      <h1 style={{ position: 'relative', zIndex: 1 }}>Descubra seu Caminho</h1>
      <p style={{ position: 'relative', zIndex: 1 }}>Um quiz rápido para descobrir qual área do Senac combina mais com seu perfil. Preparado(a)?</p>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="input-field"
          placeholder="Digite seu nome para começar..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
          Começar a Descoberta
          <ArrowRight size={20} />
        </button>
        <button type="button" onClick={onBack} className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <ArrowLeft size={20} />
          Voltar ao Início
        </button>
      </form>
    </div>
  );
}
