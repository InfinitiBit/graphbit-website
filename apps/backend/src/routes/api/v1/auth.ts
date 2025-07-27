import { Router, Request, Response } from 'express';
import { User } from '../../../models/User';
import { requireAuth, getCurrentUser } from '../../../middleware/clerkMiddleware';
import { verifyJWT, optionalJWT } from '../../../middleware/jwtMiddleware';
import { AuthController } from '../../../controllers/authController';
import { body, validationResult } from 'express-validator';
import { logger } from '../../../utils/logger';

const router = Router();

// Validation middleware
const handleValidationErrors = (req: Request, res: Response, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Validation schemas
const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  body('firstName').optional().isString().trim().isLength({ max: 50 }),
  body('lastName').optional().isString().trim().isLength({ max: 50 }),
  handleValidationErrors
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 1 }).withMessage('Password is required'),
  handleValidationErrors
];

const forgotPasswordValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  handleValidationErrors
];

const resetPasswordValidation = [
  body('token').isString().isLength({ min: 1 }).withMessage('Reset token is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  handleValidationErrors
];

const changePasswordValidation = [
  body('currentPassword').isLength({ min: 1 }).withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
  handleValidationErrors
];

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

// ============================================
// TRADITIONAL EMAIL/PASSWORD AUTHENTICATION
// ============================================

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user with email/password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 description: Must contain uppercase, lowercase, number, and special character
 *               firstName:
 *                 type: string
 *                 maxLength: 50
 *               lastName:
 *                 type: string
 *                 maxLength: 50
 *     responses:
 *       201:
 *         description: User registered successfully
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
 *                     token:
 *                       type: string
 *       400:
 *         description: Validation error or user already exists
 */
router.post('/register', registerValidation, AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login with email/password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
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
 *                     token:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginValidation, AuthController.login);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh JWT token
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refreshed successfully
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
 *                     token:
 *                       type: string
 *       401:
 *         description: Unauthorized
 */
router.post('/refresh', verifyJWT, AuthController.refreshToken);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Password reset instructions sent
 */
router.post('/forgot-password', forgotPasswordValidation, AuthController.forgotPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password with token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired token
 */
router.post('/reset-password', resetPasswordValidation, AuthController.resetPassword);

/**
 * @swagger
 * /auth/change-password:
 *   post:
 *     summary: Change password (authenticated user)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Current password is incorrect
 *       401:
 *         description: Unauthorized
 */
router.post('/change-password', verifyJWT, changePasswordValidation, AuthController.changePassword);

/**
 * @swagger
 * /auth/me-jwt:
 *   get:
 *     summary: Get current user (JWT authentication)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
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
 *         description: Unauthorized
 */
router.get('/me-jwt', verifyJWT, AuthController.getCurrentUser);

/**
 * @swagger
 * /auth/logout-jwt:
 *   post:
 *     summary: Logout user (JWT authentication)
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post('/logout-jwt', verifyJWT, AuthController.logout);

// ============================================
// CLERK AUTHENTICATION (EXISTING)
// ============================================

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