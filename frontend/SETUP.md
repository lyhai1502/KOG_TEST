# 🚀 Hướng dẫn Khởi chạy Frontend - Kim Oanh Group NOXH Platform

## ⚡ Quick Start

### Bước 1: Di chuyển vào thư mục frontend

```bash
cd frontend
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Cài đặt các dependencies bổ sung

```bash
npm install @radix-ui/react-label @radix-ui/react-slot class-variance-authority tailwindcss-animate
```

### Bước 4: Chạy development server

```bash
npm run dev
```

Truy cập: **http://localhost:3000**

---

## 📦 Chi tiết Cài đặt

### 1. Yêu cầu hệ thống

-   Node.js: >= 18.17.0
-   npm: >= 9.x hoặc yarn >= 1.22.x

Kiểm tra phiên bản:

```bash
node --version
npm --version
```

### 2. Clone và Setup

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt tất cả dependencies
npm install

# Hoặc dùng yarn
yarn install
```

### 3. Cấu hình Environment Variables

File `.env.local` đã được tạo sẵn với cấu hình mặc định:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=Kim Oanh Group - NOXH Platform
NEXT_PUBLIC_APP_VERSION=1.0.0
```

**Lưu ý**: Thay đổi `NEXT_PUBLIC_API_URL` nếu backend API của bạn chạy ở port khác.

### 4. Chạy ứng dụng

#### Development Mode (với Hot Reload):

```bash
npm run dev
```

#### Production Build:

```bash
# Build
npm run build

# Start production server
npm run start
```

#### Type Checking:

```bash
npm run type-check
```

#### Lint Check:

```bash
npm run lint
```

---

## 🎯 Tính năng Đã Hoàn thành

### ✅ Phase 1 - MVP (Current)

1. **Authentication System**

    - Trang đăng nhập (`/login`)
    - Trang đăng ký (`/register`)
    - Phân quyền: Admin, Sales, Agency
    - JWT Token Authentication
    - Auto-redirect khi token hết hạn

2. **Dashboard**

    - Sidebar navigation
    - Header với user info
    - Toggle giữa Projects và Units view

3. **Projects Listing**

    - Grid layout hiển thị dự án
    - Thông tin: Tên, địa chỉ, số căn, giá, ngày hoàn thành
    - Hình ảnh dự án
    - Trạng thái dự án

4. **Units Listing**

    - Grid layout hiển thị căn hộ
    - Thông tin: Mã căn, diện tích, số phòng, hướng, giá
    - Trạng thái: Còn trống, Đã đặt, Đã bán, Đã khóa
    - Color-coded status badges

5. **Search & Filters**

    - Tìm kiếm theo từ khóa
    - Filter theo giá (min/max)
    - Filter theo diện tích (min/max)
    - Filter theo số phòng ngủ
    - Reset filters
    - Pagination

6. **UI/UX Features**
    - Responsive design (mobile, tablet, desktop)
    - Loading skeletons
    - Empty states
    - Toast notifications
    - Form validations with Zod

---

## 🏗️ Cấu trúc Project

```
frontend/
├── src/
│   ├── app/                      # Next.js 14 App Router
│   │   ├── login/               # Login page
│   │   ├── register/            # Register page
│   │   ├── dashboard/           # Main dashboard
│   │   │   ├── layout.tsx      # Protected layout
│   │   │   └── page.tsx        # Dashboard page
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home (redirect to login)
│   │
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── label.tsx
│   │   ├── dashboard/          # Dashboard specific components
│   │   │   ├── header.tsx      # Top header with logout
│   │   │   ├── sidebar.tsx     # Left sidebar navigation
│   │   │   ├── search-filters.tsx  # Search and filter form
│   │   │   ├── project-list.tsx    # Projects grid
│   │   │   └── unit-list.tsx       # Units grid
│   │   └── providers/
│   │       └── providers.tsx   # React Query + Toaster
│   │
│   ├── lib/
│   │   ├── api.ts              # Axios instance + interceptors
│   │   └── utils.ts            # Utility functions (cn, formatCurrency, etc.)
│   │
│   ├── store/
│   │   └── auth.store.ts       # Zustand auth store
│   │
│   └── types/
│       └── index.ts            # TypeScript interfaces
│
├── public/                      # Static assets
├── .env.local                  # Environment variables
├── next.config.js              # Next.js config
├── tailwind.config.ts          # Tailwind config
├── postcss.config.js           # PostCSS config
├── tsconfig.json               # TypeScript config
└── package.json                # Dependencies
```

---

## 🔑 User Accounts (Demo)

Bạn có thể test với các tài khoản sau (cần backend setup trước):

### Admin Account

-   Email: `admin@kimoanhgroup.com`
-   Password: `admin123`
-   Role: ADMIN

### Sales Account

-   Email: `sales@kimoanhgroup.com`
-   Password: `sales123`
-   Role: SALES

### Agency Account

-   Email: `agency@kimoanhgroup.com`
-   Password: `agency123`
-   Role: AGENCY

---

## 📱 Các trang và Routes

| Route              | Mô tả                     | Auth Required    |
| ------------------ | ------------------------- | ---------------- |
| `/`                | Home (redirect to /login) | No               |
| `/login`           | Trang đăng nhập           | No               |
| `/register`        | Trang đăng ký             | No               |
| `/dashboard`       | Dashboard chính           | Yes              |
| `/admin/dashboard` | Admin dashboard           | Yes (Admin only) |

---

## 🔧 Troubleshooting

### Lỗi: "Cannot find module 'react'"

```bash
npm install react react-dom
```

### Lỗi: Dependencies missing

```bash
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: Port 3000 đã được sử dụng

```bash
# Sử dụng port khác
PORT=3001 npm run dev
```

### Lỗi: API connection failed

-   Kiểm tra backend đã chạy chưa
-   Kiểm tra `NEXT_PUBLIC_API_URL` trong `.env.local`
-   Kiểm tra CORS settings ở backend

---

## 📚 Technologies Stack

-   **Framework**: Next.js 14 (React 18)
-   **Language**: TypeScript 5
-   **Styling**: Tailwind CSS 3
-   **UI Library**: Radix UI (via shadcn/ui)
-   **State Management**: Zustand 4
-   **API Client**: Axios 1.6
-   **Data Fetching**: TanStack React Query 5
-   **Form**: React Hook Form 7 + Zod 3
-   **Icons**: Lucide React
-   **Notifications**: Sonner

---

## 🚀 Next Steps

### Để phát triển tiếp:

1. **Admin Panel** (Phase 1.5)

    - CRUD operations cho Projects
    - CRUD operations cho Units
    - User management

2. **Primary Market** (Phase 2)

    - Application form
    - Document upload
    - Eligibility checking
    - Lottery system

3. **Secondary Market** (Phase 3)
    - Transfer listings
    - Transaction flow
    - E-signature integration

---

## 💡 Tips

1. **Hot Reload**: Code thay đổi sẽ tự động reload trình duyệt
2. **TypeScript**: Sử dụng type checking để tránh lỗi
3. **Components**: Tái sử dụng UI components trong `components/ui/`
4. **Styling**: Dùng Tailwind utility classes
5. **API Calls**: Sử dụng React Query hooks cho caching tự động

---

## 📞 Support

Nếu gặp vấn đề, liên hệ:

-   Tech Lead: [Your Name]
-   Email: [your.email@kimoanhgroup.com]

---

**Happy Coding! 🎉**
