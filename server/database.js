import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.sqlite');

let dbInstance = null;

export async function initDatabase() {
  const SQL = await initSqlJs();
  
  if (fs.existsSync(DB_FILE)) {
    const fileBuffer = fs.readFileSync(DB_FILE);
    dbInstance = new SQL.Database(fileBuffer);
    console.log('[DB] Loaded existing SQLite database from database.sqlite');
  } else {
    dbInstance = new SQL.Database();
    console.log('[DB] Created new SQLite database in memory');
  }

  // Enable Foreign Keys
  dbInstance.run("PRAGMA foreign_keys = ON;");

  // Create Tables
  dbInstance.run(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tracking_code TEXT UNIQUE NOT NULL,
      client_name TEXT NOT NULL,
      client_email TEXT NOT NULL,
      client_phone TEXT,
      company_name TEXT,
      project_type TEXT NOT NULL,
      estimated_budget TEXT,
      estimated_timeline TEXT,
      selected_features TEXT,
      description TEXT,
      status TEXT DEFAULT 'New',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tracking_code TEXT UNIQUE NOT NULL,
      client_name TEXT NOT NULL,
      client_email TEXT NOT NULL,
      project_name TEXT NOT NULL,
      service_category TEXT NOT NULL,
      progress_percent INTEGER DEFAULT 0,
      current_phase TEXT DEFAULT 'Discovery',
      total_cost NUMERIC DEFAULT 0,
      amount_paid NUMERIC DEFAULT 0,
      milestones TEXT,
      latest_update TEXT,
      target_completion TEXT,
      status TEXT DEFAULT 'Active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS portfolio (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT,
      tech_stack TEXT,
      client TEXT,
      metrics TEXT,
      demo_url TEXT,
      featured BOOLEAN DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS agency_stats (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      total_projects_delivered INTEGER DEFAULT 48,
      active_clients INTEGER DEFAULT 14,
      client_satisfaction TEXT DEFAULT '99.4%',
      avg_turnaround TEXT DEFAULT '3.5 Weeks'
    );
  `);

  saveDatabase();

  // Seed portfolio and initial projects if empty
  seedInitialData();

  return dbInstance;
}

export function saveDatabase() {
  if (dbInstance) {
    const data = dbInstance.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_FILE, buffer);
  }
}

export function queryAll(sql, params = []) {
  const stmt = dbInstance.prepare(sql);
  stmt.bind(params);
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

export function queryOne(sql, params = []) {
  const results = queryAll(sql, params);
  return results.length > 0 ? results[0] : null;
}

export function executeRun(sql, params = []) {
  dbInstance.run(sql, params);
  saveDatabase();
  const res = queryOne("SELECT last_insert_rowid() AS id");
  return res ? res.id : null;
}

function seedInitialData() {
  const portfolioCount = queryOne("SELECT COUNT(*) as count FROM portfolio")?.count || 0;
  if (portfolioCount === 0) {
    console.log('[DB] Seeding default portfolio items...');
    const samplePortfolio = [
      {
        title: "ApexFlow Enterprise ERP Dashboard",
        category: "Web App",
        description: "High-performance enterprise SaaS platform with real-time streaming analytics, automated inventory forecasting, and AI workflow copilot.",
        image_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        tech_stack: JSON.stringify(["React", "Node.js", "PostgreSQL", "TailwindCSS", "Chart.js", "Redis"]),
        client: "Apex Logistics Global",
        metrics: "4.2x Faster Reporting & +38% Productivity",
        demo_url: "https://example.com/apexflow",
        featured: 1
      },
      {
        title: "PulseHealth Telemedicine iOS & Android",
        category: "Mobile App",
        description: "HIPAA-compliant mobile healthcare platform featuring HD encrypted video consultations, electronic health records, and AI symptom checker.",
        image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
        tech_stack: JSON.stringify(["Flutter", "Node.js", "WebRTC", "SQLite", "Firebase"]),
        client: "Pulse MedTech Group",
        metrics: "150k+ Active Patients & 4.9 Star App Rating",
        demo_url: "https://example.com/pulsehealth",
        featured: 1
      },
      {
        title: "Veritas AI Document Intelligence Engine",
        category: "AI & Cloud",
        description: "Automated legal document summarization, contract clause analyzer, and multi-vector semantic search engine built for legal firms.",
        image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        tech_stack: JSON.stringify(["Python", "FastAPI", "React", "OpenAI API", "Pinecone", "Docker"]),
        client: "Veritas Legal Partners",
        metrics: "90% Reduction in Document Review Time",
        demo_url: "https://example.com/veritas-ai",
        featured: 1
      },
      {
        title: "NEXUS E-Commerce Experience",
        category: "Web App",
        description: "Ultra-fast headless commerce platform with 3D product previews, instant checkout, dynamic localized currency, and AI recommendations.",
        image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        tech_stack: JSON.stringify(["Next.js", "Shopify Storefront API", "Three.js", "Stripe"]),
        client: "NEXUS Modern Apparel",
        metrics: "+142% Conversion Rate Boost",
        demo_url: "https://example.com/nexus",
        featured: 1
      }
    ];

    for (const item of samplePortfolio) {
      executeRun(
        `INSERT INTO portfolio (title, category, description, image_url, tech_stack, client, metrics, demo_url, featured)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [item.title, item.category, item.description, item.image_url, item.tech_stack, item.client, item.metrics, item.demo_url, item.featured]
      );
    }
  }

  const projectsCount = queryOne("SELECT COUNT(*) as count FROM projects")?.count || 0;
  if (projectsCount === 0) {
    console.log('[DB] Seeding active demo projects...');
    const sampleProjects = [
      {
        tracking_code: "CCS-98421",
        client_name: "Sarah Jenkins",
        client_email: "sarah@luminahealth.io",
        project_name: "Lumina Patient Portal & Mobile Companion",
        service_category: "Mobile & Web App",
        progress_percent: 75,
        current_phase: "QA & Testing",
        total_cost: 18500,
        amount_paid: 14000,
        milestones: JSON.stringify([
          { name: "Requirements & UI/UX Figma Design", status: "Completed", date: "2026-06-10" },
          { name: "Backend API & Database Architecture", status: "Completed", date: "2026-06-28" },
          { name: "Frontend React & Native App Build", status: "Completed", date: "2026-07-15" },
          { name: "Security Audit & End-to-End QA", status: "In Progress", date: "2026-07-30" },
          { name: "Store Deployment & Production Launch", status: "Pending", date: "2026-08-10" }
        ]),
        latest_update: "Completed integration test suite. Preparing iOS TestFlight preview build for client review.",
        target_completion: "2026-08-10",
        status: "Active"
      },
      {
        tracking_code: "CCS-55102",
        client_name: "Marcus Vance",
        client_email: "marcus@vancetech.com",
        project_name: "Vance CyberSec Enterprise Analytics Hub",
        service_category: "Enterprise Cloud",
        progress_percent: 40,
        current_phase: "Development",
        total_cost: 24000,
        amount_paid: 12000,
        milestones: JSON.stringify([
          { name: "Architecture Planning & Security Blueprint", status: "Completed", date: "2026-06-20" },
          { name: "Database Schema & Real-time WebSockets", status: "Completed", date: "2026-07-05" },
          { name: "Analytics Dashboard UI & Widget Engine", status: "In Progress", date: "2026-07-25" },
          { name: "Penetration Testing & Stress Tests", status: "Pending", date: "2026-08-15" },
          { name: "AWS Cloud Deployment", status: "Pending", date: "2026-08-30" }
        ]),
        latest_update: "Building modular dashboard canvas with dynamic charts and export engine.",
        target_completion: "2026-08-30",
        status: "Active"
      }
    ];

    for (const p of sampleProjects) {
      executeRun(
        `INSERT INTO projects (tracking_code, client_name, client_email, project_name, service_category, progress_percent, current_phase, total_cost, amount_paid, milestones, latest_update, target_completion, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [p.tracking_code, p.client_name, p.client_email, p.project_name, p.service_category, p.progress_percent, p.current_phase, p.total_cost, p.amount_paid, p.milestones, p.latest_update, p.target_completion, p.status]
      );
    }
  }

  const statsCount = queryOne("SELECT COUNT(*) as count FROM agency_stats")?.count || 0;
  if (statsCount === 0) {
    dbInstance.run(`INSERT INTO agency_stats (id, total_projects_delivered, active_clients, client_satisfaction, avg_turnaround) VALUES (1, 52, 16, '99.4%', '3.5 Weeks')`);
    saveDatabase();
  }
}
