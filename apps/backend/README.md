# GraphBit Backend API

A comprehensive Node.js/Express backend for the GraphBit AI Agent Platform. This backend provides REST APIs for user management, agent marketplace, and LLM tracing functionality.

## Features

- **Authentication**: Clerk integration with automatic user sync
- **User Management**: User profiles, preferences, usage tracking
- **Agent Marketplace**: CRUD operations for AI agents with marketplace features
- **Tracing System**: LLM execution tracking and analytics
- **Security**: Rate limiting, input validation, CORS, security headers
- **Documentation**: Auto-generated Swagger/OpenAPI documentation
- **Monitoring**: Health checks, logging, error handling

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk
- **Validation**: express-validator
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston
- **Security**: Helmet, CORS, rate limiting
- **Development**: TypeScript, Nodemon, ESLint

## Prerequisites

- Node.js 18 or higher
- MongoDB 4.4 or higher
- Clerk account and API keys

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env
   ```

3. **Configure environment variables** in `.env`:
   ```env
   # Environment
   NODE_ENV=development
   PORT=5000

   # Database
   MONGODB_URI=mongodb://localhost:27017/graphbit-dev

   # Authentication
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   JWT_EXPIRE=30d

   # Clerk Authentication
   CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
   CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here

   # CORS
   CORS_ORIGINS=http://localhost:3000,http://localhost:3001

   # API Configuration
   API_VERSION=v1
   LOG_LEVEL=info
   UPLOAD_MAX_SIZE=10mb
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX=100
   ```

## Development

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Other Scripts
```bash
# Type checking
npm run check-types

# Linting
npm run lint
npm run lint:fix

# Testing
npm test
npm run test:watch
npm run test:coverage

# Clean build
npm run clean
```

## API Documentation

Once the server is running, you can access:

- **API Documentation**: `http://localhost:5000/api/v1/docs`
- **Health Check**: `http://localhost:5000/health`
- **API Root**: `http://localhost:5000/api/v1`

## API Endpoints

### Authentication
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/sync` - Sync user data with Clerk
- `GET /api/v1/auth/status` - Check auth status
- `POST /api/v1/auth/logout` - Logout (logging only)

### Users
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile
- `GET /api/v1/users/stats` - Get user statistics
- `PATCH /api/v1/users/preferences` - Update preferences
- `DELETE /api/v1/users/account` - Deactivate account
- `GET /api/v1/users` - Get all users (Admin)
- `GET /api/v1/users/analytics` - User analytics (Admin)

### Agents
- `GET /api/v1/agents` - List public agents
- `POST /api/v1/agents` - Create agent
- `GET /api/v1/agents/:id` - Get agent details
- `PUT /api/v1/agents/:id` - Update agent
- `DELETE /api/v1/agents/:id` - Delete agent
- `GET /api/v1/agents/my-agents` - Get user's agents
- `POST /api/v1/agents/:id/reviews` - Add review
- `POST /api/v1/agents/:id/install` - Install agent
- `GET /api/v1/agents/categories` - Get categories
- `GET /api/v1/agents/featured` - Get featured agents
- `GET /api/v1/agents/popular` - Get popular agents
- `GET /api/v1/agents/stats` - Agent statistics (Admin)

### Traces
- `GET /api/v1/traces` - Get user's traces
- `POST /api/v1/traces` - Create trace
- `GET /api/v1/traces/:id` - Get trace details
- `POST /api/v1/traces/:id/feedback` - Add feedback
- `GET /api/v1/traces/analytics` - Get analytics

### Health
- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed system health
- `GET /health/ready` - Readiness probe
- `GET /health/live` - Liveness probe

## Database Models

### User
- Personal information and preferences
- Subscription and usage tracking
- Role-based access control

### Agent
- AI agent metadata and configuration
- Marketplace features (ratings, reviews, downloads)
- Performance metrics
- Verification status

### Trace
- LLM execution tracking
- Token usage and cost calculation
- Performance metrics
- User feedback

## Security Features

- **Authentication**: Clerk JWT token validation
- **Authorization**: Role-based access control
- **Rate Limiting**: Configurable per-endpoint limits
- **Input Validation**: Express-validator schemas
- **CORS**: Configurable origins
- **Security Headers**: Helmet middleware
- **Data Sanitization**: NoSQL injection prevention
- **Parameter Pollution**: HPP protection

## Error Handling

The API uses consistent error response format:

```json
{
  "status": "error",
  "message": "Error description",
  "errors": [...] // Validation errors if applicable
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Logging

Winston logger with different levels:
- `error` - Error messages
- `warn` - Warning messages
- `info` - General information
- `http` - HTTP requests
- `debug` - Debug information

Logs are written to console in development and files in production.

## Deployment

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 5000
CMD ["node", "dist/app.js"]
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use strong `JWT_SECRET`
- Configure proper `MONGODB_URI`
- Set appropriate `CORS_ORIGINS`
- Configure production Clerk keys

### Health Checks
Use `/health/ready` for readiness probes and `/health/live` for liveness probes in container orchestration.

## Contributing

1. Follow TypeScript and ESLint rules
2. Add tests for new features
3. Update API documentation
4. Use conventional commit messages
5. Ensure all security middleware is properly configured

## License

MIT License - see LICENSE file for details.