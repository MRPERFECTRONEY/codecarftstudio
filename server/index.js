import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { initDatabase, closeDatabase } from './database.js';
import apiRouter from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = Number(process.env.PORT || 5000);
const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map(x=>x.trim()).filter(Boolean);
app.disable('x-powered-by');
app.use(cors({ origin: (origin, callback) => {
  if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) return callback(null, true);
  return callback(new Error('Origin not allowed by CORS'));
}, credentials: false }));
app.use(express.json({ limit: '32kb' }));
app.use('/api', apiRouter);
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));
app.get('*', (req,res,next) => {
  if (req.path.startsWith('/api/')) return next();
  res.sendFile(path.join(clientDistPath,'index.html'), error => { if(error) next(error); });
});
app.use((err,_req,res,_next) => {
  console.error('[SERVER]',err);
  res.status(500).json({success:false,error:'Internal server error.'});
});
await initDatabase();
const server = app.listen(PORT, () => console.log('[SERVER] CodeCraft Studio listening on '+PORT));
const shutdown = async () => { server.close(); await closeDatabase(); process.exit(0); };
process.on('SIGTERM',shutdown);
process.on('SIGINT',shutdown);
