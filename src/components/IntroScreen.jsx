import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function IntroScreen({ onStart }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="glass-panel fade-enter">
      <h1>Descubra seu Caminho!</h1>
      <p>Um quiz super rápido para descobrir qual área combina mais com a sua vibe única. Preparado(a)?</p>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="input-field"
          placeholder="Digite seu nome para começar..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          Começar a Descoberta
          <ArrowRight size={20} />
        </button>
      </form>
    </div>
  );
}
