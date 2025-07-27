import { Router, Request, Response } from 'express';
import { healthCheck } from '@/config/database';
import { logger } from '@/utils/logger';
import { config } from '@/config/environment';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: healthy
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                   description: Uptime in seconds
 *                 environment:
 *                   type: string
 *                 version:
 *                   type: string
 *                 database:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: string
 *                     message:
 *                       type: string
 *       503:
 *         description: Service is unhealthy
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    // Check database health
    const dbHealth = await healthCheck();
    
    const healthStatus = {
      status: dbHealth.status === 'connected' ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.NODE_ENV,
      version: '1.0.0',
      database: dbHealth,
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
        external: Math.round(process.memoryUsage().external / 1024 / 1024),
      },
      cpu: {
        usage: process.cpuUsage(),
      }
    };

    const statusCode = healthStatus.status === 'healthy' ? 200 : 503;
    
    res.status(statusCode).json(healthStatus);

  } catch (error) {
    logger.error('Health check failed:', error);
    
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      uptime: process.uptime(),
      environment: config.NODE_ENV,
      version: '1.0.0'
    });
  }
});

/**
 * @swagger
 * /health/detailed:
 *   get:
 *     summary: Detailed health check with system metrics
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Detailed system health information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 services:
 *                   type: object
 *                   properties:
 *                     database:
 *                       type: object
 *                     api:
 *                       type: object
 *                 system:
 *                   type: object
 */
router.get('/detailed', async (req: Request, res: Response) => {
  try {
    // Check database health
    const dbHealth = await healthCheck();
    
    // System metrics
    const memUsage = process.memoryUsage();
    const cpuUsage = process.cpuUsage();
    
    const detailedHealth = {
      status: dbHealth.status === 'connected' ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.NODE_ENV,
      version: '1.0.0',
      
      services: {
        database: {
          status: dbHealth.status,
          message: dbHealth.message,
          healthy: dbHealth.status === 'connected'
        },
        api: {
          status: 'connected',
          message: 'API server is running',
          healthy: true
        }
      },
      
      system: {
        memory: {
          heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024),
          heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024),
          external: Math.round(memUsage.external / 1024 / 1024),
          rss: Math.round(memUsage.rss / 1024 / 1024),
        },
        cpu: {
          user: cpuUsage.user,
          system: cpuUsage.system,
        },
        node: {
          version: process.version,
          platform: process.platform,
          arch: process.arch,
        }
      },
      
      configuration: {
        port: config.PORT,
        nodeEnv: config.NODE_ENV,
        apiVersion: config.API_VERSION,
        logLevel: config.LOG_LEVEL,
      }
    };

    const overallHealthy = Object.values(detailedHealth.services).every(service => service.healthy);
    const statusCode = overallHealthy ? 200 : 503;
    
    res.status(statusCode).json(detailedHealth);

  } catch (error) {
    logger.error('Detailed health check failed:', error);
    
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Detailed health check failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * @swagger
 * /health/ready:
 *   get:
 *     summary: Readiness probe for container orchestration
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is ready to accept traffic
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ready:
 *                   type: boolean
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       503:
 *         description: Service is not ready
 */
router.get('/ready', async (req: Request, res: Response) => {
  try {
    // Check if all critical services are ready
    const dbHealth = await healthCheck();
    const isReady = dbHealth.status === 'connected';
    
    const readinessStatus = {
      ready: isReady,
      timestamp: new Date().toISOString(),
      checks: {
        database: dbHealth.status === 'connected'
      }
    };

    const statusCode = isReady ? 200 : 503;
    res.status(statusCode).json(readinessStatus);

  } catch (error) {
    logger.error('Readiness check failed:', error);
    
    res.status(503).json({
      ready: false,
      timestamp: new Date().toISOString(),
      error: 'Readiness check failed'
    });
  }
});

/**
 * @swagger
 * /health/live:
 *   get:
 *     summary: Liveness probe for container orchestration
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is alive
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alive:
 *                   type: boolean
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 */
router.get('/live', (req: Request, res: Response) => {
  // Simple liveness check - if we can respond, we're alive
  res.json({
    alive: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    pid: process.pid
  });
});

export default router;