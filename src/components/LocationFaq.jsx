import React, { useState } from 'react';

function LocationFaq() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const faqs = [
    {
      q: "Are you open to freelance projects?",
      a: "Yes! I'm currently taking on select freelance projects, especially involving Web Development or AI integrations."
    },
    {
      q: "What tech stack do you use?",
      a: "HTML, CSS, JavaScript, Python, React, PHP, MySQL, Firebase, Cloudinary and the Gemini API, with Git/GitHub and Figma for design."
    },
    {
      q: "How quickly do you reply?",
      a: "Usually within 24 hours."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section className="info-section slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="location-card glass-card">
        <h3><i className="fa-solid fa-location-dot" style={{ color: 'var(--primary)' }}></i> My Locations</h3>
        <div className="loc-item">
          <div className="loc-details">
            <strong>Bengaluru, Karnataka</strong>
            <span>Studying at Dayananda Sagar University (DSU)</span>
          </div>
          <a href="https://www.google.com/maps/search/?api=1&query=Bengaluru,+Karnataka" target="_blank" rel="noreferrer" className="loc-link" aria-label="Open Bengaluru in Maps">
            <i className="fa-solid fa-arrow-up-right-from-square"></i> Maps
          </a>
        </div>
        <div className="loc-item">
          <div className="loc-details">
            <strong>Vellore, Tamil Nadu</strong>
            <span>Hometown</span>
          </div>
          <a href="https://www.google.com/maps/search/?api=1&query=Vellore,+Tamil+Nadu" target="_blank" rel="noreferrer" className="loc-link" aria-label="Open Vellore in Maps">
            <i className="fa-solid fa-arrow-up-right-from-square"></i> Maps
          </a>
        </div>
        <div className="loc-footer">
          <span className="remote-note"><i className="fa-solid fa-laptop"></i> Available for remote work across India</span>
        </div>
      </div>

      <div className="faq-accordion glass-card" id="faq-container">
        <h3><i className="fa-solid fa-circle-question" style={{ color: 'var(--primary)' }}></i> Mini FAQ</h3>
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <button 
              className="faq-btn" 
              onClick={() => toggleFaq(index)}
              aria-expanded={openFaqIndex === index}
            >
              <span>{faq.q}</span>
              <i className="fa-solid fa-chevron-down"></i>
            </button>
            <div 
              className="faq-content" 
              style={{ maxHeight: openFaqIndex === index ? '500px' : '0' }}
            >
              <div className="faq-content-inner">
                <p>{faq.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LocationFaq;
