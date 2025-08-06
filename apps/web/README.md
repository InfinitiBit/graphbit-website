<div align="center">

# GraphBit Web App

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)

Main website with agent marketplace, LLM tracing, and dashboard.

</div>

## Quick Start

```bash
# Install dependencies (from workspace root)
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev --filter=web

# Build for production
npm run build --filter=web
```

## Environment Setup

Create `.env.local` with:

```env
# JWT Authentication
JWT_SECRET=your_jwt_secret_here

# MongoDB
MONGODB_URI=mongodb://localhost:27017/graphbit

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Features

- **Agent Marketplace** - Browse and download AI agents
- **LLM Tracing** - Monitor agent performance and outputs
- **Blog** - Technical articles and tutorials
- **Authentication** - Secure user management with JWT

## API Endpoints

- `GET /api/agents` - List public agents
- `POST /api/agents` - Create new agent
- `GET /api/traces` - Get user traces
- `POST /api/traces` - Create trace

## Contributing

Please follow existing conventions and ensure TypeScript compliance.

## License

Proprietary License © 2024 InfinitiBit GmbH.
