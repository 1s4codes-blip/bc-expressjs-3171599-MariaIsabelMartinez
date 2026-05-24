// ============================================
// CONFIG — Winston logger + Morgan stream
// ============================================
import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';

const isDev = process.env['NODE_ENV'] !== 'production';

const devFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.colorize({ all: true }),
  format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level}: ${message}`;
  })
);

const prodFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.json()
);

const loggerTransports: transports.ConsoleTransportInstance[] | transports.FileTransportInstance[] = [
  new transports.Console(),
];

if (!isDev) {
  (loggerTransports as transports.FileTransportInstance[]).push(
    new transports.File({ filename: 'logs/error.log', level: 'error' })
  );
}

export const logger = createLogger({
  level: isDev ? 'http' : 'warn',
  format: isDev ? devFormat : prodFormat,
  transports: loggerTransports,
});

const morganStream = {
  write: (message: string) => logger.http(message.trim()),
};

const morganFormat = isDev ? 'dev' : 'combined';

export const morganMiddleware = morgan(morganFormat, { stream: morganStream });