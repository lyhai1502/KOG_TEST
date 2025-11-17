# Kim Oanh Group - Sàn NOXH Platform

## 🎯 Tổng quan Dự án

Nền tảng Giao dịch Thứ cấp Bất động sản Nhà ở Xã hội (NOXH) cho Kim Oanh Group.

**Giai đoạn hiện tại**: MVP Phase 1 - Internal Listing Platform

**Mục tiêu**: Cung cấp nền tảng đăng tin nội bộ cho 600 Sales và 50 Agencies để tra cứu và tư vấn sản phẩm NOXH cho khách hàng.

---

## 📁 Cấu trúc Project

```
kog_test/
├── frontend/           # Next.js Frontend Application
│   ├── src/
│   │   ├── app/       # Next.js App Router pages
│   │   ├── components/# React components
│   │   ├── lib/       # Libraries & utilities
│   │   ├── store/     # State management (Zustand)
│   │   └── types/     # TypeScript types
│   ├── public/        # Static assets
│   └── package.json
│
├── backend/           # (Coming soon) Backend services
│   ├── services/      # Microservices
│   └── infrastructure/# Docker, databases, etc.
│
└── README.md         # This file
```

---

## 🚀 Quick Start

### Frontend Development

```bash
# Di chuyển vào thư mục frontend
cd frontend

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Truy cập: **http://localhost:3000**

📖 **Chi tiết**: Xem [frontend/SETUP.md](frontend/SETUP.md)

---

## 🏗️ Kiến trúc Hệ thống

### Technology Stack

#### Frontend

-   **Framework**: Next.js 14 (React 18, App Router)
-   **Language**: TypeScript 5
-   **Styling**: Tailwind CSS 3
-   **UI Components**: Radix UI (shadcn/ui)
-   **State**: Zustand
-   **API Client**: Axios + React Query

#### Backend (Planned)

-   **Architecture**: Microservices
-   **Services**:
    -   User Service (Authentication, Authorization)
    -   Listing Service (Projects, Units)
    -   Application Service (Primary market)
    -   Transaction Service (Secondary market)
    -   Notification Service
    -   Analytics Service

#### Database (Planned)

-   **Primary DB**: PostgreSQL
-   **Search**: Elasticsearch
-   **Cache**: Redis
-   **Blockchain**: Hyperledger Fabric / Ethereum

---

## 🎯 Lộ trình Phát triển

### ✅ Phase 1: MVP - Internal Listing Platform (Current)

**Timeline**: 1-3 tháng | **Status**: 🟢 In Progress

**Mục tiêu**: Giải quyết nhu cầu cấp bách cho 600 sales và 50 agencies

**Tính năng**:

-   ✅ Authentication (Login, Register, Role-based access)
-   ✅ Dashboard với sidebar navigation
-   ✅ Projects listing với search & filter
-   ✅ Units listing với advanced filters
-   ✅ Responsive design (mobile, tablet, desktop)
-   🔄 Admin panel (CRUD operations)

**Deliverables**:

-   Frontend: Next.js application
-   Backend: API services (User, Listing)
-   Database: PostgreSQL với sample data

---

### 📋 Phase 2: Primary Market & Compliance

**Timeline**: 3-6 tháng | **Status**: 🟡 Planned

**Mục tiêu**: Số hóa quy trình đăng ký mua NOXH, đảm bảo tuân thủ pháp lý

**Tính năng**:

-   [ ] Application form cho người mua
-   [ ] Document upload & eKYC
-   [ ] Eligibility checking engine
-   [ ] Automated lottery system
-   [ ] Application status tracking
-   [ ] Admin approval workflow

---

### 🏪 Phase 3: Secondary Marketplace

**Timeline**: 6-9 tháng | **Status**: 🔴 Future

**Mục tiêu**: Kích hoạt thị trường thứ cấp, tăng thanh khoản

**Tính năng**:

-   [ ] Transfer listing creation
-   [ ] Online transaction flow
-   [ ] Payment gateway integration
-   [ ] Escrow service
-   [ ] E-signature integration
-   [ ] Transaction history

---

### 🔮 Phase 4: Intelligence & Trust

**Timeline**: Continuous | **Status**: 🔴 Future

**Mục tiêu**: Nâng cao lợi thế cạnh tranh bằng công nghệ tiên tiến

**Tính năng**:

-   [ ] Blockchain integration (Smart contracts)
-   [ ] AI price prediction
-   [ ] Recommendation engine
-   [ ] Advanced analytics dashboard
-   [ ] Market trend analysis

---

## 👥 Vai trò Người dùng

### 1. ADMIN (Quản trị viên)

-   Quản lý toàn bộ hệ thống
-   CRUD projects và units
-   Quản lý users
-   Xem analytics và reports
-   Phê duyệt hồ sơ

### 2. SALES (Nhân viên kinh doanh)

-   Xem danh sách projects và units
-   Tìm kiếm và filter sản phẩm
-   Xem chi tiết sản phẩm
-   Tư vấn khách hàng

### 3. AGENCY (Đại lý)

-   Tương tự SALES
-   Có thông tin agency riêng
-   Có thể quản lý team (future)

### 4. BUYER (Người mua - Future)

-   Đăng ký mua NOXH (primary)
-   Xem listings (secondary)
-   Giao dịch online

---

## 📊 Business Requirements

### Core Modules

#### 1. Module Sơ cấp & Tuân thủ (Primary & Compliance)

-   Tiếp nhận hồ sơ đăng ký mua NOXH
-   Tích hợp API/Quy định để lọc hồ sơ hợp lệ
-   Kiểm tra điều kiện: sở hữu nhà, thu nhập, đối tượng ưu tiên
-   Tự động hóa quy trình bốc thăm

#### 2. Module Sàn Giao dịch Thứ cấp (Secondary Marketplace)

-   Đăng tin sang nhượng (khi đủ điều kiện)
-   Xử lý giao dịch, thuế, phí online
-   Matching buyers và sellers

#### 3. Module Bảo mật & Tin cậy (Trust & Security)

-   Blockchain/Smart Contract
-   Xác thực giao dịch
-   Chống giả mạo giấy tờ

#### 4. Module Thông minh (Intelligence)

-   AI dự báo giá
-   Phân tích nguyện vọng khách hàng
-   Gợi ý căn hộ phù hợp
-   Market analytics

---

## 🛠️ Development Setup

### Prerequisites

-   Node.js >= 18.x
-   npm hoặc yarn
-   Git
-   Docker (optional, for backend)

### Installation

```bash
# Clone repository
git clone <repository-url>
cd kog_test

