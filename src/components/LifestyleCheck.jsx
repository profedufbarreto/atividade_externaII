import { useState } from 'react';
import './HealthHub.css';

/* ── Perguntas e dimensões ── */
const DIMENSIONS = {
  sono:       { label: 'Sono',        emoji: '😴', color: '#8b5cf6' },
  hidratacao: { label: 'Hidratação',  emoji: '💧', color: '#0ea5e9' },
  movimento:  { label: 'Movimento',   emoji: '🏃', color: '#10b981' },
  nutricao:   { label: 'Nutrição',    emoji: '🥦', color: '#f59e0b' },
  mental:     { label: 'Saúde Mental',emoji: '🧘', color: '#ec4899' },
};

const TIPS = {
  sono: [
    { maxScore: 2, tip: '🔴 Seu sono está crítico. Priorize pelo menos 7h por noite. Crie uma rotina: desligue telas 1h antes, mantenha o quarto escuro e fresco.' },
    { maxScore: 4, tip: '🟡 Seu sono precisa de atenção. Tente ir dormir e acordar nos mesmos horários, mesmo nos fins de semana. Consistência é a chave.' },
    { maxScore: 6, tip: '🟢 Bom sono! Continue mantendo sua rotina. Para melhorar ainda mais, tente meditação guiada antes de dormir.' },
  ],
  hidratacao: [
    { maxScore: 2, tip: '🔴 Você está desidratado(a)! Começe com um copo de água ao acordar. Use um aplicativo para lembrar de beber ao longo do dia.' },
    { maxScore: 4, tip: '🟡 Hidratação abaixo do ideal. Tente manter uma garrafinha sempre por perto e preferir água a bebidas açucaradas.' },
    { maxScore: 6, tip: '🟢 Boa hidratação! Continue assim. Frutas com alta água (melancia, pepino) também contam para sua meta diária.' },
  ],
  movimento: [
    { maxScore: 2, tip: '🔴 Seu corpo precisa de movimento! Comece com 10 minutos de caminhada por dia. Pequenos começos criam grandes hábitos.' },
    { maxScore: 4, tip: '🟡 Você se move, mas pode evoluir. Tente adicionar 2x por semana de exercício de força. Seu metabolismo agradece.' },
    { maxScore: 6, tip: '🟢 Ótima atividade física! O exercício regular reduz risco de mais de 35 doenças crônicas. Continue!' },
  ],
  nutricao: [
    { maxScore: 2, tip: '🔴 Sua alimentação pede ajuda. Comece adicionando 1 porção de vegetal ou fruta por dia. Pequenas trocas fazem grande diferença.' },
    { maxScore: 4, tip: '🟡 Você pode melhorar sua dieta. Tente o método do prato: metade vegetais, 1/4 proteína, 1/4 carboidratos.' },
    { maxScore: 6, tip: '🟢 Boa nutrição! Uma alimentação variada protege seu microbioma intestinal — seu segundo cérebro.' },
  ],
  mental: [
    { maxScore: 2, tip: '🔴 Sua saúde mental necessita de cuidado urgente. Converse com alguém de confiança ou consulte um profissional. Pedir ajuda é força, não fraqueza.' },
    { maxScore: 4, tip: '🟡 Você sente algum desgaste mental. Tente 5 minutos de respiração profunda pela manhã e limite o tempo em redes sociais.' },
    { maxScore: 6, tip: '🟢 Saúde mental equilibrada! Continue com seus rituais de autocuidado e cultivando relações que te nutrem.' },
  ],
};

function getTip(dim, score) {
  return TIPS[dim].find(t => score <= t.maxScore)?.tip || TIPS[dim][TIPS[dim].length - 1].tip;
}

