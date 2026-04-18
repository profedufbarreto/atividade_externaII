import React from 'react';
import { Sparkles, Laptop, BookOpen, HandHeart, Mic, HeartPulse, MonitorSmartphone, Scissors, Home } from 'lucide-react';

export default function ResultScreen({ name, scores, onRestart }) {
  const highestScoreObj = Object.entries(scores).reduce((max, curr) => curr[1] > max[1] ? curr : max);
  const topCategory = highestScoreObj[0];

  const resultsData = {
    Health: {
      title: "Saúde e Bem-estar",
      description: "Você tem um coração enorme e grande empatia. Trabalhar com enfermagem, medicina ou terapias seria incrível, pois seu foco é cuidar das pessoas.",
      icon: <HeartPulse size={64} color="#10b981" />
    },
    IT: {
      title: "Tecnologia da Informação (TI)",
      description: "Você é super analítico e ama tecnologia! O mundo do desenvolvimento de sistemas, engenharia de software e inovação digital está a sua espera.",
      icon: <MonitorSmartphone size={64} color="#3b82f6" />
    },
    Fashion: {
      title: "Moda e Design",
      description: "Seu lado criativo é fortíssimo! Expressão corporal, design gráfico, artes visuais e moda combinam inteiramente com você.",
      icon: <Scissors size={64} color="#ec4899" />
    },
    EAD: {
      title: "Cursos EAD",
      description: "Você valoriza a flexibilidade, a independência e o aprendizado no seu próprio ritmo. Os Cursos EAD são a escolha perfeita para você se especializar de onde estiver!",
      icon: <BookOpen size={64} color="#8b5cf6" />
    },
    Tech: {
      title: "Informática Básica / Formação Excel (FIC)",
      description: "Sua mente é genial para a lógica! Dominar o computador e as planilhas vai alavancar seu futuro. Os cursos de Informática Básica e Excel são a sua cara.",
      icon: <Laptop size={64} color="#3b82f6" />
    },
    Massage: {
      title: "Massagista (Curso FIC)",
      description: "Você é puro acolhimento! O curso FIC de Massagista vai colocar seu dom para acalmar as pessoas e proporcionar bem-estar nas suas próprias mãos, literalmente.",
      icon: <HandHeart size={64} color="#10b981" />
    },
    Communication: {
      title: "Dicção, Desinibição e Oratória (Curso FIC)",
      description: "Que carisma! Você nasceu para brilhar. O curso FIC de Dicção, Desinibição e Oratória vai refinar seu talento e te levar muito longe falando com o público.",
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
      
      <button onClick={onRestart} className="btn-primary" style={{ marginTop: '20px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <Sparkles size={20} />
        Refazer o Quiz
      </button>

      <button onClick={() => window.location.reload()} className="btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <Home size={20} />
        Voltar ao Início
      </button>
    </div>
  );
}
