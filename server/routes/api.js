import express from 'express';
import crypto from 'node:crypto';
import { queryAll, queryOne, executeRun } from '../database.js';
import { issueAdminToken, requireAdmin, verifyAdminCredentials } from '../auth.js';
import { sendInquiryNotificationEmail } from '../email.js';

const router = express.Router();
const safeJson = (value, fallback = []) => { try { return typeof value === 'string' ? JSON.parse(value) : (value ?? fallback); } catch { return fallback; } };
const clean = (value, max = 2000) => String(value ?? '').trim().slice(0, max);
const validEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch((error) => {
  console.error('[API]', error);
  res.status(500).json({ success: false, error: 'An unexpected server error occurred.' });
});

router.get('/health', asyncRoute(async (_req, res) => {
  await queryOne('SELECT 1 AS ok');
  res.json({ status: 'online', agency: 'CodeCraft Studio', database: 'PostgreSQL', timestamp: new Date().toISOString() });
}));

router.post('/admin/login', asyncRoute(async (req, res) => {
  const email = clean(req.body?.email, 254);
  const password = String(req.body?.password ?? '');
  if (!verifyAdminCredentials(email, password)) return res.status(401).json({ success: false, error: 'Invalid email or password.' });
  res.json({ success: true, token: issueAdminToken(), expiresIn: 28800 });
}));

router.get('/stats', asyncRoute(async (_req, res) => {
  const stats = await queryOne('SELECT total_projects_delivered, active_clients, client_satisfaction, avg_turnaround FROM agency_stats WHERE id = 1') || {};
  const totalInquiries = (await queryOne('SELECT COUNT(*)::int AS count FROM inquiries'))?.count || 0;
  const activeProjects = (await queryOne("SELECT COUNT(*)::int AS count FROM projects WHERE status = 'Active'"))?.count || 0;
  res.json({ success: true, data: { ...stats, total_inquiries: totalInquiries, active_projects_count: activeProjects } });
}));

router.get('/portfolio', asyncRoute(async (_req, res) => {
  const items = await queryAll('SELECT * FROM portfolio ORDER BY featured DESC, id DESC');
  res.json({ success: true, data: items.map(item => ({ ...item, tech_stack: safeJson(item.tech_stack) })) });
}));
router.post('/portfolio', requireAdmin, asyncRoute(async (req, res) => {
  const { title, category, description } = req.body || {};
  if (!clean(title, 160) || !clean(category, 80) || !clean(description, 3000)) return res.status(400).json({ success: false, error: 'Title, category and description are required.' });
  const id = await executeRun('INSERT INTO portfolio (title, category, description, image_url, tech_stack, client, metrics, demo_url, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [
    clean(title,160), clean(category,80), clean(description,3000), clean(req.body.image_url,1000),
    JSON.stringify(Array.isArray(req.body.tech_stack) ? req.body.tech_stack.slice(0,20).map(x=>clean(x,60)) : []),
    clean(req.body.client,160), clean(req.body.metrics,300), clean(req.body.demo_url,1000), Boolean(req.body.featured)
  ]);
  res.status(201).json({ success: true, id });
}));

