FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/web/package*.json ./apps/web/
COPY packages/ui/package*.json ./packages/ui/
COPY packages/typescript-config/package*.json ./packages/typescript-config/
COPY packages/eslint-config/package*.json ./packages/eslint-config/

# Install dependencies with memory optimization
ENV NODE_OPTIONS="--max-old-space-size=4096"
RUN npm ci --frozen-lockfile --prefer-offline

# Build the application
FROM base AS builder
WORKDIR /app

# Set Node.js memory limit for build process
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV NODE_ENV=production

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code (in layers for better caching)
COPY packages/ ./packages/
COPY turbo.json ./
COPY tsconfig.json ./
COPY apps/web/ ./apps/web/

# Build with memory optimization and timeout handling
RUN timeout 900s npm run build --workspace=apps/web || (echo "Build timed out or failed" && exit 1)

# Production image with nginx
FROM nginx:alpine AS runner

# Copy nginx configuration
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=builder /app/apps/web/out /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 