import React from 'react';

export default function QuizScreen({ questions, currentQuestionIndex, onAnswer }) {
  const question = questions[currentQuestionIndex];

  if (!question) return null;

  return (
    <div className="glass-panel fade-enter" key={question.id}>
      <div style={{ marginBottom: '20px', color: 'var(--primary)', fontWeight: 'bold' }}>
        Pergunta {currentQuestionIndex + 1} de {questions.length}
      </div>
      <h2>{question.text}</h2>
      
      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {question.options.map((option, index) => (
          <button 
            key={index}
            className="option-btn"
            onClick={() => onAnswer(option.category)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}
