import { Request, Response } from 'express';
import { Agent, IAgent } from '@/models/Agent';
import { User } from '@/models/User';
import { logger } from '@/utils/logger';
import { AuthenticatedRequest } from './userController';

export class AgentController {
  /**
   * Get all public agents
   * GET /api/v1/agents
   */
  static async getAllAgents(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const skip = (page - 1) * limit;

      // Build filters
      const filters: any = { isPublic: true, status: 'active' };
      
      if (req.query.category) {
        filters.category = req.query.category;
      }
      
      if (req.query.author) {
        filters.authorId = req.query.author;
      }
      
      if (req.query.featured === 'true') {
        filters.isFeatured = true;
      }
      
      if (req.query.pricing) {
        filters['pricing.tier'] = req.query.pricing;
      }

      // Build sort
      let sort: any = { createdAt: -1 };
      switch (req.query.sort) {
        case 'popular':
          sort = { downloads: -1, rating: -1 };
          break;
        case 'rating':
          sort = { rating: -1, downloads: -1 };
          break;
        case 'newest':
          sort = { createdAt: -1 };
          break;
        case 'oldest':
          sort = { createdAt: 1 };
          break;
        case 'name':
          sort = { name: 1 };
          break;
      }

      let query;
      
      // Search functionality
      if (req.query.search) {
        query = Agent.searchAgents(req.query.search as string, filters);
      } else {
        query = Agent.find(filters).sort(sort);
      }

      const [agents, total] = await Promise.all([
        query.skip(skip).limit(limit).populate('authorId', 'firstName lastName email'),
        Agent.countDocuments(filters)
      ]);

      const totalPages = Math.ceil(total / limit);

      res.json({
        status: 'success',
        data: {
          agents,
          pagination: {
            page,
            limit,
            total,
            totalPages,
            hasMore: page < totalPages
          },
          filters: {
            category: req.query.category || null,
            author: req.query.author || null,
            featured: req.query.featured === 'true',
            pricing: req.query.pricing || null,
            search: req.query.search || null,
            sort: req.query.sort || 'newest'
          }
        }
      });

    } catch (error) {
      logger.error('Error getting agents:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get agent by ID
   * GET /api/v1/agents/:id
   */
  static async getAgentById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const agent = await Agent.findById(id).populate('authorId', 'firstName lastName email avatar');

      if (!agent) {
        return res.status(404).json({
          status: 'error',
          message: 'Agent not found'
        });
      }

      // Check if agent is public or user owns it
      const userClerkId = (req as AuthenticatedRequest).user?.clerkId;
      const isOwner = agent.authorId === userClerkId;
      
      if (!agent.isPublic && !isOwner) {
        return res.status(403).json({
          status: 'error',
          message: 'Access denied: Agent is private'
        });
      }

      res.json({
        status: 'success',
        data: { agent }
      });

    } catch (error) {
      logger.error('Error getting agent:', error);
      
      if (error.name === 'CastError') {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid agent ID format'
        });
      }
      
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Create new agent
   * POST /api/v1/agents
   */
  static async createAgent(req: AuthenticatedRequest, res: Response) {
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

      if (!user.canCreateAgent) {
        return res.status(403).json({
          status: 'error',
          message: 'Agent creation limit reached for your subscription tier'
        });
      }

      const agentData = {
        ...req.body,
        authorId: clerkId,
        author: user.fullName || user.email
      };

      const agent = new Agent(agentData);
      await agent.save();

      // Update user's agent count
      await user.incrementUsage('agents');

      logger.info(`New agent created: ${agent._id} by user: ${clerkId}`);

      res.status(201).json({
        status: 'success',
        data: { agent },
        message: 'Agent created successfully'
      });

    } catch (error) {
      logger.error('Error creating agent:', error);
      
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
   * Update agent
   * PUT /api/v1/agents/:id
   */
  static async updateAgent(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const clerkId = req.user?.clerkId;

      if (!clerkId) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized: No user ID provided'
        });
      }

      const agent = await Agent.findById(id);

      if (!agent) {
        return res.status(404).json({
          status: 'error',
          message: 'Agent not found'
        });
      }

      // Check if user owns the agent or is admin
      const user = await User.findByClerkId(clerkId);
      const isOwner = agent.authorId === clerkId;
      const isAdmin = user?.role === 'admin';

      if (!isOwner && !isAdmin) {
        return res.status(403).json({
          status: 'error',
          message: 'Access denied: You can only update your own agents'
        });
      }

      // Filter out fields that shouldn't be updated by regular users
      const updates = { ...req.body };
      if (!isAdmin) {
        delete updates.isFeatured;
        delete updates.verificationStatus;
        delete updates.downloads;
        delete updates.installs;
        delete updates.rating;
        delete updates.reviews;
      }

      Object.assign(agent, updates);
      await agent.save();

      res.json({
        status: 'success',
        data: { agent },
        message: 'Agent updated successfully'
      });

    } catch (error) {
      logger.error('Error updating agent:', error);
      
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
   * Delete agent
   * DELETE /api/v1/agents/:id
   */
  static async deleteAgent(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const clerkId = req.user?.clerkId;

      if (!clerkId) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized: No user ID provided'
        });
      }

      const agent = await Agent.findById(id);

      if (!agent) {
        return res.status(404).json({
          status: 'error',
          message: 'Agent not found'
        });
      }

      // Check if user owns the agent or is admin
      const user = await User.findByClerkId(clerkId);
      const isOwner = agent.authorId === clerkId;
      const isAdmin = user?.role === 'admin';

      if (!isOwner && !isAdmin) {
        return res.status(403).json({
          status: 'error',
          message: 'Access denied: You can only delete your own agents'
        });
      }

      await Agent.findByIdAndDelete(id);

      logger.info(`Agent deleted: ${id} by user: ${clerkId}`);

      res.json({
        status: 'success',
        message: 'Agent deleted successfully'
      });

    } catch (error) {
      logger.error('Error deleting agent:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get user's agents
   * GET /api/v1/agents/my-agents
   */
  static async getMyAgents(req: AuthenticatedRequest, res: Response) {
    try {
      const clerkId = req.user?.clerkId;

      if (!clerkId) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized: No user ID provided'
        });
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const skip = (page - 1) * limit;

      const filters: any = { authorId: clerkId };
      
      if (req.query.status) {
        filters.status = req.query.status;
      }

      const [agents, total] = await Promise.all([
        Agent.find(filters)
          .sort({ updatedAt: -1 })
          .skip(skip)
          .limit(limit),
        Agent.countDocuments(filters)
      ]);

      const totalPages = Math.ceil(total / limit);

      res.json({
        status: 'success',
        data: {
          agents,
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
      logger.error('Error getting user agents:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Add review to agent
   * POST /api/v1/agents/:id/reviews
   */
  static async addReview(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { rating, comment } = req.body;
      const clerkId = req.user?.clerkId;

      if (!clerkId) {
        return res.status(401).json({
          status: 'error',
          message: 'Unauthorized: No user ID provided'
        });
      }

      if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({
          status: 'error',
          message: 'Rating must be between 1 and 5'
        });
      }

      const agent = await Agent.findById(id);

      if (!agent) {
        return res.status(404).json({
          status: 'error',
          message: 'Agent not found'
        });
      }

      if (!agent.isPublic) {
        return res.status(403).json({
          status: 'error',
          message: 'Cannot review private agents'
        });
      }

      if (agent.authorId === clerkId) {
        return res.status(403).json({
          status: 'error',
          message: 'Cannot review your own agent'
        });
      }

      await agent.addReview(clerkId, rating, comment);

      res.status(201).json({
        status: 'success',
        message: 'Review added successfully'
      });

    } catch (error) {
      logger.error('Error adding review:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Install agent (increment install count)
   * POST /api/v1/agents/:id/install
   */
  static async installAgent(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;

      const agent = await Agent.findById(id);

      if (!agent) {
        return res.status(404).json({
          status: 'error',
          message: 'Agent not found'
        });
      }

      if (!agent.isPublic) {
        return res.status(403).json({
          status: 'error',
          message: 'Cannot install private agent'
        });
      }

      await agent.incrementInstalls();
      await agent.incrementDownloads(); // Also increment downloads

      res.json({
        status: 'success',
        message: 'Agent installed successfully',
        data: {
          installs: agent.installs,
          downloads: agent.downloads
        }
      });

    } catch (error) {
      logger.error('Error installing agent:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get agent categories
   * GET /api/v1/agents/categories
   */
  static async getCategories(req: Request, res: Response) {
    try {
      const categories = await Agent.aggregate([
        {
          $match: { isPublic: true, status: 'active' }
        },
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
            avgRating: { $avg: '$rating' },
            totalDownloads: { $sum: '$downloads' }
          }
        },
        {
          $project: {
            category: '$_id',
            count: 1,
            avgRating: { $round: ['$avgRating', 1] },
            totalDownloads: 1,
            _id: 0
          }
        },
        {
          $sort: { count: -1 }
        }
      ]);

      res.json({
        status: 'success',
        data: { categories }
      });

    } catch (error) {
      logger.error('Error getting categories:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get featured agents
   * GET /api/v1/agents/featured
   */
  static async getFeaturedAgents(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;

      const agents = await Agent.findFeatured()
        .limit(limit)
        .populate('authorId', 'firstName lastName email avatar');

      res.json({
        status: 'success',
        data: { agents }
      });

    } catch (error) {
      logger.error('Error getting featured agents:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get popular agents
   * GET /api/v1/agents/popular
   */
  static async getPopularAgents(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 10;

      const agents = await Agent.getPopular(limit)
        .populate('authorId', 'firstName lastName email avatar');

      res.json({
        status: 'success',
        data: { agents }
      });

    } catch (error) {
      logger.error('Error getting popular agents:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }

  /**
   * Get agent statistics (Admin only)
   * GET /api/v1/agents/stats
   */
  static async getStats(req: AuthenticatedRequest, res: Response) {
    try {
      const user = await User.findByClerkId(req.user?.clerkId || '');
      
      if (!user || user.role !== 'admin') {
        return res.status(403).json({
          status: 'error',
          message: 'Forbidden: Admin access required'
        });
      }

      const stats = await Agent.getStats();
      
      const totalAgents = await Agent.countDocuments({ isPublic: true, status: 'active' });
      const pendingReview = await Agent.countDocuments({ verificationStatus: 'pending' });

      res.json({
        status: 'success',
        data: {
          totalAgents,
          pendingReview,
          categoryStats: stats,
          generatedAt: new Date().toISOString()
        }
      });

    } catch (error) {
      logger.error('Error getting agent stats:', error);
      res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    }
  }
}