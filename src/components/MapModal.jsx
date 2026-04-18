import React from 'react';
import { X, MapPin } from 'lucide-react';

export default function MapModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-header">
          <MapPin className="text-secondary" />
          <h2>Senac Novo Hamburgo</h2>
        </div>
        
        <p className="address-text">Av. Nações Unidas, 3760 - Rio Branco, Novo Hamburgo - RS</p>
        <p className="address-text" style={{ fontSize: '0.85rem', marginBottom: '10px' }}>CEP 93.320-162</p>
        
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.57868356983!2d-51.1352481!3d-29.673898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951943c224217157%3A0x6440263f3c3065b2!2sAv.%20Na%C3%A7%C3%B5es%20Unidas%2C%203760%20-%20Rio%20Branco%2C%20Novo%20Hamburgo%20-%20RS!5e0!3m2!1spt-BR!2sbr!4v1713450000000!5m2!1spt-BR!2sbr"
            width="100%" 
            height="450" 
            style={{ border: 0, borderRadius: '12px' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <a 
            href="https://maps.app.goo.gl/9yL9XoX6xR7L7uW4A" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none', display: 'inline-block', width: 'auto' }}
          >
            Abrir no Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
