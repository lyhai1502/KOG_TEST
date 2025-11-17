#!/bin/bash

# Script khởi động Frontend - Kim Oanh Group NOXH Platform
# Author: Tech Team
# Date: 2025-11-17

echo "=================================="
echo "  Kim Oanh Group - NOXH Platform"
echo "  Frontend Setup & Start Script"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js chưa được cài đặt!"
    echo "Vui lòng cài đặt Node.js >= 18.x từ https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to frontend directory
cd frontend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    
    echo ""
    echo "📦 Installing additional UI dependencies..."
    npm install @radix-ui/react-label @radix-ui/react-slot class-variance-authority tailwindcss-animate
    
    echo ""
    echo "✅ Dependencies installed successfully!"
else
    echo "✅ Dependencies already installed"
fi

echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local file not found"
    echo "Creating .env.local with default values..."
    cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=Kim Oanh Group - NOXH Platform
NEXT_PUBLIC_APP_VERSION=1.0.0
EOF
    echo "✅ .env.local created"
else
    echo "✅ .env.local exists"
fi

echo ""
echo "=================================="
echo "  🚀 Starting Development Server"
echo "=================================="
echo ""
echo "Frontend will be available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev
