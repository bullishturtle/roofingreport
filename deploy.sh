#!/bin/bash

# RoofFax Production Deployment Script
# This script handles the deployment of the RoofFax application to production

# Exit on error
set -e

echo "🚀 Starting RoofFax deployment process..."

# Check for required environment variables
if [ -z "$VERCEL_TOKEN" ]; then
  echo "❌ Error: VERCEL_TOKEN environment variable is required"
  exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linter checks..."
npm run lint

# Run type checking
echo "🔍 Running type checks..."
npm run type-check

# Run tests
echo "🧪 Running tests..."
npm test

# Build the application
echo "🏗️ Building application..."
npm run build

# Run database migrations
echo "🗄️ Running database migrations..."
npx prisma migrate deploy

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
npx vercel --prod --token $VERCEL_TOKEN

# Run post-deployment checks
echo "✅ Running post-deployment checks..."
curl -s https://therooffax.com/api/health | grep -q '"status":"ok"'

echo "✅ Deployment completed successfully!"
