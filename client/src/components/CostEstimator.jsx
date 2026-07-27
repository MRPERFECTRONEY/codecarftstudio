import React, { useState, useEffect } from 'react';
import { Calculator, Check, Sparkles, Clock, DollarSign, ArrowRight, Layers } from 'lucide-react';
import { calculateEstimate } from '../services/api';
import { formatPrice } from '../services/currency';

const PROJECT_TYPES = [
  'Full Stack Web App',
  'Mobile App',
  'AI & Automation',
  'Enterprise SaaS'
];

const AVAILABLE_FEATURES = [
  'User Authentication & Roles',
  'Stripe / Razorpay Payment Integration',
  'Real-time Chat / WebSockets',
  'Admin Control Dashboard',
  'AI Chatbot / Vector DB Integration',
  'Custom Database & API Architecture',
  'Multi-language i18n',
  'Push Notifications & Automated Email Flows'
];

const DESIGN_TIERS = [
  'Standard Modern',
  'Custom Glassmorphic & 3D Visuals',
  'High-End Interactive Micro-animations'
];

export default function CostEstimator({ onApplyEstimate, currency = 'INR' }) {
  const [projectType, setProjectType] = useState('Full Stack Web App');
  const [selectedFeatures, setSelectedFeatures] = useState([
    'User Authentication & Roles',
    'Custom Database & API Architecture',
    'Admin Control Dashboard'
  ]);
  const [designTier, setDesignTier] = useState('Custom Glassmorphic & 3D Visuals');
  const [rawEstimate, setRawEstimate] = useState({ min: 5500, max: 8500, timeline: '4 - 6 Weeks' });

  useEffect(() => {
    recalculate();
  }, [projectType, selectedFeatures, designTier]);

  const toggleFeature = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const recalculate = () => {
    calculateEstimate({
      project_type: projectType,
      features: selectedFeatures,
      design_complexity: designTier
    }).then(res => {
      if (res.success && res.data) {
        // Parse min and max numeric values from backend
        const minVal = parseInt((res.data.estimated_budget_min || '5000').replace(/\D/g, ''), 10) || 5000;
        const maxVal = parseInt((res.data.estimated_budget_max || '8500').replace(/\D/g, ''), 10) || 8500;
        setRawEstimate({
          min: minVal,
          max: maxVal,
          timeline: res.data.estimated_timeline || '4 - 6 Weeks'
        });
      }
    }).catch(console.error);
  };

  const minFormatted = formatPrice(rawEstimate.min, currency);
  const maxFormatted = formatPrice(rawEstimate.max, currency);

  return (
    <section id="estimator-section" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="bg-glow-orb-3"></div>

      <div className="grid-container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge-purple" style={{ marginBottom: '16px', display: 'inline-block' }}>
            Instant Pricing Estimator ({currency === 'INR' ? '🇮🇳 ₹ INR' : '🌐 $ USD'})
          </div>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 800, marginBottom: '14px', color: '#ffffff' }}>
            Calculate Your <span className="gradient-text-cyan">Project Budget & Timeline</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto' }}>
            Get an instant transparent estimate tailored to your exact tech requirements in {currency === 'INR' ? 'Indian Rupees (₹)' : 'US Dollars ($)'}.
          </p>
        </div>

        {/* Calculator Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>
          
          {/* Controls Column */}
          <div className="glass-panel" style={{ padding: '36px' }}>
            
            {/* 1. Project Type */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0', display: 'block', marginBottom: '12px' }}>
                1. Select Platform & Service Type
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {PROJECT_TYPES.map(type => (
                  <button
                    key={type}
                    onClick={() => setProjectType(type)}
                    style={{
                      background: projectType === type ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${projectType === type ? 'var(--cyan-glow)' : 'var(--border-glass)'}`,
                      color: projectType === type ? 'var(--cyan-glow)' : 'var(--text-muted)',
                      padding: '12px 14px',
                      borderRadius: '10px',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Select Features */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0', display: 'block', marginBottom: '12px' }}>
                2. Select Core Features Needed
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {AVAILABLE_FEATURES.map(feat => {
                  const isChecked = selectedFeatures.includes(feat);
                  return (
                    <div
                      key={feat}
                      onClick={() => toggleFeature(feat)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: isChecked ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                        border: `1px solid ${isChecked ? '#3b82f6' : 'var(--border-glass)'}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <span style={{ fontSize: '0.9rem', color: isChecked ? '#ffffff' : 'var(--text-muted)', fontWeight: isChecked ? 600 : 400 }}>
                        {feat}
                      </span>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '6px',
                        background: isChecked ? '#3b82f6' : 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isChecked && <Check size={14} color="#ffffff" strokeWidth={3} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Design Tier */}
            <div>
              <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e2e8f0', display: 'block', marginBottom: '12px' }}>
                3. UI/UX Polish & Visual Complexity
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {DESIGN_TIERS.map(tier => (
                  <button
                    key={tier}
                    onClick={() => setDesignTier(tier)}
                    style={{
                      background: designTier === tier ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: `1px solid ${designTier === tier ? '#8b5cf6' : 'var(--border-glass)'}`,
                      color: designTier === tier ? '#a78bfa' : 'var(--text-muted)',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Summary Card */}
          <div className="glass-panel" style={{
            padding: '40px',
            position: 'sticky',
            top: '100px',
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.7) 100%)',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            boxShadow: '0 20px 60px rgba(0, 240, 255, 0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
              <Calculator size={24} color="var(--cyan-glow)" />
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                Estimated Investment ({currency})
              </h3>
            </div>

            {/* Estimated Price Range in INR ₹ or USD $ */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '24px',
              borderRadius: '14px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              marginBottom: '28px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '6px' }}>
                Estimated Budget Range ({currency === 'INR' ? 'Indian Rupees' : 'US Dollars'})
              </div>
              <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#ffffff' }}>
                <span>{minFormatted} - {maxFormatted}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '14px', color: '#34d399', fontSize: '0.95rem', fontWeight: 600 }}>
                <Clock size={16} />
                <span>Estimated Time: {rawEstimate.timeline}</span>
              </div>
            </div>

            {/* Breakdown details */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#cbd5e1', marginBottom: '12px' }}>
                Included Scope Breakdown:
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem', color: 'var(--text-muted)' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Base Service ({projectType})</span>
                  <span style={{ color: '#ffffff', fontWeight: 600 }}>Included</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Selected Features ({selectedFeatures.length})</span>
                  <span style={{ color: '#ffffff', fontWeight: 600 }}>{selectedFeatures.length} Modules</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>UI Design Polish</span>
                  <span style={{ color: 'var(--cyan-glow)', fontWeight: 600 }}>{designTier.split(' ')[0]}</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>SQLite Database Engine</span>
                  <span style={{ color: '#34d399', fontWeight: 600 }}>Free Included</span>
                </li>
              </ul>
            </div>

            <button 
              className="btn-glow-cyan" 
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => onApplyEstimate({
                project_type: projectType,
                estimated_budget: `${minFormatted} - ${maxFormatted}`,
                estimated_timeline: rawEstimate.timeline,
                selected_features: selectedFeatures
              })}
            >
              Apply to Quote Proposal <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}
