import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import QuickLinks from './components/QuickLinks';
import LocationFaq from './components/LocationFaq';
import Chatbot from './components/Chatbot';
import Scheduler from './components/Scheduler';
import Footer from './components/Footer';
import PhotosModal from './components/PhotosModal';
import './index.css';

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isPhotosOpen, setIsPhotosOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('chat');

  useEffect(() => {
    if (location.pathname.toLowerCase().startsWith('/album')) {
      setIsPhotosOpen(true);
    }
  }, []);

  useEffect(() => {
    if (location.pathname.toLowerCase().startsWith('/album')) {
      setIsPhotosOpen(true);
    } else {
      setIsPhotosOpen(false);
    }
  }, [location.pathname]);

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
        
        <QuickLinks />
        <LocationFaq />

        <div className="mobile-tabs glass-card">
          <button 
            className={`tab-btn ${activeMobileTab === 'chat' ? 'active' : ''}`} 
            onClick={() => setActiveMobileTab('chat')}
          >
            <i className="fa-solid fa-robot"></i> Ask AI
          </button>
          <button 
            className={`tab-btn ${activeMobileTab === 'book' ? 'active' : ''}`} 
            onClick={() => setActiveMobileTab('book')}
          >
            <i className="fa-regular fa-calendar-check"></i> Book a Call
          </button>
        </div>

        <div className="layout-grid">
          <Chatbot isActive={activeMobileTab === 'chat'} />
          <Scheduler isActive={activeMobileTab === 'book'} />
        </div>
      </main>

      <Footer onOpenPhotos={() => setIsPhotosOpen(true)} />
      <PhotosModal isOpen={isPhotosOpen} onClose={() => setIsPhotosOpen(false)} />
    </div>
  );
}

export default App;
