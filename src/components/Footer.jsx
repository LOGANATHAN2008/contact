import React from 'react';

function Footer({ onOpenPhotos }) {
  return (
    <footer>
      <div className="container footer-content">
        <div className="footer-brand">
          <img 
            src="/logo.png" 
            alt="Loganathan M" 
            className="footer-logo-img" 
            style={{ cursor: 'pointer' }} 
            onClick={onOpenPhotos} 
          />
        </div>
        <p>Made with love in Bengaluru | &copy; 2026 Loganathan M. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="https://loganathanm.in"><i className="fa-solid fa-house"></i> Home</a>
          <a href="https://github.com/LOGANATHAN2008"><i className="fa-brands fa-github"></i> GitHub</a>
          <a href="https://www.linkedin.com/in/loganathanm-in/"><i className="fa-brands fa-linkedin"></i> LinkedIn</a>
          <a href="https://www.instagram.com/loganathanm.in"><i className="fa-brands fa-instagram"></i> Instagram</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onOpenPhotos(); }}><i className="fa-solid fa-image"></i> Photos</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
