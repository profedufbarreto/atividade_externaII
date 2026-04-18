import React from 'react';
import { ArrowLeft, MapPin } from 'lucide-react';
import './Gallery.css';

// Importando as imagens
import img1 from '../assets/images/078f143e1a0bae1449adaf9057f0ccb0c7fb00.jpeg';
import img2 from '../assets/images/078f146925f1a84f7a5f66960f7b5c6595c1d2.jpeg';
import img3 from '../assets/images/078f14c5a086565fcd41de2e4f24971e6a61e5.jpeg';
import img4 from '../assets/images/078f14cfaee7de3776b7eb8ab7c82401808a41.jpeg';
import img5 from '../assets/images/078f14e08f0a61124b9605aaf84845ded04fdf.jpeg';
import img6 from '../assets/images/2024-04-03.webp';

const images = [
  { id: 1, src: img1, title: "Nosso Campus" },
  { id: 2, src: img2, title: "Espaços Modernos" },
  { id: 3, src: img3, title: "Laboratórios" },
  { id: 4, src: img4, title: "Área de Convivência" },
  { id: 5, src: img5, title: "Ambiente Criativo" },
  { id: 6, src: img6, title: "Tecnologia Senac" },
];

export default function Gallery({ onBack }) {
  return (
    <div className="glass-panel fade-enter gallery-container">
      <div className="gallery-header">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1>Senac Novo Hamburgo</h1>
          <p className="location"><MapPin size={16} /> Novo Hamburgo, RS</p>
        </div>
      </div>

      <div className="gallery-grid">
        {images.map(img => (
          <div key={img.id} className="gallery-item">
            <img src={img.src} alt={img.title} />
            <div className="gallery-overlay">
              <span>{img.title}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="gallery-footer">Transformando vidas através da educação profissional.</p>
    </div>
  );
}
