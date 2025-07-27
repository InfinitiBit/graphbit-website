import { Request, Response, NextFunction } from 'express';
import { logger } from '@/utils/logger';
import { v4 as uuidv4 } from 'uuid';

// Extend Request interface to include custom properties
declare global {
  namespace Express {
    interface Request {
      requestId?: string;
      startTime?: number;
    }
  }
}

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  // Generate unique request ID
  req.requestId = uuidv4();
  req.startTime = Date.now();

  // Add request ID to response headers
  res.setHeader('X-Request-ID', req.requestId);

  // Log incoming request
  logger.info('Incoming request', {
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
  });

  // Override res.json to log response
  const originalJson = res.json;
  res.json = function (body: any) {
    const duration = Date.now() - (req.startTime || 0);
    
    logger.info('Request completed', {
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });

    return originalJson.call(this, body);
  };

  // Handle response finish event for non-JSON responses
  res.on('finish', () => {
    if (!res.headersSent) {
      const duration = Date.now() - (req.startTime || 0);
      
      logger.info('Request completed', {
        requestId: req.requestId,
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      });
    }
  });

  next();
};

export default requestLogger;