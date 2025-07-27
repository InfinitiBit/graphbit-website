import { Request, Response } from 'express';
import { User, IUser } from '@/models/User';
import { logger } from '@/utils/logger';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    clerkId: string;
    email?: string;
  };
}

export class UserController {
  /**
   * Get user profile
   * GET /api/v1/users/profile
   */
  static async getProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const clerkId = req.user?.clerkId;
      
      if (!clerkId) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized: No user ID provided'
        });
      }

      const user = await User.findByClerkId(clerkId);
      
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        });
      }

      // Don't expose sensitive information
      const userProfile = {
        id: user._id,
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        avatar: user.avatar,
        role: user.role,
        subscription: user.subscription,
        preferences: user.preferences,
        usage: user.usage,
        isActive: user.isActive,
        isSubscribed: user.isSubscribed,
        canCreateAgent: user.canCreateAgent,
        canMakeApiCall: user.canMakeApiCall,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      };

      res.json({
        status: 'success',
        data: { user: userProfile }
      });

    } catch (error) {
      logger.error('Error getting user profile:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Update user profile
   * PUT /api/v1/users/profile
   */
  static async updateProfile(req: AuthenticatedRequest, res: Response) {
    try {
      const clerkId = req.user?.clerkId;
      const updates = req.body;

      if (!clerkId) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized: No user ID provided'
        });
      }

      // Filter allowed updates
      const allowedUpdates = ['firstName', 'lastName', 'avatar', 'preferences'];
      const filteredUpdates: Partial<IUser> = {};

      for (const key of allowedUpdates) {
        if (updates[key] !== undefined) {
          (filteredUpdates as any)[key] = updates[key];
        }
      }

      const user = await User.findOneAndUpdate(
        { clerkId },
        { $set: filteredUpdates },
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        });
      }

      res.json({
        status: 'success',
        data: { user },
        message: 'Profile updated successfully'
      });

    } catch (error) {
      logger.error('Error updating user profile:', error);
      
      if (error.name === 'ValidationError') {
        return res.status(400).json({
          status: 'error',
          message: 'Validation error',
          details: error.errors
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get user statistics
   * GET /api/v1/users/stats
   */
  static async getStats(req: AuthenticatedRequest, res: Response) {
    try {
      const clerkId = req.user?.clerkId;

      if (!clerkId) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized: No user ID provided'
        });
      }

      const user = await User.findByClerkId(clerkId);
      
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        });
      }

      // Calculate additional stats if needed
      const stats = {
        usage: user.usage,
        subscription: user.subscription,
        limits: {
          canCreateAgent: user.canCreateAgent,
          canMakeApiCall: user.canMakeApiCall,
          monthlyTokenLimit: user.usage.monthlyTokenLimit,
          tokensRemaining: user.usage.monthlyTokenLimit - user.usage.apiCallsThisMonth
        },
        account: {
          isActive: user.isActive,
          isSubscribed: user.isSubscribed,
          memberSince: user.createdAt,
          lastActive: user.lastLoginAt
        }
      };

      res.json({
        status: 'success',
        data: { stats }
      });

    } catch (error) {
      logger.error('Error getting user stats:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Update user preferences
   * PATCH /api/v1/users/preferences
   */
  static async updatePreferences(req: AuthenticatedRequest, res: Response) {
    try {
      const clerkId = req.user?.clerkId;
      const preferences = req.body;

      if (!clerkId) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized: No user ID provided'
        });
      }

      const user = await User.findOneAndUpdate(
        { clerkId },
        { $set: { preferences } },
        { new: true, runValidators: true }
      );

      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        });
      }

      res.json({
        status: 'success',
        data: { preferences: user.preferences },
        message: 'Preferences updated successfully'
      });

    } catch (error) {
      logger.error('Error updating user preferences:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Delete user account
   * DELETE /api/v1/users/account
   */
  static async deleteAccount(req: AuthenticatedRequest, res: Response) {
    try {
      const clerkId = req.user?.clerkId;

      if (!clerkId) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized: No user ID provided'
        });
      }

      // Soft delete by setting isActive to false
      const user = await User.findOneAndUpdate(
        { clerkId },
        { $set: { isActive: false } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'User not found'
        });
      }

      logger.info(`User account deactivated: ${clerkId}`);

      res.json({
        status: 'success',
        message: 'Account deactivated successfully'
      });

    } catch (error) {
      logger.error('Error deleting user account:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get all users (Admin only)
   * GET /api/v1/users
   */
  static async getAllUsers(req: AuthenticatedRequest, res: Response) {
    try {
      const currentUser = await User.findByClerkId(req.user?.clerkId || '');
      
      if (!currentUser || currentUser.role !== 'admin') {
        return res.status(403).json({
          status: 'error',
          message: 'Forbidden: Admin access required'
        });
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const skip = (page - 1) * limit;

      const filters: any = {};
      
      // Apply filters
      if (req.query.role) {
        filters.role = req.query.role;
      }
      if (req.query.subscription) {
        filters['subscription.tier'] = req.query.subscription;
      }
      if (req.query.active !== undefined) {
        filters.isActive = req.query.active === 'true';
      }

      const [users, total] = await Promise.all([
        User.find(filters)
          .select('-__v')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        User.countDocuments(filters)
      ]);

      const totalPages = Math.ceil(total / limit);

      res.json({
        status: 'success',
        data: {
          users,
          pagination: {
            page,
            limit,
            total,
            totalPages,
            hasMore: page < totalPages
          }
        }
      });

    } catch (error) {
      logger.error('Error getting all users:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get user analytics (Admin only)
   * GET /api/v1/users/analytics
   */
  static async getAnalytics(req: AuthenticatedRequest, res: Response) {
    try {
      const currentUser = await User.findByClerkId(req.user?.clerkId || '');
      
      if (!currentUser || currentUser.role !== 'admin') {
        return res.status(403).json({
          status: 'error',
          message: 'Forbidden: Admin access required'
        });
      }

      const stats = await User.getUserStats();
      
      const totalUsers = await User.countDocuments({ isActive: true });
      const newUsersThisMonth = await User.countDocuments({
        isActive: true,
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      });

      res.json({
        status: 'success',
        data: {
          totalUsers,
          newUsersThisMonth,
          subscriptionStats: stats,
          generatedAt: new Date().toISOString()
        }
      });

    } catch (error) {
      logger.error('Error getting user analytics:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }
}