import React, { useState } from 'react';
import { 
  Smartphone, Globe, Users, Layout, Megaphone, Flame, Zap, Cpu,
  CheckCircle2, ArrowRight, Shield, Database, Cloud, Code2, Sparkles 
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'mobile',
    title: 'Mobile Application Development',
    icon: Smartphone,
    color: '#00f0ff',
    description: 'As a top mobile app development agency, we engineer native iOS, Android, and cross-platform mobile solutions built with ultra-smooth 60fps animations, offline SQLite caching, and enterprise security.',
    techs: [
      { name: 'Apple iOS', icon: '', desc: 'Swift & SwiftUI Native Development' },
      { name: 'Android OS', icon: '🤖', desc: 'Kotlin & Jetpack Compose' },
      { name: 'Flutter', icon: '⚡️', desc: 'Cross-Platform 60fps Single Codebase' },
      { name: 'React Native', icon: '⚛️', desc: 'Native Bridge React Ecosystem' },
      { name: 'Swift', icon: '🦅', desc: 'High-Performance Apple Native' },
      { name: 'Kotlin', icon: '🎯', desc: 'Modern Android Enterprise Code' },
      { name: 'iPad & Tablet OS', icon: '📱', desc: 'Adaptive Responsive Screens' },
      { name: 'WatchOS & Wear', icon: '⌚️', desc: 'Wearable Hardware Sync' },
      { name: 'SQLite Native', icon: '💾', desc: 'Offline First Local Storage' },
      { name: 'Firebase & Push', icon: '🔥', desc: 'Realtime Cloud Notifications' }
    ]
  },
  {
    id: 'web',
    title: 'Web Applications & Systems',
    icon: Globe,
    color: '#8b5cf6',
    description: 'We construct ultra-fast, responsive web applications, progressive web apps (PWAs), and enterprise dashboards designed for infinite scale, instant SEO indexing, and pixel-perfect design.',
    techs: [
      { name: 'React.js', icon: '⚛️', desc: 'Interactive Dynamic UI Components' },
      { name: 'Next.js 15', icon: '▲', desc: 'Server-Side Rendering & ISR' },
      { name: 'Node.js & Express', icon: '🟢', desc: 'Scalable REST & Event Server' },
      { name: 'Python FastAPI', icon: '🐍', desc: 'High Speed AI & Microservices' },
      { name: 'TypeScript', icon: '📘', desc: 'End-to-End Type Safety' },
      { name: 'Tailwind CSS', icon: '🎨', desc: 'Modern Glassmorphic Utility Design' },
      { name: 'PostgreSQL & SQLite', icon: '🐘', desc: 'ACID Relational Databases' },
      { name: 'GraphQL & REST', icon: '🕸️', desc: 'Flexible Query Endpoints' }
    ]
  },
  {
    id: 'cms',
    title: 'CMS & Ecommerce Platforms',
    icon: Layout,
    color: '#34d399',
    description: 'Headless commerce, automated inventory syncing, fast 1-click checkouts, and custom CMS platforms giving business owners total control over their digital content.',
    techs: [
      { name: 'Headless Shopify', icon: '🛍️', desc: 'Custom Storefront GraphQL API' },
      { name: 'WooCommerce', icon: '📦', desc: 'Custom WordPress Commerce' },
      { name: 'Strapi CMS', icon: '🚀', desc: 'Headless Node Content API' },
      { name: 'Stripe Payments', icon: '💳', desc: 'Global 135+ Currency Checkout' },
      { name: 'Sanity.io', icon: '📝', desc: 'Realtime Collaborative CMS' },
      { name: 'Payload CMS', icon: '⚙️', desc: 'TypeScript Native Admin Hub' }
    ]
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning Integration',
    icon: Cpu,
    color: '#ec4899',
    description: 'Embed smart AI capabilities directly into your software. We build vector search engines, custom RAG pipelines, OpenAI agent workflows, and automated customer support chatbots.',
    techs: [
      { name: 'OpenAI GPT-4o', icon: '🧠', desc: 'Multimodal Natural Language API' },
      { name: 'Vector DB (Pinecone)', icon: '📐', desc: 'Semantic Search & Embeddings' },
      { name: 'LangChain & Llama', icon: '🦜', desc: 'Custom AI Agent Pipelines' },
      { name: 'Anthropic Claude 3.5', icon: '🔮', desc: 'Advanced Technical Reasoning' },
      { name: 'Whisper & Speech', icon: '🎙️', desc: 'Realtime Voice Processing' },
      { name: 'Python PyTorch', icon: '🔥', desc: 'Custom ML Model Training' }
    ]
  },
  {
    id: 'api',
    title: 'API Services & Cloud Infrastructure',
    icon: Zap,
    color: '#f59e0b',
    description: 'Resilient cloud infrastructure, microservices architecture, docker containers, and real-time WebSockets engineered for high availability and zero downtime.',
    techs: [
      { name: 'AWS Cloud', icon: '☁️', desc: 'EC2, Lambda, S3 & CloudFront' },
      { name: 'Docker & K8s', icon: '🐳', desc: 'Container Orchestration' },
      { name: 'WebSockets & Socket.io', icon: '🔌', desc: 'Sub-Millisecond Live Sync' },
      { name: 'Redis Cache', icon: '⚡️', desc: 'Ultra-Fast In-Memory Store' },
      { name: 'Cloudflare Workers', icon: '🌐', desc: 'Edge Compute Infrastructure' },
      { name: 'Nginx & SSL', icon: '🛡️', desc: 'High Throughput Load Balancing' }
    ]
  },
  {
    id: 'marketing',
    title: 'Digital Marketing & SEO Management',
    icon: Megaphone,
    color: '#3b82f6',
    description: 'Drive high-converting targeted traffic with our data-driven digital marketing campaigns, technical SEO audits, Meta & Google Ads optimization, and organic social growth.',
    techs: [
      { name: 'Technical SEO Audit', icon: '🔍', desc: 'Core Web Vitals & Top Ranking' },
      { name: 'Google Ads PPC', icon: '📈', desc: 'High ROI Targeted Search Ads' },
      { name: 'Meta Ads (FB/IG)', icon: '🎯', desc: 'Laser Targeted Social Funnels' },
      { name: 'Google Analytics 4', icon: '📊', desc: 'Full Funnel Conversion Tracking' },
      { name: 'Content Marketing', icon: '✍️', desc: 'Authority Building Articles' }
    ]
  }
];

