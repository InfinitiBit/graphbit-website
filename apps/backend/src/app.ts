import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import 'express-async-errors';

import { config } from './config/environment';
import { connectDB } from './config/database';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { requestLogger } from './middleware/requestLogger';
import { clerkMiddleware } from './middleware/clerkMiddleware';

// Import routes
import apiRoutes from './routes/api/v1';
import healthRoutes from './routes/health';

const app = express();

// Trust proxy for production deployment
if (config.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = config.CORS_ORIGINS.split(',').map(origin => origin.trim());
    
    if (allowedOrigins.indexOf(origin) !== -1 || config.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
};

app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: config.NODE_ENV === 'production' ? 100 : 1000, // limit each IP to 100 requests per windowMs in production
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(hpp({
  whitelist: ['sort', 'fields', 'page', 'limit', 'filter']
}));

// Compression middleware
app.use(compression());

// Logging middleware
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', { stream: { write: (message: string) => logger.info(message.trim()) } }));
}

// Custom request logging
app.use(requestLogger);

// Clerk authentication middleware (applied selectively to protected routes)
app.use(clerkMiddleware);

// Health check routes (no authentication required)
app.use('/health', healthRoutes);

// API routes
app.use('/api/v1', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'GraphBit API Server',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: config.NODE_ENV,
  });
});

// 404 handler
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// Database connection and server startup
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    const PORT = config.PORT || 5000;
    
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} in ${config.NODE_ENV} mode`);
      logger.info(`📊 Health check available at http://localhost:${PORT}/health`);
      logger.info(`🔗 API documentation available at http://localhost:${PORT}/api/v1/docs`);
    });

    // Graceful shutdown
    const gracefulShutdown = (signal: string) => {
      logger.info(`${signal} received. Starting graceful shutdown...`);
      
      server.close((err) => {
        if (err) {
          logger.error('Error during server shutdown:', err);
          process.exit(1);
        }
        
        logger.info('Server closed. Exiting process...');
        process.exit(0);
      });
    };

    // Handle termination signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
if (require.main === module) {
  startServer();
}

export default app;