import React, { useState, useEffect } from 'react';
import { MessageCircle, X, ChevronRight, Bot } from 'lucide-react';

export default function SenacGuide({ currentScreen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const messages = {
    launchpad: [
      "E aí! Já experimentou o Quiz Vocacional? Ele ajuda a descobrir qual área do Senac combina mais com você!",
      "Que tal conhecer nossa infraestrutura na Galeria? Temos laboratórios incríveis!",
      "Precisa desestressar? O Jogo da Cobrinha é clássico e viciante!"
    ],
    intro: [
      "Não esqueça de colocar seu nome! Queremos saber quem é o próximo grande talento do Senac.",
      "O quiz é rápido, mas as descobertas podem mudar sua vida!",
      "Estamos ansiosos para ver seu resultado!"
    ],
    quiz: [
      "Foque na sua vibe real! Não tem resposta errada, apenas o que faz sentido para você.",
      "Cada resposta nos ajuda a entender melhor seu perfil profissional.",
      "Quase lá! Continue focado(a)."
    ],
    result: [
      "Incrível! Esse perfil tem um mercado gigante aqui no Rio Grande do Sul. Que tal ver os cursos abertos?",
      "Você sabia que o Senac tem parcerias com várias empresas para esse setor?",
      "Parabéns pelo resultado! Se quiser saber mais, fale com nossas consultoras no WhatsApp abaixo."
    ],
    tictactoe: [
      "Um desafio de lógica! O robô é treinado, mas você consegue vencer se pensar bem.",
      "Sabia que lógica de programação é a base de muitos cursos aqui no Senac?",
      "Empatou? Tente de novo, o desafio é o segredo do aprendizado."
    ],
    snake: [
      "Clássico, né? Ótimo para treinar a coordenação. Minha pontuação máxima foi 500!",
      "Paciência e estratégia são fundamentais aqui (e na carreira também!).",
      "Cuidado com as paredes! Foco total."
    ],
    gallery: [
      "Essas são fotos reais da nossa unidade. Temos laboratórios de ponta esperando por você.",
      "Imagine você estudando em um desses ambientes! Legal, né?",
      "O Senac Novo Hamburgo é referência em ensino prático."
    ],
    levemente: [
      "Saúde mental é papo sério. Aproveite esse momento para se conectar com você mesmo.",
      "Respirar fundo ajuda a oxigenar o cérebro e melhora o foco.",
      "Cuidar da mente é o primeiro passo para o sucesso profissional."
    ]
  };

  useEffect(() => {
    const currentMsgs = messages[currentScreen] || ["Estou aqui para ajudar você na sua jornada no Senac NH!"];
    const randomMsg = currentMsgs[Math.floor(Math.random() * currentMsgs.length)];
    setMessage(randomMsg);

    if (!isOpen) {
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  return (
    <div className="senac-guide-wrapper">
      {/* Notification bubble */}
      {!isOpen && showNotification && (
        <div className="guide-notification fade-enter">
          Dica do Guia!
        </div>
      )}

      {/* Main Panel */}
      {isOpen && (
        <div className="guide-panel glass-panel fade-enter">
          <div className="guide-header">
            <div className="guide-avatar">
              <Bot size={24} color="var(--secondary)" />
            </div>
            <div>
              <div className="guide-name">Guia Senac NH</div>
              <div className="guide-status">Online agora</div>
            </div>
            <button className="guide-close" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="guide-body">
            <p className="guide-message">{message}</p>
          </div>

          <div className="guide-footer">
            <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '10px' }}>Dúvidas sobre cursos?</p>
            <div className="qr-section" style={{ textAlign: 'center', marginBottom: '15px' }}>
              <div style={{ background: 'white', padding: '10px', borderRadius: '12px', display: 'inline-block', margin: '0 auto 10px', boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}>
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://wa.me/5551984960488" 
                  alt="WhatsApp QR Code" 
                  style={{ width: '180px', display: 'block' }} 
                />
              </div>
              <p style={{ fontSize: '0.7rem', opacity: 0.8, color: 'white', margin: '5px 0' }}>Aponte a câmera para escanear</p>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--secondary)' }}>OU CLIQUE NO BOTÃO</span>
            </div>
            <a 
              href="https://wa.me/5551984960488" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
              style={{ padding: '12px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              Chamar no WhatsApp <ChevronRight size={16} />
            </a>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        className={`guide-toggle ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle size={28} />
      </button>

      <style>{`
        .senac-guide-wrapper {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 2000;
          font-family: 'Outfit', sans-serif;
        }

        .guide-toggle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--primary);
          border: none;
          color: white;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .guide-toggle:hover {
          transform: scale(1.1) translateY(-5px);
          background: var(--primary-hover);
        }

        .guide-toggle.active {
          transform: rotate(90deg);
          background: var(--secondary);
        }

        .guide-panel {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 320px;
          padding: 24px !important;
          border-radius: 20px !important;
          text-align: left;
        }

        .guide-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .guide-avatar {
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .guide-name {
          font-weight: 800;
          font-size: 1rem;
        }

        .guide-status {
          font-size: 0.75rem;
          color: var(--success);
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .guide-status::before {
          content: '';
          width: 6px;
          height: 6px;
          background: var(--success);
          border-radius: 50%;
        }

        .guide-close {
          margin-left: auto;
          background: none;
          border: none;
          color: white;
          opacity: 0.5;
          cursor: pointer;
        }

        .guide-message {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--text-secondary);
          margin-bottom: 0 !important;
        }

        .guide-footer {
          margin-top: 20px;
          border-top: 1px solid var(--glass-border);
          padding-top: 15px;
        }

        .guide-notification {
          position: absolute;
          bottom: 10px;
          right: 80px;
          background: var(--secondary);
          color: black;
          padding: 8px 16px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.8rem;
          white-space: nowrap;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .guide-notification::after {
          content: '';
          position: absolute;
          right: -8px;
          top: 50%;
          transform: translateY(-50%);
          border-left: 8px solid var(--secondary);
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
        }
      `}</style>
    </div>
  );
}