router.post('/inquiries', asyncRoute(async (req, res) => {
  const body = req.body || {};
  const client_name = clean(body.client_name,120), client_email = clean(body.client_email,254).toLowerCase(), project_type = clean(body.project_type,120);
  if (!client_name || !validEmail(client_email) || !project_type) return res.status(400).json({ success: false, error: 'A valid name, email and project type are required.' });
  const tracking_code = 'CCS-' + crypto.randomBytes(6).toString('hex').toUpperCase();
  const client_phone = clean(body.client_phone,40), company_name = clean(body.company_name,160);
  const estimated_budget = clean(body.estimated_budget,100), estimated_timeline = clean(body.estimated_timeline,100);
  const description = clean(body.description,4000);
  const features = JSON.stringify(Array.isArray(body.selected_features) ? body.selected_features.slice(0,30).map(x=>clean(x,100)) : []);
  const milestones = JSON.stringify([
    { name: 'Inquiry received', status: 'Completed', date: new Date().toISOString().slice(0,10) },
    { name: 'Discovery call & proposal', status: 'Pending', date: 'To be scheduled' },
    { name: 'Design & architecture', status: 'Pending', date: 'Pending' },
    { name: 'Development', status: 'Pending', date: 'Pending' },
    { name: 'Testing & deployment', status: 'Pending', date: 'Pending' }
  ]);
  await executeRun('INSERT INTO inquiries (tracking_code, client_name, client_email, client_phone, company_name, project_type, estimated_budget, estimated_timeline, selected_features, description, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [tracking_code,client_name,client_email,client_phone,company_name,project_type,estimated_budget,estimated_timeline,features,description,'New']);
  await executeRun('INSERT INTO projects (tracking_code, client_name, client_email, project_name, service_category, progress_percent, current_phase, total_cost, amount_paid, milestones, latest_update, target_completion, status) VALUES (?, ?, ?, ?, ?, 0, ?, 0, 0, ?, ?, ?, ?)', [tracking_code,client_name,client_email,project_type+' for '+(company_name||client_name),project_type,'Inquiry review',milestones,'We have received your inquiry. Our team will contact you after reviewing the requirements.','To be confirmed','Planning']);
  sendInquiryNotificationEmail({ tracking_code, client_name, client_email, client_phone, company_name, project_type, description }).catch(error => console.error('[EMAIL]', error));
  res.status(201).json({ success: true, message: 'Inquiry submitted successfully.', tracking_code });
}));

router.get('/inquiries', requireAdmin, asyncRoute(async (_req, res) => {
  const rows = await queryAll('SELECT * FROM inquiries ORDER BY id DESC');
  res.json({ success: true, data: rows.map(row => ({ ...row, selected_features: safeJson(row.selected_features) })) });
}));
router.put('/inquiries/:id/status', requireAdmin, asyncRoute(async (req, res) => {
  const status = clean(req.body?.status,40);
  if (!['New','Contacted','In Progress','Closed','Archived'].includes(status)) return res.status(400).json({ success:false,error:'Invalid inquiry status.' });
  const result = await executeRun('UPDATE inquiries SET status = ? WHERE id = ?', [status, req.params.id]);
  if (!result) return res.status(404).json({ success:false,error:'Inquiry not found.' });
  res.json({ success:true });
}));

// Tracking codes are unguessable access tokens. Never accept email as a lookup credential.
router.get('/projects/track/:code', asyncRoute(async (req, res) => {
  const code = clean(req.params.code,24).toUpperCase();
  if (!/^CCS-[A-F0-9]{12}$/.test(code)) return res.status(404).json({ success:false,error:'Enter the private tracking code shared by our team.' });
  const project = await queryOne('SELECT tracking_code, project_name, service_category, progress_percent, current_phase, milestones, latest_update, target_completion, status FROM projects WHERE tracking_code = ?', [code]);
  if (!project) return res.status(404).json({ success:false,error:'No project found for this tracking code.' });
  res.json({ success:true,data:{ ...project, milestones:safeJson(project.milestones) } });
}));

router.get('/projects', requireAdmin, asyncRoute(async (_req,res) => {
  const rows = await queryAll('SELECT * FROM projects ORDER BY id DESC');
  res.json({ success:true,data:rows.map(row=>({ ...row,milestones:safeJson(row.milestones) })) });
}));
router.put('/projects/:id', requireAdmin, asyncRoute(async (req,res) => {
  const id = Number(req.params.id), body = req.body || {};
  if (!Number.isInteger(id) || id < 1) return res.status(400).json({success:false,error:'Invalid project id.'});
  const current = await queryOne('SELECT * FROM projects WHERE id = ?', [id]);
  if (!current) return res.status(404).json({success:false,error:'Project not found.'});
  const progress = body.progress_percent === undefined ? current.progress_percent : Number(body.progress_percent);
  const paid = body.amount_paid === undefined ? Number(current.amount_paid) : Number(body.amount_paid);
  const cost = body.total_cost === undefined ? Number(current.total_cost) : Number(body.total_cost);
  if (!Number.isInteger(progress) || progress < 0 || progress > 100 || !Number.isFinite(paid) || paid < 0 || !Number.isFinite(cost) || cost < 0 || paid > cost) return res.status(400).json({success:false,error:'Progress or payment values are invalid.'});
  const milestones = body.milestones === undefined ? current.milestones : JSON.stringify(Array.isArray(body.milestones) ? body.milestones.slice(0,30) : []);
  await executeRun('UPDATE projects SET progress_percent=?, current_phase=?, latest_update=?, target_completion=?, status=?, milestones=?, amount_paid=?, total_cost=? WHERE id=?', [
    progress, clean(body.current_phase ?? current.current_phase,100), clean(body.latest_update ?? current.latest_update,2000),
    clean(body.target_completion ?? current.target_completion,100), clean(body.status ?? current.status,40), milestones, paid, cost, id
  ]);
  res.json({success:true,message:'Project updated.'});
}));

router.post('/estimator/calculate', asyncRoute(async (req,res) => {
  const { project_type = 'Web Development', features = [], design_complexity = 'Standard Modern' } = req.body || {};
  const base = { 'Mobile App':[6500,4], 'Full Stack Web App':[8000,5], 'AI & Automation':[7500,4], 'Enterprise SaaS':[14000,8] };
  const [baseCost,baseWeeks] = base[project_type] || [4000,3];
  const featurePrices = { 'User Authentication & Roles':[800,.5], 'Stripe Payment & Invoicing':[1200,1], 'Real-time Chat / WebSockets':[1500,1], 'Admin Control Dashboard':[1800,1], 'AI Chatbot / Vector DB Integration':[2500,1.5], 'Custom Database & API Architecture':[1500,1], 'Multi-language i18n':[700,.5], 'Push Notifications & Email Automated Flows':[900,.5] };
  const selected = Array.isArray(features) ? features.slice(0,30) : [];
  const extra = selected.reduce((sum,item)=>{const p=featurePrices[item]||[600,.5];return [sum[0]+p[0],sum[1]+p[1]];},[0,0]);
  const designExtra = design_complexity === 'Custom Glassmorphic & 3D Visuals' ? [2000,1] : design_complexity === 'High-End Interactive Micro-animations' ? [3500,1.5] : [0,0];
  const min = baseCost+extra[0]+designExtra[0], weeks=Math.ceil(baseWeeks+extra[1]+designExtra[1]);
  res.json({success:true,data:{estimated_budget_min:'$'+min.toLocaleString('en-US'),estimated_budget_max:'$'+Math.round(min*1.35).toLocaleString('en-US'),estimated_timeline:weeks+' - '+(weeks+2)+' Weeks',breakdown:{base_service:project_type,selected_features_count:selected.length,design_tier:design_complexity}}});
}));
export default router;
