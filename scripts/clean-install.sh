#!/bin/bash

# Clean installation script to remove all traces of problematic dependencies

echo "🧹 Cleaning up dependencies..."

# Remove node_modules and lock files
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock
rm -f pnpm-lock.yaml

# Remove any Prisma files
rm -rf prisma
rm -f lib/prisma.ts
rm -f lib/prisma-safe.ts

echo "📦 Installing clean dependencies..."

# Install with legacy peer deps
npm install --legacy-peer-deps

echo "🏗️ Building project..."

# Test build
npm run build

echo "✅ Clean installation complete!"
