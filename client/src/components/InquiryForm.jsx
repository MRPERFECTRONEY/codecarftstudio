import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, Sparkles, Copy, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitInquiry } from '../services/api';

export default function InquiryForm({ initialData = null, onNavigateTracker }) {
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    company_name: '',
    project_type: 'Full Stack Web App',
    estimated_budget: '$5,000 - $15,000',
    estimated_timeline: '4 - 6 Weeks',
    selected_features: [],
    description: ''
  });

  const [submittedCode, setSubmittedCode] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        project_type: initialData.project_type || prev.project_type,
        estimated_budget: initialData.estimated_budget || prev.estimated_budget,
        estimated_timeline: initialData.estimated_timeline || prev.estimated_timeline,
        selected_features: initialData.selected_features || prev.selected_features
      }));
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.client_name || !formData.client_email) {
      alert('Please enter your name and email address.');
      return;
    }

    setSubmitting(true);
    submitInquiry(formData)
      .then(res => {
        if (res.success) {
          setSubmittedCode(res.tracking_code);
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
        setSubmitting(false);
      })
      .catch(err => {
        console.error(err);
        alert('Submission failed. Please check network connection.');
        setSubmitting(false);
      });
  };

  const copyTrackingCode = () => {
    if (submittedCode) {
      navigator.clipboard.writeText(submittedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="inquiry-section" style={{ padding: '90px 0', position: 'relative' }}>
      <div className="bg-glow-orb-2"></div>

      <div className="grid-container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div className="badge-purple" style={{ marginBottom: '14px', display: 'inline-block' }}>
            Start Your Project
          </div>
          <h2 style={{ fontSize: '2.6rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px' }}>
            Ready to Build Your <span className="gradient-text">Next Application?</span>
          </h2>
          <p style={{ fontSize: '1.08rem', color: 'var(--text-muted)', maxWidth: '640px', margin: '0 auto' }}>
            Fill out your project requirements below. Our engineering leads will review your specs and respond with a formal technical proposal within 24 hours.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass-panel" style={{ maxWidth: '820px', margin: '0 auto', padding: '44px' }}>
          
          {submittedCode ? (
            /* Success State */
            <div style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '2px solid #10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px auto',
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)'
              }}>
                <CheckCircle2 size={44} color="#34d399" />
              </div>

              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
                Proposal Request Received!
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 32px auto' }}>
                Your project specification has been persisted to our database. Your unique tracking code is generated below:
              </p>

              {/* Generated Tracking Code Box */}
              <div style={{
                background: 'rgba(0, 240, 255, 0.08)',
                border: '1px dashed rgba(0, 240, 255, 0.4)',
                padding: '24px',
                borderRadius: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '36px'
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Your Project Tracking Code</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--cyan-glow)', letterSpacing: '0.05em' }}>{submittedCode}</div>
                </div>

                <button 
                  onClick={copyTrackingCode}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    color: '#ffffff',
                    padding: '10px 16px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.88rem',
                    fontWeight: 600
                  }}
                >
                  <Copy size={16} />
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>

              <div>
                <button 
                  className="btn-glow-cyan"
                  onClick={() => onNavigateTracker(submittedCode)}
                >
                  View Live Status in Client Tracker <ArrowRight size={18} />
                </button>
              </div>

            </div>
          ) : (
            /* Inquiry Form */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Row 1: Name & Email */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
                    Full Name *
                  </label>
                  <input 
                    type="text"
                    required
                    value={formData.client_name}
                    onChange={e => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-glass)',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
                    Business Email *
                  </label>
                  <input 
                    type="email"
                    required
                    value={formData.client_email}
                    onChange={e => setFormData({ ...formData, client_email: e.target.value })}
                    placeholder="alex@yourcompany.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-glass)',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Phone & Company */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
                    Phone Number
                  </label>
                  <input 
                    type="text"
                    value={formData.client_phone}
                    onChange={e => setFormData({ ...formData, client_phone: e.target.value })}
                    placeholder="+1 (555) 000-1234"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-glass)',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
                    Company / Organization Name
                  </label>
                  <input 
                    type="text"
                    value={formData.company_name}
                    onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                    placeholder="Acme Corp"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-glass)',
                      color: '#ffffff',
                      fontSize: '0.95rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
                  Primary Project Type *
                </label>
                <select 
                  value={formData.project_type}
                  onChange={e => setFormData({ ...formData, project_type: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: '#0f172a',
                    border: '1px solid var(--border-glass)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                >
                  <option value="Full Stack Web App">Full Stack Web App</option>
                  <option value="Mobile App (iOS/Android)">Mobile App (iOS/Android)</option>
                  <option value="AI Integration & Automation">AI Integration & Automation</option>
                  <option value="Enterprise SaaS Cloud Platform">Enterprise SaaS Cloud Platform</option>
                  <option value="Headless E-Commerce">Headless E-Commerce Store</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
                  Project Description & Requirements Summary
                </label>
                <textarea 
                  rows={4}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your vision, key goals, target audience, or any technical integrations required..."
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid var(--border-glass)',
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    outline: 'none',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={submitting}
                style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.05rem', marginTop: '10px' }}
              >
                {submitting ? 'Persisting to Database...' : 'Submit Project Proposal Request'}
                <Send size={18} />
              </button>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
