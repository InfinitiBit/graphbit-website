<div align="center">

# GraphBit Website

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square&logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Turborepo](https://img.shields.io/badge/Turborepo-latest-red?style=flat-square&logo=turborepo)](https://turborepo.org/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)](LICENSE)

**Official website and platform for GraphBit - AI Agent Monitoring and LLM Tracing Platform**

A comprehensive full-stack solution featuring a modern Next.js frontend, robust Node.js backend API, and comprehensive documentation.

</div>

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- MongoDB 4.4 or higher (for backend)
- Clerk account (for authentication)

### Full Stack Setup

```bash
# 1. Install dependencies for all apps
npm install

# 2. Set up environment variables
cp apps/web/.env.example apps/web/.env.local
cp apps/backend/.env.example apps/backend/.env

# 3. Configure your environment variables (see Environment Setup below)

# 4. Start all development servers
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api/v1/docs
- **Docs Site**: http://localhost:3001

### Individual App Setup

```bash
# Start only the frontend
npm run dev:web

# Start only the backend
npm run dev:backend

# Start only the docs
npm run dev:docs

# Build all apps for production
npm run build

# Build specific app
npm run build:web
npm run build:backend
```

## 📁 Project Structure

```
graphbit-website/
├── apps/
│   ├── web/              # Next.js frontend application
│   │   ├── app/          # App router pages
│   │   ├── components/   # React components
│   │   ├── lib/          # Utilities and configurations
│   │   └── content/      # Blog content (Markdown)
│   ├── backend/          # Node.js/Express API server
│   │   ├── src/
│   │   │   ├── controllers/  # Route handlers
│   │   │   ├── models/       # MongoDB/Mongoose models
│   │   │   ├── routes/       # API route definitions
│   │   │   ├── middleware/   # Custom middleware
│   │   │   ├── services/     # Business logic
│   │   │   └── utils/        # Helper functions
│   │   └── dist/         # Built files
│   └── docs/             # Documentation site
├── packages/             # Shared packages (future)
└── turbo.json           # Turborepo configuration
```

## 🛠️ Tech Stack

### Frontend (`apps/web`)
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + Radix UI
- **Authentication**: Clerk
- **State Management**: Zustand
- **Database**: MongoDB (via API)
- **Content**: Markdown-based blog system

### Backend API (`apps/backend`)
- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Clerk integration
- **Validation**: express-validator
- **Documentation**: Auto-generated Swagger/OpenAPI
- **Security**: Helmet, CORS, rate limiting
- **Logging**: Winston

### Documentation (`apps/docs`)
- **Framework**: Next.js 14
- **Content**: MDX-based documentation

## 🔧 Environment Setup

### Frontend Environment (`apps/web/.env.local`)
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# Database
MONGODB_URI=mongodb://localhost:27017/graphbit

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

### Backend Environment (`apps/backend/.env`)
```env
# Environment
NODE_ENV=development
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/graphbit-dev

# Authentication (same as frontend)
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here

# Security
JWT_SECRET=your-super-secret-jwt-key-change-in-production
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# API Configuration
API_VERSION=v1
LOG_LEVEL=info
RATE_LIMIT_MAX=100
```

## 🌟 Key Features

### 🎯 Frontend Features
- **Modern UI**: Responsive design with Tailwind CSS and Radix UI
- **Blog System**: Markdown-based content management
- **Agent Marketplace**: Browse and discover AI agents
- **Dashboard**: User analytics and agent management
- **Tracing Interface**: LLM execution monitoring
- **Authentication**: Secure user authentication with Clerk

### ⚡ Backend Features
- **RESTful API**: Comprehensive REST endpoints
- **User Management**: Profile, preferences, usage tracking
- **Agent Marketplace**: CRUD operations with marketplace features
- **LLM Tracing**: Execution tracking and analytics
- **Security**: Authentication, authorization, validation, rate limiting
- **Documentation**: Auto-generated API documentation
- **Monitoring**: Health checks, logging, error tracking

## 📚 API Documentation

Once the backend is running, access the interactive API documentation:
- **Swagger UI**: http://localhost:5000/api/v1/docs
- **Health Check**: http://localhost:5000/health

### Main API Endpoints
- `GET /api/v1/auth/me` - Get current user
- `GET /api/v1/agents` - List public agents
- `POST /api/v1/agents` - Create new agent
- `GET /api/v1/traces` - Get user traces
- `POST /api/v1/traces` - Create trace record

## 🧪 Testing & Development

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run tests (when available)
npm run test

# Clean build artifacts
npm run clean
```

## 🚀 Deployment

### Frontend Deployment
The frontend is optimized for deployment on Vercel, Netlify, or any static hosting service.

```bash
npm run build:web
npm run start:web
```

### Backend Deployment
The backend can be deployed on any Node.js hosting service (Railway, Render, AWS, etc.).

```bash
npm run build:backend
npm run start:backend
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use production MongoDB URI
- Configure production Clerk keys
- Set secure JWT secrets
- Configure proper CORS origins

## 🔒 Security

- **Authentication**: Clerk-based secure authentication
- **Authorization**: Role-based access control
- **Input Validation**: Comprehensive request validation
- **Rate Limiting**: API endpoint protection
- **CORS**: Configurable cross-origin policies
- **Security Headers**: Helmet middleware protection

## 📊 Monitoring

- **Health Checks**: Multiple health check endpoints
- **Logging**: Structured logging with Winston
- **Error Tracking**: Comprehensive error handling
- **Performance**: Response time monitoring

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines

- Follow conventional commits format
- Ensure all tests pass before submitting
- Update documentation for new features
- Keep PRs focused and atomic
- Follow TypeScript and ESLint rules
- Test both frontend and backend changes
- Update API documentation if adding new endpoints

### Code Standards

- **Frontend**: Next.js best practices, React hooks patterns
- **Backend**: Express.js conventions, proper error handling
- **Database**: Mongoose schemas with proper validation
- **Security**: Always validate input, use proper authentication
- **Documentation**: Update Swagger schemas for API changes

## 📄 License

Proprietary License © 2024 InfinitiBit GmbH - see [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by the GraphBit Team**

[Website](https://graphbit.com) • [Documentation](http://localhost:3001) • [API Docs](http://localhost:5000/api/v1/docs)

</div>
