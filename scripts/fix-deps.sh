#!/bin/bash

echo "🔧 Fixing dependency conflicts..."

# Remove node_modules and package-lock.json
rm -rf node_modules
rm -f package-lock.json

# Clear npm cache
npm cache clean --force

# Install with legacy peer deps
npm install --legacy-peer-deps

# Generate Prisma client
npx prisma generate

echo "✅ Dependencies fixed!"
