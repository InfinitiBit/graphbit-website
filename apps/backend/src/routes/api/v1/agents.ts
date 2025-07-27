import { Router } from 'express';
import { AgentController } from '../../../controllers/agentController';
import { requireAuth, optionalAuth } from '../../../middleware/clerkMiddleware';
import { body, query, param, validationResult } from 'express-validator';
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
const createAgentValidation = [
  body('name').isString().trim().isLength({ min: 1, max: 100 }).withMessage('Name must be 1-100 characters'),
  body('description').isString().trim().isLength({ min: 1, max: 500 }).withMessage('Description must be 1-500 characters'),
  body('longDescription').optional().isString().isLength({ max: 5000 }).withMessage('Long description must be max 5000 characters'),
  body('category').isIn(['chatbot', 'analyzer', 'generator', 'translator', 'classifier', 'code-assistant', 'other']),
  body('subcategory').optional().isString().trim().isLength({ max: 50 }),
  body('version').optional().isString().trim().matches(/^\d+\.\d+\.\d+$/).withMessage('Version must follow semver format (x.y.z)'),
  body('tags').optional().isArray().custom((tags) => {
    if (tags.some((tag: any) => typeof tag !== 'string' || tag.length > 30)) {
      throw new Error('Tags must be strings with max 30 characters each');
    }
    return true;
  }),
  body('repositoryUrl').optional().isURL().withMessage('Repository URL must be valid'),
  body('documentationUrl').optional().isURL().withMessage('Documentation URL must be valid'),
  body('demoUrl').optional().isURL().withMessage('Demo URL must be valid'),
  body('imageUrl').optional().isURL().withMessage('Image URL must be valid'),
  body('settings.temperature').optional().isFloat({ min: 0, max: 2 }),
  body('settings.maxTokens').optional().isInt({ min: 1, max: 4096 }),
  body('settings.systemPrompt').optional().isString().isLength({ max: 2000 }),
  body('models.primary').optional().isString().trim(),
  body('models.fallback').optional().isArray(),
  body('models.supportedModels').optional().isArray(),
  body('isPublic').optional().isBoolean(),
  body('pricing.tier').optional().isIn(['free', 'premium', 'enterprise', 'custom']),
  body('pricing.costPerCall').optional().isFloat({ min: 0 }),
  body('pricing.monthlyPrice').optional().isFloat({ min: 0 }),
  handleValidationErrors
];

const updateAgentValidation = [
  param('id').isMongoId().withMessage('Invalid agent ID'),
  body('name').optional().isString().trim().isLength({ min: 1, max: 100 }),
  body('description').optional().isString().trim().isLength({ min: 1, max: 500 }),
  body('longDescription').optional().isString().isLength({ max: 5000 }),
  body('category').optional().isIn(['chatbot', 'analyzer', 'generator', 'translator', 'classifier', 'code-assistant', 'other']),
  body('subcategory').optional().isString().trim().isLength({ max: 50 }),
  body('version').optional().isString().trim().matches(/^\d+\.\d+\.\d+$/),
  body('tags').optional().isArray(),
  body('repositoryUrl').optional().isURL(),
  body('documentationUrl').optional().isURL(),
  body('demoUrl').optional().isURL(),
  body('imageUrl').optional().isURL(),
  body('settings').optional().isObject(),
  body('models').optional().isObject(),
  body('isPublic').optional().isBoolean(),
  body('pricing').optional().isObject(),
  body('status').optional().isIn(['active', 'deprecated', 'maintenance', 'draft']),
  handleValidationErrors
];

