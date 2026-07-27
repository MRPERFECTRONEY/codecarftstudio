import express from 'express';
import { queryAll, queryOne, executeRun } from '../database.js';

const router = express.Router();

// 1. Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    agency: 'Code Craft Studio',
    database: 'SQLite (sql.js persistent)',
    timestamp: new Date().toISOString()
  });
});

// 2. Public Agency Statistics
router.get('/stats', (req, res) => {
  try {
    const stats = queryOne("SELECT * FROM agency_stats WHERE id = 1") || {};
    const totalInquiries = queryOne("SELECT COUNT(*) as count FROM inquiries")?.count || 0;
    const activeProjects = queryOne("SELECT COUNT(*) as count FROM projects WHERE status = 'Active'")?.count || 0;
    const totalRevenuePipeline = queryOne("SELECT SUM(total_cost) as total FROM projects")?.total || 0;

    res.json({
      success: true,
      data: {
        ...stats,
        total_inquiries: totalInquiries,
        active_projects_count: activeProjects,
        total_revenue_pipeline: totalRevenuePipeline
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Portfolio Endpoints
router.get('/portfolio', (req, res) => {
  try {
    const items = queryAll("SELECT * FROM portfolio ORDER BY featured DESC, id DESC");
    const parsed = items.map(item => ({
      ...item,
      tech_stack: item.tech_stack ? JSON.parse(item.tech_stack) : []
    }));
    res.json({ success: true, data: parsed });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/portfolio', (req, res) => {
  try {
    const { title, category, description, image_url, tech_stack, client, metrics, demo_url, featured } = req.body;
    
    if (!title || !category || !description) {
      return res.status(400).json({ success: false, error: 'Title, category, and description are required.' });
    }

    const techStackJson = JSON.stringify(Array.isArray(tech_stack) ? tech_stack : []);
    const newId = executeRun(
      `INSERT INTO portfolio (title, category, description, image_url, tech_stack, client, metrics, demo_url, featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, category, description, image_url || '', techStackJson, client || '', metrics || '', demo_url || '', featured ? 1 : 0]
    );

    res.status(201).json({
      success: true,
      message: 'Portfolio item added successfully',
      id: newId
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Inquiries / Contact Form Endpoints
import { sendInquiryNotificationEmail } from '../email.js';

router.post('/inquiries', (req, res) => {
  try {
    const { client_name, client_email, client_phone, company_name, project_type, estimated_budget, estimated_timeline, selected_features, description } = req.body;

    if (!client_name || !client_email || !project_type) {
      return res.status(400).json({ success: false, error: 'Client name, email, and project type are required.' });
    }

    // Generate unique tracking code e.g. CCS-64820
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const tracking_code = `CCS-${randomDigits}`;

    const featuresJson = JSON.stringify(Array.isArray(selected_features) ? selected_features : []);

    const newId = executeRun(
      `INSERT INTO inquiries (tracking_code, client_name, client_email, client_phone, company_name, project_type, estimated_budget, estimated_timeline, selected_features, description, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New')`,
      [tracking_code, client_name, client_email, client_phone || '', company_name || '', project_type, estimated_budget || '', estimated_timeline || '', featuresJson, description || '']
    );

    // Also auto-create a project tracking record for this client inquiry so they can track progress!
    const milestones = JSON.stringify([
      { name: "Inquiry Received & Reviewing Requirements", status: "Completed", date: new Date().toISOString().split('T')[0] },
      { name: "Discovery Call & Technical Proposal", status: "In Progress", date: "Pending" },
      { name: "Architecture & UI/UX Wireframes", status: "Pending", date: "Pending" },
      { name: "Core Development Phase", status: "Pending", date: "Pending" },
      { name: "QA, Security & Production Deployment", status: "Pending", date: "Pending" }
    ]);

    executeRun(
      `INSERT INTO projects (tracking_code, client_name, client_email, project_name, service_category, progress_percent, current_phase, total_cost, amount_paid, milestones, latest_update, target_completion, status)
       VALUES (?, ?, ?, ?, ?, 15, 'Discovery', ?, 0, ?, 'Inquiry received. Our engineering team is currently evaluating your technical requirements.', 'TBD', 'Planning')`,
      [tracking_code, client_name, client_email, `${project_type} for ${company_name || client_name}`, project_type, estimated_budget || 'Custom Proposal', milestones]
    );

    // Dispatch automated email notification to agency owner (admin.codecraftstudio@gmail.com)
    sendInquiryNotificationEmail({
      tracking_code,
      client_name,
      client_email,
      client_phone,
      company_name,
      project_type,
      description
    }).catch(err => console.error('[EMAIL DISPATCH ASYNC ERROR]', err));

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully!',
      tracking_code,
      id: newId
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/inquiries', (req, res) => {
  try {
    const inquiries = queryAll("SELECT * FROM inquiries ORDER BY id DESC");
    const parsed = inquiries.map(item => ({
      ...item,
      selected_features: item.selected_features ? JSON.parse(item.selected_features) : []
    }));
    res.json({ success: true, data: parsed });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/inquiries/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    executeRun("UPDATE inquiries SET status = ? WHERE id = ?", [status, id]);
    res.json({ success: true, message: `Inquiry status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Client Project Tracker Endpoints
router.get('/projects/track/:code', (req, res) => {
  try {
    const code = req.params.code.trim();
    // Search by tracking code or by email
    const project = queryOne(
      "SELECT * FROM projects WHERE LOWER(tracking_code) = LOWER(?) OR LOWER(client_email) = LOWER(?) ORDER BY id DESC",
      [code, code]
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        error: `No project found matching tracking code or email: "${code}". Please check your code and try again.`
      });
    }

    res.json({
      success: true,
      data: {
        ...project,
        milestones: project.milestones ? JSON.parse(project.milestones) : []
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. Admin Project Management
router.get('/projects', (req, res) => {
  try {
    const projects = queryAll("SELECT * FROM projects ORDER BY id DESC");
    const parsed = projects.map(p => ({
      ...p,
      milestones: p.milestones ? JSON.parse(p.milestones) : []
    }));
    res.json({ success: true, data: parsed });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/projects/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { progress_percent, current_phase, latest_update, target_completion, status, milestones, amount_paid, total_cost } = req.body;

    const existing = queryOne("SELECT * FROM projects WHERE id = ?", [id]);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const updatedMilestones = milestones ? JSON.stringify(milestones) : existing.milestones;

    executeRun(
      `UPDATE projects SET 
        progress_percent = ?,
        current_phase = ?,
        latest_update = ?,
        target_completion = ?,
        status = ?,
        milestones = ?,
        amount_paid = ?,
        total_cost = ?
       WHERE id = ?`,
      [
        progress_percent ?? existing.progress_percent,
        current_phase || existing.current_phase,
        latest_update || existing.latest_update,
        target_completion || existing.target_completion,
        status || existing.status,
        updatedMilestones,
        amount_paid ?? existing.amount_paid,
        total_cost ?? existing.total_cost,
        id
      ]
    );

    res.json({ success: true, message: 'Project workflow updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Interactive Estimator Engine
router.post('/estimator/calculate', (req, res) => {
  try {
    const { project_type, features = [], platform = 'Web', design_complexity = 'Custom Glassmorphic' } = req.body;

    let baseCost = 4000;
    let baseWeeks = 3;

    if (project_type === 'Mobile App') {
      baseCost = 6500;
      baseWeeks = 4;
    } else if (project_type === 'Full Stack Web App') {
      baseCost = 8000;
      baseWeeks = 5;
    } else if (project_type === 'AI & Automation') {
      baseCost = 7500;
      baseWeeks = 4;
    } else if (project_type === 'Enterprise SaaS') {
      baseCost = 14000;
      baseWeeks = 8;
    }

    const featurePrices = {
      'User Authentication & Roles': { cost: 800, weeks: 0.5 },
      'Stripe Payment & Invoicing': { cost: 1200, weeks: 1 },
      'Real-time Chat / WebSockets': { cost: 1500, weeks: 1 },
      'Admin Control Dashboard': { cost: 1800, weeks: 1 },
      'AI Chatbot / Vector DB Integration': { cost: 2500, weeks: 1.5 },
      'Custom Database & API Architecture': { cost: 1500, weeks: 1 },
      'Multi-language i18n': { cost: 700, weeks: 0.5 },
      'Push Notifications & Email Automated Flows': { cost: 900, weeks: 0.5 }
    };

    let addedCost = 0;
    let addedWeeks = 0;

    for (const feat of features) {
      if (featurePrices[feat]) {
        addedCost += featurePrices[feat].cost;
        addedWeeks += featurePrices[feat].weeks;
      } else {
        addedCost += 600;
        addedWeeks += 0.5;
      }
    }

    if (design_complexity === 'Standard Modern') {
      baseCost *= 1.0;
    } else if (design_complexity === 'Custom Glassmorphic & 3D Visuals') {
      baseCost += 2000;
      baseWeeks += 1;
    } else if (design_complexity === 'High-End Interactive Micro-animations') {
      baseCost += 3500;
      baseWeeks += 1.5;
    }

    const minCost = baseCost + addedCost;
    const maxCost = Math.round(minCost * 1.35);
    const totalWeeks = Math.ceil(baseWeeks + addedWeeks);

    res.json({
      success: true,
      data: {
        estimated_budget_min: `$${minCost.toLocaleString()}`,
        estimated_budget_max: `$${maxCost.toLocaleString()}`,
        estimated_timeline: `${totalWeeks} - ${totalWeeks + 2} Weeks`,
        breakdown: {
          base_service: project_type,
          selected_features_count: features.length,
          design_tier: design_complexity
        }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
