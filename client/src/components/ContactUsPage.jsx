import React, { useState } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, Copy, 
  HelpCircle, ChevronDown, Sparkles, ShieldCheck, ArrowRight 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitInquiry } from '../services/api';

const FAQS = [
  {
    q: 'What is your typical project delivery turnaround time?',
    a: 'Most web and mobile application projects are delivered in 3 to 6 weeks, structured into milestone phases (Discovery & Wireframes, Backend Architecture, Frontend Build, QA & Deployment).'
  },
  {
    q: 'Do you sign Non-Disclosure Agreements (NDAs) before discussion?',
    a: 'Yes, absolutely. We sign mutual NDAs prior to reviewing proprietary business specifications or intellectual property.'
  },
  {
    q: 'Will I own 100% of the source code and databases?',
    a: 'Yes! Upon completion and final handover, you own 100% of all source code repositories, IP rights, database schemas, and cloud deployment credentials.'
  },
  {
    q: 'How does your real-time Client Project Tracker work?',
    a: 'Once your project proposal is initiated, you receive a unique tracking code (e.g. CCS-98421). You can input this code anytime into our Client Tracker portal to view real-time progress percentages, milestone checklists, and developer updates.'
  },
  {
    q: 'Do you provide post-launch maintenance and support?',
    a: 'Yes, we provide 60 days of free post-launch support and offer flexible ongoing maintenance retainers for feature updates, security patches, and cloud scaling.'
  }
];

