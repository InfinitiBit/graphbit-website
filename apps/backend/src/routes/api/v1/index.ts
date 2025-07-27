import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

// Import route modules
import authRoutes from './auth';
import userRoutes from './users';
import agentRoutes from './agents';
import traceRoutes from './traces';

const router = Router();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'GraphBit API',
      version: '1.0.0',
      description: 'GraphBit AI Agent Platform API Documentation',
      contact: {
        name: 'GraphBit Team',
        email: 'support@graphbit.com',
      },
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://api.graphbit.com/api/v1' 
          : 'http://localhost:5000/api/v1',
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        clerkAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Clerk session token',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error',
            },
            message: {
              type: 'string',
              example: 'Error message',
            },
          },
        },
        Success: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'success',
            },
            data: {
              type: 'object',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/api/v1/*.ts', './src/models/*.ts'], // Path to the API files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// API documentation route
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'GraphBit API Documentation',
}));

// Serve swagger.json
router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// API routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/agents', agentRoutes);
router.use('/traces', traceRoutes);

// API root endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'GraphBit API v1',
    version: '1.0.0',
    status: 'active',
    timestamp: new Date().toISOString(),
    documentation: '/api/v1/docs',
    endpoints: {
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      agents: '/api/v1/agents',
      traces: '/api/v1/traces',
    },
  });
});

export default router;