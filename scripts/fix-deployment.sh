#!/bin/bash

echo "🔧 Fixing deployment issues..."

# Remove problematic files
echo "🧹 Cleaning npm cache and lock files..."
rm -rf node_modules
rm -f package-lock.json
rm -rf .next
rm -rf .npm

# Clear npm cache
npm cache clean --force

# Install with specific flags to avoid the null matches error
echo "📦 Installing dependencies with clean slate..."
npm install --no-package-lock --legacy-peer-deps --no-audit --no-fund

# Recreate package-lock.json
echo "🔒 Creating new package-lock.json..."
npm install --package-lock-only

echo "✅ Deployment fix complete!"
