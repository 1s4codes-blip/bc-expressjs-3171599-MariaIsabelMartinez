// ============================================
// APP — Express configuration
// Order matters: body parsing → logging → routes → 404 → error handler
// ============================================
import express from 'express';
import { morganMiddleware } from './config/logger';
import productsRouter from './routes/products.routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use(morganMiddleware);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', domain: 'Import Company' });
});

app.use('/api/v1/products', productsRouter);

app.use(notFound);

app.use(errorHandler);

export default app;