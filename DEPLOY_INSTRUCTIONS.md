# 🚀 Hướng Dẫn Deploy - Kim Oanh NOXH Platform

## ✅ Chuẩn bị sẵn sàng

Project của bạn đã được setup đầy đủ và sẵn sàng để deploy:

-   ✅ Git repository đã được khởi tạo
-   ✅ Code đã được commit
-   ✅ Vercel config file đã có (`frontend/vercel.json`)
-   ✅ Build test thành công (12 pages, 0 errors)
-   ✅ Responsive design hoàn chỉnh

## 🎯 Chọn phương thức deploy

### Phương thức 1: Vercel (Khuyến nghị) ⭐

**Ưu điểm:**

-   Miễn phí cho dự án cá nhân
-   Tối ưu cho Next.js
-   Deploy tự động khi push code
-   SSL/HTTPS miễn phí
-   CDN toàn cầu
-   Build time ~3 phút

**Các bước:**

#### A. Deploy qua Dashboard (Dễ nhất)

1. **Tạo repository trên GitHub:**

    ```bash
    # Tạo repo mới trên https://github.com/new
    # Sau đó:
    git remote add origin https://github.com/YOUR_USERNAME/kog-noxh-platform.git
    git push -u origin main
    ```

2. **Import vào Vercel:**

    - Truy cập: https://vercel.com/new
    - Login với GitHub
    - Click "Import Git Repository"
    - Chọn repository vừa tạo
    - Cài đặt:
        - **Root Directory**: `frontend`
        - **Framework Preset**: Next.js (auto-detect)
    - Click "Deploy"

3. **Hoàn tất!**
    - Đợi 3-5 phút
    - Nhận URL: `https://your-project.vercel.app`
    - Test với demo accounts

#### B. Deploy qua CLI (Nhanh hơn)

```bash
# 1. Cài đặt Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
cd frontend
vercel --prod

# Hoặc dùng script tự động:
cd ..
./deploy.sh
# Chọn option 1 (Vercel)
```

### Phương thức 2: Netlify

```bash
# 1. Cài đặt Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Build và deploy
cd frontend
npm run build
netlify deploy --prod --dir=.next

# Hoặc dùng script:
cd ..
./deploy.sh
# Chọn option 2 (Netlify)
```

### Phương thức 3: Tự động với Script

```bash
# Script đã được tạo sẵn và có quyền thực thi
./deploy.sh
```

Script sẽ hỗ trợ:

-   ✅ Kiểm tra Git status
-   ✅ Auto commit nếu cần
-   ✅ Deploy lên Vercel/Netlify
-   ✅ Push lên GitHub

## 📋 Checklist sau khi deploy

### 1. Kiểm tra routes

-   [ ] `/` - Homepage
-   [ ] `/login` - Login page
-   [ ] `/buyer/dashboard` - Buyer dashboard
-   [ ] `/buyer/marketplace` - Marketplace browse
-   [ ] `/buyer/marketplace/ML001` - Listing detail
-   [ ] `/buyer/wishlist` - Wishlist
-   [ ] `/buyer/application/new` - Application form
-   [ ] `/admin/dashboard` - Admin dashboard

### 2. Test tài khoản demo

-   [ ] Login Buyer: `buyer@example.com` / `buyer123`
-   [ ] Login Admin: `admin@kimoanhgroup.com` / `admin123`
-   [ ] Session timeout sau 5 phút
-   [ ] Logout và re-login hoạt động

### 3. Test tính năng

-   [ ] Browse marketplace (3 listings)
-   [ ] View listing details
-   [ ] Wishlist có 2 items
-   [ ] Search và filter marketplace
-   [ ] Application form (5 steps)
-   [ ] Responsive trên mobile

### 4. Performance

-   [ ] First Load < 3 giây
-   [ ] Images tải nhanh
-   [ ] Navigation mượt mà
-   [ ] No console errors

## 🌐 Custom Domain (Tùy chọn)

### Trên Vercel:

1. Vào Project Settings → Domains
2. Add domain: `noxh.kimoanhgroup.com`
3. Thêm DNS record:
    ```
    Type: CNAME
    Name: noxh
    Value: cname.vercel-dns.com
    ```
4. Đợi SSL auto-setup (~2 phút)

## 📊 Thông tin dự án

**Project hiện tại:**

```
Frontend:
- Framework: Next.js 14.0.4
- Pages: 12 routes
- Build size: ~350 KB optimized
- First Load JS: ~82-138 KB per page

Features:
- Authentication & Session (5-min timeout)
- Buyer Dashboard
- Marketplace (3 listings)
- Wishlist (2 saved items)
- Application Wizard (5 steps)
- Responsive Design
```

## 🔧 Environment Variables (Nếu cần)

Hiện tại project dùng mock data, không cần env vars.

Khi có backend, thêm vào Vercel:

```env
NEXT_PUBLIC_API_URL=https://api.kimoanhgroup.com
NEXT_PUBLIC_APP_URL=https://noxh.kimoanhgroup.com
```

## 📈 Monitoring & Analytics

### Trên Vercel (Miễn phí):

-   Real User Monitoring (RUM)
-   Web Vitals tracking
-   Error logging
-   Usage metrics

Bật Analytics:

1. Vào Project Settings → Analytics
2. Enable Vercel Analytics
3. Xem metrics real-time

## 🐛 Troubleshooting

### Build failed?

```bash
# Test build locally
cd frontend
npm run build

# Check errors
npm run lint
npm run type-check
```

### Deploy thành công nhưng không load?

-   Check browser console for errors
-   Verify all routes return 200
-   Check Vercel deployment logs

### Session không hoạt động?

-   Check browser localStorage
-   Clear cache và thử lại
-   Session timeout là 5 phút (designed)

## 💡 Tips

1. **Auto-deploy:** Mỗi lần push code lên GitHub, Vercel sẽ tự động deploy
2. **Preview URLs:** Mỗi Pull Request tạo preview URL riêng
3. **Rollback:** Có thể rollback về version cũ trong 1 click
4. **Logs:** Xem real-time logs trong Vercel dashboard

## 📞 Hỗ trợ

**Tài liệu:**

-   [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Hướng dẫn chi tiết
-   [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - Quick start
-   [MARKETPLACE_FEATURES.md](./MARKETPLACE_FEATURES.md) - Features overview

**Demo Accounts:**

-   Buyer: `buyer@example.com` / `buyer123`
-   Admin: `admin@kimoanhgroup.com` / `admin123`

**Resources:**

-   Vercel Docs: https://vercel.com/docs
-   Next.js Docs: https://nextjs.org/docs

## ⏱️ Thời gian ước tính

-   **Setup GitHub**: 2 phút
-   **Deploy Vercel**: 3-5 phút
-   **Test**: 5 phút
-   **Custom domain** (optional): 10 phút

**Tổng: ~10-20 phút để có production site!** 🚀

---

## 🎉 Bắt đầu ngay!

```bash
# Cách nhanh nhất:
./deploy.sh

# Hoặc từng bước:
# 1. Push to GitHub
git push origin main

# 2. Deploy
cd frontend
vercel --prod
```

**Chúc bạn deploy thành công!** 🎊
