import React, { useState, useEffect } from 'react';
import { ShieldCheck, Layers, Users, DollarSign, Database, Plus, RefreshCw, CheckCircle, Edit3, Save, X } from 'lucide-react';
import { fetchInquiries, fetchProjects, updateProject, updateInquiryStatus, addPortfolioItem, fetchStats } from '../services/api';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Edit Project Modal
  const [editingProject, setEditingProject] = useState(null);

  // New Portfolio Item Form
  const [newPortfolio, setNewPortfolio] = useState({
    title: '',
    category: 'Web App',
    description: '',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    tech_stack: 'React, Node.js, SQLite',
    client: '',
    metrics: '',
    demo_url: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    Promise.all([fetchProjects(), fetchInquiries(), fetchStats()])
      .then(([projRes, inqRes, statRes]) => {
        if (projRes.success) setProjects(projRes.data);
        if (inqRes.success) setInquiries(inqRes.data);
        if (statRes.success) setStats(statRes.data);
        setLoading(false);
      })
      .catch(console.error);
  };

  const handleSaveProject = () => {
    if (!editingProject) return;
    updateProject(editingProject.id, {
      progress_percent: Number(editingProject.progress_percent),
      current_phase: editingProject.current_phase,
      latest_update: editingProject.latest_update,
      target_completion: editingProject.target_completion,
      status: editingProject.status,
      amount_paid: Number(editingProject.amount_paid),
      total_cost: Number(editingProject.total_cost)
    }).then(res => {
      if (res.success) {
        setEditingProject(null);
        loadData();
      }
    });
  };

  const handleStatusChange = (inquiryId, newStatus) => {
    updateInquiryStatus(inquiryId, newStatus).then(res => {
      if (res.success) loadData();
    });
  };

  const handleAddPortfolio = (e) => {
    e.preventDefault();
    const stackArray = newPortfolio.tech_stack.split(',').map(s => s.trim());
    addPortfolioItem({
      ...newPortfolio,
      tech_stack: stackArray,
      featured: 1
    }).then(res => {
      if (res.success) {
        alert('New portfolio item saved to SQLite database!');
        setNewPortfolio({
          title: '',
          category: 'Web App',
          description: '',
          image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
          tech_stack: 'React, Node.js, SQLite',
          client: '',
          metrics: '',
          demo_url: ''
        });
        loadData();
      }
    });
  };

  return (
    <section style={{ padding: '40px 0 90px 0', minHeight: '90vh' }}>
      <div className="grid-container">
        
        {/* Admin Header */}
        <div className="glass-panel" style={{ padding: '28px 36px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <ShieldCheck size={24} color="#a78bfa" />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
                Code Craft Studio <span style={{ color: '#a78bfa' }}>Admin Hub</span>
              </h2>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
              Manage client projects, update progress %, process inquiry submissions, and inspect SQLite tables.
            </p>
          </div>

          <button className="btn-secondary" onClick={loadData}>
            <RefreshCw size={16} /> Sync Database Data
          </button>
        </div>

        {/* Stats Metrics Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Active Projects</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--cyan-glow)', marginTop: '4px' }}>
              {projects.length}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Total Inquiries Received</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a78bfa', marginTop: '4px' }}>
              {inquiries.length}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Pipeline Revenue</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
              ${(stats?.total_revenue_pipeline || 42500).toLocaleString()}
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>SQLite Database</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#34d399', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={18} /> Persistent SQL
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '28px', borderBottom: '1px solid var(--border-glass)', paddingBottom: '14px' }}>
          <button 
            onClick={() => setActiveTab('projects')}
            style={{
              background: activeTab === 'projects' ? 'rgba(0, 240, 255, 0.15)' : 'none',
              border: `1px solid ${activeTab === 'projects' ? 'var(--cyan-glow)' : 'transparent'}`,
              color: activeTab === 'projects' ? 'var(--cyan-glow)' : 'var(--text-muted)',
              padding: '8px 18px',
              borderRadius: '10px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Active Projects ({projects.length})
          </button>

          <button 
            onClick={() => setActiveTab('inquiries')}
            style={{
              background: activeTab === 'inquiries' ? 'rgba(139, 92, 246, 0.15)' : 'none',
              border: `1px solid ${activeTab === 'inquiries' ? '#8b5cf6' : 'transparent'}`,
              color: activeTab === 'inquiries' ? '#a78bfa' : 'var(--text-muted)',
              padding: '8px 18px',
              borderRadius: '10px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Inquiries ({inquiries.length})
          </button>

          <button 
            onClick={() => setActiveTab('portfolio')}
            style={{
              background: activeTab === 'portfolio' ? 'rgba(16, 185, 129, 0.15)' : 'none',
              border: `1px solid ${activeTab === 'portfolio' ? '#10b981' : 'transparent'}`,
              color: activeTab === 'portfolio' ? '#34d399' : 'var(--text-muted)',
              padding: '8px 18px',
              borderRadius: '10px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Add Portfolio Item
          </button>
        </div>

        {/* Tab 1: Active Projects List */}
        {activeTab === 'projects' && (
          <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.78rem' }}>
                  <th style={{ padding: '12px' }}>Code</th>
                  <th style={{ padding: '12px' }}>Client</th>
                  <th style={{ padding: '12px' }}>Project Name</th>
                  <th style={{ padding: '12px' }}>Progress</th>
                  <th style={{ padding: '12px' }}>Phase</th>
                  <th style={{ padding: '12px' }}>Paid / Total</th>
                  <th style={{ padding: '12px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <td style={{ padding: '16px 12px', fontWeight: 700, color: 'var(--cyan-glow)' }}>{p.tracking_code}</td>
                    <td style={{ padding: '16px 12px' }}>
                      <div style={{ fontWeight: 600, color: '#ffffff' }}>{p.client_name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{p.client_email}</div>
                    </td>
                    <td style={{ padding: '16px 12px', fontWeight: 600, color: '#ffffff' }}>{p.project_name}</td>
                    <td style={{ padding: '16px 12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', width: '80px', overflow: 'hidden' }}>
                          <div style={{ width: `${p.progress_percent}%`, height: '100%', background: '#00f0ff' }}></div>
                        </div>
                        <span style={{ fontWeight: 700, color: '#ffffff' }}>{p.progress_percent}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <span className="badge-purple">{p.current_phase}</span>
                    </td>
                    <td style={{ padding: '16px 12px', fontWeight: 600, color: '#34d399' }}>
                      ${p.amount_paid?.toLocaleString()} / ${p.total_cost?.toLocaleString()}
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <button 
                        onClick={() => setEditingProject(p)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid var(--border-glass)',
                          color: '#ffffff',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '0.82rem',
                          fontWeight: 600
                        }}
                      >
                        <Edit3 size={14} /> Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Inquiries Queue */}
        {activeTab === 'inquiries' && (
          <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.78rem' }}>
                  <th style={{ padding: '12px' }}>Code</th>
                  <th style={{ padding: '12px' }}>Client</th>
                  <th style={{ padding: '12px' }}>Type</th>
                  <th style={{ padding: '12px' }}>Budget</th>
                  <th style={{ padding: '12px' }}>Description</th>
                  <th style={{ padding: '12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map(inq => (
                  <tr key={inq.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <td style={{ padding: '16px 12px', fontWeight: 700, color: 'var(--cyan-glow)' }}>{inq.tracking_code}</td>
                    <td style={{ padding: '16px 12px' }}>
                      <div style={{ fontWeight: 600, color: '#ffffff' }}>{inq.client_name}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{inq.client_email}</div>
                    </td>
                    <td style={{ padding: '16px 12px', color: '#ffffff' }}>{inq.project_type}</td>
                    <td style={{ padding: '16px 12px', fontWeight: 600, color: '#34d399' }}>{inq.estimated_budget}</td>
                    <td style={{ padding: '16px 12px', color: 'var(--text-muted)', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {inq.description || 'No description provided.'}
                    </td>
                    <td style={{ padding: '16px 12px' }}>
                      <select 
                        value={inq.status}
                        onChange={e => handleStatusChange(inq.id, e.target.value)}
                        style={{
                          background: '#0f172a',
                          border: '1px solid var(--border-glass)',
                          color: '#ffffff',
                          padding: '6px 10px',
                          borderRadius: '8px',
                          fontSize: '0.82rem'
                        }}
                      >
                        <option value="New">New</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Add Portfolio Item */}
        {activeTab === 'portfolio' && (
          <div className="glass-panel" style={{ maxWidth: '700px', margin: '0 auto', padding: '36px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '20px' }}>
              Add Portfolio Showcase Item
            </h3>
            <form onSubmit={handleAddPortfolio} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ fontSize: '0.88rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Project Title</label>
                <input 
                  type="text" 
                  required
                  value={newPortfolio.title}
                  onChange={e => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
                  placeholder="e.g. Nova Pay Fintech Mobile App"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.88rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Category</label>
                  <select 
                    value={newPortfolio.category}
                    onChange={e => setNewPortfolio({ ...newPortfolio, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: '#0f172a', border: '1px solid var(--border-glass)', color: '#fff' }}
                  >
                    <option value="Web App">Web App</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="AI & Cloud">AI & Cloud</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.88rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Client Name</label>
                  <input 
                    type="text"
                    value={newPortfolio.client}
                    onChange={e => setNewPortfolio({ ...newPortfolio, client: e.target.value })}
                    placeholder="e.g. Nova Financial Ltd"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: '#fff' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.88rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Tech Stack (comma separated)</label>
                <input 
                  type="text" 
                  value={newPortfolio.tech_stack}
                  onChange={e => setNewPortfolio({ ...newPortfolio, tech_stack: e.target.value })}
                  placeholder="React, Node.js, SQLite, Tailwind"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.88rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Description</label>
                <textarea 
                  rows={3}
                  value={newPortfolio.description}
                  onChange={e => setNewPortfolio({ ...newPortfolio, description: e.target.value })}
                  placeholder="Summary of what was built..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: '#fff', fontFamily: 'inherit' }}
                />
              </div>

              <button type="submit" className="btn-glow-cyan" style={{ justifyContent: 'center' }}>
                <Plus size={18} /> Save Portfolio Project to SQLite
              </button>
            </form>
          </div>
        )}

        {/* Modal: Edit Project Workflow */}
        {editingProject && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)',
            zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
          }}>
            <div className="glass-panel" style={{ maxWidth: '600px', width: '100%', padding: '36px', position: 'relative' }}>
              <button 
                onClick={() => setEditingProject(null)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>

              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginBottom: '20px' }}>
                Update Workflow: {editingProject.tracking_code}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.88rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                    Progress Percentage: <strong style={{ color: 'var(--cyan-glow)' }}>{editingProject.progress_percent}%</strong>
                  </label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={editingProject.progress_percent}
                    onChange={e => setEditingProject({ ...editingProject, progress_percent: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.88rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Current Phase</label>
                  <select 
                    value={editingProject.current_phase}
                    onChange={e => setEditingProject({ ...editingProject, current_phase: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#0f172a', border: '1px solid var(--border-glass)', color: '#fff' }}
                  >
                    <option value="Discovery">Discovery</option>
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="QA & Testing">QA & Testing</option>
                    <option value="Deployment">Deployment</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.88rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Latest Developer Dispatch Update Note</label>
                  <textarea 
                    rows={3}
                    value={editingProject.latest_update}
                    onChange={e => setEditingProject({ ...editingProject, latest_update: e.target.value })}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: '#fff', fontFamily: 'inherit' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.88rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Total Cost ($)</label>
                    <input 
                      type="number"
                      value={editingProject.total_cost}
                      onChange={e => setEditingProject({ ...editingProject, total_cost: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.88rem', color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>Amount Paid ($)</label>
                    <input 
                      type="number"
                      value={editingProject.amount_paid}
                      onChange={e => setEditingProject({ ...editingProject, amount_paid: e.target.value })}
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', color: '#fff' }}
                    />
                  </div>
                </div>

                <button className="btn-glow-cyan" onClick={handleSaveProject} style={{ justifyContent: 'center', marginTop: '10px' }}>
                  <Save size={18} /> Save & Publish to Client Portal
                </button>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
