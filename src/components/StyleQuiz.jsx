import { useState, useRef } from 'react';
import './FashionHub.css';

/* ─────────────────────────────────────────────
   KEYWORD → STYLE mapping (normalised, accent-free)
   The analyzeText() function uses this to score
   free-form answers from the "Outro..." option.
───────────────────────────────────────────── */
const STYLE_KEYWORDS = {
  classic: [
    'classico','elegante','sofisticado','formal','alfaiataria','blazer',
    'social','refinado','atemporal','perola','colarinho','estruturado',
    'terno','gravata','camisa social','escritorio','executivo','serio',
    'tradicional','discreto','conservador','requintado','impecavel',
  ],
  minimal: [
    'minimalista','minimalismo','simples','basico','clean','neutro',
    'essencial','sem exagero','limpo','menos','funcional','capsule',
    'monocromatico','poucos','despretensioso','basic','nao muito',
    'sobrio','direto','objetivo','organizado','pratico',
  ],
  boho: [
    'boho','hippie','free','livre','natureza','bordado','franja','etnico',
    'artesanal','camadas','bota','chapeu','terra','terroso','indie',
    'rústico','macrame','patchwork','flor do campo','festival','couro',
    'bohemio','gitana','cigana','macrobiotica','ecologico','flores silvestres',
    'renda artesanal','tingimento','natural','solto',
  ],
  streetwear: [
    'street','urbano','moletom','sneaker','tenis','oversized','cargo',
    'hype','boné','skate','rap','hip hop','casual','converse','jordan',
    'nike','adidas','supreme','off white','hoodie','puffer','drop',
    'grafite','pichacao','corrente','hypebeast','tênis chunky','cano alto',
    'camiseta larga','bermuda','low top','high top',
  ],
  romantic: [
    'romantico','delicado','floral','laco','renda','tule','rose','rosa',
    'flor','feminino','fofo','princesa','suave','pastel','perola','laco',
    'franzido','babado','bordado de flor','vestido','sapatilha','cinto',
    'puff','volumoso','lavendar','lavanda','creme','off white','vanilla',
    'amor','apaixonada','delicadeza','leveza','doce',
  ],
  glam: [
    'glam','brilho','luxo','dourado','metalico','veludo','salto','festa',
    'balada','red carpet','exuberante','paete','sequin','glamour','shine',
    'lantejoula','strass','cristal','diamante','caro','grife','luxuoso',
    'statement','chamativo','brilhante','look de festa','vestido longo',
    'sapato de festa','bolsa de marca','estiloso','impactante',
  ],
  sporty: [
    'esporte','academia','legging','corrida','treino','atletico','fitness',
    'confortavel','funcional','agasalho','esportivo','gym','musculacao',
    'yoga','pilates','ciclismo','natacao','futebol','basquete','running',
    'tenis de corrida','cropped','dry fit','compressao','moletom',
    'bermuda','regata','meias','touca','banda na cabeca',
  ],
};

function analyzeText(raw) {
  // Normalise: lowercase + remove accents
  const text = raw.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  const scores = {};
  for (const [style, keywords] of Object.entries(STYLE_KEYWORDS)) {
    scores[style] = keywords.filter(kw => text.includes(kw)).length;
  }

  // Return styles that matched at least 1 keyword
  const matched = Object.entries(scores)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k);

  // Fallback: if nothing matched, try a sentiment heuristic
  if (matched.length === 0) {
    if (/confort|casual|relax/.test(text)) return ['minimal', 'sporty'];
    if (/boni|linda|arrumad/.test(text)) return ['romantic', 'glam'];
    if (/diferent|criativ|artist/.test(text)) return ['boho', 'streetwear'];
    return ['minimal']; // last resort
  }

  return matched.slice(0, 3); // top 3 matched styles
}

