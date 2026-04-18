import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';

export default function LocationBanner({ onClick }) {
  return (
    <div className="location-banner fade-enter" onClick={onClick}>
      <div className="banner-badge">ONDE ESTAMOS?</div>
      <div className="banner-content">
        <div className="banner-icon">
          <MapPin size={32} className="text-secondary" />
        </div>
        <div className="banner-text">
          <h3>Senac Novo Hamburgo</h3>
          <p>Av. Nações Unidas, 3760 - Rio Branco</p>
        </div>
        <div className="banner-action">
          <ExternalLink size={20} />
        </div>
      </div>
      <div className="banner-glow" />
    </div>
  );
}
