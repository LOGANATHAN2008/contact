import React from 'react';

function QuickLinks() {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Temporary simple alert, can be upgraded to toast later
      alert(`Copied: ${text}`);
    });
  };

  const handleSaveVCF = () => {
    const vcfData = `BEGIN:VCARD
VERSION:3.0
FN:Loganathan M
TITLE:AI & Web Developer
TEL;TYPE=CELL:+917010123479
EMAIL:contact@loganathanm.in
URL:https://loganathanm.in
NOTE:AI & Web Developer from Bengaluru
END:VCARD`;
    const blob = new Blob([vcfData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Loganathan_M.vcf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="quick-contact-section slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="quick-contact-grid">
        {/* WhatsApp */}
        <div className="q-card glass-card">
          <div className="q-card-header">
            <div className="q-icon whatsapp-color"><i className="fa-brands fa-whatsapp"></i></div>
            <button className="copy-btn" onClick={() => handleCopy('+917010123479')} aria-label="Copy WhatsApp number">
              <i className="fa-regular fa-copy"></i>
            </button>
          </div>
          <div className="q-info">
            <span className="q-label">WhatsApp</span>
            <span className="q-value">+91 70101 23479</span>
          </div>
          <a href="https://wa.me/917010123479?text=Hi%20Loganathan%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect." target="_blank" rel="noreferrer" className="btn btn-primary w-100 mt-4">Chat on WhatsApp</a>
        </div>
        
        {/* Call */}
        <div className="q-card glass-card">
          <div className="q-card-header">
            <div className="q-icon call-color"><i className="fa-solid fa-phone"></i></div>
            <button className="copy-btn" onClick={() => handleCopy('+917010123479')} aria-label="Copy Phone number">
              <i className="fa-regular fa-copy"></i>
            </button>
          </div>
          <div className="q-info">
            <span className="q-label">Call</span>
            <span className="q-value">+91 70101 23479</span>
          </div>
          <a href="tel:+917010123479" className="btn btn-primary w-100 mt-4">Call Now</a>
        </div>

        {/* Email */}
        <div className="q-card glass-card">
          <div className="q-card-header">
            <div className="q-icon email-color"><i className="fa-regular fa-envelope"></i></div>
            <button className="copy-btn" onClick={() => handleCopy('contact@loganathanm.in')} aria-label="Copy Email address">
              <i className="fa-regular fa-copy"></i>
            </button>
          </div>
          <div className="q-info">
            <span className="q-label">Email</span>
            <span className="q-value">contact@loganathanm.in</span>
          </div>
          <a href="mailto:contact@loganathanm.in?subject=Hello%20Loganathan" className="btn btn-primary w-100 mt-4">Send Email</a>
        </div>

        {/* Instagram */}
        <div className="q-card glass-card">
          <div className="q-card-header">
            <div className="q-icon ig-color"><i className="fa-brands fa-instagram"></i></div>
            <button className="copy-btn" onClick={() => handleCopy('@loganathanm.in')} aria-label="Copy Instagram handle">
              <i className="fa-regular fa-copy"></i>
            </button>
          </div>
          <div className="q-info">
            <span className="q-label">Instagram</span>
            <span className="q-value">@loganathanm.in</span>
            <a href="https://www.instagram.com/kutty_loga_" target="_blank" rel="noreferrer" className="q-secondary-link">Personal: @kutty_loga_</a>
          </div>
          <a href="https://ig.me/m/loganathanm.in" target="_blank" rel="noreferrer" className="btn btn-primary w-100 mt-4" style={{ marginTop: '0.25rem' }}>Message on IG</a>
        </div>
      </div>
      
      <div className="quick-contact-footer">
        <div className="social-row">
          <a href="https://www.linkedin.com/in/loganathanm-in/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon"><i className="fa-brands fa-linkedin-in"></i></a>
          <a href="https://github.com/LOGANATHAN2008" target="_blank" rel="noreferrer" aria-label="GitHub" className="social-icon"><i className="fa-brands fa-github"></i></a>
          <a href="https://ig.me/m/loganathanm.in" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon"><i className="fa-brands fa-instagram"></i></a>
        </div>
        <button onClick={handleSaveVCF} className="btn btn-outline"><i className="fa-regular fa-address-card"></i> Save my contact</button>
      </div>
    </section>
  );
}

export default QuickLinks;