/* ─────────────────────────────────────────────
   QUESTIONS — 6 predefined options + "Outro..."
───────────────────────────────────────────── */
const QUESTIONS = [
  {
    id: 1,
    text: 'Como você descreveria seu dia a dia?',
    options: [
      { emoji: '💼', text: 'Reuniões e trabalho formal', styles: ['classic', 'minimal'] },
      { emoji: '🎨', text: 'Criativo e cheio de arte', styles: ['boho', 'romantic'] },
      { emoji: '🏙️', text: 'Urbano, agitado e moderno', styles: ['streetwear', 'minimal'] },
      { emoji: '🌿', text: 'Tranquilo, contato com a natureza', styles: ['boho'] },
      { emoji: '🎭', text: 'Variado — muda conforme o dia', styles: ['glam', 'classic'] },
      { emoji: '🏋️', text: 'Ativo, esportes e movimento', styles: ['sporty'] },
      { emoji: '🎓', text: 'Estudante / dia casual', styles: ['minimal', 'streetwear'] },
      { emoji: '🎤', text: 'Entretenimento, shows e eventos', styles: ['glam', 'streetwear'] },
    ],
  },
  {
    id: 2,
    text: 'Qual é a sua paleta de cores favorita?',
    options: [
      { emoji: '🖤', text: 'Neutros: preto, branco e cinza', styles: ['minimal', 'classic'] },
      { emoji: '🌈', text: 'Cores vibrantes e estampas ousadas', styles: ['boho', 'streetwear'] },
      { emoji: '🌸', text: 'Tons suaves: rosê, nude, bege', styles: ['romantic', 'classic'] },
      { emoji: '🔥', text: 'Terrosos: caramelo, ferrugem', styles: ['boho'] },
      { emoji: '✨', text: 'Metálicos: dourado, prateado', styles: ['glam'] },
      { emoji: '💙', text: 'Tons esportivos: azul, verde neon', styles: ['sporty', 'streetwear'] },
      { emoji: '🟤', text: 'Marrons e tons de terra quentes', styles: ['boho', 'classic'] },
      { emoji: '🍬', text: 'Pastéis: lavanda, azul bebê, menta', styles: ['romantic', 'minimal'] },
    ],
  },
  {
    id: 3,
    text: 'Qual peça não pode faltar no seu guarda-roupa?',
    options: [
      { emoji: '👔', text: 'Uma camisa bem estruturada', styles: ['classic', 'minimal'] },
      { emoji: '👖', text: 'Calça jeans ou moletom', styles: ['streetwear', 'boho'] },
      { emoji: '👗', text: 'Um vestido fluido e delicado', styles: ['romantic', 'boho'] },
      { emoji: '🧥', text: 'Um casaco ou jaqueta de impacto', styles: ['streetwear', 'glam'] },
      { emoji: '👠', text: 'Um sapato que rouba a cena', styles: ['glam', 'classic'] },
      { emoji: '🩳', text: 'Bermuda, legging ou agasalho', styles: ['sporty'] },
      { emoji: '🥻', text: 'Saia midi ou maxi fluida', styles: ['boho', 'romantic'] },
      { emoji: '🧣', text: 'Camada extra — sobreposição', styles: ['boho', 'minimal'] },
    ],
  },
  {
    id: 4,
    text: 'Qual(is) acessório(s) é(são) o seu favorito?',
    options: [
      { emoji: '💍', text: 'Joias discretas e elegantes', styles: ['classic', 'minimal'] },
      { emoji: '🪬', text: 'Pulseiras e colares étnicos', styles: ['boho', 'romantic'] },
      { emoji: '🧢', text: 'Boné, bucket hat ou tênis chunky', styles: ['streetwear'] },
      { emoji: '🎀', text: 'Laços, tiaras e detalhes fofos', styles: ['romantic'] },
      { emoji: '💎', text: 'Bijoux exuberantes e brilhosas', styles: ['glam'] },
      { emoji: '🕶️', text: 'Óculos de sol e acessórios esportivos', styles: ['sporty', 'streetwear'] },
      { emoji: '👜', text: 'Bolsa estruturada ou de grife', styles: ['classic', 'glam'] },
      { emoji: '🧤', text: 'Luvas, cachecol ou chapéu estiloso', styles: ['classic', 'boho'] },
    ],
  },
  {
    id: 5,
    text: 'Como você escolhe seu look pela manhã?',
    options: [
      { emoji: '📋', text: 'Combinações planejadas com antecedência', styles: ['classic', 'minimal'] },
      { emoji: '🌀', text: 'No flow — o que o dia pedir', styles: ['boho', 'streetwear'] },
      { emoji: '💃', text: 'O que me faz sentir mais bonita', styles: ['romantic', 'glam'] },
      { emoji: '🏃', text: 'Conforto acima de tudo', styles: ['sporty', 'minimal'] },
      { emoji: '🔥', text: 'O que causar mais impacto', styles: ['glam', 'streetwear'] },
      { emoji: '🌸', text: 'Algo delicado e com amor próprio', styles: ['romantic', 'boho'] },
      { emoji: '🎲', text: 'Depende do humor do dia', styles: ['streetwear', 'boho'] },
      { emoji: '📸', text: 'Penso no que vai ficar bom nas fotos', styles: ['glam', 'romantic'] },
    ],
  },
  {
    id: 6,
    text: 'Se você fosse a uma loja, o que te atrai primeiro?',
    options: [
      { emoji: '🏷️', text: 'Peças atemporais e bem cortadas', styles: ['classic', 'minimal'] },
      { emoji: '🌿', text: 'Tecidos naturais e peças artesanais', styles: ['boho'] },
      { emoji: '💥', text: 'Estampas gráficas e drops exclusivos', styles: ['streetwear'] },
      { emoji: '🌹', text: 'Florais e detalhes delicados', styles: ['romantic'] },
      { emoji: '🪩', text: 'Brilhos, metálicos e veludo', styles: ['glam'] },
      { emoji: '🏅', text: 'Tecidos tecnológicos e funcionais', styles: ['sporty'] },
      { emoji: '🖤', text: 'Tudo monocromático e minimalista', styles: ['minimal'] },
      { emoji: '🎨', text: 'Peças únicas e incomuns', styles: ['boho', 'streetwear'] },
    ],
  },
  {
    id: 7,
    text: 'Qual ícone de estilo mais te inspira?',
    options: [
      { emoji: '🕊️', text: 'Audrey Hepburn — elegância clássica', styles: ['classic'] },
      { emoji: '🌺', text: 'Zendaya — versátil e ousada', styles: ['glam', 'streetwear'] },
      { emoji: '🌿', text: 'Florence Welch — boho poético', styles: ['boho', 'romantic'] },
      { emoji: '⚡', text: 'Rihanna — streetwear e atitude', styles: ['streetwear', 'glam'] },
      { emoji: '🌸', text: 'Taylor Swift — romântico e feminino', styles: ['romantic'] },
      { emoji: '⬜', text: 'Hailey Bieber — minimal e clean', styles: ['minimal'] },
      { emoji: '🏆', text: 'Serena Williams — sporty chic', styles: ['sporty'] },
      { emoji: '💛', text: 'Nenhum — crio meu próprio estilo!', styles: ['boho', 'streetwear', 'glam'] },
    ],
  },
];

