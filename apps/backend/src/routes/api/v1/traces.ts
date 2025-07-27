import { Router } from 'express';
import { Trace } from '../../../models/Trace';
import { Agent } from '../../../models/Agent';
import { User } from '../../../models/User';
import { requireAuth, optionalAuth } from '../../../middleware/clerkMiddleware';
import { body, query, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../utils/logger';
import { AuthenticatedRequest } from '../../../controllers/userController';

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
const createTraceValidation = [
  body('agentId').isMongoId().withMessage('Invalid agent ID'),
  body('input').isString().isLength({ min: 1, max: 50000 }).withMessage('Input must be 1-50000 characters'),
  body('output').isString().isLength({ min: 1, max: 50000 }).withMessage('Output must be 1-50000 characters'),
  body('modelName').isString().trim().isLength({ min: 1 }).withMessage('Model name is required'),
  body('sessionId').isString().trim().isLength({ min: 1 }).withMessage('Session ID is required'),
  body('tokenUsage.promptTokens').isInt({ min: 0 }).withMessage('Prompt tokens must be non-negative'),
  body('tokenUsage.completionTokens').isInt({ min: 0 }).withMessage('Completion tokens must be non-negative'),
  body('tokenUsage.totalTokens').isInt({ min: 0 }).withMessage('Total tokens must be non-negative'),
  body('tokenUsage.estimatedCost').isFloat({ min: 0 }).withMessage('Estimated cost must be non-negative'),
  body('timing.queueTime').isFloat({ min: 0 }).withMessage('Queue time must be non-negative'),
  body('timing.processingTime').isFloat({ min: 0 }).withMessage('Processing time must be non-negative'),
  body('timing.totalTime').isFloat({ min: 0 }).withMessage('Total time must be non-negative'),
  body('status').optional().isIn(['pending', 'processing', 'success', 'error', 'timeout', 'cancelled']),
  body('tags').optional().isArray(),
  body('conversationId').optional().isString().trim(),
  body('parentTraceId').optional().isMongoId(),
  handleValidationErrors
];

const feedbackValidation = [
  param('id').isMongoId().withMessage('Invalid trace ID'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isString().isLength({ max: 1000 }).withMessage('Comment must be max 1000 characters'),
  body('helpful').optional().isBoolean(),
  handleValidationErrors
];

const queryValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(['pending', 'processing', 'success', 'error', 'timeout', 'cancelled']),
  query('agentId').optional().isMongoId().withMessage('Invalid agent ID'),
  query('sessionId').optional().isString(),
  query('conversationId').optional().isString(),
  query('modelName').optional().isString(),
  query('startDate').optional().isISO8601().withMessage('Start date must be ISO 8601 format'),
  query('endDate').optional().isISO8601().withMessage('End date must be ISO 8601 format'),
  handleValidationErrors
];

/**
 * @swagger
 * /traces:
 *   get:
 *     summary: Get user's traces
 *     tags: [Traces]
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
 *           enum: [pending, processing, success, error, timeout, cancelled]
 *       - in: query
 *         name: agentId
 *         schema:
 *           type: string
 *       - in: query
 *         name: sessionId
 *         schema:
 *           type: string
 *       - in: query
 *         name: conversationId
 *         schema:
 *           type: string
 *       - in: query
 *         name: modelName
 *         schema:
 *           type: string
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: Traces retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/', requireAuth, queryValidation, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clerkId = req.user?.clerkId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    // Build filters
    const filters: any = { userId: clerkId };
    
    if (req.query.status) {
      filters.status = req.query.status;
    }
    
    if (req.query.agentId) {
      filters.agentId = req.query.agentId;
    }
    
    if (req.query.sessionId) {
      filters.sessionId = req.query.sessionId;
    }
    
    if (req.query.conversationId) {
      filters.conversationId = req.query.conversationId;
    }
    
    if (req.query.modelName) {
      filters.modelName = req.query.modelName;
    }

    // Date range filter
    if (req.query.startDate || req.query.endDate) {
      filters.createdAt = {};
      if (req.query.startDate) {
        filters.createdAt.$gte = new Date(req.query.startDate as string);
      }
      if (req.query.endDate) {
        filters.createdAt.$lte = new Date(req.query.endDate as string);
      }
    }

    const [traces, total] = await Promise.all([
      Trace.find(filters)
        .populate('agentId', 'name description category')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Trace.countDocuments(filters)
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      status: 'success',
      data: {
        traces,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasMore: page < totalPages
        },
        filters: {
          status: req.query.status || null,
          agentId: req.query.agentId || null,
          sessionId: req.query.sessionId || null,
          conversationId: req.query.conversationId || null,
          modelName: req.query.modelName || null,
          startDate: req.query.startDate || null,
          endDate: req.query.endDate || null
        }
      }
    });

  } catch (error) {
    logger.error('Error getting traces:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /traces:
 *   post:
 *     summary: Create new trace
 *     tags: [Traces]
 *     security:
 *       - clerkAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - agentId
 *               - input
 *               - output
 *               - modelName
 *               - sessionId
 *               - tokenUsage
 *               - timing
 *             properties:
 *               agentId:
 *                 type: string
 *               input:
 *                 type: string
 *                 maxLength: 50000
 *               output:
 *                 type: string
 *                 maxLength: 50000
 *               modelName:
 *                 type: string
 *               sessionId:
 *                 type: string
 *               conversationId:
 *                 type: string
 *               parentTraceId:
 *                 type: string
 *               tokenUsage:
 *                 type: object
 *                 properties:
 *                   promptTokens:
 *                     type: integer
 *                   completionTokens:
 *                     type: integer
 *                   totalTokens:
 *                     type: integer
 *                   estimatedCost:
 *                     type: number
 *               timing:
 *                 type: object
 *                 properties:
 *                   queueTime:
 *                     type: number
 *                   processingTime:
 *                     type: number
 *                   totalTime:
 *                     type: number
 *               status:
 *                 type: string
 *                 enum: [pending, processing, success, error, timeout, cancelled]
 *                 default: success
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               metadata:
 *                 type: object
 *     responses:
 *       201:
 *         description: Trace created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: API call limit reached
 *       404:
 *         description: Agent not found
 */
router.post('/', requireAuth, createTraceValidation, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clerkId = req.user?.clerkId;

    if (!clerkId) {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized: No user ID provided'
      });
    }

    // Check if user can make API calls
    const user = await User.findByClerkId(clerkId);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    if (!user.canMakeApiCall) {
      return res.status(403).json({
        status: 'error',
        message: 'Monthly API call limit reached'
      });
    }

    // Verify agent exists and user has access
    const agent = await Agent.findById(req.body.agentId);
    if (!agent) {
      return res.status(404).json({
        status: 'error',
        message: 'Agent not found'
      });
    }

    // Check if user can access the agent (public or owns it)
    if (!agent.isPublic && agent.authorId !== clerkId) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied: Agent is private'
      });
    }

    const traceData = {
      ...req.body,
      userId: clerkId,
      agentName: agent.name,
      startedAt: new Date(),
      completedAt: req.body.status === 'success' ? new Date() : undefined,
      metadata: {
        ...req.body.metadata,
        userAgent: req.get('User-Agent'),
        ip: req.ip
      }
    };

    const trace = new Trace(traceData);
    await trace.save();

    // Update user's trace count and agent performance
    await Promise.all([
      user.incrementUsage('traces'),
      agent.updatePerformance({
        totalCalls: agent.performance.totalCalls + 1,
        avgResponseTime: (agent.performance.avgResponseTime + req.body.timing.totalTime) / 2
      })
    ]);

    logger.info(`New trace created: ${trace._id} by user: ${clerkId}`);

    res.status(201).json({
      status: 'success',
      data: { trace },
      message: 'Trace created successfully'
    });

  } catch (error) {
    logger.error('Error creating trace:', error);
    
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
});

