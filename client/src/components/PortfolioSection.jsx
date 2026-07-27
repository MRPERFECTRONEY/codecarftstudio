import React, { useState, useEffect } from 'react';
import { ExternalLink, Layers, Sparkles, X, ChevronRight, Award, Monitor, Smartphone } from 'lucide-react';
import { fetchPortfolio } from '../services/api';

const CATEGORIES = ['All', 'Web App', 'Mobile App', 'AI & Cloud'];

export default function PortfolioSection() {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio().then(res => {
      if (res.success) {
        // Expand items list with rich mockup graphics if needed
        const enriched = res.data.map((item, idx) => ({
          ...item,
          url_slug: `https://codecraftstudio.com/cases/${item.title.toLowerCase().replace(/\s+/g, '-')}`,
          // Adding multi-section long page previews for smooth hover scroll!
          mockup_image: item.image_url || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
        }));
        setItems(enriched);
      }
      setLoading(false);
    }).catch(console.error);
  }, []);

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio-section" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="grid-container">
        
        {/* Section Header (Inspired by Image 1) */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div className="badge-cyan" style={{ marginBottom: '16px', display: 'inline-block' }}>
            Our Creative Portfolio — Websites & Digital Solutions
          </div>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 800, marginBottom: '14px', color: '#ffffff' }}>
            Check Out Our Latest <span className="gradient-text">Website Designs, Apps & Platforms</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 32px auto' }}>
            We build high-converting digital experiences. Hover over any browser window mockup to auto-scroll through the live website UI!
          </p>

          {/* Filter Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)' : 'rgba(255, 255, 255, 0.04)',
                  color: activeCategory === cat ? '#07090e' : 'var(--text-muted)',
                  border: `1px solid ${activeCategory === cat ? 'transparent' : 'var(--border-glass)'}`,
                  padding: '8px 20px',
                  borderRadius: '20px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Mockup Grid (Image 1 Style Browser Frames) */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Loading live database showcase items...</div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {filteredItems.map(item => (
              <div 
                key={item.id}
                className="browser-mockup"
                onClick={() => setSelectedItem(item)}
              >
                {/* Browser Mockup Header */}
                <div className="browser-header">
                  <div className="browser-dots">
                    <span className="browser-dot dot-red"></span>
                    <span className="browser-dot dot-yellow"></span>
                    <span className="browser-dot dot-green"></span>
                  </div>
                  <div className="browser-url-bar">
                    {item.url_slug}
                  </div>
                </div>

                {/* Auto-scroll website screen image on hover */}
                <div className="mockup-screen">
                  <img 
                    src={item.mockup_image} 
                    alt={item.title}
                    className="mockup-image"
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    background: 'rgba(7, 9, 14, 0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--cyan-glow)',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    pointerEvents: 'none'
                  }}>
                    Hover to Scroll Page ↕
                  </div>
                </div>

                {/* Content Details */}
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="badge-purple" style={{ fontSize: '0.75rem' }}>{item.category}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>{item.client}</span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '18px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {(item.tech_stack || []).slice(0, 4).map((tech, tIdx) => (
                      <span key={tIdx} style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-glass)',
                        padding: '3px 9px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        color: '#cbd5e1'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Impact Metric */}
                  {item.metrics && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.82rem',
                      color: '#34d399',
                      fontWeight: 600,
                      background: 'rgba(16, 185, 129, 0.08)',
                      padding: '6px 12px',
                      borderRadius: '8px'
                    }}>
                      <Award size={14} />
                      {item.metrics}
                    </div>
                  )}

                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal Detail View */}
      {selectedItem && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.88)',
          backdropFilter: 'blur(16px)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="glass-panel" style={{
            maxWidth: '720px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '36px',
            position: 'relative'
          }}>
            <button 
              onClick={() => setSelectedItem(null)}
              style={{
                position: 'absolute', top: '20px', right: '20px',
                background: 'rgba(255, 255, 255, 0.1)', border: 'none',
                color: '#ffffff', width: '36px', height: '36px',
                borderRadius: '50%', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>

            {/* Modal Browser Mockup Frame */}
            <div className="browser-mockup" style={{ marginBottom: '24px' }}>
              <div className="browser-header">
                <div className="browser-dots">
                  <span className="browser-dot dot-red"></span>
                  <span className="browser-dot dot-yellow"></span>
                  <span className="browser-dot dot-green"></span>
                </div>
                <div className="browser-url-bar">{selectedItem.url_slug}</div>
              </div>
              <div style={{ height: '300px', overflowY: 'auto' }}>
                <img src={selectedItem.mockup_image} alt={selectedItem.title} style={{ width: '100%' }} />
              </div>
            </div>

            <span className="badge-cyan" style={{ marginBottom: '12px', display: 'inline-block' }}>
              {selectedItem.category} • {selectedItem.client}
            </span>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px' }}>
              {selectedItem.title}
            </h2>

            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.7 }}>
              {selectedItem.description}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', marginBottom: '10px' }}>
                Tech Architecture Stack:
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {(selectedItem.tech_stack || []).map((t, idx) => (
                  <span key={idx} style={{
                    background: 'rgba(0, 240, 255, 0.1)',
                    border: '1px solid rgba(0, 240, 255, 0.3)',
                    color: 'var(--cyan-glow)',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.84rem',
                    fontWeight: 600
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {selectedItem.metrics && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '16px',
                borderRadius: '12px',
                color: '#34d399',
                fontWeight: 700,
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Award size={20} />
                Client Business Impact: {selectedItem.metrics}
              </div>
            )}

            <div style={{ display: 'flex', gap: '14px' }}>
              {selectedItem.demo_url && (
                <a 
                  href={selectedItem.demo_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-glow-cyan"
                  style={{ textDecoration: 'none' }}
                >
                  <ExternalLink size={18} />
                  Visit Live Case Preview
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
