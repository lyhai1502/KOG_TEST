# Kim Oanh NOXH Platform - Deployment Guide

## 🚀 Deploy to Vercel (Recommended)

### Prerequisites

-   GitHub/GitLab/Bitbucket account
-   [Vercel account](https://vercel.com/signup) (free tier available)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push code to Git repository**

    ```bash
    cd /Users/vanlyhai/kog_test
    git init
    git add .
    git commit -m "Initial commit: Kim Oanh NOXH Platform"

    # Create repo on GitHub, then:
    git remote add origin https://github.com/YOUR_USERNAME/kog-noxh-platform.git
    git branch -M main
    git push -u origin main
    ```

2. **Import to Vercel**

    - Go to [https://vercel.com/new](https://vercel.com/new)
    - Click "Import Git Repository"
    - Select your repository
    - Configure project:
        - **Framework Preset**: Next.js
        - **Root Directory**: `frontend`
        - **Build Command**: `npm run build` (auto-detected)
        - **Output Directory**: `.next` (auto-detected)
        - **Install Command**: `npm install` (auto-detected)

3. **Deploy**
    - Click "Deploy"
    - Wait 2-3 minutes for build
    - Get your live URL: `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**

    ```bash
    npm install -g vercel
    ```

2. **Login to Vercel**

    ```bash
    vercel login
    ```

3. **Deploy from frontend directory**

    ```bash
    cd /Users/vanlyhai/kog_test/frontend
    vercel
    ```

    Follow prompts:

    - Set up and deploy? `Y`
    - Scope: Select your account
    - Link to existing project? `N`
    - Project name: `kog-noxh-platform`
    - Directory: `./` (current)
    - Override settings? `N`

4. **Deploy to production**
    ```bash
    vercel --prod
    ```

### Configuration

The project includes `vercel.json` with optimal settings:

```json
{
    "buildCommand": "npm run build",
    "outputDirectory": ".next",
    "framework": "nextjs",
    "regions": ["sin1"] // Singapore region for faster access in Vietnam
}
```

## 🌐 Other Deployment Options

### Option 3: Deploy to Netlify

1. **Install Netlify CLI**

    ```bash
    npm install -g netlify-cli
    ```

2. **Build the project**

    ```bash
    cd /Users/vanlyhai/kog_test/frontend
    npm run build
    ```

3. **Deploy**
    ```bash
    netlify deploy --prod
    ```

### Option 4: Deploy to Railway

1. Go to [https://railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Choose repository
5. Set root directory: `frontend`
6. Railway auto-detects Next.js

### Option 5: Self-hosted (VPS/Docker)

**Using Docker:**

1. Create `Dockerfile` in frontend directory:

    ```dockerfile
    FROM node:18-alpine AS builder
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci
    COPY . .
    RUN npm run build

    FROM node:18-alpine
    WORKDIR /app
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package.json ./package.json
    COPY --from=builder /app/public ./public

    EXPOSE 3000
    CMD ["npm", "start"]
    ```

2. Build and run:
    ```bash
    docker build -t kog-noxh-frontend .
    docker run -p 3000:3000 kog-noxh-frontend
    ```

## ⚙️ Environment Variables

If you need environment variables for production:

1. **Create `.env.production` file:**

    ```env
    NEXT_PUBLIC_API_URL=https://api.kimoanhgroup.com
    NEXT_PUBLIC_APP_URL=https://noxh.kimoanhgroup.com
    ```

2. **In Vercel Dashboard:**
    - Go to Project Settings → Environment Variables
    - Add each variable:
        - Key: `NEXT_PUBLIC_API_URL`
        - Value: `https://api.kimoanhgroup.com`
    - Deploy again

## 📊 Post-Deployment Checklist

-   [ ] Test all routes work correctly
-   [ ] Login with demo accounts:
    -   Buyer: `buyer@example.com` / `buyer123`
    -   Admin: `admin@kimoanhgroup.com` / `admin123`
-   [ ] Test marketplace features
-   [ ] Test responsive design on mobile
-   [ ] Check session timeout (5 minutes)
-   [ ] Verify images load correctly
-   [ ] Test form submissions

## 🔧 Build Optimization

Current build size:

```
Route (app)                              Size     First Load JS
├ ○ /buyer/marketplace                   3.49 kB         114 kB
├ λ /buyer/marketplace/[id]              4.34 kB         115 kB
├ ○ /buyer/wishlist                      2.93 kB         113 kB
Total: ~350 kB (optimized)
```

## 🌍 Custom Domain

### On Vercel:

1. Go to Project Settings → Domains
2. Add your domain: `noxh.kimoanhgroup.com`
3. Add DNS records provided by Vercel
4. Wait for SSL certificate (automatic)

### DNS Configuration:

```
Type: CNAME
Name: noxh
Value: cname.vercel-dns.com
```

## 📱 Performance Tips

1. **Enable Edge Caching:**

    - Vercel automatically caches static pages
    - Dynamic pages cached at edge with ISR

2. **Image Optimization:**

    - Already using Next.js Image component
    - Vercel optimizes images automatically

3. **Region Selection:**
    - Set to Singapore (`sin1`) for Vietnam users
    - Can add multiple regions for global access

## 🔒 Security

Before deploying to production:

1. **Remove demo accounts** or change passwords
2. **Add rate limiting** for API calls
3. **Enable CORS** properly
4. **Add analytics** (Vercel Analytics free)
5. **Set up monitoring** (Sentry, LogRocket)

## 💰 Cost Estimate

### Vercel Free Tier:

-   ✅ 100 GB bandwidth/month
-   ✅ Unlimited deployments
-   ✅ Automatic HTTPS
-   ✅ Edge Network (CDN)
-   ✅ Serverless Functions
-   Perfect for this project!

### Pro Plan ($20/month):

-   1 TB bandwidth
-   Team collaboration
-   Password protection
-   Advanced analytics

## 🚦 Deployment Status

After deploying, you'll get:

-   **Production URL**: `https://kog-noxh-platform.vercel.app`
-   **Preview URLs**: Automatic for each Git branch
-   **Deploy logs**: Available in Vercel dashboard
-   **Auto deployments**: Every Git push triggers deploy

## 📞 Support

-   Vercel Docs: https://vercel.com/docs
-   Next.js Docs: https://nextjs.org/docs
-   Deployment Issues: Check build logs in Vercel dashboard

---

**Recommended**: Use Vercel for fastest setup (5 minutes) and best Next.js integration! 🚀
