#!/bin/bash

# Kim Oanh NOXH Platform - Deployment Script
# This script helps you deploy the frontend to various platforms

set -e

echo "🚀 Kim Oanh NOXH Platform - Deployment Helper"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "⚠️  Git not initialized. Initializing..."
    git init
    git branch -m main
    echo "✅ Git initialized"
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes"
    read -p "Do you want to commit them now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        read -p "Enter commit message: " commit_msg
        git commit -m "$commit_msg"
        echo "✅ Changes committed"
    fi
fi

echo ""
echo "Choose deployment platform:"
echo "1) Vercel (Recommended for Next.js)"
echo "2) Netlify"
echo "3) Setup GitHub repository only"
echo "4) Cancel"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🔷 Deploying to Vercel..."
        echo ""
        
        # Check if Vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            echo "⚠️  Vercel CLI not found"
            read -p "Install Vercel CLI now? (y/n) " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                npm install -g vercel
                echo "✅ Vercel CLI installed"
            else
                echo "❌ Please install Vercel CLI: npm install -g vercel"
                exit 1
            fi
        fi
        
        echo ""
        echo "Deploying frontend to Vercel..."
        cd frontend
        vercel --prod
        echo ""
        echo "✅ Deployment complete!"
        echo "📝 Your app should be live at the URL shown above"
        ;;
        
    2)
        echo ""
        echo "🟢 Deploying to Netlify..."
        echo ""
        
        # Check if Netlify CLI is installed
        if ! command -v netlify &> /dev/null; then
            echo "⚠️  Netlify CLI not found"
            read -p "Install Netlify CLI now? (y/n) " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                npm install -g netlify-cli
                echo "✅ Netlify CLI installed"
            else
                echo "❌ Please install Netlify CLI: npm install -g netlify-cli"
                exit 1
            fi
        fi
        
        echo ""
        echo "Building frontend..."
        cd frontend
        npm run build
        
        echo ""
        echo "Deploying to Netlify..."
        netlify deploy --prod --dir=.next
        echo ""
        echo "✅ Deployment complete!"
        ;;
        
    3)
        echo ""
        echo "📦 Setting up GitHub repository..."
        echo ""
        
        # Check if remote exists
        if git remote get-url origin &> /dev/null; then
            echo "✅ Git remote already configured"
            git remote -v
        else
            echo "Please create a repository on GitHub, then enter the URL:"
            read -p "Repository URL: " repo_url
            git remote add origin "$repo_url"
            echo "✅ Remote added"
        fi
        
        echo ""
        read -p "Push to GitHub now? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git push -u origin main
            echo ""
            echo "✅ Code pushed to GitHub!"
            echo ""
            echo "Next steps:"
            echo "1. Go to https://vercel.com/new"
            echo "2. Import your GitHub repository"
            echo "3. Set root directory to: frontend"
            echo "4. Click Deploy"
        fi
        ;;
        
    4)
        echo "❌ Deployment cancelled"
        exit 0
        ;;
        
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "=========================================="
echo "🎉 Deployment process completed!"
echo ""
echo "📚 Documentation:"
echo "  - Full guide: DEPLOYMENT_GUIDE.md"
echo "  - Quick start: QUICK_DEPLOY.md"
echo ""
echo "🧪 Test accounts:"
echo "  - Buyer: buyer@example.com / buyer123"
echo "  - Admin: admin@kimoanhgroup.com / admin123"
echo ""
echo "📞 Need help? Check the documentation or create an issue"
echo "=========================================="