/* ─────────────────────────────────────────────
   STYLE PROFILES
───────────────────────────────────────────── */
const STYLE_PROFILES = {
  classic: {
    name: 'Clássico & Sofisticado',
    emoji: '💎',
    desc: 'Você valoriza a elegância atemporal. Linhas limpas, cores neutras e peças de qualidade são sua assinatura. Você se inspira em ícones como Audrey Hepburn e Coco Chanel.',
    tags: ['Elegância', 'Atemporalidade', 'Qualidade', 'Formalidade', 'Sofisticação'],
    colors: ['#2C2C2C', '#F5F0EB', '#8B7355', '#C0C0C0', '#1A1A2E'],
    pieces: ['Blazer estruturado', 'Scarpin neutro', 'Calça de alfaiataria', 'Colar de pérolas'],
  },
  minimal: {
    name: 'Minimalista Moderno',
    emoji: '⬜',
    desc: 'Para você, simplicidade é luxo. Seu guarda-roupa funciona com poucas peças versáteis. Você acredita em slow fashion e em investir em básicos de altíssima qualidade.',
    tags: ['Simplicidade', 'Versátil', 'Sem esforço', 'Slow Fashion', 'Clean'],
    colors: ['#FFFFFF', '#E5E5E5', '#A0A0A0', '#404040', '#0D0D0D'],
    pieces: ['Camiseta branca premium', 'Calça reta', 'Tênis branco', 'Tote bag'],
  },
  boho: {
    name: 'Boho & Free Spirit',
    emoji: '🌿',
    desc: 'Você é a natureza em forma de look! Camadas, texturas, bordados, franjas e cores terrosas contam a história da sua alma aventureira e criativa.',
    tags: ['Liberdade', 'Criatividade', 'Natureza', 'Artesanal', 'Camadas'],
    colors: ['#C17D3C', '#8B6355', '#556B2F', '#D4A27F', '#B8A99A'],
    pieces: ['Vestido com bordados', 'Bota cano longo', 'Chapéu de palha', 'Colar étnico'],
  },
  streetwear: {
    name: 'Streetwear Urbano',
    emoji: '🏙️',
    desc: 'Você vive no ritmo da cidade e seu estilo reflete isso: oversized, gráficos marcantes, sneakers e uma atitude inconfundível. Seu look é statement.',
    tags: ['Urbano', 'Atitude', 'Conforto', 'Hype', 'Autenticidade'],
    colors: ['#1A1A1A', '#FF4040', '#FFFFFF', '#FFD700', '#00BFFF'],
    pieces: ['Moletom oversized', 'Cargo pants', 'Chunky sneaker', 'Boné ou gorro'],
  },
  romantic: {
    name: 'Romântico & Feminino',
    emoji: '🌸',
    desc: 'Você transborda delicadeza! Flores, laços, tules, rendas e tons rosados fazem parte do seu universo. Seu estilo é um poema visual cheio de amor e leveza.',
    tags: ['Delicadeza', 'Feminilidade', 'Flores', 'Leveza', 'Sonhador'],
    colors: ['#F7C5D5', '#E8A0BF', '#FFF0F5', '#FFB6C1', '#DDA0DD'],
    pieces: ['Vestido floral', 'Blusa com laço', 'Sapatilha pastel', 'Bolsa mini arredondada'],
  },
  glam: {
    name: 'Glam & Luxuoso',
    emoji: '✨',
    desc: 'Você nasceu para brilhar! Metálicos, veludo, decotes estratégicos e acessórios que chamam atenção. Cada look seu é uma produção de red carpet — mesmo na ida ao mercado.',
    tags: ['Brilho', 'Luxo', 'Impacto', 'Confiança', 'Glamour'],
    colors: ['#C9A84C', '#F5E6C8', '#8B0000', '#1C1C2E', '#E8D5A3'],
    pieces: ['Body metálico', 'Saia lápis', 'Salto stiletto', 'Brinco maxi dourado'],
  },
  sporty: {
    name: 'Sporty Chic',
    emoji: '🏆',
    desc: 'Conforto e estilo andam juntos para você! Athleisure é sua marca registrada: você consegue ir à academia e depois jantar fora no mesmo look, com muito charme.',
    tags: ['Conforto', 'Funcional', 'Athleisure', 'Atitude', 'Movimento'],
    colors: ['#1A1A2E', '#00C9FF', '#FFFFFF', '#FF6B35', '#A8FF3E'],
    pieces: ['Legging de compressão', 'Cropped esportivo', 'Tênis chunky', 'Jaqueta corta-vento'],
  },
};

