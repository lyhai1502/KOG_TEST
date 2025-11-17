# 📝 Hướng Dẫn Khách Hàng Nộp Hồ Sơ NOXH

## 🎯 Tổng Quan

Hệ thống cho phép khách hàng (Buyer) nộp hồ sơ đăng ký mua Nhà ở Xã hội (NOXH) trực tuyến với quy trình 100% số hóa.

---

## 🚀 Tính Năng Chính

### 1. **Dashboard Khách Hàng** (`/buyer/dashboard`)

-   ✅ Hiển thị tổng quan hồ sơ: Tổng số / Đang xử lý / Đạt yêu cầu / Cần bổ sung
-   ✅ Danh sách tất cả hồ sơ đã nộp với trạng thái
-   ✅ Hướng dẫn quy trình đăng ký 4 bước
-   ✅ Nút "Nộp hồ sơ mới" nổi bật

### 2. **Form Nộp Hồ Sơ** (`/buyer/application/new`)

Wizard form 5 bước với validation đầy đủ:

#### **Bước 1: Thông tin cá nhân**

-   Họ tên, ngày sinh, CMND/CCCD
-   Số điện thoại, email
-   Địa chỉ thường trú & hiện tại

#### **Bước 2: Thu nhập & Nhà ở**

-   Thu nhập hàng tháng (phải 10-20 triệu VNĐ)
-   Tình trạng việc làm, đơn vị công tác
-   Tình trạng nhà ở hiện tại
-   Số thành viên gia đình & người phụ thuộc

#### **Bước 3: Tài liệu**

Upload các giấy tờ:

-   CMND/CCCD (2 mặt) \*
-   Giấy xác nhận thu nhập \*
-   Sổ hộ khẩu \*
-   Giấy chứng nhận kết hôn (nếu có)

Hỗ trợ: JPG, PNG, PDF (max 5MB)

#### **Bước 4: Đối tượng ưu tiên**

Nếu thuộc diện:

-   Gia đình có công với cách mạng
-   Thương binh, bệnh binh
-   Gia đình liệt sĩ
-   Người có hoàn cảnh khó khăn
-   Lao động trong KCN

#### **Bước 5: Xác nhận & Nộp**

-   Review toàn bộ thông tin
-   Checkbox xác nhận trung thực
-   Nộp hồ sơ chính thức

### 3. **Chi Tiết Hồ Sơ** (`/buyer/application/[id]`)

-   ✅ Timeline tracking theo thời gian thực
-   ✅ Hiển thị điểm đánh giá hồ sơ (eligibilityScore)
-   ✅ Trạng thái từng tài liệu (Approved/Pending/Rejected)
-   ✅ Ghi chú từ cán bộ xem xét
-   ✅ Thông báo nếu cần bổ sung tài liệu
-   ✅ Sidebar với thông tin dự án & hotline hỗ trợ

---

## 📊 Quy Trình Xử Lý Hồ Sơ

```
DRAFT → SUBMITTED → UNDER_REVIEW → QUALIFIED → LOTTERY_PENDING → WON/NOT_WON
            ↓
        NEED_SUPPLEMENT (nếu thiếu tài liệu)
            ↓
        REJECTED (nếu không đạt yêu cầu)
```

### Trạng thái hồ sơ:

-   **DRAFT**: Đang soạn thảo
-   **SUBMITTED**: Đã nộp, chờ xem xét
-   **UNDER_REVIEW**: Cán bộ đang kiểm tra (2-5 ngày)
-   **NEED_SUPPLEMENT**: Cần bổ sung tài liệu
-   **QUALIFIED**: Đạt yêu cầu (score ≥ 70/100)
-   **LOTTERY_PENDING**: Chờ bốc thăm
-   **WON**: Trúng căn hộ 🎉
-   **NOT_WON**: Không trúng
-   **REJECTED**: Bị từ chối

---

## 🎨 UI/UX Highlights

### Visual Design

-   🎨 Gradient hero với icon động
-   📊 Stats cards với màu sắc phân biệt
-   📈 Timeline visualization cho tracking
-   ✅ Progress bar cho wizard form
-   🔔 Alert boxes cho hướng dẫn quan trọng

### User Experience

