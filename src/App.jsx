import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import QuickLinks from './components/QuickLinks';
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

  // Auto-open album if URL is /Album on load
  useEffect(() => {
    if (location.pathname.toLowerCase() === '/album') {
      setIsPhotosOpen(true);
    }
  }, []);

  // Listen to browser back button (popstate) handled implicitly by React Router Location changes
  useEffect(() => {
    if (location.pathname.toLowerCase() === '/album') {
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

        {/* We will implement Chatbot in subsequent steps */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p><em>React Conversion In Progress... Chatbot will be loaded here.</em></p>
        </div>
      </main>

      <Footer onOpenPhotos={() => setIsPhotosOpen(true)} />
      <PhotosModal isOpen={isPhotosOpen} onClose={() => setIsPhotosOpen(false)} />
    </div>
  );
}

export default App;
