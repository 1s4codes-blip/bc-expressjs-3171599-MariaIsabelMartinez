// ============================================
// SERVER — bootstrap entry point
// ============================================
import app from './app';
import { logger } from './config/logger';

const PORT = process.env['PORT'] ? Number(process.env['PORT']) : 3000;

app.listen(PORT, () => {
  logger.info(`🚀 Import Company API running on http://localhost:${PORT}`);
  logger.info(`📦 Products endpoint: http://localhost:${PORT}/api/v1/products`);
  logger.info(`🌍 Environment: ${process.env['NODE_ENV'] ?? 'development'}`);
});