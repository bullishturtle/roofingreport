#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npx prisma generate

# Build the application
echo "🏗️ Building the application..."
npm run build

# Run database migrations (if needed)
echo "🗃️ Running database migrations..."
npx prisma migrate deploy

# Start the application
echo "✅ Deployment complete! Starting the application..."
npm start
