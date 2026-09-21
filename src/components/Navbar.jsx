import React from 'react';

function Navbar({ toggleTheme, currentTheme }) {
  return (
    <>
      <nav className="navbar">
        <div className="nav-content container">
          <a href="https://loganathanm.in" className="logo">
            <img src="/logo.png" alt="Loganathan M" className="nav-logo-img" />
            <span className="hide-mobile">Loganathan</span>
          </a>
          
          <div className="availability-badge desktop-only">
            <span className="status-dot"></span> Available for internships & freelance
          </div>

          <div className="nav-links">
            <a href="https://loganathanm.in" className="nav-link btn-portfolio">
              <i className="fa-solid fa-arrow-left"></i> Main Portfolio
            </a>
            <button id="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
              <i className={currentTheme === 'dark' ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
            </button>
          </div>
        </div>
      </nav>

      <div className="availability-badge mobile-only" style={{ justifyContent: 'center', margin: '1rem auto' }}>
        <span className="status-dot"></span> Available for internships & freelance
      </div>
    </>
  );
}

export default Navbar;