const QUESTIONS = [
  {
    text: 'Quantas horas você dorme por noite (em média)?',
    why: 'O sono regula hormônios, consolida memórias e repara tecidos. É o pilar mais subestimado da saúde.',
    dimension: 'sono',
    options: [
      { emoji: '😴', text: 'Menos de 5h — dormir é luxo', score: 0 },
      { emoji: '🛏️', text: '5 a 6h — poderia ser mais', score: 2 },
      { emoji: '✅', text: '7 a 8h — consistentemente', score: 4 },
      { emoji: '🌟', text: '8h+ e acordo bem descansado(a)', score: 6 },
    ],
  },
  {
    text: 'Com que qualidade você avalia seu sono?',
    why: 'Quantidade sem qualidade não restaura o organismo. Acordar cansado(a) indica sono não-restaurador.',
    dimension: 'sono',
    options: [
      { emoji: '💀', text: 'Péssimo — acordo exausto(a)', score: 0 },
      { emoji: '😕', text: 'Regular — às vezes acordo mal', score: 2 },
      { emoji: '😊', text: 'Bom — acordo bem na maioria dos dias', score: 4 },
      { emoji: '💫', text: 'Ótimo — sono profundo e reparador', score: 6 },
    ],
  },
  {
    text: 'Quantos copos de água você bebe por dia?',
    why: 'A hidratação regula temperatura, transporta nutrientes e protege articulações. 2L/dia é o mínimo recomendado.',
    dimension: 'hidratacao',
    options: [
      { emoji: '🏜️', text: 'Menos de 4 copos', score: 0 },
      { emoji: '🌵', text: '4 a 6 copos', score: 2 },
      { emoji: '💧', text: '6 a 8 copos', score: 4 },
      { emoji: '🌊', text: 'Mais de 8 copos — sempre hidratado(a)', score: 6 },
    ],
  },
  {
    text: 'Com que frequência você faz atividade física?',
    why: 'A OMS recomenda 150 min de exercício moderado por semana. Reduz risco cardíaco, diabetes e depressão.',
    dimension: 'movimento',
    options: [
      { emoji: '🛋️', text: 'Quase nunca / sedentário(a)', score: 0 },
      { emoji: '🚶', text: '1x por semana', score: 2 },
      { emoji: '🏃', text: '2-4x por semana', score: 4 },
      { emoji: '🏅', text: '5+ vezes por semana', score: 6 },
    ],
  },
  {
    text: 'Como você descreveria sua alimentação?',
    why: 'Uma dieta variada rica em vegetais alimenta o microbioma intestinal, que regula humor, imunidade e cognição.',
    dimension: 'nutricao',
    options: [
      { emoji: '🍟', text: 'Muita gordura, fast food, pouca fibra', score: 0 },
      { emoji: '🍕', text: 'Irregular — tem dias bons e ruins', score: 2 },
      { emoji: '🥗', text: 'Razoável — como frutas e vegetais às vezes', score: 4 },
      { emoji: '🥦', text: 'Excelente — variada, natural e balanceada', score: 6 },
    ],
  },
  {
    text: 'Como está seu nível de estresse no dia a dia?',
    why: 'O estresse crônico eleva cortisol, prejudica imunidade, sono, digestão e saúde cardiovascular.',
    dimension: 'mental',
    options: [
      { emoji: '🌋', text: 'Altíssimo — me sinto constantemente sobrecarregado(a)', score: 0 },
      { emoji: '😤', text: 'Alto — estressado(a) com frequência', score: 2 },
      { emoji: '😌', text: 'Moderado — sei gerenciar na maioria das vezes', score: 4 },
      { emoji: '🧘', text: 'Baixo — tenho paz e equilíbrio', score: 6 },
    ],
  },
  {
    text: 'Com qual frequência você tem momentos de lazer/autocuidado?',
    why: 'Momentos de prazer ativam o sistema parasimpático (descanso), reduzindo inflamação e melhorando o humor.',
    dimension: 'mental',
    options: [
      { emoji: '🚫', text: 'Raramente ou nunca', score: 0 },
      { emoji: '📅', text: 'Às vezes — quando sobra tempo', score: 2 },
      { emoji: '🎯', text: 'Algumas vezes por semana', score: 4 },
      { emoji: '🌟', text: 'Todo dia — autocuidado é prioridade', score: 6 },
    ],
  },
  {
    text: 'Você consome frutas e/ou vegetais quantas vezes ao dia?',
    why: 'Frutas e vegetais fornecem fibras, antioxidantes e fitoquímicos que combatem inflamação e protegem o DNA.',
    dimension: 'nutricao',
    options: [
      { emoji: '❌', text: 'Quase nunca', score: 0 },
      { emoji: '🍎', text: '1 porção por dia', score: 2 },
      { emoji: '🥦', text: '2-3 porções por dia', score: 4 },
      { emoji: '🌈', text: '4+ porções diárias — como o arco-íris', score: 6 },
    ],
  },
  {
    text: 'Você pratica algum exercício de respiração, meditação ou mindfulness?',
    why: 'Respiração consciente ativa o nervo vago, reduzindo frequência cardíaca, pressão e ansiedade.',
    dimension: 'mental',
    options: [
      { emoji: '❓', text: 'Nunca ouvi falar nisso', score: 0 },
      { emoji: '🤔', text: 'Já tentei mas não mantive', score: 2 },
      { emoji: '☁️', text: 'Às vezes, quando lembro', score: 4 },
      { emoji: '🪷', text: 'Sim, é parte da minha rotina', score: 6 },
    ],
  },
  {
    text: 'Como está sua postura e mobilidade no dia a dia?',
    why: 'Postura adequada evita dores crônicas, protege coluna e melhora respiração e circulação.',
    dimension: 'movimento',
    options: [
      { emoji: '🪑', text: 'Fico sentado(a) 8h+ por dia sem pausas', score: 0 },
      { emoji: '😬', text: 'Sinto dores — sei que preciso melhorar', score: 2 },
      { emoji: '🚶', text: 'Procuro me movimentar durante o dia', score: 4 },
      { emoji: '💪', text: 'Ótima — faço alongamento e cuido da postura', score: 6 },
    ],
  },
];

