import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';
import { logger } from '../utils/logger';
import { config } from '../config/environment';
import { body, validationResult } from 'express-validator';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    clerkId?: string;
    email: string;
    role: string;
  };
}

// Helper function to generate JWT token
const generateToken = (user: IUser): string => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      clerkId: user.clerkId
    },
    config.JWT_SECRET,
    {
      expiresIn: config.JWT_EXPIRE,
    }
  );
};

// Helper function to create user response (excluding sensitive data)
const createUserResponse = (user: IUser) => {
  return {
    id: user._id,
    clerkId: user.clerkId,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.fullName,
    avatar: user.avatar,
    role: user.role,
    isActive: user.isActive,
    subscription: user.subscription,
    preferences: user.preferences,
    usage: user.usage,
    canCreateAgent: user.canCreateAgent,
    canMakeApiCall: user.canMakeApiCall,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt
  };
};

export class AuthController {
  /**
   * Register new user with email/password
   * POST /api/v1/auth/register
   */
  static async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { email, password, firstName, lastName } = req.body;

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          status: 'error',
          message: 'User already exists with this email'
        });
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user
      const user = new User({
        email: email.toLowerCase(),
        password: hashedPassword,
        firstName,
        lastName,
        role: 'user',
        isActive: true,
      });

      await user.save();

      // Generate JWT token
      const token = generateToken(user);

      // Update last login
      user.lastLoginAt = new Date();
      await user.save();

      logger.info(`New user registered: ${user.email}`);

      res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: {
          user: createUserResponse(user),
          token
        }
      });

    } catch (error) {
      logger.error('Registration error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Login user with email/password
   * POST /api/v1/auth/login
   */
  static async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          status: 'error',
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { email, password } = req.body;

      // Find user by email with password
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
      if (!user) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid email or password'
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          status: 'error',
          message: 'Account is deactivated. Please contact support.'
        });
      }

      // Check if user has a password (might be Clerk-only user)
      if (!user.password) {
        return res.status(401).json({
          status: 'error',
          message: 'Please use social login or reset your password'
        });
      }

      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          status: 'error',
          message: 'Invalid email or password'
        });
      }

      // Generate JWT token
      const token = generateToken(user);

      // Update last login
      user.lastLoginAt = new Date();
      await user.save();

      logger.info(`User logged in: ${user.email}`);

      res.json({
        status: 'success',
        message: 'Login successful',
        data: {
          user: createUserResponse(user),
          token
        }
      });

    } catch (error) {
      logger.error('Login error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get current user (from JWT token)
   * GET /api/v1/auth/me
   */
  static async getCurrentUser(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized'
        });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        });
      }

      res.json({
        status: 'success',
        data: {
          user: createUserResponse(user)
        }
      });

    } catch (error) {
      logger.error('Get current user error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Refresh JWT token
   * POST /api/v1/auth/refresh
   */
  static async refreshToken(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized'
        });
      }

      const user = await User.findById(userId);
      if (!user || !user.isActive) {
        return res.status(401).json({
          status: 'error',
          message: 'User not found or inactive'
        });
      }

      // Generate new JWT token
      const token = generateToken(user);

      res.json({
        status: 'success',
        message: 'Token refreshed successfully',
        data: {
          token
        }
      });

    } catch (error) {
      logger.error('Token refresh error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Logout user
   * POST /api/v1/auth/logout
   */
  static async logout(req: AuthenticatedRequest, res: Response) {
    try {
      const user = req.user;

      // Log the logout event
      logger.info('User logout', {
        userId: user?.id,
        email: user?.email,
        timestamp: new Date().toISOString()
      });

      res.json({
        status: 'success',
        message: 'Logged out successfully'
      });

    } catch (error) {
      logger.error('Logout error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Forgot password - send reset email
   * POST /api/v1/auth/forgot-password
   */
  static async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const user = await User.findByEmail(email);
      if (!user) {
        // Don't reveal if email exists or not
        return res.json({
          status: 'success',
          message: 'If email exists, password reset instructions have been sent'
        });
      }

      // Generate reset token (in production, you'd send this via email)
      const resetToken = jwt.sign(
        { id: user._id, email: user.email },
        config.JWT_SECRET,
        { expiresIn: '1h' }
      );

      logger.info(`Password reset requested for: ${email}`);

      // In production, you would:
      // 1. Save resetToken to database with expiration
      // 2. Send email with reset link containing the token
      // For now, we'll just return the token (NOT for production!)

      res.json({
        status: 'success',
        message: 'Password reset instructions sent to email',
        // Remove this in production!
        data: { resetToken }
      });

    } catch (error) {
      logger.error('Forgot password error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Reset password with token
   * POST /api/v1/auth/reset-password
   */
  static async resetPassword(req: Request, res: Response) {
    try {
      const { token, newPassword } = req.body;

      if (!token || !newPassword) {
        return res.status(400).json({
          status: 'error',
          message: 'Token and new password are required'
        });
      }

      // Verify reset token
      let decoded: any;
      try {
        decoded = jwt.verify(token, config.JWT_SECRET);
      } catch (error) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid or expired reset token'
        });
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        });
      }

      // Hash new password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update user password
      user.password = hashedPassword;
      await user.save();

      logger.info(`Password reset completed for: ${user.email}`);

      res.json({
        status: 'success',
        message: 'Password reset successfully'
      });

    } catch (error) {
      logger.error('Reset password error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Change password (authenticated user)
   * POST /api/v1/auth/change-password
   */
  static async changePassword(req: AuthenticatedRequest, res: Response) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized'
        });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        });
      }

      // Check if user has a current password
      if (!user.password) {
        return res.status(400).json({
          status: 'error',
          message: 'No password set. Please use forgot password to set a new password.'
        });
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return res.status(400).json({
          status: 'error',
          message: 'Current password is incorrect'
        });
      }

      // Hash new password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password
      user.password = hashedPassword;
      await user.save();

      logger.info(`Password changed for user: ${user.email}`);

      res.json({
        status: 'success',
        message: 'Password changed successfully'
      });

    } catch (error) {
      logger.error('Change password error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }
}