import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDatabase } from './database.js';
import apiRouter from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json());

// Initialize SQLite Database before handling requests
console.log('[SERVER] Initializing Code Craft Studio Server...');
await initDatabase();

// Mount API Routes
app.use('/api', apiRouter);

// Serve static frontend in production if built
const clientDistPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientDistPath, 'index.index.html'), (err) => {
    if (err) {
      res.sendFile(path.join(clientDistPath, 'index.html'), (err2) => {
        if (err2) {
          res.send('Code Craft Studio API Server is running! Front-end dev server active on Vite port.');
        }
      });
    }
  });
});

const server = app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 CODE CRAFT STUDIO SERVER RUNNING ON PORT ${PORT}`);
  console.log(`📡 API Endpoints: http://localhost:${PORT}/api/health`);
  console.log(`==================================================\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`\n[WARN] Port ${PORT} is in use. Trying fallback port ${PORT + 1}...`);
    app.listen(PORT + 1, () => {
      console.log(`\n==================================================`);
      console.log(`🚀 CODE CRAFT STUDIO SERVER RUNNING ON PORT ${PORT + 1}`);
      console.log(`📡 API Endpoints: http://localhost:${PORT + 1}/api/health`);
      console.log(`==================================================\n`);
    });
  } else {
    console.error('[SERVER ERROR]', err);
  }
});
