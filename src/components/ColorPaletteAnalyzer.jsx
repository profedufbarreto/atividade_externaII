import { useRef, useState, useEffect, useCallback } from 'react';
import './FashionHub.css';

/* ── Colorimetry helpers ── */
const SEASON_DATA = {
  spring: {
    label: 'Primavera 🌸',
    emoji: '🌸',
    desc: 'Tom de pele quente e claro. Suas cores ideais são vibrantes e luminosas: coral, pêssego, amarelo-mel e verde-limão.',
    palette: ['#FFAD60', '#FF7F50', '#FFEE8C', '#9DC183', '#FAD4C0'],
    bg: 'linear-gradient(135deg, rgba(255,173,96,0.3), rgba(255,127,80,0.2))',
    border: '#FFAD60',
  },
  summer: {
    label: 'Verão 🌊',
    emoji: '🌊',
    desc: 'Tom de pele frio e claro. Rosê, lavanda, azul-acinzentado e tons suaves de cinza te favorecem muito.',
    palette: ['#B0C4DE', '#DDA0DD', '#E2B4CF', '#8DB0C8', '#C9B8D8'],
    bg: 'linear-gradient(135deg, rgba(176,196,222,0.3), rgba(221,160,221,0.2))',
    border: '#B0C4DE',
  },
  autumn: {
    label: 'Outono 🍂',
    emoji: '🍂',
    desc: 'Tom de pele quente e profundo. Terracota, caramelo, ferrugem, musgo e mostarda realçam sua beleza natural.',
    palette: ['#C1440E', '#D2691E', '#8B6914', '#556B2F', '#CD853F'],
    bg: 'linear-gradient(135deg, rgba(193,68,14,0.3), rgba(210,105,30,0.2))',
    border: '#C1440E',
  },
  winter: {
    label: 'Inverno ❄️',
    emoji: '❄️',
    desc: 'Tom de pele frio e profundo. Cores intensas e contrastantes como preto, branco, vinho, azul royal e magenta são as suas aliadas.',
    palette: ['#1C1C2E', '#8B0000', '#00008B', '#C71585', '#F5F5F5'],
    bg: 'linear-gradient(135deg, rgba(28,28,46,0.5), rgba(139,0,0,0.2))',
    border: '#8B0000',
  },
};

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      default: h = ((r - g) / d + 4) / 6;
    }
  }
  return [h * 360, s * 100, l * 100];
}

function detectSeason(r, g, b) {
  const [h, s, l] = rgbToHsl(r, g, b);
  const isWarm = (h >= 0 && h <= 60) || (h >= 300 && h <= 360);
  const isDark = l < 50;
  if (isWarm && !isDark) return 'spring';
  if (!isWarm && !isDark) return 'summer';
  if (isWarm && isDark) return 'autumn';
  return 'winter';
}

function rgbToName(r, g, b) {
  const names = [
    { name: 'Terracota', r: 194, g: 68, b: 14 },
    { name: 'Coral', r: 255, g: 127, b: 80 },
    { name: 'Pêssego', r: 255, g: 218, b: 185 },
    { name: 'Rosa Nude', r: 237, g: 188, b: 168 },
    { name: 'Caramelo', r: 196, g: 143, b: 75 },
    { name: 'Areia', r: 212, g: 190, b: 150 },
    { name: 'Cappuccino', r: 157, g: 113, b: 83 },
    { name: 'Marfim', r: 255, g: 248, b: 220 },
    { name: 'Bege', r: 245, g: 220, b: 189 },
    { name: 'Azul Aço', r: 70, g: 130, b: 180 },
    { name: 'Lavanda', r: 204, g: 153, b: 204 },
    { name: 'Vinho', r: 128, g: 0, b: 32 },
    { name: 'Café', r: 111, g: 78, b: 55 },
    { name: 'Musgo', r: 85, g: 107, b: 47 },
    { name: 'Cinza Perola', r: 200, g: 196, b: 204 },
    { name: 'Off White', r: 250, g: 248, b: 242 },
  ];
  let closest = names[0];
  let minDist = Infinity;
  for (const c of names) {
    const dist = Math.sqrt((r - c.r) ** 2 + (g - c.g) ** 2 + (b - c.b) ** 2);
    if (dist < minDist) { minDist = dist; closest = c; }
  }
  return closest.name;
}

function getDominantColors(imageData, count = 5) {
  const { data, width, height } = imageData;
  const step = Math.max(1, Math.floor((width * height) / 300));
  const pixels = [];
  for (let i = 0; i < data.length; i += 4 * step) {
    const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
    if (a < 128) continue;
    // quantize to 32-step buckets
    pixels.push([r >> 5, g >> 5, b >> 5]);
  }
  const freq = {};
  for (const [r, g, b] of pixels) {
    const key = `${r},${g},${b}`;
    freq[key] = (freq[key] || 0) + 1;
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([key]) => {
      const [r, g, b] = key.split(',').map(v => Number(v) * 32 + 16);
      return { r, g, b, hex: `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`, name: rgbToName(r, g, b) };
    });
}

