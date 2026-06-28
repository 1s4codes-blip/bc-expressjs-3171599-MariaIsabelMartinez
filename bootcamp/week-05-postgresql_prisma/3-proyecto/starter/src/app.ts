// src/app.ts — Configuración de la aplicación Express

import express from 'express';
import shipmentsRouter from './routes/items.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/v1/shipments', shipmentsRouter);

app.use(notFound);
app.use(errorHandler);

export { app };
