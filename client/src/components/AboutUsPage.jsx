import React from 'react';
import { 
  Users, Award, ShieldCheck, Target, Zap, Sparkles, CheckCircle2, 
  MapPin, Rocket, Code2, Globe, Heart, ChevronRight 
} from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: 'Roshan Yadav',
    role: 'Owner, Founder & Principal Software Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: '10+ years architecting enterprise SaaS, React, Node.js, and relational database systems for Indian & international tech companies.',
    skills: ['Full Stack', 'Database Schema', 'System Design']
  },
  {
    name: 'Ananya Sharma',
    role: 'Head of Mobile App Engineering',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialist in 60fps Flutter, React Native, and native iOS/Android code. Led delivery of 25+ top-rated mobile applications.',
    skills: ['Flutter', 'iOS / Swift', 'Android / Kotlin']
  },
  {
    name: 'Vikram Patel',
    role: 'Lead AI & Cloud Infrastructure Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Expert in OpenAI GPT-4o RAG pipelines, vector search databases, AWS microservices, and high-throughput real-time WebSockets.',
    skills: ['OpenAI API', 'Vector DB', 'AWS / Cloud']
  },
  {
    name: 'Priya Sundaram',
    role: 'Head of UI/UX & Product Design Systems',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    bio: 'Passionate about modern dark glassmorphism, fluid micro-interactions, and accessibility standards for high-converting Web UIs.',
    skills: ['Figma UI/UX', 'Glassmorphism', 'Design Systems']
  }
];

const AGENCY_TIMELINE = [
  { year: '2022', title: 'Agency Foundation', desc: 'Code Craft Studio established in Jaipur, Rajasthan, India with a focus on custom React & Node.js software.' },
  { year: '2023', title: 'Mobile & Cloud Expansion', desc: 'Expanded engineering team to native mobile apps (Flutter, iOS, Android) and cloud architecture.' },
  { year: '2024', title: 'AI Integration & Realtime SQLite', desc: 'Integrated OpenAI LLM agent workflows, vector databases, and real-time project tracker client portals.' },
  { year: '2026', title: '50+ Enterprise Deliveries', desc: 'Crossed 52+ completed client systems with 99.4% CSAT serving scaling businesses across India & globally.' }
];

export default function AboutUsPage({ onNavigateContact }) {
  return (
    <div style={{ paddingTop: '40px', paddingBottom: '90px', position: 'relative' }}>
      <div className="bg-glow-orb-1"></div>
      <div className="bg-glow-orb-2"></div>

      <div className="grid-container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="badge-cyan" style={{ marginBottom: '16px', display: 'inline-block' }}>
            About Code Craft Studio
          </div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, color: '#ffffff', marginBottom: '18px' }}>
            Driven by Engineering Excellence. <br />
            <span className="gradient-text">Built for Business Growth.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '780px', margin: '0 auto', lineHeight: 1.7 }}>
            Code Craft Studio is a premier full-stack software and mobile app agency headquartered in India. We turn complex requirements into high-performance web applications, iOS/Android apps, and AI-powered systems.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          marginBottom: '80px'
        }}>
          <div className="glass-panel" style={{ padding: '36px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: 'rgba(0, 240, 255, 0.12)', border: '1px solid rgba(0, 240, 255, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'
            }}>
              <Target size={26} color="var(--cyan-glow)" />
            </div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
              Our Core Mission
            </h3>
            <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              To empower startups and enterprises across India and internationally with production-ready, zero-bloat digital products built on clean code, transparent pricing, and real-time delivery tracking.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '36px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'
            }}>
              <Rocket size={26} color="#a78bfa" />
            </div>
            <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
              Our Engineering Vision
            </h3>
            <p style={{ fontSize: '0.98rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              To remain India's most trusted partner for custom web, mobile, and AI software engineering—where every client has direct visibility into their project's progress and source code architecture.
            </p>
          </div>
        </div>

        {/* Agency Pillars / Values */}
        <div style={{ marginBottom: '90px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <div className="badge-purple" style={{ marginBottom: '14px', display: 'inline-block' }}>
              Engineering Philosophy
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff' }}>
              Why Clients Choose <span className="gradient-text-cyan">Code Craft Studio</span>
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {[
              { title: 'Zero Bloat Code', desc: 'Custom React & Node.js written from scratch without heavy unused dependencies.', color: '#00f0ff' },
              { title: 'Real-Time Tracking', desc: 'Every client receives a unique code to track milestones in real-time.', color: '#8b5cf6' },
              { title: 'Transparent Pricing', desc: 'Upfront cost estimates in Indian Rupees (₹) or USD ($) with no hidden fees.', color: '#34d399' },
              { title: 'Full Ownership', desc: 'You retain 100% ownership of your source code, IP rights, and databases.', color: '#f59e0b' }
            ].map((pillar, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <CheckCircle2 size={20} color={pillar.color} />
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>{pillar.title}</h4>
                </div>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership & Engineering Team */}
        <div style={{ marginBottom: '90px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <div className="badge-cyan" style={{ marginBottom: '14px', display: 'inline-block' }}>
              Meet The Experts
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
              Our Senior Engineering Leaders
            </h2>
            <p style={{ fontSize: '1.02rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              A dedicated team of senior architects, mobile engineers, and AI specialists based in India.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '28px'
          }}>
            {TEAM_MEMBERS.map((member, idx) => (
              <div key={idx} className="glass-panel glass-panel-hover" style={{ padding: '28px', textAlign: 'center' }}>
                <img 
                  src={member.avatar} 
                  alt={member.name}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto 18px auto',
                    border: '2px solid rgba(0, 240, 255, 0.4)',
                    boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)'
                  }}
                />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                  {member.name}
                </h3>
                <div style={{ fontSize: '0.84rem', color: 'var(--cyan-glow)', fontWeight: 600, marginBottom: '14px' }}>
                  {member.role}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '18px' }}>
                  {member.bio}
                </p>

                <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {member.skills.map((skill, sIdx) => (
                    <span key={sIdx} style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-glass)',
                      padding: '3px 9px',
                      borderRadius: '6px',
                      fontSize: '0.74rem',
                      color: '#cbd5e1'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agency Growth Timeline */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '44px' }}>
            <div className="badge-purple" style={{ marginBottom: '14px', display: 'inline-block' }}>
              Our Journey
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#ffffff' }}>
              Agency Growth Milestones
            </h2>
          </div>

          <div className="glass-panel" style={{ padding: '36px', maxWidth: '850px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {AGENCY_TIMELINE.map((item, tIdx) => (
                <div key={tIdx} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)',
                    color: '#07090e',
                    fontWeight: 800,
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.88rem',
                    flexShrink: 0
                  }}>
                    {item.year}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="glass-panel" style={{
          padding: '48px 36px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
          border: '1px solid rgba(0, 240, 255, 0.3)',
          boxShadow: '0 20px 50px rgba(0, 240, 255, 0.15)'
        }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px' }}>
            Ready to Build Your Software with Us?
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 28px auto' }}>
            Talk directly to our lead engineering team. We will evaluate your requirements and send a technical proposal.
          </p>
          <button className="btn-glow-cyan" onClick={onNavigateContact}>
            Contact Our Engineering Team <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