/* ── Component ── */
export default function ColorPaletteAnalyzer({ onBack }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [camActive, setCamActive] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [colors, setColors] = useState([]);
  const [season, setSeason] = useState(null);
  const [cursorPos, setCursorPos] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const startCamera = useCallback(async () => {
    setError('');
    setLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCamActive(true);
      setCaptured(false);
      setColors([]);
      setSeason(null);
    } catch {
      setError('Não foi possível acessar a webcam. Verifique as permissões do navegador.');
    } finally {
      setLoading(false);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setCamActive(false);
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  const capture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const dominant = getDominantColors(imgData, 5);
    setColors(dominant);
    const main = dominant[0];
    setSeason(detectSeason(main.r, main.g, main.b));
    setCaptured(true);
    stopCamera();
  }, [stopCamera]);

  const handleCanvasClick = useCallback((e) => {
    if (!camActive || captured) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = (videoRef.current?.videoWidth || 640) / rect.width;
    const scaleY = (videoRef.current?.videoHeight || 480) / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Sample a small region around the click
    const tempCanvas = document.createElement('canvas');
    const video = videoRef.current;
    tempCanvas.width = video?.videoWidth || 640;
    tempCanvas.height = video?.videoHeight || 480;
    const ctx = tempCanvas.getContext('2d');
    ctx.drawImage(video, 0, 0);
    const region = ctx.getImageData(Math.max(0, x - 30), Math.max(0, y - 30), 60, 60);
    const dominant = getDominantColors(region, 5);
    setColors(dominant);
    setSeason(detectSeason(dominant[0].r, dominant[0].g, dominant[0].b));
    setCaptured(true);
    // Draw the full frame on display canvas
    const displayCanvas = canvasRef.current;
    displayCanvas.width = tempCanvas.width;
    displayCanvas.height = tempCanvas.height;
    displayCanvas.getContext('2d').drawImage(tempCanvas, 0, 0);
    stopCamera();
  }, [camActive, captured, stopCamera]);

  const handleMouseMove = useCallback((e) => {
    if (!camActive || captured) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, [camActive, captured]);

  const reset = () => {
    setCaptured(false);
    setColors([]);
    setSeason(null);
    setCursorPos(null);
  };

  const seasonInfo = season ? SEASON_DATA[season] : null;

  return (
    <div className="glass-panel palette-analyzer fade-enter">
      <div className="palette-header">
        <h1 className="palette-title">🎨 Analisador de Paleta</h1>
        <p className="palette-subtitle">Capture seu rosto ou visual e descubra sua colorimetria pessoal</p>
      </div>

      <div className="palette-main">
        {/* Webcam / Canvas */}
        <div className="webcam-section">
          <div
            className="webcam-frame"
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setCursorPos(null)}
            style={{ cursor: camActive && !captured ? 'crosshair' : 'default' }}
          >
            {!camActive && !captured && (
              <div className="webcam-placeholder">
                <span className="cam-icon">📷</span>
                <span>Aguardando câmera...</span>
              </div>
            )}
            <video ref={videoRef} style={{ display: camActive && !captured ? 'block' : 'none' }} muted playsInline />
            <canvas ref={canvasRef} style={{ display: captured ? 'block' : 'none' }} />
            {camActive && !captured && (
              <span className="click-hint">Clique em qualquer ponto para analisar as cores</span>
            )}
            {cursorPos && camActive && !captured && (
              <div className="dot-cursor" style={{ left: cursorPos.x, top: cursorPos.y }} />
            )}
          </div>

          {error && <p style={{ color: '#f87171', fontSize: '0.85rem', textAlign: 'center', margin: 0 }}>{error}</p>}

          <div className="webcam-controls">
            {!camActive && !captured && (
              <button id="btn-start-camera" className="btn-camera primary" onClick={startCamera} disabled={loading}>
                {loading ? '⏳ Conectando...' : '📷 Ligar Câmera'}
              </button>
            )}
            {camActive && !captured && (
              <>
                <button id="btn-capture" className="btn-camera primary" onClick={capture}>
                  📸 Capturar
                </button>
                <button id="btn-stop-camera" className="btn-camera secondary" onClick={stopCamera}>
                  ✕ Parar
                </button>
              </>
            )}
            {captured && (
              <button id="btn-retake" className="btn-camera primary" onClick={() => { reset(); startCamera(); }}>
                🔄 Nova Captura
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="results-section">
          {colors.length > 0 ? (
            <>
              {/* Swatches */}
              <div className="result-card">
                <h4>🎨 Cores Detectadas</h4>
                <div className="color-swatches">
                  {colors.map((c, i) => (
                    <div className="swatch" key={i} title={c.hex}>
                      <div className="swatch-circle" style={{ background: c.hex }} />
                      <span className="swatch-label">{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Season */}
              {seasonInfo && (
                <div className="result-card">
                  <h4>🌍 Sua Estação</h4>
                  <div className="season-badge" style={{ background: seasonInfo.bg, border: `1px solid ${seasonInfo.border}` }}>
                    <span>{seasonInfo.emoji}</span>
                    <span>{seasonInfo.label}</span>
                  </div>
                  <p className="season-desc">{seasonInfo.desc}</p>
                  <div className="palette-suggestion">
                    {seasonInfo.palette.map((hex, i) => (
                      <div key={i} className="palette-suggestion-swatch" style={{ background: hex }} title={hex} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="result-card">
              <div className="empty-state">
                <span className="empty-icon">✨</span>
                <p className="empty-text">
                  Ligue a câmera e clique em qualquer ponto da imagem para extrair sua paleta de cores!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <button className="fashion-back-btn" onClick={onBack} id="btn-palette-back">
        ← Voltar ao Hub de Moda
      </button>
    </div>
  );
}