/* ── tally scores ── */
function tally(answers) {
  const scores = { classic: 0, minimal: 0, boho: 0, streetwear: 0, romantic: 0, glam: 0, sporty: 0 };
  for (const styles of answers) {
    for (const s of styles) {
      if (s in scores) scores[s]++;
    }
  }
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

/* ── Component ── */
export default function StyleQuiz({ onBack }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [showCustom, setShowCustom] = useState(false);
  const [customText, setCustomText] = useState('');
  const [customError, setCustomError] = useState('');
  const inputRef = useRef(null);

  const advance = (styles) => {
    const newAnswers = [...answers, styles];
    setShowCustom(false);
    setCustomText('');
    setCustomError('');
    if (step < QUESTIONS.length - 1) {
      setAnswers(newAnswers);
      setStep(s => s + 1);
    } else {
      const profile = tally(newAnswers);
      setResult(STYLE_PROFILES[profile]);
      setAnswers(newAnswers);
      setStep(QUESTIONS.length);
    }
  };

  const handleOption = (styles) => advance(styles);

  const handleCustomClick = () => {
    setShowCustom(true);
    setCustomText('');
    setCustomError('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleCustomSubmit = () => {
    if (customText.trim().length < 3) {
      setCustomError('Escreva pelo menos 3 caracteres para analisarmos 😊');
      return;
    }
    const detected = analyzeText(customText);
    advance(detected);
  };

  const reset = () => { setStep(0); setAnswers([]); setResult(null); setShowCustom(false); setCustomText(''); };

  const progress = (step / QUESTIONS.length) * 100;

  /* ── Result screen ── */
  if (result) {
    return (
      <div className="glass-panel style-quiz fade-enter">
        <div className="style-result">
          <div className="style-result-badge">{result.emoji}</div>
          <h1 className="style-result-name">{result.name}</h1>
          <p className="style-result-desc">{result.desc}</p>

          <div className="style-attributes">
            {result.tags.map(tag => <span key={tag} className="style-tag">{tag}</span>)}
          </div>

          <p className="style-colors-title">Sua paleta de cores ideal</p>
          <div className="style-colors-row">
            {result.colors.map((hex, i) => (
              <div key={i} className="style-color-dot" style={{ background: hex }} title={hex} />
            ))}
          </div>

          <div className="result-card" style={{ textAlign: 'left', marginBottom: '28px' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--fashion-rose)', marginBottom: '12px' }}>
              👗 Peças-chave do seu estilo
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {result.pieces.map(p => (
                <li key={p} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '8px 14px', fontSize: '0.88rem', color: 'rgba(255,255,255,0.8)' }}>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="result-actions">
            <button id="btn-quiz-reset" className="btn-camera primary" onClick={reset} style={{ flex: '0 0 auto', padding: '12px 28px' }}>
              🔄 Refazer Quiz
            </button>
            <button id="btn-quiz-back" className="fashion-back-btn" onClick={onBack}>
              ← Voltar ao Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = QUESTIONS[step];

  return (
    <div className="glass-panel style-quiz fade-enter">
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <p className="quiz-step">Pergunta {step + 1} de {QUESTIONS.length}</p>
      <h2 className="quiz-question">{question.text}</h2>

      <div className="quiz-options-8">
        {question.options.map((opt, i) => (
          <button
            key={i}
            id={`btn-quiz-opt-${step}-${i}`}
            className="quiz-option"
            onClick={() => handleOption(opt.styles)}
          >
            <span className="quiz-option-emoji">{opt.emoji}</span>
            <span className="quiz-option-text">{opt.text}</span>
          </button>
        ))}

        {/* "Outro..." button */}
        <button
          id={`btn-quiz-custom-${step}`}
          className="quiz-option quiz-option-custom"
          onClick={handleCustomClick}
        >
          <span className="quiz-option-emoji">✏️</span>
          <span className="quiz-option-text">Outro — descreva com suas palavras</span>
        </button>
      </div>

      {/* Custom text input — expanded when "Outro" is clicked */}
      {showCustom && (
        <div className="custom-answer-box">
          <p className="custom-answer-label">
            💬 Descreva com suas próprias palavras — nossa análise vai detectar seu estilo!
          </p>
          <textarea
            ref={inputRef}
            id={`textarea-custom-${step}`}
            className="custom-answer-input"
            value={customText}
            onChange={e => { setCustomText(e.target.value); setCustomError(''); }}
            placeholder="Ex: adoro roupas confortáveis tipo moletom e tênis chunky, mas também gosto de um blazer quando preciso..."
            rows={3}
            onKeyDown={e => { if (e.key === 'Enter' && e.ctrlKey) handleCustomSubmit(); }}
          />
          {customError && <p className="custom-answer-error">{customError}</p>}
          <div className="custom-answer-actions">
            <button id="btn-custom-submit" className="btn-camera primary" onClick={handleCustomSubmit}>
              🔍 Analisar minha resposta
            </button>
            <button id="btn-custom-cancel" className="btn-camera secondary" onClick={() => { setShowCustom(false); setCustomText(''); setCustomError(''); }}>
              Cancelar
            </button>
          </div>
          <p className="custom-answer-hint">Dica: pressione Ctrl+Enter para confirmar</p>
        </div>
      )}

      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <button className="fashion-back-btn" onClick={onBack} id="btn-stylequiz-back">
          ← Voltar ao Hub
        </button>
      </div>
    </div>
  );
}
