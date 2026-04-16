import React from 'react';
import { Sparkles, Laptop, BookOpen, HandHeart, Mic } from 'lucide-react';

export default function ResultScreen({ name, scores, onRestart }) {
  const highestScoreObj = Object.entries(scores).reduce((max, curr) => curr[1] > max[1] ? curr : max);
  const topCategory = highestScoreObj[0];

  const resultsData = {
    EAD: {
      title: "Cursos EAD",
      description: "Você valoriza a flexibilidade, a independência e o aprendizado no seu próprio ritmo. Os Cursos EAD são a escolha perfeita para você se especializar de onde estiver e na hora que quiser!",
      icon: <BookOpen size={64} color="#8b5cf6" />
    },
    Tech: {
      title: "Informática Básica / Formação Excel",
      description: "Sua mente é genial para a lógica e a organização! Dominar o computador e as planilhas vai alavancar seu futuro. Os cursos de Informática Básica e Formação Excel (FIC) são a sua cara.",
      icon: <Laptop size={64} color="#3b82f6" />
    },
    Massage: {
      title: "Massagista (Curso FIC)",
      description: "Você é puro acolhimento! Seu dom para acalmar as pessoas e proporcionar bem-estar é incrível. O curso FIC de Massagista vai colocar seu dom nas suas próprias mãos, literalmente.",
      icon: <HandHeart size={64} color="#10b981" />
    },
    Communication: {
      title: "Dicção, Desinibição e Oratória (Curso FIC)",
      description: "Que carisma! Você nasceu para brilhar, falar em público e engajar multidões. O curso FIC de Dicção, Desinibição e Oratória vai refinar seu talento e te levar muito longe.",
      icon: <Mic size={64} color="#ec4899" />
    }
  };

  const result = resultsData[topCategory];

  return (
    <div className="glass-panel fade-enter" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        {result.icon}
      </div>
      <h1>Incrível, {name}!</h1>
      <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>Seu perfil combina perfeitamente com:</p>
      
      <h2 style={{ color: 'var(--primary)', fontSize: '2rem' }}>{result.title}</h2>
      <p style={{ marginTop: '20px', lineHeight: '1.6' }}>{result.description}</p>
      
      <button onClick={onRestart} className="btn-primary" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <Sparkles size={20} />
        Refazer o Quiz
      </button>
    </div>
  );
}
