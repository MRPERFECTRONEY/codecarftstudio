import React, { useState } from 'react';
import { 
  Monitor, Smartphone, ShoppingBag, Megaphone, Zap, Cpu, Video, Palette,
  CheckCircle, ArrowRight, X, Sparkles, Code, Globe, Shield, Star
} from 'lucide-react';

const COMPREHENSIVE_SERVICES = [
  {
    id: 'web-dev',
    icon: Monitor,
    title: 'Web Development',
    tagline: 'Custom Websites, Full-Stack Web Apps, PWAs & CMS',
    color: '#00f0ff',
    badge: 'Popular',
    subServices: [
      'Custom React & Next.js Websites',
      'E-commerce Solutions (Shopify / WooCommerce)',
      'CMS & Frontend Architecture',
      'Performance Optimization & Core Web Vitals'
    ],
    fullDesc: 'We construct ultra-fast responsive websites, progressive web applications, and enterprise dashboards using React, Next.js, and Node.js with real-time SQLite database persistence.'
  },
  {
    id: 'mobile-dev',
    icon: Smartphone,
    title: 'Mobile App Development',
    tagline: 'Native iOS, Android & Flutter Cross-Platform Apps',
    color: '#8b5cf6',
    badge: 'Native & Hybrid',
    subServices: [
      'iOS & Android Native Mobile Code',
      'Flutter & React Native Cross-Platform',
      'Offline Storage & SQLite Synchronization',
      'App Store & Google Play Publishing'
    ],
    fullDesc: 'High-performance mobile applications engineered with smooth 60fps animations, hardware integration, offline database caching, and secure API bridges.'
  },
  {
    id: 'ecommerce',
    icon: ShoppingBag,
    title: 'Ecommerce Management',
    tagline: 'Shopify, WooCommerce, Product Listings & Inventory',
    color: '#34d399',
    badge: 'High Conversion',
    subServices: [
      'Headless Shopify & WooCommerce Stores',
      'Product Listing & ERP Inventory Sync',
      'Automated 1-Click Payment Gateways',
      'Conversion Rate Optimization (CRO)'
    ],
    fullDesc: 'Scale your online store with customized headless e-commerce architecture, fast checkout flows, automated stock management, and Stripe payments.'
  },
  {
    id: 'marketing',
    icon: Megaphone,
    title: 'Digital Marketing & Ads',
    tagline: 'SEO, Google Ads, Meta Ads (FB/IG) & Retargeting',
    color: '#f59e0b',
    badge: 'High ROI',
    subServices: [
      'Search Engine Optimization (SEO Audit)',
      'Google Ads (PPC Campaigns)',
      'Meta Ads (Facebook & Instagram Funnels)',
      'Retargeting & Influencer Campaigns'
    ],
    fullDesc: 'Targeted PPC campaigns, technical SEO audits, Meta ad funnels, and conversion rate optimization designed to generate leads and boost revenue.'
  },
  {
    id: 'api-cloud',
    icon: Zap,
    title: 'API Integration & Cloud',
    tagline: 'REST/GraphQL APIs, Microservices, AWS & WebSockets',
    color: '#ec4899',
    badge: 'Enterprise',
    subServices: [
      'Custom Database & API Architecture',
      'Real-Time WebSockets & Microservices',
      'AWS / Cloudflare Edge Infrastructure',
      'Role-Based Security & OAuth Auth'
    ],
    fullDesc: 'Seamlessly connect third-party platforms, databases, and microservices with ultra-fast APIs, real-time streaming, and resilient cloud hosting.'
  },
  {
    id: 'ai-ml',
    icon: Cpu,
    title: 'AI & ML Development',
    tagline: 'OpenAI GPT-4o, Vector DBs, RAG & Smart Agents',
    color: '#3b82f6',
    badge: 'Next Gen AI',
    subServices: [
      'Custom OpenAI & Anthropic AI Workflows',
      'Vector Search Engine & Semantic Embeddings',
      'Automated AI Agents & Support Chatbots',
      'Natural Language Document Processors'
    ],
    fullDesc: 'Transform your business operations by integrating custom LLM pipelines, semantic vector search engines, and autonomous AI agents.'
  }
];