/**
 * @swagger
 * /traces/{id}:
 *   get:
 *     summary: Get trace by ID
 *     tags: [Traces]
 *     security:
 *       - clerkAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trace ID
 *     responses:
 *       200:
 *         description: Trace retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       404:
 *         description: Trace not found
 */
router.get('/:id', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const clerkId = req.user?.clerkId;

    const trace = await Trace.findById(id).populate('agentId', 'name description category author');

    if (!trace) {
      return res.status(404).json({
        status: 'error',
        message: 'Trace not found'
      });
    }

    // Check if user owns the trace or is admin
    const user = await User.findByClerkId(clerkId || '');
    const isOwner = trace.userId === clerkId;
    const isAdmin = user?.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied: You can only view your own traces'
      });
    }

    res.json({
      status: 'success',
      data: { trace }
    });

  } catch (error) {
    logger.error('Error getting trace:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid trace ID format'
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /traces/{id}/feedback:
 *   post:
 *     summary: Add feedback to trace
 *     tags: [Traces]
 *     security:
 *       - clerkAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Trace ID
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
 *               helpful:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Feedback added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Access denied
 *       404:
 *         description: Trace not found
 */
router.post('/:id/feedback', requireAuth, feedbackValidation, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, comment, helpful } = req.body;
    const clerkId = req.user?.clerkId;

    const trace = await Trace.findById(id);

    if (!trace) {
      return res.status(404).json({
        status: 'error',
        message: 'Trace not found'
      });
    }

    // Check if user owns the trace
    if (trace.userId !== clerkId) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied: You can only provide feedback on your own traces'
      });
    }

    await trace.addFeedback(rating, comment, helpful);

    res.json({
      status: 'success',
      message: 'Feedback added successfully'
    });

  } catch (error) {
    logger.error('Error adding trace feedback:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

/**
 * @swagger
 * /traces/analytics:
 *   get:
 *     summary: Get trace analytics
 *     tags: [Traces]
 *     security:
 *       - clerkAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: agentId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Analytics retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/analytics', requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const clerkId = req.user?.clerkId;
    
    // Build date range filter
    const dateFilter: any = {};
    if (req.query.startDate) {
      dateFilter.$gte = new Date(req.query.startDate as string);
    }
    if (req.query.endDate) {
      dateFilter.$lte = new Date(req.query.endDate as string);
    }

    const filters: any = { userId: clerkId };
    if (Object.keys(dateFilter).length > 0) {
      filters.createdAt = dateFilter;
    }
    if (req.query.agentId) {
      filters.agentId = req.query.agentId;
    }

    const analytics = await Trace.getAnalytics(filters);
    const userStats = await Trace.getUserStats(clerkId || '', 
      req.query.startDate && req.query.endDate ? {
        start: new Date(req.query.startDate as string),
        end: new Date(req.query.endDate as string)
      } : undefined
    );

    res.json({
      status: 'success',
      data: {
        analytics,
        userStats: userStats[0] || {},
        filters: {
          startDate: req.query.startDate || null,
          endDate: req.query.endDate || null,
          agentId: req.query.agentId || null
        },
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    logger.error('Error getting trace analytics:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

export default router;