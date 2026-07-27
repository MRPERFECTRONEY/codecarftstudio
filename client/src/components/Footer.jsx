import React from 'react';
import { Code2, Heart, Shield, Terminal, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer style={{
      background: 'rgba(5, 7, 10, 0.95)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '70px 0 30px 0',
      color: 'var(--text-muted)'
    }}>
      <div className="grid-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          
          {/* Col 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Code2 size={20} color="#07090e" strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
                Code Craft <span className="gradient-text-cyan">Studio</span>
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px' }}>
              Premier full-stack web and mobile application engineering agency. Crafting tailored digital solutions backed by robust database architectures.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="badge-cyan" style={{ fontSize: '0.72rem' }}>React</span>
              <span className="badge-purple" style={{ fontSize: '0.72rem' }}>Node.js</span>
              <span className="badge-emerald" style={{ fontSize: '0.72rem' }}>SQLite DB</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>
              Core Solutions
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li>Full Stack Web Apps</li>
              <li>iOS & Android Native Mobile</li>
              <li>AI Agents & LLM RAG Systems</li>
              <li>Enterprise Cloud Architecture</li>
              <li>UI/UX & Brand Design Systems</li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>
              Client Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
              <li style={{ cursor: 'pointer', color: 'var(--cyan-glow)' }} onClick={() => onNavigate('tracker')}>
                • Real-Time Client Project Tracker
              </li>
              <li style={{ cursor: 'pointer' }} onClick={() => onNavigate('inquiry')}>
                • Submit Project Quote Request
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>
              Direct Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} color="var(--cyan-glow)" />
                <span style={{ wordBreak: 'break-all' }}>admin.codecraftstudio@gmail.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={16} color="#a78bfa" />
                <span>+91-8239009909</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="#34d399" />
                <span>139-140 Govind Nagar 2nd Gokulpura, Jaipur, Rajasthan 302012</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '24px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.82rem'
        }}>
          <div>
            © {new Date().getFullYear()} Code Craft Studio. All rights reserved. Persistent SQLite Database Integrated.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Built with <Heart size={14} color="#f43f5e" fill="#f43f5e" /> by Code Craft Studio Engineering
          </div>
        </div>

      </div>
    </footer>
  );
}
