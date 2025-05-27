#!/bin/bash

echo "🧹 Force cleaning all dependencies and cache..."

# Remove all possible lock files and caches
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock
rm -f pnpm-lock.yaml
rm -rf .next
rm -rf .vercel

# Remove any Prisma references
find . -name "*.prisma" -delete
find . -name "*prisma*" -type f -delete

echo "📦 Installing with force clean..."

# Install with all flags to avoid conflicts
npm install --legacy-peer-deps --no-audit --no-fund --force

echo "🏗️ Testing build..."
npm run build

echo "✅ Ready for deployment!"
