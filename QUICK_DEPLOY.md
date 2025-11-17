# 🚀 Quick Deploy Guide

## Deploy to Vercel in 3 Steps (5 minutes)

### Step 1: Push to GitHub

```bash
cd /Users/vanlyhai/kog_test
git init
git add .
git commit -m "Initial commit"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/kog-noxh-platform.git
git branch -M main
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Configure:
    - **Root Directory**: `frontend`
    - Everything else is auto-detected
5. Click "Deploy"

### Step 3: Done! 🎉

Your app will be live at: `https://your-project.vercel.app`

## Alternative: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd /Users/vanlyhai/kog_test/frontend
vercel --prod
```

## Test Your Deployment

Login with demo accounts:

-   **Buyer**: `buyer@example.com` / `buyer123`
-   **Admin**: `admin@kimoanhgroup.com` / `admin123`

## Need Help?

See full guide: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