export default function ServicesSection({ onSelectService }) {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services-section" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="grid-container">
        
        {/* Section Header (Inspired by Image 2 & 3) */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="badge-cyan" style={{ marginBottom: '16px', display: 'inline-block' }}>
            Services
          </div>
          <h2 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '16px', color: '#ffffff' }}>
            Explore The <span className="gradient-text-purple">Innovative Solutions</span> We Provide
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '720px', margin: '0 auto' }}>
            Graphic Design, Web Development, Mobile Apps, AI Workflows, Ecommerce, Digital Marketing, Video Editing & Cloud Solutions — all under one roof.
          </p>
        </div>

        {/* 8 Category Grid Layout (Combines Image 2 sub-services list + Image 3 dark card layout) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '28px'
        }}>
          {COMPREHENSIVE_SERVICES.map((service) => {
            const IconComp = service.icon;
            return (
              <div 
                key={service.id} 
                className="glass-panel glass-panel-hover"
                style={{ padding: '36px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: `${service.color}15`,
                      border: `1px solid ${service.color}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComp size={28} color={service.color} />
                    </div>

                    <span style={{
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: `${service.color}15`,
                      color: service.color,
                      border: `1px solid ${service.color}30`
                    }}>
                      {service.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                    {service.title}
                  </h3>

                  <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
                    {service.tagline}
                  </p>

                  {/* Sub-services Checklist (Image 2 style) */}
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {service.subServices.map((sub, sIdx) => (
                      <li key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#e2e8f0' }}>
                        <CheckCircle size={16} color={service.color} />
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Explore More Button */}
                <button 
                  onClick={() => setSelectedService(service)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-glass)',
                    color: '#ffffff',
                    padding: '12px 18px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${service.color}20`;
                    e.currentTarget.style.borderColor = service.color;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    e.currentTarget.style.borderColor = 'var(--border-glass)';
                  }}
                >
                  Explore More
                  <ArrowRight size={16} color={service.color} />
                </button>

              </div>
            );
          })}
        </div>

      </div>

      {/* Modal Detail View */}
      {selectedService && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.88)', backdropFilter: 'blur(16px)',
          zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
        }}>
          <div className="glass-panel" style={{ maxWidth: '640px', width: '100%', padding: '36px', position: 'relative' }}>
            <button 
              onClick={() => setSelectedService(null)}
              style={{
                position: 'absolute', top: '20px', right: '20px',
                background: 'rgba(255, 255, 255, 0.1)', border: 'none',
                color: '#fff', width: '36px', height: '36px', borderRadius: '50%',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: `${selectedService.color}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <selectedService.icon size={26} color={selectedService.color} />
              </div>

              <div>
                <h3 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#ffffff' }}>
                  {selectedService.title}
                </h3>
                <span style={{ fontSize: '0.84rem', color: selectedService.color, fontWeight: 600 }}>
                  {selectedService.badge}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '1.02rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
              {selectedService.fullDesc}
            </p>

            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '0.94rem', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
                Included Service Modules:
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {selectedService.subServices.map((sub, sIdx) => (
                  <div key={sIdx} style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-glass)',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '0.86rem',
                    color: '#e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <CheckCircle size={14} color={selectedService.color} />
                    {sub}
                  </div>
                ))}
              </div>
            </div>

            <button 
              className="btn-glow-cyan"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                const title = selectedService.title;
                setSelectedService(null);
                onSelectService(title);
              }}
            >
              Configure & Estimate {selectedService.title} Project <ArrowRight size={18} />
            </button>

          </div>
        </div>
      )}

    </section>
  );
}
