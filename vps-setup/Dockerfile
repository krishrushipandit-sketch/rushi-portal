FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build args for env vars needed at build time
ARG NEXTAUTH_SECRET=rushi_super_secret_jwt_2026
ARG NEXTAUTH_URL=http://72.61.228.175:3000
ARG NEXT_PUBLIC_APP_URL=http://72.61.228.175:3000
ARG GEMINI_API_KEY
ARG PABBLY_WEBHOOK_SECRET=rushi_pabbly_secret_2026
ARG AISENSY_API_KEY

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Write a minimal .env.local for build time (no Supabase needed)
RUN echo "NEXTAUTH_SECRET=${NEXTAUTH_SECRET}" > .env.local && \
    echo "NEXTAUTH_URL=${NEXTAUTH_URL}" >> .env.local && \
    echo "NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}" >> .env.local && \
    echo "DATABASE_URL=postgresql://rushi_admin:RushiPanditPass2026!@postgres:5432/rushi_portal" >> .env.local && \
    echo "GEMINI_API_KEY=${GEMINI_API_KEY}" >> .env.local && \
    echo "NEXT_PUBLIC_GEMINI_API_KEY=${GEMINI_API_KEY}" >> .env.local && \
    echo "PABBLY_WEBHOOK_SECRET=${PABBLY_WEBHOOK_SECRET}" >> .env.local && \
    echo "AISENSY_API_KEY=${AISENSY_API_KEY}" >> .env.local

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create uploads directory for file storage
RUN mkdir -p /app/public/uploads && chown -R nextjs:nodejs /app/public/uploads

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
