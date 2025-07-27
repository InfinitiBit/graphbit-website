import { Router } from 'express';
import { UserController } from '../../../controllers/userController';
import { requireAuth } from '../../../middleware/clerkMiddleware';
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const router = Router();

// Validation middleware
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
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
const updateProfileValidation = [
  body('firstName').optional().isString().trim().isLength({ max: 50 }),
  body('lastName').optional().isString().trim().isLength({ max: 50 }),
  body('avatar').optional().isURL().withMessage('Avatar must be a valid URL'),
  body('preferences.theme').optional().isIn(['light', 'dark', 'system']),
  body('preferences.notifications').optional().isBoolean(),
  body('preferences.newsletter').optional().isBoolean(),
  body('preferences.language').optional().isString().isLength({ max: 10 }),
  body('preferences.timezone').optional().isString().isLength({ max: 50 }),
  handleValidationErrors
];

const updatePreferencesValidation = [
  body('theme').optional().isIn(['light', 'dark', 'system']),
  body('notifications').optional().isBoolean(),
  body('newsletter').optional().isBoolean(),
  body('language').optional().isString().isLength({ max: 10 }),
  body('timezone').optional().isString().isLength({ max: 50 }),
  handleValidationErrors
];

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: User ID
 *         clerkId:
 *           type: string
 *           description: Clerk user ID
 *         email:
 *           type: string
 *           format: email
 *           description: User email
 *         firstName:
 *           type: string
 *           description: First name
 *         lastName:
 *           type: string
 *           description: Last name
 *         fullName:
 *           type: string
 *           description: Full name
 *         avatar:
 *           type: string
 *           format: uri
 *           description: Avatar URL
 *         role:
 *           type: string
 *           enum: [user, admin, moderator]
 *           description: User role
 *         subscription:
 *           $ref: '#/components/schemas/UserSubscription'
 *         preferences:
 *           $ref: '#/components/schemas/UserPreferences'
 *         usage:
 *           $ref: '#/components/schemas/UserUsage'
 *         isActive:
 *           type: boolean
 *           description: Whether user is active
 *         isSubscribed:
 *           type: boolean
 *           description: Whether user has active subscription
 *         canCreateAgent:
 *           type: boolean
 *           description: Whether user can create agents
 *         canMakeApiCall:
 *           type: boolean
 *           description: Whether user can make API calls
 *         lastLoginAt:
 *           type: string
 *           format: date-time
 *           description: Last login timestamp
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Account creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Last update timestamp
 *     
 *     UserSubscription:
 *       type: object
 *       properties:
 *         tier:
 *           type: string
 *           enum: [free, premium, enterprise]
 *         status:
 *           type: string
 *           enum: [active, inactive, cancelled, past_due]
 *         currentPeriodStart:
 *           type: string
 *           format: date-time
 *         currentPeriodEnd:
 *           type: string
 *           format: date-time
 *     
 *     UserPreferences:
 *       type: object
 *       properties:
 *         theme:
 *           type: string
 *           enum: [light, dark, system]
 *         notifications:
 *           type: boolean
 *         newsletter:
 *           type: boolean
 *         language:
 *           type: string
 *         timezone:
 *           type: string
 *     
 *     UserUsage:
 *       type: object
 *       properties:
 *         agentsCreated:
 *           type: number
 *         tracesGenerated:
 *           type: number
 *         apiCallsThisMonth:
 *           type: number
 *         lastApiCall:
 *           type: string
 *           format: date-time
 *         totalTokensUsed:
 *           type: number
 *         monthlyTokenLimit:
 *           type: number
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - clerkAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
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
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get('/profile', requireAuth, UserController.getProfile);

/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - clerkAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 maxLength: 50
 *               lastName:
 *                 type: string
 *                 maxLength: 50
 *               avatar:
 *                 type: string
 *                 format: uri
 *               preferences:
 *                 $ref: '#/components/schemas/UserPreferences'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.put('/profile', requireAuth, updateProfileValidation, UserController.updateProfile);

/**
 * @swagger
 * /users/stats:
 *   get:
 *     summary: Get user statistics
 *     tags: [Users]
 *     security:
 *       - clerkAuth: []
 *     responses:
 *       200:
 *         description: User statistics retrieved successfully
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
 *                     stats:
 *                       type: object
 *                       properties:
 *                         usage:
 *                           $ref: '#/components/schemas/UserUsage'
 *                         subscription:
 *                           $ref: '#/components/schemas/UserSubscription'
 *                         limits:
 *                           type: object
 *                         account:
 *                           type: object
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.get('/stats', requireAuth, UserController.getStats);

/**
 * @swagger
 * /users/preferences:
 *   patch:
 *     summary: Update user preferences
 *     tags: [Users]
 *     security:
 *       - clerkAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserPreferences'
 *     responses:
 *       200:
 *         description: Preferences updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.patch('/preferences', requireAuth, updatePreferencesValidation, UserController.updatePreferences);

/**
 * @swagger
 * /users/account:
 *   delete:
 *     summary: Delete user account (soft delete)
 *     tags: [Users]
 *     security:
 *       - clerkAuth: []
 *     responses:
 *       200:
 *         description: Account deactivated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete('/account', requireAuth, UserController.deleteAccount);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - clerkAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *         description: Number of users per page
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [user, admin, moderator]
 *         description: Filter by role
 *       - in: query
 *         name: subscription
 *         schema:
 *           type: string
 *           enum: [free, premium, enterprise]
 *         description: Filter by subscription tier
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/', requireAuth, UserController.getAllUsers);

/**
 * @swagger
 * /users/analytics:
 *   get:
 *     summary: Get user analytics (Admin only)
 *     tags: [Users]
 *     security:
 *       - clerkAuth: []
 *     responses:
 *       200:
 *         description: User analytics retrieved successfully
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
 *                     totalUsers:
 *                       type: number
 *                     newUsersThisMonth:
 *                       type: number
 *                     subscriptionStats:
 *                       type: array
 *                     generatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/analytics', requireAuth, UserController.getAnalytics);

export default router;