export default function ContactUsPage({ currency = 'INR' }) {
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    client_phone: '',
    company_name: '',
    project_type: 'Full Stack Web App',
    estimated_budget: currency === 'INR' ? '₹4,25,000 - ₹12,75,000' : '$5,000 - $15,000',
    estimated_timeline: '4 - 6 Weeks',
    selected_features: [],
    description: ''
  });

  const [submittedCode, setSubmittedCode] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.client_name || !formData.client_email) {
      alert('Please fill in your name and email address.');
      return;
    }

    setSubmitting(true);
    submitInquiry(formData)
      .then(res => {
        if (res.success) {
          setSubmittedCode(res.tracking_code);
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
        setSubmitting(false);
      })
      .catch(err => {
        console.error(err);
        alert('Submission failed. Please check network connection.');
        setSubmitting(false);
      });
  };

  const copyCode = () => {
    if (submittedCode) {
      navigator.clipboard.writeText(submittedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ paddingTop: '40px', paddingBottom: '90px', position: 'relative' }}>
      <div className="bg-glow-orb-1"></div>
      <div className="bg-glow-orb-3"></div>

      <div className="grid-container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="badge-purple" style={{ marginBottom: '16px', display: 'inline-block' }}>
            Get In Touch
          </div>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
            Let's Build Your <span className="gradient-text-cyan">Next Software Solution</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '680px', margin: '0 auto' }}>
            Have a project requirement or technical question? Fill out the proposal request below or contact our Indian agency headquarters directly.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '60px'
        }}>
          <div className="glass-panel" style={{ padding: '24px 20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '12px',
              background: 'rgba(0, 240, 255, 0.12)', border: '1px solid rgba(0, 240, 255, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <MapPin size={20} color="var(--cyan-glow)" />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Agency HQ</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginTop: '4px', wordBreak: 'break-word' }}>
                139-140 Govind Nagar 2nd Gokulpura Jaipur Rajasthan 302012
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px 20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '12px',
              background: 'rgba(139, 92, 246, 0.12)', border: '1px solid rgba(139, 92, 246, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <Phone size={20} color="#a78bfa" />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Direct Call / WhatsApp</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginTop: '4px', wordBreak: 'break-word' }}>
                +91-8239009909
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px 20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <Mail size={20} color="#34d399" />
            </div>
            <div style={{ overflow: 'hidden', minWidth: 0 }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Email Support</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#ffffff', marginTop: '4px', wordBreak: 'break-all', overflowWrap: 'anywhere' }}>
                admin.codecraftstudio@gmail.com
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px 20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <Clock size={20} color="#fbbf24" />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Agency Leadership</div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginTop: '4px', wordBreak: 'break-word' }}>
                Roshan Yadav (Owner & Lead)
              </div>
            </div>
          </div>
        </div>

        {/* Contact Proposal Form (Saves to real SQLite DB) */}
        <div className="glass-panel" style={{ maxWidth: '840px', margin: '0 auto 80px auto', padding: '44px' }}>
          {submittedCode ? (
            /* Success State */
            <div style={{ textAlign: 'center', padding: '30px 20px' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)', border: '2px solid #10b981',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 24px auto', boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)'
              }}>
                <CheckCircle2 size={44} color="#34d399" />
              </div>

              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '12px' }}>
                Inquiry Submitted & Saved to Database!
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 32px auto' }}>
                Your project proposal specification has been recorded into our SQLite database. Use your unique code below to track status:
              </p>

              <div style={{
                background: 'rgba(0, 240, 255, 0.08)',
                border: '1px dashed rgba(0, 240, 255, 0.4)',
                padding: '24px', borderRadius: '16px',
                display: 'inline-flex', alignItems: 'center', gap: '16px', marginBottom: '36px'
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Your Tracking Code</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--cyan-glow)' }}>{submittedCode}</div>
                </div>

                <button 
                  onClick={copyCode}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)', border: 'none',
                    color: '#ffffff', padding: '10px 16px', borderRadius: '10px',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                    fontSize: '0.88rem', fontWeight: 600
                  }}
                >
                  <Copy size={16} />
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                  Submit Technical Proposal Request
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Our lead engineering architects will evaluate your project specs and respond within 24 hours.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
                    Full Name *
                  </label>
                  <input 
                    type="text" required
                    value={formData.client_name}
                    onChange={e => setFormData({ ...formData, client_name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-glass)', color: '#ffffff', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
                    Email Address *
                  </label>
                  <input 
                    type="email" required
                    value={formData.client_email}
                    onChange={e => setFormData({ ...formData, client_email: e.target.value })}
                    placeholder="rahul@company.com"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-glass)', color: '#ffffff', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
                    Phone Number
                  </label>
                  <input 
                    type="text"
                    value={formData.client_phone}
                    onChange={e => setFormData({ ...formData, client_phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-glass)', color: '#ffffff', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
                    Company / Business Name
                  </label>
                  <input 
                    type="text"
                    value={formData.company_name}
                    onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                    placeholder="Acme Tech India"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-glass)', color: '#ffffff', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
                  Primary Discipline Required *
                </label>
                <select 
                  value={formData.project_type}
                  onChange={e => setFormData({ ...formData, project_type: e.target.value })}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: '#0f172a', border: '1px solid var(--border-glass)', color: '#ffffff', outline: 'none' }}
                >
                  <option value="Full Stack Web App">Full Stack Web App</option>
                  <option value="Mobile App (iOS/Android/Flutter)">Mobile App (iOS/Android/Flutter)</option>
                  <option value="AI Integration & Automation">AI Integration & Automation</option>
                  <option value="Enterprise SaaS Cloud Platform">Enterprise SaaS Cloud Platform</option>
                  <option value="Headless E-Commerce">Headless E-Commerce Store</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '8px' }}>
                  Project Description & Requirements
                </label>
                <textarea 
                  rows={4}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your project vision, target audience, core feature requirements, or timeline expectations..."
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-glass)', color: '#ffffff', outline: 'none', fontFamily: 'inherit' }}
                />
              </div>

              <button 
                type="submit" 
                className="btn-glow-cyan" 
                disabled={submitting}
                style={{ justifyContent: 'center', padding: '16px', fontSize: '1.05rem', marginTop: '10px' }}
              >
                {submitting ? 'Persisting to SQLite Database...' : 'Submit Proposal Request'}
                <Send size={18} />
              </button>
            </form>
          )}
        </div>

        {/* FAQ Section */}
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="badge-cyan" style={{ marginBottom: '14px', display: 'inline-block' }}>
              Common Questions
            </div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="glass-panel"
                  style={{ padding: '20px 24px', cursor: 'pointer' }}
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '1.08rem', fontWeight: 700, color: '#ffffff' }}>
                      {faq.q}
                    </h4>
                    <ChevronDown size={18} color="var(--cyan-glow)" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
                  </div>

                  {isOpen && (
                    <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', marginTop: '14px', lineHeight: 1.6 }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
