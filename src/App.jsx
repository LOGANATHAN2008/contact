import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import './index.css';

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="App">
      <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
      
      <main className="container main-content">
        <header className="hero-intro slide-up">
          <h1>Let's Talk</h1>
          <p>Project, internship or just a hello? Pick whatever is easiest for you.</p>
          <small><i className="fa-regular fa-clock"></i> Usually replies within 24 hours</small>
        </header>
        
        {/* We will implement Chatbot, QuickLinks, Footer, and Photos Modal in subsequent steps */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p><em>React Conversion In Progress... Chatbot and other components will be loaded here.</em></p>
        </div>
      </main>
    </div>
  );
}

export default App;
