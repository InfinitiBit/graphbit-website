import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { config } from '../config/environment';
import { logger } from '../utils/logger';

export interface JWTAuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    clerkId?: string;
  };
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

/**
 * Middleware to verify JWT token
 */
export const verifyJWT = async (req: JWTAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;

    if (!token) {
      throw new UnauthorizedError('Access token is required');
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, config.JWT_SECRET);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError('Token has expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError('Invalid token');
      } else {
        throw new UnauthorizedError('Token verification failed');
      }
    }

    // Check if user still exists and is active
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      throw new UnauthorizedError('User not found or inactive');
    }

    // Attach user to request
    req.user = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      clerkId: user.clerkId
    };

    logger.debug('JWT authenticated request', {
      userId: user._id,
      email: user.email,
      role: user.role,
      url: req.originalUrl,
      method: req.method,
    });

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware to optionally verify JWT token (doesn't fail if no token)
 */
export const optionalJWT = async (req: JWTAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') 
      ? authHeader.substring(7) 
      : null;

    if (token) {
      try {
        const decoded: any = jwt.verify(token, config.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (user && user.isActive) {
          req.user = {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
            clerkId: user.clerkId
          };
        }
      } catch (error) {
        // Silently fail for optional authentication
        logger.debug('Optional JWT verification failed:', error);
      }
    }

    next();
  } catch (error) {
    // Don't fail on optional auth errors
    logger.warn('Optional JWT error:', error);
    next();
  }
};

/**
 * Middleware to check user roles
 */
export const requireRole = (allowedRoles: string[]) => {
  return async (req: JWTAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('Authentication required');
      }

      const userRole = req.user.role || 'user';
      const hasRequiredRole = allowedRoles.includes(userRole);

      if (!hasRequiredRole) {
        logger.warn('Insufficient permissions', {
          userId: req.user.id,
          requiredRoles: allowedRoles,
          userRole,
          url: req.originalUrl,
          method: req.method,
        });
        
        throw new ForbiddenError('Insufficient permissions');
      }

      logger.debug('Role check passed', {
        userId: req.user.id,
        requiredRoles: allowedRoles,
        userRole,
      });

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Middleware to check if user is admin
 */
export const requireAdmin = requireRole(['admin']);

/**
 * Middleware to check if user is moderator or admin
 */
export const requireModerator = requireRole(['moderator', 'admin']);

/**
 * Get current user helper
 */
export const getCurrentJWTUser = async (req: JWTAuthenticatedRequest) => {
  if (!req.user) {
    return null;
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.isActive) {
      return null;
    }

    return {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      clerkId: user.clerkId
    };
  } catch (error) {
    logger.error('Error fetching current JWT user:', error);
    return null;
  }
};

export default {
  verifyJWT,
  optionalJWT,
  requireRole,
  requireAdmin,
  requireModerator,
  getCurrentJWTUser,
};