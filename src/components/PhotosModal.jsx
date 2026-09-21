import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const featuredPhotos = [
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=500&q=60",
  "https://loganathanm.in/assets/loganathan-m-og-share.webp",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=60"
];

const memoryPhotos = [
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=500&q=60",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=500&q=60",
  "/logo.png",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=500&q=60",
  "https://loganathanm.in/assets/loganathan-m-og-share.webp"
];

function PhotosModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('collections'); // 'collections' or 'library'
  const [viewerImg, setViewerImg] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      if (location.pathname.toLowerCase() !== '/album') {
        navigate('/Album');
      }
    } else {
      if (location.pathname.toLowerCase() === '/album') {
        navigate('/');
      }
    }
  }, [isOpen, navigate, location.pathname]);

  if (!isOpen) return null;

  const allPhotos = [...featuredPhotos, ...memoryPhotos];

  const handleImageClick = (src) => {
    setViewerImg(src);
  };

  return (
    <>
      <div className="ios-album-modal active">
        <div className="ios-18-top-bar">
          <h1 className="ios-18-large-title">{activeTab === 'collections' ? 'Collections' : 'Library'}</h1>
          <div className="ios-18-top-actions">
            <button className="ios-icon-btn"><i className="fa-solid fa-ellipsis"></i></button>
            <div className="ios-profile-icon"><img src="/logo.png" alt="Profile" /></div>
            <button onClick={onClose} className="ios-close-btn">&times;</button>
          </div>
        </div>
        
        {activeTab === 'collections' && (
          <div className="ios-album-content">
            <div className="ios-section">
              <div className="ios-section-header">
                <h2>Featured Photos <i className="fa-solid fa-chevron-right"></i></h2>
              </div>
              <div className="ios-featured-grid">
                {featuredPhotos.map((src, i) => (
                  <img key={`feat-${i}`} src={src} onClick={() => handleImageClick(src)} alt="" />
                ))}
              </div>
            </div>

            <div className="ios-section">
              <div className="ios-section-header">
                <h2>Memories <i className="fa-solid fa-chevron-right"></i></h2>
              </div>
              <div className="ios-memories-grid">
                {memoryPhotos.map((src, i) => (
                  <img key={`mem-${i}`} src={src} onClick={() => handleImageClick(src)} alt="" />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'library' && (
          <div className="ios-library-content">
            <div className="ios-library-grid">
              {allPhotos.map((src, i) => (
                <img key={`lib-${i}`} src={src} onClick={() => handleImageClick(src)} alt="" />
              ))}
            </div>
          </div>
        )}

        <div className="ios-18-floating-nav-wrapper">
          <div className="ios-18-floating-nav">
            <div className="nav-pill">
              <div 
                className={`nav-item ${activeTab === 'library' ? 'active' : ''}`} 
                onClick={() => setActiveTab('library')}
              >
                <i className="fa-regular fa-image"></i><span>Library</span>
              </div>
              <div 
                className={`nav-item ${activeTab === 'collections' ? 'active' : ''}`} 
                onClick={() => setActiveTab('collections')}
              >
                <i className="fa-solid fa-layer-group"></i><span>Collections</span>
              </div>
            </div>
            <div className="nav-search"><i className="fa-solid fa-magnifying-glass"></i></div>
          </div>
        </div>
      </div>

      {viewerImg && (
        <div className="ios-viewer-modal active">
          <div className="ios-viewer-header">
            <button onClick={() => setViewerImg(null)} className="ios-btn-text ios-back-btn">
              <i className="fa-solid fa-chevron-left"></i> Recents
            </button>
          </div>
          <div className="ios-viewer-content">
            <img src={viewerImg} alt="View" />
          </div>
        </div>
      )}
    </>
  );
}

export default PhotosModal;
