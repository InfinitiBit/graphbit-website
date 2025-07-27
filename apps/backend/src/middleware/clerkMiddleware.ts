import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/backend';
import { config } from '../config/environment';
import { logger } from '../utils/logger';
import { User } from '../models/User';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        clerkId: string;
        email?: string;
        role?: string;
      };
      auth?: {
        userId?: string;
        sessionId?: string;
        actor?: any;
        sessionClaims?: any;
      };
    }
  }
}

// Custom error classes
class UnauthorizedError extends Error {
  statusCode = 401;
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

class ForbiddenError extends Error {
  statusCode = 403;
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

// Initialize Clerk client
const clerk = clerkClient;
clerk.setKey(config.CLERK_SECRET_KEY);

// Middleware to extract auth from headers
export const clerkMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      try {
        const session = await clerk.sessions.verifySession(token);
        req.auth = {
          userId: session.userId,
          sessionId: session.id,
          sessionClaims: session.claims
        };
      } catch (error) {
        logger.warn('Invalid session token', { error: error.message });
      }
    }
    
    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to require authentication
export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.auth || {};

    if (!userId) {
      logger.warn('Unauthorized access attempt', {
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
      });
      
      throw new UnauthorizedError('Authentication required');
    }

    // Find or create user in our database
    let user = await User.findByClerkId(userId);
    
    if (!user) {
      // Auto-create user if not exists (sync with Clerk)
      try {
        const clerkUser = await clerk.users.getUser(userId);
        user = new User({
          clerkId: userId,
          email: clerkUser.emailAddresses?.[0]?.emailAddress || '',
          firstName: clerkUser.firstName || undefined,
          lastName: clerkUser.lastName || undefined,
          avatar: clerkUser.profileImageUrl || undefined,
        });
        await user.save();
        logger.info(`Auto-created user from Clerk: ${userId}`);
      } catch (error) {
        logger.error('Failed to create user from Clerk', { userId, error: error.message });
        throw new UnauthorizedError('Invalid user');
      }
    }

    // Update last login
    if (user.lastLoginAt !== new Date().toDateString()) {
      user.lastLoginAt = new Date();
      await user.save();
    }

    // Attach user info to request
    req.user = {
      id: user._id.toString(),
      clerkId: user.clerkId,
      email: user.email,
      role: user.role,
    };

    logger.debug('Authenticated request', {
      userId,
      userRole: user.role,
      url: req.originalUrl,
      method: req.method,
    });

    next();
  } catch (error) {
    next(error);
  }
};

// Middleware to optionally authenticate (doesn't throw if not authenticated)
export const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.auth || {};

    if (userId) {
      // Find user in database
      const user = await User.findByClerkId(userId);
      
      if (user) {
        req.user = {
          id: user._id.toString(),
          clerkId: user.clerkId,
          email: user.email,
          role: user.role,
        };
      }

      logger.debug('Authenticated request', {
        userId,
        url: req.originalUrl,
        method: req.method,
      });
    } else {
      logger.debug('Anonymous request', {
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
      });
    }

    next();
  } catch (error) {
    // Don't fail on optional auth errors
    logger.warn('Optional auth error:', error);
    next();
  }
};

// Middleware to check user roles
export const requireRole = (allowedRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.auth || {};

      if (!userId) {
        throw new UnauthorizedError('Authentication required');
      }

      // Get user from database if not already attached
      if (!req.user) {
        const user = await User.findByClerkId(userId);
        if (!user) {
          throw new UnauthorizedError('User not found');
        }
        req.user = {
          id: user._id.toString(),
          clerkId: user.clerkId,
          email: user.email,
          role: user.role,
        };
      }

      const userRole = req.user.role || 'user';
      const hasRequiredRole = allowedRoles.includes(userRole);

      if (!hasRequiredRole) {
        logger.warn('Insufficient permissions', {
          userId,
          requiredRoles: allowedRoles,
          userRole,
          url: req.originalUrl,
          method: req.method,
        });
        
        throw new ForbiddenError('Insufficient permissions');
      }

      logger.debug('Role check passed', {
        userId,
        requiredRoles: allowedRoles,
        userRole,
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};

// Middleware to check if user is admin
export const requireAdmin = requireRole(['admin']);

// Middleware to check if user is moderator or admin
export const requireModerator = requireRole(['moderator', 'admin']);

// Get current user info helper
export const getCurrentUser = async (req: Request) => {
  const { userId } = req.auth || {};

  if (!userId) {
    return null;
  }

  try {
    // Return user from request if already attached
    if (req.user) {
      return req.user;
    }

    // Otherwise fetch from database
    const user = await User.findByClerkId(userId);
    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      clerkId: user.clerkId,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    logger.error('Error fetching current user:', error);
    return null;
  }
};

export default {
  clerkMiddleware,
  requireAuth,
  optionalAuth,
  requireRole,
  requireAdmin,
  requireModerator,
  getCurrentUser,
};