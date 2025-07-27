import dotenv from 'dotenv';
import { logger } from '@/utils/logger';

// Load environment variables from .env file
dotenv.config();

interface Config {
  NODE_ENV: string;
  PORT: number;
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRE: string;
  CORS_ORIGINS: string;
  CLERK_SECRET_KEY: string;
  CLERK_PUBLISHABLE_KEY: string;
  API_VERSION: string;
  LOG_LEVEL: string;
  UPLOAD_MAX_SIZE: string;
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX: number;
}

const requiredEnvVars = [
  'MONGODB_URI',
  'JWT_SECRET',
  'CLERK_SECRET_KEY',
  'CLERK_PUBLISHABLE_KEY'
];

const validateEnvironment = (): void => {
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    logger.error(`Missing required environment variables: ${missingVars.join(', ')}`);
    
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      logger.warn('Running in development mode with missing environment variables');
    }
  }
};

// Validate environment variables
validateEnvironment();

export const config: Config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/graphbit-dev',
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '30d',
  CORS_ORIGINS: process.env.CORS_ORIGINS || 'http://localhost:3000,http://localhost:3001',
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || '',
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY || '',
  API_VERSION: process.env.API_VERSION || 'v1',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  UPLOAD_MAX_SIZE: process.env.UPLOAD_MAX_SIZE || '10mb',
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
};

// Log configuration (excluding sensitive data)
logger.info('🔧 Configuration loaded:', {
  NODE_ENV: config.NODE_ENV,
  PORT: config.PORT,
  API_VERSION: config.API_VERSION,
  LOG_LEVEL: config.LOG_LEVEL,
  CORS_ORIGINS: config.CORS_ORIGINS,
  MONGODB_URI: config.MONGODB_URI.replace(/\/\/.*@/, '//<credentials>@'), // Hide credentials
});

export default config;