# Setup frontend
cd frontend
npm install
npm run dev

# Setup backend (when available)
cd ../backend
docker-compose up -d
```

---

## 📝 Documentation

-   [Frontend Setup Guide](frontend/SETUP.md)
-   [Frontend README](frontend/README.md)
-   Backend Documentation (Coming soon)
-   API Documentation (Coming soon)
-   Deployment Guide (Coming soon)

---

## 🧪 Testing (Planned)

```bash
# Frontend tests
cd frontend
npm run test
npm run test:e2e

# Backend tests
cd backend
npm run test
```

---

## 📈 Success Metrics (KPIs)

### Phase 1 MVP

-   [ ] 600 sales users onboarded
-   [ ] 50 agency users onboarded
-   [ ] Average search time < 5 seconds
-   [ ] 95% uptime
-   [ ] Mobile responsive (100% features)

### Phase 2 Primary Market

-   [ ] 80% application forms submitted online
-   [ ] Eligibility checking time < 2 minutes
-   [ ] Lottery process 100% automated

### Phase 3 Secondary Market

-   [ ] 50+ listings per month
-   [ ] 10+ transactions per month
-   [ ] Average transaction time < 7 days

---

## 🔒 Security Considerations

-   JWT authentication with refresh tokens
-   Role-based access control (RBAC)
-   Input validation & sanitization
-   SQL injection prevention
-   XSS protection
-   HTTPS only in production
-   Data encryption at rest and in transit

---

## 🚀 Deployment

### Frontend (Ready to Deploy!)

-   **Platform**: Vercel (Recommended) / Netlify
-   **Status**: ✅ Production Ready
-   **Build**: Optimized for performance
-   **Deploy Time**: ~3 minutes

**Quick Deploy**:

```bash
# Option 1: Vercel CLI
cd frontend
vercel --prod

# Option 2: Push to GitHub → Import to Vercel
git push origin main
# Then import on vercel.com/new
```

📖 **Full Guide**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) or [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)

### Backend (Planned)

-   Platform: AWS ECS / Kubernetes
-   Database: AWS RDS PostgreSQL
-   Cache: AWS ElastiCache Redis
-   Storage: AWS S3

---

## 📞 Contact

**Project Owner**: Kim Oanh Group
**Tech Lead**: [Your Name]
**Email**: [contact@kimoanhgroup.com]

---

## 📄 License

Proprietary - Kim Oanh Group © 2025

---

## 🎉 Contributors

-   Frontend Developer: [Your Name]
-   Backend Developer: [TBD]
-   UI/UX Designer: [TBD]
-   Product Manager: [TBD]

---

**Status Update**: Ngày 17 Tháng 11, 2025

-   ✅ Frontend MVP đã hoàn thành 90%
-   🔄 Backend đang trong quá trình phát triển
-   📅 Dự kiến launch Phase 1: Q1 2026
# KOG_TEST
