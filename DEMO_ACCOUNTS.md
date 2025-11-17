# 🔑 Tài khoản Demo - Kim Oanh Group NOXH Platform

## 📋 Danh sách Tài khoản Mẫu

### 1. ADMIN (Quản trị viên)

```
📧 Email: admin@kimoanhgroup.com
🔑 Password: admin123
👤 Tên: Quản Trị Viên
🎭 Vai trò: ADMIN
📱 SĐT: 0901234567
```

**Quyền hạn:**

-   ✅ Truy cập toàn bộ hệ thống
-   ✅ Quản lý dự án và sản phẩm
-   ✅ Quản lý người dùng
-   ✅ Xem báo cáo và thống kê

---

### 2. SALES (Nhân viên kinh doanh)

```
📧 Email: sales@kimoanhgroup.com
🔑 Password: sales123
👤 Tên: Nguyễn Văn Sales
🎭 Vai trò: SALES
📱 SĐT: 0902345678
```

**Quyền hạn:**

-   ✅ Xem danh sách dự án
-   ✅ Xem danh sách căn hộ
-   ✅ Tìm kiếm và lọc sản phẩm
-   ✅ Xem chi tiết sản phẩm

---

### 3. AGENCY (Đại lý)

```
📧 Email: agency@kimoanhgroup.com
🔑 Password: agency123
👤 Tên: Trần Thị Agency
🎭 Vai trò: AGENCY
🏢 Agency: ABC Real Estate
📱 SĐT: 0903456789
```

**Quyền hạn:**

-   ✅ Xem danh sách dự án
-   ✅ Xem danh sách căn hộ
-   ✅ Tìm kiếm và lọc sản phẩm
-   ✅ Xem chi tiết sản phẩm

---

## 🚀 Hướng dẫn Đăng nhập

### Bước 1: Khởi động ứng dụng

```bash
cd frontend
npm run dev
```

### Bước 2: Truy cập

Mở trình duyệt tại: http://localhost:3000

### Bước 3: Đăng nhập

1. Click vào trang Login
2. Nhập một trong các tài khoản trên
3. Click "Đăng nhập"

---

## 📊 Dữ liệu Mẫu

### Dự án (3 dự án)

1. **Kim Oanh Green Park**

    - Địa chỉ: Bình Chánh, TP.HCM
    - Giá: 800 triệu - 1.5 tỷ
    - Còn trống: 320/500 căn

2. **Kim Oanh Riverside**

    - Địa chỉ: Quận 7, TP.HCM
    - Giá: 1 tỷ - 1.8 tỷ
    - Còn trống: 180/300 căn

3. **Kim Oanh Luxury**
    - Địa chỉ: Thủ Đức, TP.HCM
    - Giá: 1.5 tỷ - 2.5 tỷ
    - Còn trống: 45/200 căn

### Căn hộ (8 căn mẫu)

-   Mã căn: A1-01, A1-02, A2-05, B1-03, R1-10, R2-05, L1-15, L2-08
-   Trạng thái: Còn trống, Đã đặt cọc, Đã bán
-   Diện tích: 55-90m²
-   Phòng ngủ: 2-3 phòng

---

## 🎯 Test Scenarios

### Scenario 1: Login as Admin

```
1. Đăng nhập với: admin@kimoanhgroup.com / admin123
2. Redirect to: /admin/dashboard
3. Có thể quản lý toàn bộ hệ thống
```

### Scenario 2: Login as Sales

```
1. Đăng nhập với: sales@kimoanhgroup.com / sales123
2. Redirect to: /dashboard
3. Xem và tìm kiếm products
```

### Scenario 3: Search & Filter

```
1. Đăng nhập bất kỳ tài khoản nào
2. Vào Dashboard
3. Click "Căn hộ"
4. Set filter:
   - Số phòng ngủ: 2
   - Giá tối đa: 1,200,000,000
5. Click "Tìm kiếm"
6. Kết quả sẽ hiển thị các căn phù hợp
```

### Scenario 4: Register new account

```
1. Vào trang /register
2. Điền thông tin:
   - Email: test@example.com
   - Password: test123
   - Name: Test User
   - Role: SALES
3. Click "Đăng ký"
4. Login với tài khoản mới tạo
```

---

## 🔄 Chuyển đổi sang Real API

Khi backend đã sẵn sàng, chỉ cần uncommment code trong các file:

### `/src/app/login/page.tsx`

```typescript
// Comment dòng này:
const { user, accessToken } = mockLogin(data.email, data.password);

// Uncomment dòng này:
// const response = await api.post("/auth/login", data);
// const { user, accessToken } = response.data;
```

### `/src/app/dashboard/page.tsx`

```typescript
// Comment mock functions
// Uncomment API calls
```

---

## 💡 Tips

### Lưu tài khoản trong trình duyệt

-   Browser sẽ tự động gợi ý save password
-   Dùng Chrome/Edge Password Manager để quản lý

### Quick Login

Để test nhanh, dùng tài khoản:

-   **Admin**: admin@kimoanhgroup.com / admin123
-   **Sales**: sales@kimoanhgroup.com / sales123

### Reset State

Nếu gặp lỗi, clear browser storage:

```javascript
// Mở Console (F12) và chạy:
localStorage.clear();
// Reload page
```

---

## 🐛 Common Issues

### Issue 1: "Email hoặc mật khẩu không đúng"

**Solution**: Đảm bảo nhập đúng email và password từ danh sách trên

### Issue 2: Stuck at loading

**Solution**:

```bash
# Restart dev server
npm run dev
```

### Issue 3: Token expired

**Solution**: Logout và login lại

---

## 📝 Notes

-   Tất cả data hiện tại đang dùng **mock data**
-   Không cần backend để test
-   Data sẽ reset khi reload page
-   Đăng ký user mới sẽ chỉ lưu trong session hiện tại

---

## 🎓 Training Checklist

Sử dụng checklist này để training users mới:

-   [ ] Đã test login với cả 3 roles
-   [ ] Đã test search function
-   [ ] Đã test filters (giá, diện tích, phòng ngủ)
-   [ ] Đã test pagination
-   [ ] Đã test logout
-   [ ] Đã test register new account
-   [ ] Hiểu ý nghĩa các status colors
-   [ ] Biết cách đọc thông tin projects
-   [ ] Biết cách đọc thông tin units

---

**Ready to test! 🚀**

Bất kỳ câu hỏi nào, vui lòng liên hệ Tech Support.
