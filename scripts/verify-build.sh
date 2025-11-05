#!/bin/bash

# Verification script for enterprise deployment
# This script tests the build and verifies the configuration

echo "=========================================="
echo "CAM Application - Enterprise Build Verification"
echo "=========================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "❌ Error: node_modules not found. Run 'npm install' first."
    exit 1
fi

echo "✓ Dependencies installed"

# Check environment file
if [ -f ".env.enterprise" ]; then
    echo "✓ Enterprise environment file exists"
    echo ""
    echo "Configuration:"
    cat .env.enterprise | grep -v "^#" | grep -v "^$"
    echo ""
else
    echo "❌ Error: .env.enterprise not found"
    exit 1
fi

# Build for enterprise
echo "Building for enterprise tenant..."
npm run build:enterprise

if [ $? -eq 0 ]; then
    echo "✓ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "Checking build output..."

# Check if dist folder exists
if [ -d "dist" ]; then
    echo "✓ dist/ folder created"
else
    echo "❌ dist/ folder not found"
    exit 1
fi

# Check index.html
if [ -f "dist/index.html" ]; then
    echo "✓ index.html exists"
    
    # Check if assets use /cam/ prefix
    if grep -q '"/cam/' dist/index.html; then
        echo "✓ Assets use /cam/ base path"
    else
        echo "⚠️  Warning: Assets might not use correct base path"
    fi
else
    echo "❌ index.html not found"
    exit 1
fi

# Check assets folder
if [ -d "dist/assets" ]; then
    echo "✓ assets/ folder exists"
    JS_COUNT=$(find dist/assets -name "*.js" | wc -l)
    CSS_COUNT=$(find dist/assets -name "*.css" | wc -l)
    echo "  - JavaScript files: $JS_COUNT"
    echo "  - CSS files: $CSS_COUNT"
else
    echo "❌ assets/ folder not found"
    exit 1
fi

echo ""
echo "=========================================="
echo "Build Verification Complete! ✓"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Test locally with: npm run preview:enterprise"
echo "2. Access at: http://localhost:8000/cam/"
echo "3. Deploy contents of dist/ folder to: /cam/ on enterprise server"
echo ""
echo "Deployment targets:"
echo "  - UAT: https://enterprise-uat.proximus.be/cam/"
echo "  - ITT: https://enterprise-itt.proximus.be/cam/"
echo "  - Prod: https://enterprise.proximus.be/cam/"
echo ""
