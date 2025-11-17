# Kim Oanh Group - Sàn Giao dịch NOXH Platform (Frontend)

## 🏢 Giới thiệu

Nền tảng giao dịch Nhà ở Xã hội (NOXH) của Kim Oanh Group - MVP Phase 1: Internal Listing Platform cho 600 Sales và 50 Agencies.

## 🚀 Công nghệ sử dụng

-   **Framework**: Next.js 14 (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Components**: Shadcn/ui (Radix UI)
-   **State Management**: Zustand
-   **API Client**: Axios
-   **Data Fetching**: TanStack React Query
-   **Form Handling**: React Hook Form + Zod
-   **Icons**: Lucide React

## 📋 Yêu cầu hệ thống

-   Node.js >= 18.x
-   npm hoặc yarn hoặc pnpm

## 🛠️ Cài đặt

1. **Clone repository và di chuyển vào thư mục frontend:**

    ```bash
    cd frontend
    ```

2. **Cài đặt dependencies:**

    ```bash
    npm install
    ```

3. **Cấu hình biến môi trường:**

    ```bash
    cp .env.local .env
    ```

    Chỉnh sửa file `.env` với các thông tin phù hợp:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3000/api
    NEXT_PUBLIC_APP_NAME=Kim Oanh Group - NOXH Platform
    ```

4. **Cài đặt thêm các dependencies cần thiết:**
    ```bash
    npm install @radix-ui/react-label @radix-ui/react-slot class-variance-authority tailwindcss-animate
    ```

## 🎯 Chạy ứng dụng

### Development mode:

```bash
npm run dev
```

Mở trình duyệt tại [http://localhost:3000](http://localhost:3000)

### Production build:

```bash
npm run build
npm run start
```

## 📱 Tính năng MVP Phase 1

### 🔐 Authentication

-   ✅ Đăng nhập (Login)
-   ✅ Đăng ký (Register) cho Sales/Agency
-   ✅ Phân quyền người dùng (Role-based access)

### 🏠 Dashboard

-   ✅ Xem danh sách dự án NOXH
-   ✅ Xem danh sách căn hộ/sản phẩm
-   ✅ Tìm kiếm và lọc nâng cao
    -   Theo giá
    -   Theo diện tích
    -   Theo số phòng ngủ
    -   Theo hướng
    -   Theo trạng thái

### 🔍 Search & Filter

-   Tìm kiếm theo từ khóa
-   Lọc theo nhiều tiêu chí
-   Phân trang kết quả

### 📊 Display Information

-   Thông tin chi tiết dự án
-   Thông tin chi tiết từng căn hộ
-   Hình ảnh sản phẩm
-   Trạng thái: Còn trống, Đã đặt cọc, Đã bán, Đã khóa

## 📂 Cấu trúc thư mục

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── login/             # Trang đăng nhập
│   │   ├── register/          # Trang đăng ký
│   │   ├── dashboard/         # Dashboard chính
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── ui/                # UI Components (Shadcn)
│   │   ├── dashboard/         # Dashboard components
│   │   └── providers/         # Context providers
│   ├── lib/
│   │   ├── api.ts            # Axios configuration
│   │   └── utils.ts          # Utility functions
│   ├── store/
│   │   └── auth.store.ts     # Zustand auth store
│   └── types/
│       └── index.ts          # TypeScript types
├── public/                    # Static assets
├── .env.local                # Environment variables
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
└── package.json
```

## 🎨 UI/UX

-   **Design System**: Material Design inspired
-   **Responsive**: Hỗ trợ đầy đủ mobile, tablet, desktop
-   **Theme**: Light mode (Dark mode sẽ được bổ sung sau)
-   **Color Scheme**: Blue primary (Kim Oanh Group branding)

## 🔄 API Integration

Frontend kết nối với backend API thông qua:

-   **Base URL**: Cấu hình trong `.env.local`
-   **Authentication**: Bearer Token (JWT)
-   **Error Handling**: Tự động logout khi token hết hạn

### API Endpoints sử dụng:

-   `POST /api/auth/login` - Đăng nhập
-   `POST /api/auth/register` - Đăng ký
-   `GET /api/projects` - Lấy danh sách dự án
-   `GET /api/units` - Lấy danh sách căn hộ
-   `GET /api/projects/:id` - Chi tiết dự án
-   `GET /api/units/:id` - Chi tiết căn hộ

## 🧪 Testing (Sẽ implement sau)

```bash
npm run test        # Run unit tests
npm run test:e2e    # Run E2E tests
```

## 📦 Build & Deploy

### Build for production:

```bash
npm run build
```

### Deploy options:

-   **Vercel** (Recommended for Next.js)
-   **Docker** (sẽ có Dockerfile)
-   **Traditional hosting** (build output trong folder `.next`)

## 🚀 Roadmap

### Phase 1 - MVP (Current) ✅

-   [x] Authentication & Authorization
-   [x] Internal Listing Platform
-   [x] Search & Filter
-   [x] Project & Unit Display

### Phase 2 - Primary Market 🔄

-   [ ] Hồ sơ đăng ký mua NOXH
-   [ ] Kiểm tra hồ sơ tự động
-   [ ] Quy trình bốc thăm

### Phase 3 - Secondary Market 📅

-   [ ] Đăng tin chuyển nhượng
-   [ ] Giao dịch online
-   [ ] Ký hợp đồng điện tử

### Phase 4 - Advanced Features 🔮

-   [ ] AI recommendation
-   [ ] Blockchain integration
-   [ ] Analytics dashboard

## 👥 User Roles

1. **ADMIN**

    - Quản lý toàn bộ hệ thống
    - Thêm/sửa/xóa dự án và sản phẩm
    - Quản lý người dùng

2. **SALES**

    - Xem danh sách dự án và sản phẩm
    - Tìm kiếm và lọc
    - Tư vấn khách hàng

3. **AGENCY**
    - Tương tự SALES
    - Thông tin agency riêng

## 🤝 Đóng góp

Liên hệ team để được hướng dẫn quy trình đóng góp code.

## 📄 License

Proprietary - Kim Oanh Group © 2025

## 📞 Liên hệ

-   **Project Owner**: Kim Oanh Group
-   **Tech Lead**: [Your Name]
-   **Email**: [contact@kimoanhgroup.com]

---

**Lưu ý**: Đây là phiên bản MVP Phase 1 - Internal Listing Platform. Các tính năng nâng cao sẽ được phát triển trong các phase tiếp theo.
