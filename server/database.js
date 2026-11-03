import pg from 'pg';
const { Pool } = pg;
let pool;
function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required. Configure managed PostgreSQL before starting the server.');
    pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.PGSSLMODE === 'disable' ? false : { rejectUnauthorized: false }, max: Number(process.env.PG_POOL_MAX || 5), idleTimeoutMillis: 30000, connectionTimeoutMillis: 10000 });
    pool.on('error', (error) => console.error('[DB] PostgreSQL pool error', error));
  }
  return pool;
}
const placeholders = (sql) => { let i = 0; return sql.replace(/\?/g, () => '$' + (++i)); };
export async function initDatabase() {
  const client = await getPool().connect();
  try {
    await client.query('BEGIN');
    await client.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id BIGSERIAL PRIMARY KEY, tracking_code TEXT UNIQUE NOT NULL, client_name TEXT NOT NULL,
        client_email TEXT NOT NULL, client_phone TEXT, company_name TEXT, project_type TEXT NOT NULL,
        estimated_budget TEXT, estimated_timeline TEXT, selected_features TEXT NOT NULL DEFAULT '[]',
        description TEXT, status TEXT NOT NULL DEFAULT 'New', created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS projects (
        id BIGSERIAL PRIMARY KEY, tracking_code TEXT UNIQUE NOT NULL, client_name TEXT NOT NULL,
        client_email TEXT NOT NULL, project_name TEXT NOT NULL, service_category TEXT NOT NULL,
        progress_percent INTEGER NOT NULL DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
        current_phase TEXT NOT NULL DEFAULT 'Discovery', total_cost NUMERIC(12,2) NOT NULL DEFAULT 0,
        amount_paid NUMERIC(12,2) NOT NULL DEFAULT 0, milestones TEXT NOT NULL DEFAULT '[]',
        latest_update TEXT, target_completion TEXT, status TEXT NOT NULL DEFAULT 'Planning',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS portfolio (
        id BIGSERIAL PRIMARY KEY, title TEXT NOT NULL, category TEXT NOT NULL, description TEXT NOT NULL,
        image_url TEXT, tech_stack TEXT NOT NULL DEFAULT '[]', client TEXT, metrics TEXT, demo_url TEXT,
        featured BOOLEAN NOT NULL DEFAULT TRUE, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS agency_stats (
        id INTEGER PRIMARY KEY CHECK (id = 1), total_projects_delivered INTEGER NOT NULL DEFAULT 0,
        active_clients INTEGER NOT NULL DEFAULT 0, client_satisfaction TEXT NOT NULL DEFAULT '—',
        avg_turnaround TEXT NOT NULL DEFAULT '—'
      );
      INSERT INTO agency_stats (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
      CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON inquiries(created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_projects_tracking_code ON projects(tracking_code);
    `);
    await client.query('COMMIT');
    console.log('[DB] PostgreSQL schema ready');
  } catch (error) { await client.query('ROLLBACK'); throw error; }
  finally { client.release(); }
}
export async function queryAll(sql, params = []) { return (await getPool().query(placeholders(sql), params)).rows; }
export async function queryOne(sql, params = []) { return (await queryAll(sql, params))[0] || null; }
export async function executeRun(sql, params = []) {
  const statement = sql.trim().replace(/;$/, '');
  const insert = /^INSERT\s/i.test(statement) && !/\bRETURNING\b/i.test(statement);
  const result = await getPool().query(placeholders(insert ? statement + ' RETURNING id' : statement), params);
  return result.rows?.[0]?.id ?? result.rowCount;
}
export async function closeDatabase() { if (pool) { await pool.end(); pool = null; } }
