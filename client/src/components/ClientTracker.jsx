import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, Clock, AlertCircle, ShieldCheck, DollarSign, Calendar, RefreshCw } from 'lucide-react';
import { trackProject } from '../services/api';
import { formatPrice } from '../services/currency';

export default function ClientTracker({ defaultCode = '', currency = 'INR' }) {
  const [searchCode, setSearchCode] = useState(defaultCode || '');
  const [projectData, setProjectData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (defaultCode) handleSearch(defaultCode);
  }, [defaultCode]);

  const handleSearch = (codeToSearch) => {
    const query = codeToSearch || searchCode;
    if (!query.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setProjectData(null);

    trackProject(query)
      .then(res => {
        if (res.success) {
          setProjectData(res.data);
        } else {
          setErrorMsg(res.error || 'No project found matching code');
        }
        setLoading(false);
      })
      .catch(err => {
        setErrorMsg('Failed to connect to tracker server.');
        setLoading(false);
      });
  };

  return (
    <section id="tracker-section" style={{ padding: '80px 0', minHeight: '80vh', position: 'relative' }}>
      <div className="bg-glow-orb-1"></div>

      <div className="grid-container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge-cyan" style={{ marginBottom: '14px', display: 'inline-block' }}>
            Real-Time Client Dashboard ({currency === 'INR' ? '🇮🇳 ₹ INR' : '🌐 $ USD'})
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '14px' }}>
            Track Your <span className="gradient-text-purple">Project Delivery Status</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '620px', margin: '0 auto' }}>
            Enter the private tracking code shared by our team to view your project milestones, progress, and latest update.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ maxWidth: '600px', margin: '0 auto 48px auto' }}>
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSearch(searchCode); }}
            style={{ display: 'flex', gap: '12px' }}
          >
            <div style={{ position: 'relative', flex: 1 }}>
              <input 
                type="text"
                value={searchCode}
                onChange={e => setSearchCode(e.target.value)}
                placeholder="Enter your private tracking code…"
                style={{
                  width: '100%',
                  padding: '16px 20px 16px 48px',
                  borderRadius: '12px',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(0, 240, 255, 0.3)',
                  color: '#ffffff',
                  fontSize: '1rem',
                  outline: 'none',
                  boxShadow: '0 0 20px rgba(0, 240, 255, 0.1)'
                }}
              />
              <Search size={20} color="var(--cyan-glow)" style={{ position: 'absolute', left: '16px', top: '18px' }} />
            </div>

            <button type="submit" className="btn-glow-cyan" disabled={loading}>
              {loading ? <RefreshCw size={18} className="animate-spin" /> : <Search size={18} />}
              Track
            </button>
          </form>

          <p style={{textAlign:'center',marginTop:14,fontSize:'0.82rem',color:'var(--text-muted)'}}>For privacy, email addresses and sample demo codes cannot be used to access project records.</p>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto 30px auto', padding: '20px', borderLeft: '4px solid #ef4444', color: '#fca5a5', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertCircle size={20} color="#ef4444" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Tracking Details View */}
        {projectData && (
          <div className="glass-panel" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px' }}>
            
            {/* Top Bar Info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '32px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '24px' }}>
              <div>
                <span className="badge-cyan" style={{ marginBottom: '8px', display: 'inline-block' }}>
                  Code: {projectData.tracking_code}
                </span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
                  {projectData.project_name}
                </h3>
                <div style={{ fontSize: '0.94rem', color: 'var(--text-muted)' }}>
                  Project tracking details
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Current Phase</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--cyan-glow)' }}>
                  {projectData.current_phase}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#34d399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', marginTop: '4px' }}>
                  <Calendar size={14} />
                  Target: {projectData.target_completion}
                </div>
              </div>
            </div>

            {/* Progress Bar Header */}
            <div style={{ marginBottom: '36px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>Overall Completion</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--cyan-glow)' }}>{projectData.progress_percent}%</span>
              </div>

              <div style={{ width: '100%', height: '14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden', position: 'relative' }}>
                <div style={{
                  width: `${projectData.progress_percent}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #00f0ff 0%, #3b82f6 50%, #8b5cf6 100%)',
                  borderRadius: '10px',
                  transition: 'width 0.8s ease',
                  boxShadow: '0 0 15px rgba(0, 240, 255, 0.6)'
                }}></div>
              </div>
            </div>

            {/* Developer Latest Note */}
            {projectData.latest_update && (
              <div style={{
                background: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '36px'
              }}>
                <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} /> Latest Developer Dispatch Update
                </div>
                <div style={{ fontSize: '0.98rem', color: '#f1f5f9', lineHeight: 1.6 }}>
                  "{projectData.latest_update}"
                </div>
              </div>
            )}

            {/* Milestones Stepper */}
            <div style={{ marginBottom: '36px' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '20px' }}>
                Project Deliverable Milestones
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {(projectData.milestones || []).map((m, idx) => {
                  const isDone = m.status === 'Completed';
                  const isInProgress = m.status === 'In Progress';
                  return (
                    <div 
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        borderRadius: '12px',
                        background: isDone ? 'rgba(16, 185, 129, 0.06)' : isInProgress ? 'rgba(0, 240, 255, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                        border: `1px solid ${isDone ? 'rgba(16, 185, 129, 0.25)' : isInProgress ? 'rgba(0, 240, 255, 0.25)' : 'var(--border-glass)'}`
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: isDone ? '#10b981' : isInProgress ? '#00f0ff' : 'rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#07090e',
                          fontWeight: 700,
                          fontSize: '0.88rem'
                        }}>
                          {isDone ? <CheckCircle2 size={18} color="#07090e" /> : idx + 1}
                        </div>

                        <div>
                          <div style={{ fontSize: '0.96rem', fontWeight: 600, color: isDone ? '#ffffff' : isInProgress ? 'var(--cyan-glow)' : 'var(--text-muted)' }}>
                            {m.name}
                          </div>
                          {m.date && <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Target/Done: {m.date}</div>}
                        </div>
                      </div>

                      <span style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        padding: '4px 12px',
                        borderRadius: '12px',
                        background: isDone ? 'rgba(16, 185, 129, 0.15)' : isInProgress ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                        color: isDone ? '#34d399' : isInProgress ? 'var(--cyan-glow)' : 'var(--text-muted)'
                      }}>
                        {m.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Financial Summary formatted in INR ₹ or USD $ */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '20px',
              borderRadius: '12px'
            }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Agreed Total Budget</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>
                  {formatPrice(projectData.total_cost || 0, currency)}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Amount Paid</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#34d399' }}>
                  {formatPrice(projectData.amount_paid || 0, currency)}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Remaining Balance</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f43f5e' }}>
                  {formatPrice(Math.max(0, (Number(projectData.total_cost) || 0) - (Number(projectData.amount_paid) || 0)), currency)}
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