const addReviewValidation = [
  param('id').isMongoId().withMessage('Invalid agent ID'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isString().isLength({ max: 1000 }).withMessage('Comment must be max 1000 characters'),
  handleValidationErrors
];

const queryValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('category').optional().isIn(['chatbot', 'analyzer', 'generator', 'translator', 'classifier', 'code-assistant', 'other']),
  query('pricing').optional().isIn(['free', 'premium', 'enterprise', 'custom']),
  query('sort').optional().isIn(['popular', 'rating', 'newest', 'oldest', 'name']),
  query('featured').optional().isBoolean(),
  query('search').optional().isString().isLength({ min: 1, max: 100 }),
  handleValidationErrors
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Agent:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Agent ID
 *         name:
 *           type: string
 *           description: Agent name
 *         description:
 *           type: string
 *           description: Short description
 *         longDescription:
 *           type: string
 *           description: Detailed description
 *         category:
 *           type: string
 *           enum: [chatbot, analyzer, generator, translator, classifier, code-assistant, other]
 *         subcategory:
 *           type: string
 *         version:
 *           type: string
 *           pattern: ^\d+\.\d+\.\d+$
 *         author:
 *           type: string
 *         authorId:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         repositoryUrl:
 *           type: string
 *           format: uri
 *         documentationUrl:
 *           type: string
 *           format: uri
 *         imageUrl:
 *           type: string
 *           format: uri
 *         demoUrl:
 *           type: string
 *           format: uri
 *         settings:
 *           $ref: '#/components/schemas/AgentSettings'
 *         models:
 *           $ref: '#/components/schemas/AgentModels'
 *         isPublic:
 *           type: boolean
 *         isFeatured:
 *           type: boolean
 *         isPaid:
 *           type: boolean
 *         pricing:
 *           $ref: '#/components/schemas/AgentPricing'
 *         downloads:
 *           type: number
 *         installs:
 *           type: number
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *         reviewCount:
 *           type: number
 *         reviews:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/AgentReview'
 *         performance:
 *           $ref: '#/components/schemas/AgentPerformance'
 *         status:
 *           type: string
 *           enum: [active, deprecated, maintenance, draft]
 *         verificationStatus:
 *           type: string
 *           enum: [pending, verified, rejected]
 *         publishedAt:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         averageRating:
 *           type: number
 *         isVerified:
 *           type: boolean
 *         isAvailable:
 *           type: boolean
 *     
 *     AgentSettings:
 *       type: object
 *       properties:
 *         temperature:
 *           type: number
 *           minimum: 0
 *           maximum: 2
 *         maxTokens:
 *           type: number
 *           minimum: 1
 *           maximum: 4096
 *         systemPrompt:
 *           type: string
 *           maxLength: 2000
 *         topP:
 *           type: number
 *           minimum: 0
 *           maximum: 1
 *         frequencyPenalty:
 *           type: number
 *           minimum: -2
 *           maximum: 2
 *         presencePenalty:
 *           type: number
 *           minimum: -2
 *           maximum: 2
 *     
 *     AgentModels:
 *       type: object
 *       properties:
 *         primary:
 *           type: string
 *         fallback:
 *           type: array
 *           items:
 *             type: string
 *         supportedModels:
 *           type: array
 *           items:
 *             type: string
 *     
 *     AgentPricing:
 *       type: object
 *       properties:
 *         tier:
 *           type: string
 *           enum: [free, premium, enterprise, custom]
 *         costPerCall:
 *           type: number
 *           minimum: 0
 *         monthlyPrice:
 *           type: number
 *           minimum: 0
 *         currency:
 *           type: string
 *           default: USD
 *     
 *     AgentPerformance:
 *       type: object
 *       properties:
 *         avgResponseTime:
 *           type: number
 *         uptime:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *         successRate:
 *           type: number
 *           minimum: 0
 *           maximum: 100
 *         totalCalls:
 *           type: number
 *         lastUpdated:
 *           type: string
 *           format: date-time
 *     
 *     AgentReview:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *         comment:
 *           type: string
 *           maxLength: 1000
 *         helpful:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /agents:
 *   get:
 *     summary: Get all public agents
 *     tags: [Agents]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [chatbot, analyzer, generator, translator, classifier, code-assistant, other]
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: pricing
 *         schema:
 *           type: string
 *           enum: [free, premium, enterprise, custom]
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [popular, rating, newest, oldest, name]
 *           default: newest
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           maxLength: 100
 *     responses:
 *       200:
 *         description: Agents retrieved successfully
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
 *                     agents:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Agent'
 *                     pagination:
 *                       type: object
 *                     filters:
 *                       type: object
 */
router.get('/', queryValidation, AgentController.getAllAgents);

/**
 * @swagger
 * /agents/my-agents:
 *   get:
 *     summary: Get user's agents
 *     tags: [Agents]
 *     security:
 *       - clerkAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, deprecated, maintenance, draft]
 *     responses:
 *       200:
 *         description: User's agents retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/my-agents', requireAuth, AgentController.getMyAgents);

/**
 * @swagger
 * /agents/categories:
 *   get:
 *     summary: Get agent categories with statistics
 *     tags: [Agents]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
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
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           category:
 *                             type: string
 *                           count:
 *                             type: number
 *                           avgRating:
 *                             type: number
 *                           totalDownloads:
 *                             type: number
 */
router.get('/categories', AgentController.getCategories);

/**
 * @swagger
 * /agents/featured:
 *   get:
 *     summary: Get featured agents
 *     tags: [Agents]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *     responses:
 *       200:
 *         description: Featured agents retrieved successfully
 */
router.get('/featured', AgentController.getFeaturedAgents);

/**
 * @swagger
 * /agents/popular:
 *   get:
 *     summary: Get popular agents
 *     tags: [Agents]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *     responses:
 *       200:
 *         description: Popular agents retrieved successfully
 */
router.get('/popular', AgentController.getPopularAgents);

/**
 * @swagger
 * /agents/stats:
 *   get:
 *     summary: Get agent statistics (Admin only)
 *     tags: [Agents]
 *     security:
 *       - clerkAuth: []
 *     responses:
 *       200:
 *         description: Agent statistics retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get('/stats', requireAuth, AgentController.getStats);

/**
 * @swagger
 * /agents:
 *   post:
 *     summary: Create new agent
 *     tags: [Agents]
 *     security:
 *       - clerkAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 500
 *               longDescription:
 *                 type: string
 *                 maxLength: 5000
 *               category:
 *                 type: string
 *                 enum: [chatbot, analyzer, generator, translator, classifier, code-assistant, other]
 *               subcategory:
 *                 type: string
 *                 maxLength: 50
 *               version:
 *                 type: string
 *                 pattern: ^\d+\.\d+\.\d+$
 *                 default: 1.0.0
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                   maxLength: 30
 *               repositoryUrl:
 *                 type: string
 *                 format: uri
 *               documentationUrl:
 *                 type: string
 *                 format: uri
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *               demoUrl:
 *                 type: string
 *                 format: uri
 *               settings:
 *                 $ref: '#/components/schemas/AgentSettings'
 *               models:
 *                 $ref: '#/components/schemas/AgentModels'
 *               isPublic:
 *                 type: boolean
 *                 default: false
 *               pricing:
 *                 $ref: '#/components/schemas/AgentPricing'
 *     responses:
 *       201:
 *         description: Agent created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Agent creation limit reached
 */
router.post('/', requireAuth, createAgentValidation, AgentController.createAgent);

/**
 * @swagger
 * /agents/{id}:
 *   get:
 *     summary: Get agent by ID
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Agent ID
 *     responses:
 *       200:
 *         description: Agent retrieved successfully
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
 *                     agent:
 *                       $ref: '#/components/schemas/Agent'
 *       400:
 *         description: Invalid agent ID format
 *       403:
 *         description: Access denied - Agent is private
 *       404:
 *         description: Agent not found
 */
router.get('/:id', optionalAuth, AgentController.getAgentById);

/**
 * @swagger
 * /agents/{id}:
 *   put:
 *     summary: Update agent
 *     tags: [Agents]
 *     security:
 *       - clerkAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Agent ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 500
 *               longDescription:
 *                 type: string
 *                 maxLength: 5000
 *               category:
 *                 type: string
 *                 enum: [chatbot, analyzer, generator, translator, classifier, code-assistant, other]
 *               subcategory:
 *                 type: string
 *                 maxLength: 50
 *               version:
 *                 type: string
 *                 pattern: ^\d+\.\d+\.\d+$
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                   maxLength: 30
 *               repositoryUrl:
 *                 type: string
 *                 format: uri
 *               documentationUrl:
 *                 type: string
 *                 format: uri
 *               imageUrl:
 *                 type: string
 *                 format: uri
 *               demoUrl:
 *                 type: string
 *                 format: uri
 *               settings:
 *                 $ref: '#/components/schemas/AgentSettings'
 *               models:
 *                 $ref: '#/components/schemas/AgentModels'
 *               isPublic:
 *                 type: boolean
 *               pricing:
 *                 $ref: '#/components/schemas/AgentPricing'
 *               status:
 *                 type: string
 *                 enum: [active, deprecated, maintenance, draft]
 *     responses:
 *       200:
 *         description: Agent updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied - You can only update your own agents
 *       404:
 *         description: Agent not found
 */
router.put('/:id', requireAuth, updateAgentValidation, AgentController.updateAgent);

/**
 * @swagger
 * /agents/{id}:
 *   delete:
 *     summary: Delete agent
 *     tags: [Agents]
 *     security:
 *       - clerkAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Agent ID
 *     responses:
 *       200:
 *         description: Agent deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied - You can only delete your own agents
 *       404:
 *         description: Agent not found
 */
router.delete('/:id', requireAuth, AgentController.deleteAgent);

/**
 * @swagger
 * /agents/{id}/reviews:
 *   post:
 *     summary: Add review to agent
 *     tags: [Agents]
 *     security:
 *       - clerkAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Agent ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               comment:
 *                 type: string
 *                 maxLength: 1000
 *     responses:
 *       201:
 *         description: Review added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Cannot review private agents or your own agent
 *       404:
 *         description: Agent not found
 */
router.post('/:id/reviews', requireAuth, addReviewValidation, AgentController.addReview);

/**
 * @swagger
 * /agents/{id}/install:
 *   post:
 *     summary: Install agent (increment install count)
 *     tags: [Agents]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Agent ID
 *     responses:
 *       200:
 *         description: Agent installed successfully
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
 *                   example: Agent installed successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     installs:
 *                       type: number
 *                     downloads:
 *                       type: number
 *       403:
 *         description: Cannot install private agent
 *       404:
 *         description: Agent not found
 */
router.post('/:id/install', AgentController.installAgent);

export default router;