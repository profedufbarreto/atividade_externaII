import { useState, useEffect, useRef, useCallback } from 'react';
import './HealthHub.css';

const RANKS = [
  { max:  150, emoji: '🏎️', title: 'Piloto de F1',        desc: 'Reflexo sobre-humano! Você está no nível de atletas de elite e pilotos profissionais. Seu sistema nervoso é incrivelmente ágil.' },
  { max:  200, emoji: '🏅', title: 'Atleta de Elite',      desc: 'Reflexo excelente! Está no nível de esportistas bem treinados. Seu cérebro processa estímulos visuais com grande velocidade.' },
  { max:  250, emoji: '⚡', title: 'Acima da Média',       desc: 'Bom reflexo! Você é mais rápido que a maioria das pessoas. Sono de qualidade e exercício físico contribuem para isso.' },
  { max:  300, emoji: '✅', title: 'Normal',                desc: 'Tempo de reação humano típico. A maioria das pessoas fica entre 200–300ms. Hidratação e sono impactam bastante esse valor.' },
  { max:  400, emoji: '🌙', title: 'Um Pouco Lento',       desc: 'Pode estar cansado, desidratado ou distraído. Faça uma pausa, respire e tente novamente. O descanso muda tudo!' },
  { max: Infinity, emoji: '😪', title: 'Muito Lento',      desc: 'Pode ser sinal de cansaço extremo, uso de telas ou falta de foco. Cuide do seu sono e hidratação — e tente de novo!' },
];

function getRank(avgMs) { return RANKS.find(r => avgMs < r.max); }

const TOTAL_ROUNDS = 5;

export default function ReflexGame({ onBack }) {
  const [phase, setPhase]   = useState('idle');    // idle | waiting | go | early | done
  const [round, setRound]   = useState(0);
  const [times, setTimes]   = useState([]);
  const [startMs, setStartMs] = useState(null);
  const timerRef = useRef(null);

  const clearTimer = () => { if (timerRef.current) clearTimeout(timerRef.current); };

  const startRound = useCallback(() => {
    setPhase('waiting');
    const delay = 1500 + Math.random() * 2500;
    timerRef.current = setTimeout(() => {
      setPhase('go');
      setStartMs(Date.now());
    }, delay);
  }, []);

  useEffect(() => () => clearTimer(), []);

  const handleCircleClick = () => {
    if (phase === 'idle') { startRound(); return; }
    if (phase === 'waiting') { clearTimer(); setPhase('early'); return; }
    if (phase === 'go') {
      const elapsed = Date.now() - startMs;
      const newTimes = [...times, elapsed];
      const newRound = round + 1;
      setTimes(newTimes);
      setRound(newRound);
      if (newRound >= TOTAL_ROUNDS) { setPhase('done'); }
      else { setPhase('idle'); }
      return;
    }
    if (phase === 'early' || phase === 'idle') { startRound(); }
  };

  const reset = () => { clearTimer(); setPhase('idle'); setRound(0); setTimes([]); setStartMs(null); };

  const avgMs = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
  const rank = phase === 'done' ? getRank(avgMs) : null;

  const circleText = {
    idle:    round === 0 ? 'Toque para\ncomeçar' : 'Próxima\nrodada →',
    waiting: 'Aguarde...',
    go:      'AGORA!',
    early:   'Antecipou!\nToque para\ntentar novamente',
    done:    '',
  }[phase];

  return (
    <div className="glass-panel health-game fade-enter">
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1 className="health-game-title">⚡ Teste de Reflexos</h1>
        <p className="health-game-sub">Quando a luz ficar VERDE — toque o mais rápido que conseguir!</p>
      </div>

      <div className="reflex-area">
        {/* Round dots */}
        <div className="reflex-rounds">
          {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => (
            <div key={i} className={`reflex-round-dot ${i < round ? 'done' : i === round && phase !== 'idle' && phase !== 'done' ? 'active' : 'pending'}`}>
              {i < round ? '✓' : i + 1}
            </div>
          ))}
        </div>

        {/* Click circle */}
        {phase !== 'done' && (
          <div
            id="reflex-circle"
            className={`reflex-circle ${phase}`}
            onClick={handleCircleClick}
            style={{ whiteSpace: 'pre-line', lineHeight: 1.4, padding: 20 }}
          >
            {circleText}
          </div>
        )}

        {/* Per-round times */}
        {times.length > 0 && phase !== 'done' && (
          <div style={{ display: 'flex', gap: 10 }}>
            {times.map((t, i) => (
              <div key={i} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.05)', padding: '8px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}>#{i + 1}</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--health-green)' }}>{t}ms</div>
              </div>
            ))}
          </div>
        )}

        {/* Result */}
        {phase === 'done' && rank && (
          <>
            <div className="reflex-rank-box" style={{ width: '100%' }}>
              <span className="reflex-rank-emoji">{rank.emoji}</span>
              <span className="reflex-rank-title">{rank.title}</span>
              <span className="reflex-avg-label">Média</span>
              <span className="reflex-avg-value">{avgMs} ms</span>
              <p className="reflex-rank-desc" style={{ marginTop: 10, marginBottom: 0 }}>{rank.desc}</p>
            </div>
            <div className="reflex-result-grid">
              {times.map((t, i) => (
                <div key={i} className="reflex-result-cell">
                  <div className="round-label">Rodada {i + 1}</div>
                  <div className="round-time">{t} ms</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button id="btn-reflex-reset" className="btn-health primary" onClick={reset}>🔄 Testar Novamente</button>
              <button className="health-back-btn" onClick={onBack}>← Voltar ao Hub</button>
            </div>
          </>
        )}

        {phase !== 'done' && (
          <button className="health-back-btn" style={{ marginTop: 8 }} onClick={() => { reset(); onBack(); }}>← Voltar ao Hub</button>
        )}
      </div>
    </div>
  );
}
