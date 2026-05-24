// ============================================
// MIDDLEWARES — errorHandler 
// ============================================
import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';
import { logger } from '../config/logger';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {

  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Validation Error',
      message: 'Invalid input data',
      issues: err.issues.map((issue) => ({
        field: issue.path.join('.') || 'unknown',
        message: issue.message,
      })),
    });
    return;
  }

  if (err instanceof AppError) {
    logger.warn(`[AppError] ${err.statusCode} — ${err.message}`);
    res.status(err.statusCode).json({
      error: 'Application Error',
      message: err.message,
    });
    return;
  }

  const isProduction = process.env['NODE_ENV'] === 'production';
  const genericMessage = 'An unexpected error occurred';

  logger.error(
    `[UnhandledError] ${err instanceof Error ? err.message : String(err)}`
  );

  res.status(500).json({
    error: 'Internal Server Error',
    message: isProduction ? genericMessage : (err instanceof Error ? err.message : genericMessage),
 
    ...(!isProduction && err instanceof Error && { stack: err.stack }),
  });
}