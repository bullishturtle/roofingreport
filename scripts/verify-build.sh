#!/bin/bash

echo "🔍 Verifying build configuration..."

# Check if Prisma client exists
if [ ! -d "node_modules/.prisma/client" ]; then
  echo "❌ Prisma client not found. Running generation..."
  npx prisma generate
fi

# Check for problematic imports
echo "🔍 Checking for client-side Prisma imports..."
grep -r "from.*@prisma/client" app/ components/ lib/ --exclude-dir=node_modules || echo "✅ No client-side Prisma imports found"

# Test build
echo "🏗️ Testing build..."
npm run build

echo "✅ Build verification complete!"
