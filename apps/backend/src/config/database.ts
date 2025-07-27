import mongoose from 'mongoose';
import { config } from './environment';
import { logger } from '@/utils/logger';

// MongoDB connection options
const mongooseOptions = {
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  retryWrites: true,
  w: 'majority',
};

// Connection state tracking
let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) {
    logger.info('MongoDB already connected');
    return;
  }

  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(config.MONGODB_URI, mongooseOptions);
    
    isConnected = true;
    
    logger.info(`🍃 MongoDB Connected: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`);
    
    // Connection event handlers
    mongoose.connection.on('connected', () => {
      logger.info('MongoDB connection established');
      isConnected = true;
    });

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
      isConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
      isConnected = false;
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await mongoose.connection.close();
        logger.info('MongoDB connection closed through app termination');
        process.exit(0);
      } catch (error) {
        logger.error('Error closing MongoDB connection:', error);
        process.exit(1);
      }
    });

  } catch (error) {
    logger.error('MongoDB connection failed:', error);
    
    if (config.NODE_ENV === 'production') {
      process.exit(1);
    } else {
      logger.warn('Continuing without database connection in development mode');
    }
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    isConnected = false;
    logger.info('MongoDB connection closed');
  } catch (error) {
    logger.error('Error closing MongoDB connection:', error);
    throw error;
  }
};

export const getConnectionState = (): boolean => {
  return isConnected && mongoose.connection.readyState === 1;
};

// Database health check
export const healthCheck = async (): Promise<{ status: string; message: string }> => {
  try {
    const state = mongoose.connection.readyState;
    
    switch (state) {
      case 0:
        return { status: 'disconnected', message: 'MongoDB is disconnected' };
      case 1:
        // Test the connection with a simple operation
        await mongoose.connection.db.admin().ping();
        return { status: 'connected', message: 'MongoDB is connected and healthy' };
      case 2:
        return { status: 'connecting', message: 'MongoDB is connecting' };
      case 3:
        return { status: 'disconnecting', message: 'MongoDB is disconnecting' };
      default:
        return { status: 'unknown', message: 'MongoDB connection state is unknown' };
    }
  } catch (error) {
    logger.error('Database health check failed:', error);
    return { status: 'error', message: 'Database health check failed' };
  }
};

export default { connectDB, disconnectDB, getConnectionState, healthCheck };