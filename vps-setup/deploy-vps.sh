#!/bin/bash
# ============================================================
# Hostinger VPS Deployment Script for RushiPandit Staff Portal
# Run on Hostinger VPS (72.61.228.175): bash deploy-vps.sh
# ============================================================

set -e

echo "🚀 Starting Hostinger VPS Deployment..."

# 1. Update system & install Docker if missing
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    apt-get update && apt-get install -y docker-compose-plugin docker-compose
fi

# 2. Prepare init-db.sql by combining schemas
cat ../supabase-schema.sql ../SETUP-LEADS-ADVANCED.sql > init-db.sql

# 3. Build & Launch Containers
echo "Building & launching Docker containers..."
docker-compose up -d --build

echo "✅ VPS Deployment Successful!"
echo "Server running on http://72.61.228.175:3000"
echo "Webhook URL for Pabbly: http://72.61.228.175:3000/api/webhooks/pabbly-leads?secret=rushi_pabbly_secret_2026"