/* ── Ratings gerais ── */
const OVERALL_RATINGS = [
  { min: 85, emoji: '🏆', label: 'Saúde Excelente' },
  { min: 65, emoji: '⭐', label: 'Saúde Boa' },
  { min: 45, emoji: '✅', label: 'Saúde Razoável' },
  { min: 25, emoji: '⚠️', label: 'Atenção Necessária' },
  { min: 0,  emoji: '🔴', label: 'Cuidados Urgentes' },
];

function getOverallRating(pct) { return OVERALL_RATINGS.find(r => pct >= r.min); }

/* ── Component ── */
export default function LifestyleCheck({ onBack }) {
  const [step, setStep]     = useState(-1); // -1 = intro
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleAnswer = (option) => {
    const newAnswers = [...answers, { dimension: QUESTIONS[step].dimension, score: option.score }];
    if (step < QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setStep(s => s + 1);
    } else {
      // Compute dimension scores
      const dimScores = {};
      const dimCounts = {};
      for (const a of newAnswers) {
        dimScores[a.dimension] = (dimScores[a.dimension] || 0) + a.score;
        dimCounts[a.dimension] = (dimCounts[a.dimension] || 0) + 1;
      }
      const dimPct = {};
      for (const d of Object.keys(dimScores)) {
        dimPct[d] = Math.round((dimScores[d] / (dimCounts[d] * 6)) * 100);
      }
      const totalPct = Math.round(Object.values(dimPct).reduce((a, b) => a + b, 0) / Object.keys(dimPct).length);
      setResult({ dimPct, totalPct });
      setAnswers(newAnswers);
    }
  };

  const reset = () => { setStep(-1); setAnswers([]); setResult(null); };
  const progress = step >= 0 ? ((step) / QUESTIONS.length) * 100 : 0;

  /* Intro */
  if (step === -1) {
    return (
      <div className="glass-panel health-game fade-enter">
        <h1 className="health-game-title" style={{ textAlign: 'center' }}>📋 Check-up de Saúde</h1>
        <p className="health-game-sub">10 perguntas · ~3 minutos · Resultado em 5 dimensões</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 28 }}>
          {Object.values(DIMENSIONS).map(d => (
            <div key={d.label} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.04)', border: `1px solid ${d.color}40`, borderRadius: 12, padding: '12px 8px' }}>
              <div style={{ fontSize: '1.6rem' }}>{d.emoji}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>{d.label}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 14, padding: 16, marginBottom: 28 }}>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', margin: 0, textAlign: 'left' }}>
            ℹ️ Este check-up é <strong>educativo</strong>, não substitui avaliação médica profissional. Responda com honestidade para obter dicas personalizadas.
          </p>
        </div>
        <button id="btn-lifestyle-start" className="btn-health primary" style={{ width: '100%' }} onClick={() => setStep(0)}>
          📋 Iniciar Check-up
        </button>
        <div style={{ marginTop: 14, textAlign: 'center' }}>
          <button className="health-back-btn" onClick={onBack}>← Voltar ao Hub</button>
        </div>
      </div>
    );
  }

  /* Result */
  if (result) {
    const { dimPct, totalPct } = result;
    const overall = getOverallRating(totalPct);
    return (
      <div className="glass-panel health-game fade-enter">
        <div className="lifestyle-result">
          <h1 className="lifestyle-result-title">Seu Relatório de Saúde</h1>
          <p className="lifestyle-result-sub">Baseado nas suas 10 respostas</p>

          <div className="lifestyle-overall">
            <span className="lifestyle-overall-label">Saúde Geral</span>
            <span className="lifestyle-overall-score">{totalPct}%</span>
            <span className="lifestyle-overall-rating">{overall?.emoji} {overall?.label}</span>
          </div>

          <div className="lifestyle-dimensions">
            {Object.entries(DIMENSIONS).map(([key, dim]) => {
              const pct = dimPct[key] ?? 0;
              const tip = getTip(key, pct <= 33 ? 2 : pct <= 66 ? 4 : 6);
              return (
                <div key={key} className="lifestyle-dim">
                  <div className="lifestyle-dim-header">
                    <div className="lifestyle-dim-name">
                      <span style={{ fontSize: '1.2rem' }}>{dim.emoji}</span>
                      <span>{dim.label}</span>
                    </div>
                    <span className="lifestyle-dim-score" style={{ color: dim.color }}>{pct}%</span>
                  </div>
                  <div className="lifestyle-dim-bar-bg">
                    <div className="lifestyle-dim-bar-fill" style={{ width: `${pct}%`, background: dim.color }} />
                  </div>
                  <p className="lifestyle-dim-tip">{tip}</p>
                </div>
              );
            })}
          </div>

          <div className="lifestyle-actions">
            <button id="btn-lifestyle-reset" className="btn-health primary" onClick={reset}>🔄 Refazer Check-up</button>
            <button className="health-back-btn" onClick={onBack}>← Voltar ao Hub</button>
          </div>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];
  return (
    <div className="glass-panel health-game fade-enter">
      <div className="lifestyle-progress">
        <div className="lifestyle-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="lifestyle-q-step">
        {DIMENSIONS[q.dimension].emoji} {DIMENSIONS[q.dimension].label} · Pergunta {step + 1} de {QUESTIONS.length}
      </p>
      <h2 className="lifestyle-q-text">{q.text}</h2>
      <p className="lifestyle-q-why">💡 {q.why}</p>

      <div className="lifestyle-options">
        {q.options.map((opt, i) => (
          <button
            key={i}
            id={`btn-lifestyle-${step}-${i}`}
            className="lifestyle-opt"
            onClick={() => handleAnswer(opt)}
          >
            <span className="lifestyle-opt-emoji">{opt.emoji}</span>
            <span className="lifestyle-opt-text">{opt.text}</span>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <button className="health-back-btn" onClick={onBack} id="btn-lifestyle-back">← Voltar ao Hub</button>
      </div>
    </div>
  );
}
