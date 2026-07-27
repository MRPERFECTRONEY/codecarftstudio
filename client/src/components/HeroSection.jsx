import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Code, ShieldCheck, Cpu, Database, CheckCircle2, Rocket, Zap, Layers, Terminal } from 'lucide-react';
import { fetchStats } from '../services/api';
import { formatPrice } from '../services/currency';

const TYPEWRITER_PHRASES = [
  "Full-Stack Web Applications",
  "iOS & Android Mobile Apps",
  "AI & OpenAI Agent Workflows",
  "Enterprise Cloud SaaS Platforms",
  "Headless E-Commerce Solutions",
  "Custom SQLite & API Systems"
];

export default function HeroSection({ onOpenInquiry, currency = 'INR' }) {
  const [stats, setStats] = useState(null);

  // Typewriter effect states
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    fetchStats().then(res => {
      if (res.success) setStats(res.data);
    }).catch(console.error);
  }, []);

  // Typewriter loop hook
  useEffect(() => {
    const handleType = () => {
      const fullPhrase = TYPEWRITER_PHRASES[phraseIndex];

      if (isDeleting) {
        setCurrentText(fullPhrase.substring(0, currentText.length - 1));
        setTypingSpeed(40);
      } else {
        setCurrentText(fullPhrase.substring(0, currentText.length + 1));
        setTypingSpeed(90);
      }

      if (!isDeleting && currentText === fullPhrase) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, typingSpeed]);

  return (
    <section style={{
      position: 'relative',
      paddingTop: '60px',
      paddingBottom: '100px',
      overflow: 'hidden'
    }}>
      {/* Background Mesh Orbs */}
      <div className="bg-glow-orb-1"></div>
      <div className="bg-glow-orb-2"></div>
      <div className="bg-glow-orb-3"></div>

      <div className="grid-container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Split 2-Column Hero Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '48px',
          alignItems: 'center',
          marginBottom: '60px'
        }}>
          
          {/* LEFT COLUMN: Left-Aligned Text Content & Typewriter */}
          <div style={{ textAlign: 'left' }}>
            
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '20px',
              background: 'rgba(0, 240, 255, 0.08)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              marginBottom: '20px'
            }}>
              <Terminal size={16} color="var(--cyan-glow)" />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--cyan-glow)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Full-Stack Software & Mobile Engineering Agency
              </span>
            </div>

            {/* Left Aligned Headline with Typewriter */}
            <h1 style={{
              fontSize: 'clamp(2.3rem, 4.2vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '20px',
              color: '#ffffff',
              letterSpacing: '-0.02em'
            }}>
              We Engineer High-Impact <br />
              <span className="gradient-text" style={{ minHeight: '1.2em', display: 'inline-block' }}>
                {currentText}
              </span>
              <span style={{
                color: 'var(--cyan-glow)',
                fontWeight: 300,
                animation: 'pulseGlow 1s infinite'
              }}>|</span>
            </h1>

            {/* Left Aligned Description */}
            <p style={{
              fontSize: '1.12rem',
              color: 'var(--text-muted)',
              marginBottom: '32px',
              lineHeight: 1.7,
              maxWidth: '560px'
            }}>
              Code Craft Studio builds custom web platforms, iOS/Android mobile applications, and AI cloud systems tailored precisely for ambitious Indian & global businesses.
            </p>

            {/* Left Aligned Action Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '36px' }}>
              <button 
                className="btn-glow-cyan" 
                onClick={onOpenInquiry} 
                style={{ padding: '14px 28px', fontSize: '1rem' }}
              >
                <Sparkles size={20} />
                Get Technical Proposal
              </button>

              <button 
                className="btn-secondary" 
                onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })} 
                style={{ padding: '14px 24px', fontSize: '1rem' }}
              >
                Explore Services <ArrowRight size={18} />
              </button>
            </div>

            {/* Left Aligned Floating Tech Badges */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <span className="badge-cyan" style={{ fontSize: '0.78rem' }}>⚛️ React & Next.js</span>
              <span className="badge-purple" style={{ fontSize: '0.78rem' }}>📱 Flutter & iOS/Android</span>
              <span className="badge-emerald" style={{ fontSize: '0.78rem' }}>💾 Persistent SQLite DB</span>
              <span className="badge-purple" style={{ fontSize: '0.78rem' }}>🤖 OpenAI GPT-4o Agent</span>
            </div>

          </div>

          {/* RIGHT COLUMN: Developers Coding Graphic Visual Frame */}
          <div style={{ position: 'relative' }}>
            <div className="browser-mockup" style={{
              border: '1px solid rgba(0, 240, 255, 0.3)',
              boxShadow: '0 25px 60px rgba(0, 240, 255, 0.18)',
              overflow: 'hidden',
              borderRadius: '16px'
            }}>
              {/* Window Bar Header */}
              <div className="browser-header">
                <div className="browser-dots">
                  <span className="browser-dot dot-red"></span>
                  <span className="browser-dot dot-yellow"></span>
                  <span className="browser-dot dot-green"></span>
                </div>
                <div className="browser-url-bar">
                  https://codecraftstudio.com/engineering-studio-live
                </div>
              </div>

              {/* Developer Visual Image */}
              <div style={{ position: 'relative', overflow: 'hidden', height: '380px' }}>
                <img 
                  src="/hero_visual.png" 
                  alt="Software Engineers Coding Web & Mobile Apps" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />

                {/* Overlaid Floating Status Pill */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  background: 'rgba(7, 9, 14, 0.85)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  padding: '12px 18px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 10px #34d399' }}></span>
                    <span style={{ fontSize: '0.84rem', color: '#ffffff', fontWeight: 600 }}>
                      Live Engineering Studio Active
                    </span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--cyan-glow)', fontWeight: 700 }}>
                    50+ Built Apps
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Full-width 3D Glassmorphic Stats Bar */}
        <div className="glass-panel" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '24px',
          padding: '32px 40px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.7) 100%)',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)'
        }}>
          <div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--cyan-glow)' }}>
              {stats?.total_projects_delivered || '52+'}
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', fontWeight: 600 }}>Delivered Systems</div>
          </div>

          <div style={{ borderLeft: '1px solid var(--border-glass)' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#a78bfa' }}>
              {stats?.client_satisfaction || '99.4%'}
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', fontWeight: 600 }}>Client CSAT Rating</div>
          </div>

          <div style={{ borderLeft: '1px solid var(--border-glass)' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#34d399' }}>
              {stats?.avg_turnaround || '3.5 Wks'}
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', fontWeight: 600 }}>Avg Turnaround Time</div>
          </div>

          <div style={{ borderLeft: '1px solid var(--border-glass)' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f43f5e' }}>
              {stats?.active_projects_count || '16'}
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Tracked Projects</div>
          </div>
        </div>

      </div>
    </section>
  );
}
