# GraphBit Cloud Platform

A modern cloud platform for the GraphBit LLM framework, providing a marketplace for AI agents and comprehensive LLM tracing capabilities.

## Features

- **Agent Marketplace**: Browse, download, and run pre-built AI agents
- **LLM Tracing**: Monitor and analyze your agent outputs in real-time
- **Authentication**: Secure user authentication with Clerk
- **Modern UI**: Beautiful, responsive interface built with Next.js and Tailwind CSS
- **Database**: MongoDB with Mongoose for data persistence

## Prerequisites

- Node.js 18+ and npm
- MongoDB instance (local or cloud)
- Clerk account for authentication

## Environment Variables

Create a `.env.local` file in the `apps/web` directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# MongoDB
MONGODB_URI=mongodb://localhost:27017/graphbit

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Installation

1. Install dependencies from the workspace root:
```bash
npm install
```

2. Set up your environment variables as described above.

3. Ensure MongoDB is running if using a local instance.

## Development

From the workspace root, run:

```bash
npm run dev
```

This will start the development server at `http://localhost:3000`.

## Project Structure

```
apps/web/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── marketplace/       # Marketplace page
│   ├── tracing/          # Tracing dashboard
│   └── page.tsx          # Landing page
├── components/            # React components
│   ├── layout/           # Layout components
│   └── ui/               # UI components
├── lib/                   # Utilities and database
│   ├── models/           # Mongoose models
│   ├── db.ts            # Database connection
│   └── utils.ts         # Utility functions
└── public/               # Static assets
```

## API Endpoints

### Agents API
- `GET /api/agents` - List all public agents
- `POST /api/agents` - Create a new agent (authenticated)

### Traces API
- `GET /api/traces` - Get user's traces (authenticated)
- `POST /api/traces` - Create a new trace (authenticated)

## Database Models

### Agent Schema
- `name`: Agent name
- `description`: Agent description
- `category`: Agent category (chatbot, analyzer, generator, etc.)
- `version`: Semantic version
- `author`: Author name
- `authorId`: Clerk user ID
- `downloads`: Download count
- `rating`: Average rating
- `tags`: Array of tags
- `isPublic`: Visibility status

### Trace Schema
- `userId`: Clerk user ID
- `agentId`: Associated agent ID
- `agentName`: Agent name
- `sessionId`: Session identifier
- `input`: User input
- `output`: LLM output
- `model`: Model used
- `promptTokens`: Input token count
- `completionTokens`: Output token count
- `latency`: Response time in ms
- `cost`: Estimated cost
- `status`: success/error/pending

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Clerk**: Authentication and user management
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **Radix UI**: Accessible component primitives
- **Lucide Icons**: Beautiful icon set

## Contributing

Please follow the existing code style and conventions. Ensure all TypeScript types are properly defined and components are well-documented.

## License

This project is part of the GraphBit open-source ecosystem.
