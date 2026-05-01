import express from 'express';
import type { Application, Request, Response, NextFunction } from 'express';
import { suppliersRouter  } from './routes/suppliers.routes.js';

export function createApp(): Application {
  const app = express();

 app.use(express.json());

  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[${req.method}] ${req.url} — ${res.statusCode} (${duration}ms)`);
    });
    next();
  });


  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });


  app.use('/api/v1/suppliers', suppliersRouter);

  app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });

  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message ?? 'Internal server error' });
  });

  return app;
}
