import React from 'react';

export const BrandFlight = ({ className = "" }) => (
  <svg 
    viewBox="0 0 200 100" 
    className={`brand-flight ${className}`}
    style={{ 
      position: 'absolute', 
      opacity: 0.1, 
      pointerEvents: 'none',
      zIndex: 0
    }}
  >
    <path 
      d="M0,50 Q50,0 100,50 T200,50" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
    />
    <path 
      d="M0,70 Q50,20 100,70 T200,70" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1" 
    />
  </svg>
);

export const LogoCircle = () => (
  <div style={{
    position: 'absolute',
    top: '-50px',
    right: '-50px',
    width: '150px',
    height: '150px',
    background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)',
    opacity: 0.15,
    borderRadius: '50%',
    zIndex: 0
  }} />
);
