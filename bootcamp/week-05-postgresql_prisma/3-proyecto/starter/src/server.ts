// src/server.ts — Entry point del servidor

import 'dotenv/config';
import { app } from './app';
import { logger } from './config/logger';

const PORT = Number(process.env['PORT']) || 3000;

const server = app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
  logger.info(`Environment: ${process.env['NODE_ENV'] ?? 'development'}`);
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