export default function TechStackExplorer({ onSelectTech }) {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);

  return (
    <section id="tech-explorer-section" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="grid-container">
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge-purple" style={{ marginBottom: '14px', display: 'inline-block' }}>
            Technology & Capabilities Explorer
          </div>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px' }}>
            Explore Our <span className="gradient-text-cyan">Tech Stack & Frameworks</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto' }}>
            Click on any discipline to inspect the cutting-edge frameworks, databases, and SDKs Code Craft Studio utilizes to engineer your software.
          </p>
        </div>

        {/* Main Tabbed Container (Inspired by Image 4) */}
        <div className="glass-panel" style={{
          padding: '24px',
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)'
        }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            alignItems: 'stretch'
          }}>
            
            {/* Left Sidebar Menu */}
            <div style={{
              background: 'rgba(7, 9, 14, 0.6)',
              padding: '18px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '6px 12px', marginBottom: '4px' }}>
                Engineering Disciplines
              </div>

              {CATEGORIES.map((cat) => {
                const IconComp = cat.icon;
                const isActive = activeCategory.id === cat.id;
                return (
                  <button
                    key={cat.id}
                    className={`tab-sidebar-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: isActive ? `${cat.color}25` : 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isActive ? cat.color : 'var(--text-muted)'
                    }}>
                      <IconComp size={18} />
                    </div>
                    <span style={{ fontSize: '0.92rem' }}>{cat.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Display Panel */}
            <div style={{
              background: 'rgba(7, 9, 14, 0.4)',
              padding: '36px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <span className="badge-cyan" style={{ borderColor: activeCategory.color, color: activeCategory.color, background: `${activeCategory.color}15` }}>
                    Active Discipline
                  </span>
                </div>

                <h3 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px' }}>
                  {activeCategory.title}
                </h3>

                <p style={{ fontSize: '1.02rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '32px' }}>
                  {activeCategory.description}
                </p>

                {/* Tech Icons Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
                  gap: '14px',
                  marginBottom: '32px'
                }}>
                  {activeCategory.techs.map((t, idx) => (
                    <div
                      key={idx}
                      onClick={() => onSelectTech && onSelectTech(t.name)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-glass)',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = `${activeCategory.color}15`;
                        e.currentTarget.style.borderColor = activeCategory.color;
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.borderColor = 'var(--border-glass)';
                        e.currentTarget.style.transform = 'translateY(0px)';
                      }}
                    >
                      <span style={{ fontSize: '1.6rem' }}>{t.icon}</span>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>{t.name}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{t.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* Bottom Action CTA */}
              <div style={{
                background: 'rgba(0, 240, 255, 0.05)',
                border: '1px solid rgba(0, 240, 255, 0.2)',
                padding: '16px 20px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 600 }}>
                  <Sparkles size={18} color="var(--cyan-glow)" />
                  Need a custom solution in {activeCategory.title}?
                </div>

                <button 
                  className="btn-glow-cyan"
                  style={{ padding: '8px 18px', fontSize: '0.85rem' }}
                  onClick={() => {
                    document.getElementById('estimator-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Estimate {activeCategory.title.split(' ')[0]} Project <ArrowRight size={16} />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
