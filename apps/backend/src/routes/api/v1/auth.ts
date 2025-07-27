import { Router, Request, Response } from 'express';
import { User } from '@/models/User';
import { requireAuth, getCurrentUser } from '@/middleware/clerkMiddleware';
import { logger } from '@/utils/logger';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     AuthUser:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: User database ID
 *         clerkId:
 *           type: string
 *           description: Clerk user ID
 *         email:
 *           type: string
 *           format: email
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         fullName:
 *           type: string
 *         avatar:
 *           type: string
 *           format: uri
 *         role:
 *           type: string
 *           enum: [user, admin, moderator]
 *         isActive:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         lastLoginAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Authentication]
 *     security:
 *       - clerkAuth: []
 *     responses:
 *       200:
 *         description: Current user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/AuthUser'
 *       401:
 *         description: Unauthorized - No valid session
 */
router.get('/me', requireAuth, async (req: Request, res: Response) => {
  try {
    const currentUser = await getCurrentUser(req);
    
    if (!currentUser) {
      return res.status(401).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Get full user details from database
    const user = await User.findByClerkId(currentUser.clerkId);
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found in database'
      });
    }

    // Return user profile without sensitive information
    const userProfile = {
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

    res.json({
      status: 'success',
      data: { user: userProfile }
    });

  } catch (error) {
    logger.error('Error getting current user:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /auth/sync:
 *   post:
 *     summary: Sync user data with Clerk
 *     description: Synchronizes user data between Clerk and our database
 *     tags: [Authentication]
 *     security:
 *       - clerkAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               force:
 *                 type: boolean
 *                 description: Force sync even if user exists
 *                 default: false
 *     responses:
 *       200:
 *         description: User data synchronized successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/AuthUser'
 *                     action:
 *                       type: string
 *                       enum: [created, updated, no-change]
 *       401:
 *         description: Unauthorized
 */
router.post('/sync', requireAuth, async (req: Request, res: Response) => {
  try {
    const { userId } = req.auth;
    const { force = false } = req.body;
    
    if (!userId) {
      return res.status(401).json({
        status: 'error',
        message: 'No user ID provided'
      });
    }

    // Get Clerk user data
    const clerkUser = req.auth.user;
    
    if (!clerkUser) {
      return res.status(401).json({
        status: 'error',
        message: 'Clerk user data not available'
      });
    }

    // Find existing user
    let user = await User.findByClerkId(userId);
    let action = 'no-change';

    if (!user) {
      // Create new user
      user = new User({
        clerkId: userId,
        email: clerkUser.emailAddresses?.[0]?.emailAddress || '',
        firstName: clerkUser.firstName || undefined,
        lastName: clerkUser.lastName || undefined,
        avatar: clerkUser.profileImageUrl || undefined,
      });
      await user.save();
      action = 'created';
      
      logger.info(`New user created from Clerk sync: ${userId}`);
    } else if (force) {
      // Update existing user with Clerk data
      user.email = clerkUser.emailAddresses?.[0]?.emailAddress || user.email;
      user.firstName = clerkUser.firstName || user.firstName;
      user.lastName = clerkUser.lastName || user.lastName;
      user.avatar = clerkUser.profileImageUrl || user.avatar;
      await user.save();
      action = 'updated';
      
      logger.info(`User updated from Clerk sync: ${userId}`);
    }

    res.json({
      status: 'success',
      message: `User data ${action === 'no-change' ? 'already synchronized' : action}`,
      data: { 
        user: {
          id: user._id,
          clerkId: user.clerkId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          avatar: user.avatar,
          role: user.role,
          isActive: user.isActive,
          createdAt: user.createdAt,
          lastLoginAt: user.lastLoginAt
        },
        action
      }
    });

  } catch (error) {
    logger.error('Error syncing user data:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /auth/status:
 *   get:
 *     summary: Check authentication status
 *     description: Check if the current session is valid
 *     tags: [Authentication]
 *     security:
 *       - clerkAuth: []
 *     responses:
 *       200:
 *         description: Authentication status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     authenticated:
 *                       type: boolean
 *                     userId:
 *                       type: string
 *                     sessionId:
 *                       type: string
 *                     lastActivity:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Not authenticated
 */
router.get('/status', requireAuth, async (req: Request, res: Response) => {
  try {
    const { userId, sessionId } = req.auth;
    const currentUser = await getCurrentUser(req);

    res.json({
      status: 'success',
      data: {
        authenticated: true,
        userId,
        sessionId,
        userRole: currentUser?.role || 'user',
        lastActivity: new Date().toISOString()
      }
    });

  } catch (error) {
    logger.error('Error checking auth status:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user (placeholder)
 *     description: Logout is handled by Clerk on the frontend. This endpoint is for logging purposes.
 *     tags: [Authentication]
 *     security:
 *       - clerkAuth: []
 *     responses:
 *       200:
 *         description: Logout acknowledged
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Logout acknowledged
 */
router.post('/logout', requireAuth, async (req: Request, res: Response) => {
  try {
    const currentUser = await getCurrentUser(req);
    
    // Log the logout event
    logger.info('User logout', {
      userId: currentUser?.clerkId,
      timestamp: new Date().toISOString()
    });

    res.json({
      status: 'success',
      message: 'Logout acknowledged. Please clear your session on the client side.'
    });

  } catch (error) {
    logger.error('Error handling logout:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

export default router;