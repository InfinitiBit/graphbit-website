import winston from 'winston';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define log colors
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

// Custom format for console output
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

// Custom format for file output
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Define transports
const transports = [
  // Console transport for development
  new winston.transports.Console({
    format: consoleFormat,
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  }),
];

// Add file transports for production
if (process.env.NODE_ENV === 'production') {
  transports.push(
    // Error log file
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: fileFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Combined log file
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: fileFormat,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  );
}

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'graphbit-api' },
  transports,
  // Handle uncaught exceptions and rejections
  exceptionHandlers: [
    new winston.transports.File({ filename: 'logs/exception.log' })
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'logs/rejections.log' })
  ],
});

// Stream for Morgan HTTP logging
export const morganStream = {
  write: (message: string) => {
    logger.http(message.substring(0, message.lastIndexOf('\n')));
  },
};

// Utility functions for structured logging
export const logError = (error: Error, context?: Record<string, any>) => {
  logger.error({
    message: error.message,
    stack: error.stack,
    context,
  });
};

export const logInfo = (message: string, context?: Record<string, any>) => {
  logger.info({
    message,
    context,
  });
};

export const logWarn = (message: string, context?: Record<string, any>) => {
  logger.warn({
    message,
    context,
  });
};

export const logDebug = (message: string, context?: Record<string, any>) => {
  logger.debug({
    message,
    context,
  });
};

// Performance logging helper
export const logPerformance = (operation: string, startTime: number, context?: Record<string, any>) => {
  const duration = Date.now() - startTime;
  logger.info({
    message: `Performance: ${operation} completed in ${duration}ms`,
    operation,
    duration,
    context,
  });
};

export default logger;