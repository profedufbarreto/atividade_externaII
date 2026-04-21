import { useState, useEffect, useRef, useCallback } from 'react';
import './HealthHub.css';

const PADS = [
  { id: 'green',  cls: 'memory-pad-green',  label: '🟢' },
  { id: 'red',    cls: 'memory-pad-red',    label: '🔴' },
  { id: 'yellow', cls: 'memory-pad-yellow', label: '🟡' },
  { id: 'blue',   cls: 'memory-pad-blue',   label: '🔵' },
];

const RATINGS = [
  { min: 12, emoji: '🧠', title: 'Memória Fotográfica!',  desc: 'Incrível! Sequência de 12+. Você tem uma memória de curto prazo excepcional. Pesquisas mostram que isso está associado a alta capacidade de concentração.' },
  { min: 9,  emoji: '🏆', title: 'Memória Excelente',     desc: 'Excelente! Sequência acima de 9. Sua memória de trabalho está no topo. Exercícios mentais regulares claramente estão funcionando!' },
  { min: 7,  emoji: '⭐', title: 'Acima da Média',        desc: 'Acima da média! A maioria dos adultos consegue 7 itens (Lei de Miller). Você está superando a barreira natural do cérebro humano.' },
  { min: 5,  emoji: '✅', title: 'Normal',                 desc: 'Normal! A "regra mágica" do psicólogo George Miller diz que a memória imediata humana tem 7 ± 2 itens. Você está dentro da faixa típica.' },
  { min: 0,  emoji: '💪', title: 'Continue Treinando!',   desc: 'Iniciando o treino! Memória é um músculo — quanto mais você usa, mais forte fica. Tente de novo com foco total: elimine distrações!' },
];

function getRating(score) { return RATINGS.find(r => score >= r.min); }

export default function MemoryGame({ onBack }) {
  const [sequence, setSequence]     = useState([]);
  const [userSeq, setUserSeq]       = useState([]);
  const [phase, setPhase]           = useState('idle');  // idle|showing|input|fail|win
  const [activePad, setActivePad]   = useState(null);
  const [score, setScore]           = useState(0);
  const [inputProgress, setInputProgress] = useState(0); // how many correct so far
  const timerRef = useRef(null);

  const clearTimer = () => { if (timerRef.current) clearTimeout(timerRef.current); };
  useEffect(() => () => clearTimer(), []);

  // Flash a sequence
  const showSequence = useCallback((seq) => {
    setPhase('showing');
    setUserSeq([]);
    setInputProgress(0);
    let i = 0;
    const next = () => {
      if (i >= seq.length) {
        timerRef.current = setTimeout(() => setPhase('input'), 600);
        return;
      }
      setActivePad(seq[i]);
      timerRef.current = setTimeout(() => {
        setActivePad(null);
        timerRef.current = setTimeout(() => { i++; next(); }, 300);
      }, 600);
    };
    timerRef.current = setTimeout(next, 600);
  }, []);

  const startGame = useCallback(() => {
    clearTimer();
    const first = PADS[Math.floor(Math.random() * PADS.length)].id;
    const seq = [first];
    setSequence(seq);
    setScore(0);
    showSequence(seq);
  }, [showSequence]);

  const handlePad = (padId) => {
    if (phase !== 'input') return;
    setActivePad(padId);
    setTimeout(() => setActivePad(null), 250);

    const expected = sequence[inputProgress];
    if (padId !== expected) {
      setPhase('fail');
      return;
    }
    const newProgress = inputProgress + 1;
    setInputProgress(newProgress);

    if (newProgress === sequence.length) {
      // Completed this round!
      const newScore = score + 1;
      setScore(newScore);
      setPhase('showing');
      const next = PADS[Math.floor(Math.random() * PADS.length)].id;
      const newSeq = [...sequence, next];
      setSequence(newSeq);
      timerRef.current = setTimeout(() => showSequence(newSeq), 1000);
    }
  };

  const reset = () => { clearTimer(); setSequence([]); setUserSeq([]); setPhase('idle'); setScore(0); setActivePad(null); setInputProgress(0); };
  const rating = getRating(score);

  const phaseLabel = {
    idle:    '',
    showing: 'Memorize a sequência...',
    input:   'Sua vez! Repita a sequência',
    fail:    `❌ Errou! Chegou em ${score} ${score === 1 ? 'rodada' : 'rodadas'}`,
    win:     '',
  }[phase];

  const phaseCls = { showing: 'showing', input: 'your-turn', fail: 'fail' }[phase] || '';

  return (
    <div className="glass-panel health-game fade-enter">
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1 className="health-game-title">🧠 Memória Cognitiva</h1>
        <p className="health-game-sub">Repita a sequência de cores em ordem. Vai ficando mais longa a cada rodada!</p>
      </div>

      {phase === 'idle' ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '5rem', marginBottom: 16 }}>🟢🔴🟡🔵</div>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 28 }}>
            Preste atenção na ordem em que as cores piscam e repita clicando nelas. A sequência cresce 1 cor por vez.
          </p>
          <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 14, padding: 16, marginBottom: 28 }}>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', margin: 0, textAlign: 'left' }}>
              💡 <strong>Por que isso importa?</strong> A memória de curto prazo (memória de trabalho) é fundamental para aprendizado, concentração e saúde cognitiva. Exercitá-la regularmente ajuda a prevenir declínio mental com a idade.
            </p>
          </div>
          <button id="btn-memory-start" className="btn-health primary" onClick={startGame}>🧠 Iniciar Jogo</button>
        </div>
      ) : phase === 'fail' ? (
        <div className="memory-result-box">
          <span className="memory-result-score">{score}</span>
          <span className="memory-result-label">{score === 1 ? 'rodada completada' : 'rodadas completadas'}</span>
          <span className="memory-rating">{rating?.emoji} {rating?.title}</span>
          <p className="memory-rating-desc">{rating?.desc}</p>
          <div style={{ marginTop: 24, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button id="btn-memory-reset" className="btn-health primary" onClick={startGame}>🔄 Jogar Novamente</button>
            <button className="health-back-btn" onClick={onBack}>← Voltar ao Hub</button>
          </div>
        </div>
      ) : (
        <>
          <div className="memory-score-bar">
            <div>
              <div className="memory-score-label">Rodada</div>
              <div className="memory-score-value">{score}</div>
            </div>
            <div className="memory-phase-label" style={{ textAlign: 'center' }}>
              <span className={phaseCls}>{phaseLabel}</span>
            </div>
            <div>
              <div className="memory-score-label">Sequência</div>
              <div className="memory-score-value" style={{ textAlign: 'right' }}>{sequence.length}</div>
            </div>
          </div>

          {/* Progress dots */}
          <div className="memory-sequence-track" style={{ marginBottom: 20 }}>
            {sequence.map((_, i) => (
              <div key={i} className={`memory-seq-dot ${i < inputProgress ? 'correct' : i === inputProgress && phase === 'input' ? 'current' : ''}`} />
            ))}
          </div>

          <div className="memory-pads">
            {PADS.map(pad => (
              <button
                key={pad.id}
                id={`btn-pad-${pad.id}`}
                className={`memory-pad ${pad.cls} ${activePad === pad.id ? 'active' : ''}`}
                onClick={() => handlePad(pad.id)}
                disabled={phase !== 'input'}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button className="health-back-btn" onClick={() => { reset(); onBack(); }}>← Voltar ao Hub</button>
          </div>
        </>
      )}
    </div>
  );
}
