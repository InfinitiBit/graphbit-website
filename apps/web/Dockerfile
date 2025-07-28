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

# Install dependencies
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the web app for static export
RUN npm run build --workspace=apps/web

# Production image with nginx
FROM nginx:alpine AS runner

# Copy nginx configuration
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=builder /app/apps/web/out /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 