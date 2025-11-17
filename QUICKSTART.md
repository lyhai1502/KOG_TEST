# 🎯 Hướng dẫn Nhanh - Kim Oanh Group NOXH Platform

## 🚀 Khởi động nhanh (3 bước)

### Cách 1: Sử dụng Script tự động

```bash
./start-frontend.sh
```

### Cách 2: Chạy thủ công

```bash
cd frontend
npm install
npm run dev
```

Mở trình duyệt tại: **http://localhost:3000**

---

## 📸 Demo Screenshots & Walkthrough

### 1. Trang Đăng nhập (`/login`)

-   Nhập email và password
-   Click "Đăng nhập"
-   Hệ thống sẽ redirect về Dashboard

**✨ Tài khoản Demo (sẵn sàng dùng ngay!):**

#### Admin Account

-   📧 Email: `admin@kimoanhgroup.com`
-   🔑 Password: `admin123`
-   🎭 Vai trò: ADMIN - Quản trị viên

#### Sales Account

-   📧 Email: `sales@kimoanhgroup.com`
-   🔑 Password: `sales123`
-   🎭 Vai trò: SALES - Nhân viên kinh doanh

#### Agency Account

-   📧 Email: `agency@kimoanhgroup.com`
-   🔑 Password: `agency123`
-   🎭 Vai trò: AGENCY - Đại lý

> 💡 **Xem chi tiết tất cả tài khoản tại:** [DEMO_ACCOUNTS.md](DEMO_ACCOUNTS.md)

### 2. Trang Đăng ký (`/register`)

-   Điền thông tin: Họ tên, Email, Password
-   Chọn vai trò: Sales hoặc Agency
-   Nếu chọn Agency: Nhập tên Agency
-   Click "Đăng ký"

### 3. Dashboard (`/dashboard`)

#### Sidebar Navigation

-   **Dự án**: Xem tất cả dự án NOXH
-   **Căn hộ**: Xem tất cả căn hộ/sản phẩm

#### Search & Filters

1. **Tìm kiếm theo từ khóa**: Nhập tên dự án, mã căn, địa chỉ...
2. **Lọc theo giá**: Min/Max (VNĐ)
3. **Lọc theo diện tích**: Min/Max (m²)
4. **Lọc theo số phòng ngủ**: 1, 2, 3+ phòng
5. Click "Tìm kiếm" hoặc "Xóa bộ lọc"

#### Projects View

-   Hiển thị grid các dự án
-   Thông tin: Tên, địa chỉ, tổng số căn, còn trống, giá
-   Click "Xem chi tiết" để xem thêm

#### Units View

-   Hiển thị grid các căn hộ
-   Thông tin: Mã căn, diện tích, phòng ngủ, WC, hướng, giá
-   Status badges: Còn trống (xanh), Đã đặt (vàng), Đã bán (đỏ)
-   Click "Xem chi tiết" để xem thêm

---

## 🎨 UI Components Breakdown

### Colors

