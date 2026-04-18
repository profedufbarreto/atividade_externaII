import React, { useState, useEffect } from 'react';
import './BackgroundSlideshow.css';

// Importando as imagens
import img1 from '../assets/images/078f143e1a0bae1449adaf9057f0ccb0c7fb00.jpeg';
import img2 from '../assets/images/078f146925f1a84f7a5f66960f7b5c6595c1d2.jpeg';
import img3 from '../assets/images/078f14c5a086565fcd41de2e4f24971e6a61e5.jpeg';
import img4 from '../assets/images/078f14cfaee7de3776b7eb8ab7c82401808a41.jpeg';
import img5 from '../assets/images/078f14e08f0a61124b9605aaf84845ded04fdf.jpeg';
import img6 from '../assets/images/2024-04-03.webp';

const images = [img1, img2, img3, img4, img5, img6];

export default function BackgroundSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Troca a cada 5 segundos
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slideshow-container">
      {images.map((img, index) => (
        <div
          key={index}
          className={`slide-image ${index === currentIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="slideshow-overlay" />
    </div>
  );
}
