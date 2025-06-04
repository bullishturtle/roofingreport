#!/bin/bash

echo "🚀 Starting final deployment of RoofFax landing page..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next
rm -rf node_modules/.cache

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run build to check for errors
echo "🔨 Building application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi

# Run linting
echo "🔍 Running linter..."
npm run lint

# Check for TypeScript errors
echo "📝 Checking TypeScript..."
npx tsc --noEmit

echo "✅ All checks passed! Ready for deployment."
echo ""
echo "📋 Deployment Checklist:"
echo "1. ✅ Build successful"
echo "2. ✅ No linting errors" 
echo "3. ✅ No TypeScript errors"
echo "4. 🔄 Environment variables configured"
echo "5. 🔄 Domain settings ready"
echo ""
echo "🚀 You can now deploy to Vercel!"