-   **Primary**: Blue (#3B82F6) - Kim Oanh branding
-   **Success**: Green - Còn trống
-   **Warning**: Yellow - Đã đặt cọc
-   **Danger**: Red - Đã bán
-   **Gray**: Đã khóa

### Layouts

-   **Login/Register**: Centered card layout
-   **Dashboard**: Sidebar + Main content
-   **Listings**: Responsive grid (1 col mobile, 2 cols tablet, 3 cols desktop)

---

## ⌨️ Keyboard Shortcuts (Future)

-   `Ctrl/Cmd + K`: Quick search
-   `Ctrl/Cmd + /`: Toggle sidebar
-   `Esc`: Close modals

---

## 📱 Responsive Design

### Mobile (< 768px)

-   Single column layout
-   Collapsible sidebar
-   Touch-friendly buttons

### Tablet (768px - 1024px)

-   2 column grid
-   Sidebar visible

### Desktop (> 1024px)

-   3 column grid
-   Full sidebar + header

---

## 🔍 Search Tips

### Tìm kiếm Projects

-   Tìm theo tên: "Kim Oanh", "Bình Chánh"
-   Tìm theo địa chỉ: "Quận 7", "TP.HCM"

### Tìm kiếm Units

-   Tìm theo mã: "A1-01", "B2-05"
-   Kết hợp filters cho kết quả tốt nhất

### Best Practices

1. Sử dụng filters trước
2. Sau đó mới search keyword
3. Reset filters nếu không tìm thấy

---

## 🐛 Troubleshooting

### Lỗi: "Cannot connect to API"

**Giải pháp**:

-   Kiểm tra backend đã chạy chưa
-   Kiểm tra URL trong `.env.local`

### Lỗi: "Token expired"

**Giải pháp**:

-   Logout và login lại
-   Token tự động refresh sau mỗi request

### Lỗi: "Page not found"

**Giải pháp**:

-   Đảm bảo đã login
-   Check URL có đúng không

---

## 💡 Pro Tips

### Cho Sales/Agency

1. **Lưu bộ lọc thường dùng**: Note lại các filter combo hay dùng
2. **Sử dụng trạng thái**: Chỉ hiển thị "Còn trống" để tiết kiệm thời gian
3. **Multiple tabs**: Mở nhiều tab để so sánh sản phẩm

### Cho Admin (Future)

1. **Bulk actions**: Update nhiều sản phẩm cùng lúc
2. **Export data**: Xuất Excel để báo cáo
3. **Analytics**: Theo dõi sản phẩm hot

---

## 📊 Data Structure Reference

### Project Fields

```typescript
{
    id: string;
    name: string; // Tên dự án
    address: string; // Địa chỉ đầy đủ
    district: string; // Quận/Huyện
    city: string; // Thành phố
    totalUnits: number; // Tổng số căn
    availableUnits: number; // Còn trống
    priceRange: {
        min: number;
        max: number;
    }
    status: "PLANNING" | "SELLING" | "SOLD_OUT" | "COMPLETED";
}
```

### Unit Fields

```typescript
{
    id: string;
    code: string; // Mã căn: A1-01
    floor: number; // Tầng
    block: string; // Block/Lô
    area: number; // Diện tích (m²)
    bedrooms: number; // Số phòng ngủ
    bathrooms: number; // Số WC
    price: number; // Giá (VNĐ)
    direction: string; // Hướng: EAST, WEST, NORTH, SOUTH...
    status: "AVAILABLE" | "RESERVED" | "SOLD" | "BLOCKED";
}
```

---

## 🎯 Use Cases

### Use Case 1: Sales tìm căn hộ cho khách

**Scenario**: Khách muốn mua căn 2PN, giá dưới 1.5 tỷ, hướng Đông

**Steps**:

1. Vào Dashboard → Click "Căn hộ"
2. Set filters:
    - Số phòng ngủ: 2
    - Giá tối đa: 1,500,000,000
    - (Optional) Hướng: Đông
3. Click "Tìm kiếm"
4. Browse kết quả
5. Click "Xem chi tiết" căn phù hợp
6. Tư vấn khách hàng

### Use Case 2: Agency xem overview dự án

**Scenario**: Muốn xem tổng quan các dự án đang bán

**Steps**:

1. Vào Dashboard → Click "Dự án"
2. Xem grid tất cả projects
3. Note số căn còn trống
4. Click "Xem chi tiết" dự án quan tâm

### Use Case 3: Admin thêm sản phẩm mới (Future)

**Steps**:

1. Login với tài khoản Admin
2. Vào Admin Panel
3. Click "Thêm dự án mới"
4. Điền thông tin
5. Upload hình ảnh
6. Save

---

## 📚 Learning Resources

### Next.js Documentation

-   [Next.js 14 Docs](https://nextjs.org/docs)
-   [App Router Guide](https://nextjs.org/docs/app)

### Tailwind CSS

-   [Tailwind Docs](https://tailwindcss.com/docs)
-   [Utility Classes](https://tailwindcss.com/docs/utility-first)

### TypeScript

-   [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🎓 Training Materials (Coming Soon)

-   [ ] Video tutorial: Hướng dẫn sử dụng cơ bản
-   [ ] PDF Guide: In ra để tham khảo
-   [ ] FAQ: Các câu hỏi thường gặp
-   [ ] Tips & Tricks: Mẹo sử dụng hiệu quả

---

## 🆘 Support

**Cần hỗ trợ?**

1. Đọc [SETUP.md](frontend/SETUP.md) cho hướng dẫn chi tiết
2. Đọc [README.md](README.md) cho tổng quan hệ thống
3. Liên hệ Tech Support: [support@kimoanhgroup.com]

---

## ✅ Checklist cho Users mới

### Lần đầu sử dụng

-   [ ] Đã cài Node.js >= 18.x
-   [ ] Đã clone repository
-   [ ] Đã chạy `npm install`
-   [ ] Đã tạo file `.env.local`
-   [ ] Đã chạy `npm run dev`
-   [ ] Đã mở http://localhost:3000
-   [ ] Đã đăng ký tài khoản
-   [ ] Đã test login/logout
-   [ ] Đã test search & filter
-   [ ] Đã bookmark các trang quan trọng

### Training Checklist (Cho Sales/Agency)

-   [ ] Hiểu cách login/logout
-   [ ] Biết cách tìm kiếm projects
-   [ ] Biết cách tìm kiếm units
-   [ ] Biết cách dùng filters
-   [ ] Biết cách xem chi tiết sản phẩm
-   [ ] Biết ý nghĩa các status colors
-   [ ] Đã practice với dữ liệu mẫu

---

**Happy listing! 🏠🎉**
