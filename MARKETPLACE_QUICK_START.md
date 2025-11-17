# Marketplace Features - Quick Start Guide

## 🚀 Quick Access

### From Buyer Dashboard

1. Login as buyer: `buyer@example.com` / `buyer123`
2. Navigate to buyer dashboard
3. Click either:
    - **"Khám phá ngay"** in "Sàn Giao Dịch Thứ Cấp" card → Marketplace
    - **"Xem danh sách"** in "Danh Sách Yêu Thích" card → Wishlist

## 📍 Routes

```
/buyer/marketplace          → Browse all listings (3 available)
/buyer/marketplace/ML001    → 2BR Apartment details
/buyer/marketplace/ML002    → 3BR Apartment details
/buyer/marketplace/ML003    → Penthouse details
/buyer/wishlist             → Your saved favorites (2 items)
```

## 🏠 Available Listings

### Listing 1: ML001

-   **Type**: 2 Bedroom Apartment
-   **Price**: 950,000,000 VNĐ (950M)
-   **Profit**: +50M (+5.6%)
-   **Status**: Verified, Có sổ hồng
-   **Location**: Kim Oanh Green Park
-   **Area**: 55.5m²
-   **Available**: December 1, 2024
-   **Negotiable**: Yes

### Listing 2: ML002

-   **Type**: 3 Bedroom Apartment
-   **Price**: 1,250,000,000 VNĐ (1.25B)
-   **Profit**: +50M (+4.2%)
-   **Status**: Verified, Đang làm sổ
-   **Location**: Kim Oanh Green Park
-   **Area**: 60m²
-   **Available**: November 20, 2024
-   **Negotiable**: Yes

### Listing 3: ML003

-   **Type**: Penthouse
-   **Price**: 2,600,000,000 VNĐ (2.6B)
-   **Profit**: +100M (+4.0%)
-   **Status**: Verified, Có sổ hồng
-   **Location**: Kim Oanh Luxury
-   **Area**: 100m²
-   **Available**: Immediately
-   **Negotiable**: No

## 🔍 Search & Filter

### Search Bar

-   Search by title or description
-   Real-time filtering
-   Example queries:
    -   "view công viên"
    -   "penthouse"
    -   "3PN"

### Price Filter

-   **Min**: Enter minimum price (e.g., 900000000)
-   **Max**: Enter maximum price (e.g., 1500000000)

### Bedroom Filter

-   Click buttons: 1, 2, 3, 4
-   Single selection

### Clear Filters

-   Click "Xóa bộ lọc" to reset all filters

## ❤️ Wishlist

### Current Saved Items

Buyer account (#4) has 2 pre-saved listings:

1. ML001 - 2BR Apartment (saved Nov 10, 2024)
2. ML003 - Penthouse (saved Nov 12, 2024)

### Actions

-   **View Details**: Click listing card
-   **Remove**: Click "Xóa" button
-   **Share**: Click share icon
-   **Compare**: Use "So sánh đã chọn" (not yet implemented)
-   **Export**: Use "Xuất PDF" (not yet implemented)

## 📊 Listing Detail Page

### What You See

1. **Image Gallery**

    - Main image with navigation
    - Thumbnail strip (4 images per listing)
    - Verification badge overlay

2. **Price Section**

    - Current listing price
    - Original purchase price (strikethrough)
    - Profit amount and percentage
    - Price per m²
    - Negotiable indicator

3. **Property Details**

    - Area, bedrooms, bathrooms
    - Available from date
    - Full description

4. **Legal Status**

    - Status badge (color-coded)
    - Document downloads (PDF mock)
    - Transfer eligibility info

5. **Seller Info**

    - Name and phone
    - Contact & schedule buttons

6. **Related Listings**
    - 2 similar properties
    - Quick navigation

## 🎨 Visual Indicators

### Badges

-   🟢 **Đã xác minh** (Green) - Verified listing
-   🟢 **Đã có sổ hồng** (Green) - Full ownership certificate
-   🟡 **Đang làm sổ** (Yellow) - Certificate in process
-   ⚫ **Chưa có sổ** (Gray) - No certificate

### Colors

-   **Primary**: Listing prices
-   **Green**: Profit, verified, legal status
-   **Yellow**: In-progress status
-   **Red**: Wishlist heart when saved
-   **Gray**: Inactive states

## 📱 Responsive Layout

### Desktop (lg)

-   Marketplace: 3 columns
-   Wishlist: 3 columns
-   Detail: 2/3 main + 1/3 sidebar

### Tablet (md)

-   Marketplace: 2 columns
-   Wishlist: 2 columns
-   Detail: Stacked layout

### Mobile

-   Marketplace: 1 column
-   Wishlist: 1 column
-   Detail: Full width stack

## 🔧 Developer Notes

### Mock Data Location

```typescript
// /frontend/src/lib/mock-data.ts
export const MOCK_MARKETPLACE_LISTINGS = [...]
export const MOCK_WISHLISTS = [...]
export function mockGetMarketplaceListings(filters) {...}
export function mockGetWishlists(userId) {...}
```

### Type Definitions

```typescript
// /frontend/src/types/index.ts
interface Wishlist {
    id: string;
    userId: string;
    listingId: string;
    addedAt: string;
}
```

### Component Structure

```
/buyer/marketplace/
  ├── page.tsx              → Browse page
  └── [id]/
      └── page.tsx          → Detail page

/buyer/wishlist/
  └── page.tsx              → Wishlist page

/components/ui/
  └── badge.tsx             → Badge component
```

## ⚡ Performance

### Build Stats

-   Marketplace: 3.49 kB
-   Detail Page: 4.34 kB
-   Wishlist: 2.93 kB
-   First Load JS: ~114 kB (includes shared chunks)

### Optimization

-   Static generation for list pages
-   Dynamic rendering for detail pages
-   Image optimization via Next.js
-   Lazy loading for images

## 🐛 Known Limitations

1. **Wishlist Toggle**: Heart icon doesn't actually add/remove (UI only)
2. **Comparison**: Feature planned but not implemented
3. **PDF Export**: Mock buttons (no actual export)
4. **Contact Seller**: No real messaging system
5. **Deposit Flow**: Placeholder buttons only
6. **View Counter**: Static numbers (not incremented)

## 📞 Support

### Demo Account

-   Email: `buyer@example.com`
-   Password: `buyer123`
-   Session: 5 minutes

### Test Data

-   3 marketplace listings available
-   2 pre-saved wishlist items
-   All listings verified with legal status

## 🎯 Next Features to Implement

1. **Functional Wishlist** (add/remove with persistence)
2. **Comparison Tool** (side-by-side listing comparison)
3. **Contact Seller** (in-app messaging)
4. **Booking System** (deposit and scheduling)
5. **Advanced Search** (location, direction, floor filters)
6. **Real-time Updates** (view counts, status changes)
7. **Image Upload** (for sellers listing properties)
8. **Analytics Dashboard** (for admin to track marketplace)

---

**Ready to explore?** Login and click "Khám phá ngay" from the buyer dashboard! 🏡
