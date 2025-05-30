#!/bin/bash

# Deployment Resolution Script
# Systematically resolves npm dependency conflicts

echo "🔧 Starting deployment resolution process..."

# Step 1: Clean everything
echo "📦 Cleaning existing installations..."
rm -rf node_modules
rm -rf .next
rm -f package-lock.json
rm -f yarn.lock

# Step 2: Clear npm cache
echo "🧹 Clearing npm cache..."
npm cache clean --force

# Step 3: Install with legacy peer deps
echo "📥 Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps --no-audit --no-fund

# Step 4: Verify installation
echo "✅ Verifying installation..."
if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Installation failed, trying with --force flag..."
    npm install --force --legacy-peer-deps --no-audit --no-fund
fi

# Step 5: Type check
echo "🔍 Running type check..."
npm run type-check

# Step 6: Build test
echo "🏗️ Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "🎉 Build successful! Ready for deployment."
else
    echo "❌ Build failed. Check the logs above."
    exit 1
fi

echo "✅ Deployment resolution complete!"
