import { Sparkles, Laptop, BookOpen, HandHeart, Mic, HeartPulse, MonitorSmartphone, Scissors, Home } from 'lucide-react';
import { BrandFlight, LogoCircle } from './BrandElements';

export default function ResultScreen({ name, scores, onRestart }) {
  const highestScoreObj = Object.entries(scores).reduce((max, curr) => curr[1] > max[1] ? curr : max);
  const topCategory = highestScoreObj[0];

  const resultsData = {
    Saude: {
      title: "Saúde e Bem-estar (Senac NH)",
      description: "Seu perfil é voltado ao cuidado e à empatia! No Senac Novo Hamburgo, você pode trilhar caminhos incríveis como o Técnico em Enfermagem, Massoterapia ou Estética. Sua dedicação pode transformar vidas e promover o bem-estar da nossa comunidade.",
      icon: <HeartPulse size={64} color="#10b981" />,
      stats: { demand: 98, tech: 85, human: 100 }
    },
    Tecnologia: {
      title: "Tecnologia e Inovação (Senac NH)",
      description: "Você respira inovação e lógica! O mundo digital precisa de mentes como a sua. Cursos como Técnico em Informática, Técnico em ADS ou Programação Python são as escolhas perfeitas para você ser o próximo protagonista da tecnologia na nossa região.",
      icon: <MonitorSmartphone size={64} color="#3b82f6" />,
      stats: { demand: 99, tech: 100, human: 75 }
    },
    Moda: {
      title: "Moda e Design (Senac NH)",
      description: "Sua criatividade e senso estético são únicos! No Senac Novo Hamburgo, você pode transformar seu talento em profissão com o Técnico em Design de Moda, Consultoria de Imagem ou cursos de Modelagem e Costura. O mundo da moda espera pelo seu estilo!",
      icon: <Scissors size={64} color="#ec4899" />,
      stats: { demand: 85, tech: 70, human: 90 }
    }
  };

  const result = resultsData[topCategory];

  return (
    <div className="glass-panel fade-enter" style={{ textAlign: 'center' }}>
      <LogoCircle />
      <BrandFlight style={{ top: '10%', left: '-5%', transform: 'rotate(10deg) scale(1.2)', opacity: 0.05 }} />
      
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
        {result.icon}
      </div>
      <h1>Incrível, {name}!</h1>
      <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>Seu perfil combina perfeitamente com:</p>
      
      <h2 style={{ color: 'var(--primary)', fontSize: '2rem' }}>{result.title}</h2>
      <p style={{ marginTop: '20px', lineHeight: '1.6' }}>{result.description}</p>

      {/* Career Dashboard */}
      <div className="stats-container">
        <div className="stat-item">
          <div className="stat-label">
            <span>Demanda no Mercado (RS)</span>
            <span>{result.stats.demand}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${result.stats.demand}%` }}></div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">
            <span>Habilidade Técnica Necessária</span>
            <span>{result.stats.tech}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${result.stats.tech}%`, background: 'var(--primary)' }}></div>
          </div>
        </div>
        <div className="stat-item">
          <div className="stat-label">
            <span>Habilidade Interpessoal (Soft Skill)</span>
            <span>{result.stats.human}%</span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${result.stats.human}%`, background: 'var(--success)' }}></div>
          </div>
        </div>
      </div>

      
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
