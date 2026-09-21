import React, { useState } from 'react';

function Chatbot({ isActive }) {
  const suggestions = [
    "What projects have you done?",
    "Are you available for freelance?",
    "What are your skills?",
    "How can I hire you?",
    "Share your contact details",
    "I want to book a call"
  ];

  const handleSuggestion = (text) => {
    // Add logic later
    console.log("Suggestion clicked: ", text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic later
  };

  return (
    <section id="chat-section" className={`panel-section glass-card ${isActive ? 'active-tab' : ''}`}>
      <div className="section-header">
        <h2><i className="fa-solid fa-robot" style={{ color: 'var(--primary)' }}></i> Ask Loga's AI</h2>
        <button id="clear-chat" className="icon-btn" aria-label="Clear chat" title="Clear chat">
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
      
      <div className="chat-container">
        <div id="chat-messages" className="chat-messages" aria-live="polite">
          <div className="chat-hint" id="chat-hint">
            <i className="fa-regular fa-lightbulb"></i> You can ask me about: Projects, Skills, Availability, Hiring
          </div>
          
          <div className="message ai-message">
            <div className="avatar">
              <img 
                src="/assets/loga.jpg" 
                alt="Loga AI" 
                onError={(e) => { e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🤖</text></svg>'; }}
              />
            </div>
            <div className="bubble">
              <p>Hi there! I'm Loganathan's AI assistant. Ask me anything about his projects, skills, or experience.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-suggestions" id="chat-suggestions">
        {suggestions.map((text, i) => (
          <button key={i} className="chip" onClick={() => handleSuggestion(text)}>
            {text}
          </button>
        ))}
      </div>

      <form id="chat-form" className="chat-input-area" onSubmit={handleSubmit}>
        <input type="text" id="chat-input" placeholder="Type your message..." autoComplete="off" />
        <button type="submit" id="send-btn" aria-label="Send message">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
      <div className="chat-footer-note">AI can make mistakes. Better to ask Loga directly for sensitive info.</div>
    </section>
  );
}

export default Chatbot;
