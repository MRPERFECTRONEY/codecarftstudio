import React, { useState } from 'react';
import { Code2, Menu, X } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currency, setCurrency }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab, targetId = null) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (targetId) {
      setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: 'rgba(7, 9, 14, 0.88)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="grid-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '80px'
      }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('main')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', flexShrink: 0 }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 50%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)',
            flexShrink: 0
          }}>
            <Code2 size={24} color="#07090e" strokeWidth={2.5} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.35rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#ffffff',
              lineHeight: 1.1,
              whiteSpace: 'nowrap'
            }}>
              Code Craft <span className="gradient-text-cyan">Studio</span>
            </span>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, marginTop: '2px' }}>
              Full Stack & App Agency
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button 
            onClick={() => handleNavClick('main')}
            style={{
              background: 'none', border: 'none',
              color: activeTab === 'main' ? '#ffffff' : 'var(--text-muted)',
              fontSize: '0.95rem', fontWeight: activeTab === 'main' ? 700 : 500,
              cursor: 'pointer', transition: 'color 0.2s'
            }}
          >
            Home
          </button>

          <button 
            onClick={() => handleNavClick('main', 'services-section')}
            style={{
              background: 'none', border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.95rem', fontWeight: 500,
              cursor: 'pointer', transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.target.style.color = '#ffffff'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >
            Services
          </button>

          <button 
            onClick={() => handleNavClick('main', 'tech-explorer-section')}
            style={{
              background: 'none', border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.95rem', fontWeight: 500,
              cursor: 'pointer', transition: 'color 0.2s'
            }}
            onMouseEnter={e => e.target.style.color = '#ffffff'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >
            Tech Stack
          </button>

          <button 
            onClick={() => handleNavClick('about')}
            style={{
              background: 'none', border: 'none',
              color: activeTab === 'about' ? 'var(--cyan-glow)' : 'var(--text-muted)',
              fontSize: '0.95rem', fontWeight: activeTab === 'about' ? 700 : 500,
              cursor: 'pointer', transition: 'color 0.2s'
            }}
          >
            About Us
          </button>

          <button 
            onClick={() => handleNavClick('contact')}
            style={{
              background: 'none', border: 'none',
              color: activeTab === 'contact' ? 'var(--cyan-glow)' : 'var(--text-muted)',
              fontSize: '0.95rem', fontWeight: activeTab === 'contact' ? 700 : 500,
              cursor: 'pointer', transition: 'color 0.2s'
            }}
          >
            Contact Us
          </button>
        </nav>

        {/* Currency Switcher & Mobile Menu Trigger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Currency Toggle */}
          <div style={{
            display: 'flex',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-glass)',
            borderRadius: '20px',
            padding: '3px'
          }}>
            <button
              onClick={() => setCurrency('INR')}
              style={{
                background: currency === 'INR' ? 'linear-gradient(135deg, #f97316 0%, #16a34a 100%)' : 'none',
                color: currency === 'INR' ? '#ffffff' : 'var(--text-muted)',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '16px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title="Indian Rupee Pricing (₹)"
            >
              🇮🇳 ₹ INR
            </button>

            <button
              onClick={() => setCurrency('USD')}
              style={{
                background: currency === 'USD' ? 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)' : 'none',
                color: currency === 'USD' ? '#07090e' : 'var(--text-muted)',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '16px',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              title="Global USD Pricing ($)"
            >
              🌐 $ USD
            </button>
          </div>

          {/* Mobile Hamburger Button (Visible < 900px) */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-glass)',
              color: '#ffffff',
              padding: '8px',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>

      </div>

      {/* Mobile Glassmorphic Drawer Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          background: 'rgba(7, 9, 14, 0.96)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(0, 240, 255, 0.2)',
          padding: '24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <button 
            onClick={() => handleNavClick('main')}
            style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '1.05rem', fontWeight: 600, textAlign: 'left' }}
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick('main', 'services-section')}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.05rem', fontWeight: 500, textAlign: 'left' }}
          >
            Services
          </button>
          <button 
            onClick={() => handleNavClick('main', 'tech-explorer-section')}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.05rem', fontWeight: 500, textAlign: 'left' }}
          >
            Tech Stack Explorer
          </button>
          <button 
            onClick={() => handleNavClick('about')}
            style={{ background: 'none', border: 'none', color: 'var(--cyan-glow)', fontSize: '1.05rem', fontWeight: 600, textAlign: 'left' }}
          >
            About Us
          </button>
          <button 
            onClick={() => handleNavClick('contact')}
            style={{ background: 'none', border: 'none', color: 'var(--cyan-glow)', fontSize: '1.05rem', fontWeight: 600, textAlign: 'left' }}
          >
            Contact Us
          </button>
        </div>
      )}

    </header>
  );
}