-   🔄 Auto-save form data khi chuyển step
-   ✏️ Inline validation (React Hook Form + Zod)
-   📤 Drag-and-drop upload (future enhancement)
-   📱 Fully responsive design
-   ♿ Accessibility compliant

---

## 🔐 Demo Account

```
Email: buyer@example.com
Password: buyer123
```

Tài khoản này đã có:

-   1 hồ sơ QUALIFIED (score 85/100)
-   KYC đã verified
-   Sẵn sàng xem các tính năng

---

## 🛠️ Technical Details

### Components Created

```
/frontend/src/app/buyer/
├── dashboard/
│   ├── layout.tsx          # Auth guard
│   └── page.tsx            # Dashboard với stats
├── application/
│   ├── new/
│   │   └── page.tsx        # Wizard form 5 bước
│   └── [id]/
│       └── page.tsx        # Chi tiết + timeline
```

### Data Flow

```typescript
1. User fills wizard form → formData state
2. On final submit → mockSubmitApplication()
3. Creates Application object with status: SUBMITTED
4. Admin reviews → status: UNDER_REVIEW
5. System scores → status: QUALIFIED (if score ≥ 70)
6. Lottery (if needed) → status: WON/NOT_WON
```

### Mock Data

-   3 applications in `MOCK_APPLICATIONS`
-   User #4 (buyer@example.com) owns application #1
-   Ready for API integration (commented instructions)

---

## 📋 Checklist Implementation

### ✅ Completed (Primary Market - Must Have)

-   [x] Application submission form (wizard)
-   [x] Application tracking dashboard
-   [x] Document upload UI
-   [x] Status timeline visualization
-   [x] Eligibility scoring display
-   [x] Priority group selection
-   [x] Review notes from admin

### 🔄 Next Steps (Secondary Market)

-   [ ] Listing creation form (for sellers)
-   [ ] Listing marketplace (browse/search)
-   [ ] Transaction initiation flow
-   [ ] Payment integration UI
-   [ ] Contract signing workflow
-   [ ] Transfer eligibility checker

---

## 🎓 User Journey Example

1. **Login** với `buyer@example.com`
2. **Dashboard** hiển thị 1 hồ sơ QUALIFIED
3. Click **"Xem chi tiết"** → Thấy timeline:
    - ✅ Tạo hồ sơ (01/11/2025)
    - ✅ Nộp hồ sơ (01/11/2025)
    - ✅ Xem xét hồ sơ (05/11/2025)
    - ✅ Đạt yêu cầu - 85 điểm
4. Click **"Nộp hồ sơ mới"** → Wizard form:
    - Điền thông tin cá nhân
    - Nhập thu nhập 15M VNĐ
    - Upload CMND + giấy thu nhập
    - Chọn "không thuộc diện ưu tiên"
    - Review & Submit
5. **Success!** Redirect về dashboard

---

## 🔍 Testing Checklist

### Functional Testing

-   [ ] Login với buyer account thành công
-   [ ] Dashboard load stats chính xác
-   [ ] Wizard form validate từng field
-   [ ] File upload accept đúng format
-   [ ] Timeline hiển thị đầy đủ steps
-   [ ] Status badge đổi màu đúng

### Edge Cases

-   [ ] Submit form với missing required fields
-   [ ] Upload file > 5MB (should reject)
-   [ ] Navigate back/forward trong wizard
-   [ ] Application không tồn tại (404)
-   [ ] Refresh page giữa chừng wizard

---

## 🚀 Deployment Notes

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://api.kimoanhgroup.com
NEXT_PUBLIC_MAX_FILE_SIZE=5242880  # 5MB
NEXT_PUBLIC_ALLOWED_FILE_TYPES=image/*,application/pdf
```

### Backend API Endpoints (To Implement)

```
POST   /api/applications              # Create application
GET    /api/applications              # List user's applications
GET    /api/applications/:id          # Get application detail
PATCH  /api/applications/:id          # Update application
POST   /api/applications/:id/documents # Upload document
```

---

## 📞 Support

-   **Hotline**: 1900-xxxx
-   **Email**: support@kimoanhgroup.com
-   **Working Hours**: 8:00 - 17:00 (Mon-Fri)

---

**Last Updated**: 2025-01-XX  
**Version**: 2.0 (Primary Market Features)
