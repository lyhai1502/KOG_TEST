export interface User {
    id: string;
    email: string;
    name: string;
    role: "ADMIN" | "SALES" | "AGENCY" | "BUYER" | "SELLER";
    phone?: string;
    avatar?: string;
    agencyName?: string;
    createdAt: string;
    // KYC fields
    idNumber?: string;
    idType?: "CMND" | "CCCD" | "PASSPORT";
    isVerified?: boolean;
    verifiedAt?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
    role: "SALES" | "AGENCY";
    phone?: string;
    agencyName?: string;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
}

export interface Project {
    id: string;
    name: string;
    slug: string;
    description: string;
    address: string;
    district: string;
    city: string;
    totalUnits: number;
    availableUnits: number;
    priceRange: {
        min: number;
        max: number;
    };
    images: string[];
    amenities: string[];
    legalStatus: string;
    developer: string;
    completionDate: string;
    status: "PLANNING" | "SELLING" | "SOLD_OUT" | "COMPLETED";
    createdAt: string;
    updatedAt: string;
}

export interface Unit {
    id: string;
    projectId: string;
    project?: Project;
    code: string;
    floor: number;
    block: string;
    area: number;
    bedrooms: number;
    bathrooms: number;
    price: number;
    direction: "EAST" | "WEST" | "SOUTH" | "NORTH" | "NORTHEAST" | "NORTHWEST" | "SOUTHEAST" | "SOUTHWEST";
    status: "AVAILABLE" | "RESERVED" | "SOLD" | "BLOCKED";
    images: string[];
    features: string[];
    floorPlan?: string;
    createdAt: string;
    updatedAt: string;
}

export interface ListingFilters {
    projectId?: string;
    minPrice?: number;
    maxPrice?: number;
    minArea?: number;
    maxArea?: number;
    bedrooms?: number;
    direction?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

// ========================================
// PRIMARY MARKET - APPLICATION SYSTEM
// ========================================

export type ApplicationStatus =
    | "DRAFT" // Đang soạn thảo
    | "SUBMITTED" // Đã nộp
    | "UNDER_REVIEW" // Đang xem xét
    | "NEED_SUPPLEMENT" // Cần bổ sung
    | "QUALIFIED" // Đạt yêu cầu
    | "LOTTERY_PENDING" // Chờ bốc thăm
    | "WON" // Trúng
    | "NOT_WON" // Không trúng
    | "REJECTED"; // Bị từ chối

export interface Application {
    id: string;
    userId: string;
    projectId: string;
    unitId?: string;
    status: ApplicationStatus;

    // Personal Info
    fullName: string;
    idNumber: string;
    idType: "CMND" | "CCCD" | "PASSPORT";
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
    permanentAddress: string;
    currentAddress: string;

    // Income & Housing Status
    monthlyIncome: number;
    hasExistingHouse: boolean;
    existingHouseAddress?: string;
    familyMembers: number;

    // Priority (Đối tượng ưu tiên)
    isPriorityGroup: boolean;
    priorityType?: "THƯƠNG_BINH" | "GIA_ĐÌNH_CHÍNH_SÁCH" | "LAO_ĐỘNG_GIỎI" | "KHÁC";
    priorityDocument?: string;

    // Documents
    documents: ApplicationDocument[];

    // Score & Review
    eligibilityScore?: number;
    reviewNotes?: string;
    reviewedBy?: string;
    reviewedAt?: string;

    // Lottery Info
    lottery?: {
        lotteryNumber: string;
        drawDate: string;
        result?: "WON" | "NOT_WON";
    };

    // Preferred Unit
    preferredUnitType?: string;

    // Timeline dates
    submittedAt?: string;
    qualifiedAt?: string;

    createdAt: string;
    updatedAt: string;
}

export interface ApplicationDocument {
    id: string;
    type: "ID_CARD" | "INCOME_PROOF" | "HOUSING_PROOF" | "PRIORITY_PROOF" | "OTHER";
    fileName: string;
    fileUrl: string;
    uploadedAt: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    rejectReason?: string;
}

// ========================================
// SECONDARY MARKET - LISTING & TRANSACTION
// ========================================

export type ListingStatus =
    | "DRAFT" // Nháp
    | "PENDING" // Chờ duyệt
    | "ACTIVE" // Đang bán
    | "SOLD" // Đã bán
    | "EXPIRED" // Hết hạn
    | "CANCELLED"; // Đã hủy

export interface Listing {
    id: string;
    unitId: string;
    unit?: Unit;
    sellerId: string;
    seller?: User;

    // Listing Info
    title: string;
    description: string;
    price: number;
    negotiable: boolean;

    // Legal Status
    legalStatus: "ĐỦ_SỔ" | "ĐANG_LÀM_SỔ" | "CHƯA_CÓ_SỔ";
    transferEligible: boolean;
    transferEligibleDate?: string;

    // Transaction History
    originalPrice: number;
    purchaseDate: string;
    previousTransactions?: Transaction[];

    // Listing Status
    status: ListingStatus;
    publishedAt?: string;
    expiresAt?: string;
    viewCount: number;

    createdAt: string;
    updatedAt: string;
}

export type TransactionStatus =
    | "INITIATED" // Khởi tạo
    | "DEPOSIT_PAID" // Đã đặt cọc
    | "PAYMENT_PENDING" // Chờ thanh toán
    | "PAYMENT_COMPLETED" // Đã thanh toán
    | "DOCUMENT_SIGNING" // Ký giấy tờ
    | "COMPLETED" // Hoàn thành
    | "CANCELLED"; // Đã hủy

export interface Transaction {
    id: string;
    listingId: string;
    listing?: Listing;
    buyerId: string;
    buyer?: User;
    sellerId: string;
    seller?: User;

    // Transaction Details
    agreedPrice: number;
    depositAmount: number;
    depositPaidAt?: string;

    // Fees & Taxes
    transferTax: number;
    serviceFee: number;
    otherFees: number;
    totalAmount: number;

    // Payment
    paymentMethod?: "BANK_TRANSFER" | "ESCROW" | "CASH";
    paymentStatus: "PENDING" | "PARTIAL" | "COMPLETED";

    // Contract & Documents
    contractUrl?: string;
    signedAt?: string;

    status: TransactionStatus;

    // Timeline
    initiatedAt: string;
    completedAt?: string;
    cancelledAt?: string;
    cancellationReason?: string;

    createdAt: string;
    updatedAt: string;
}

// ========================================
// NOTIFICATION & TRACKING
// ========================================

export interface Notification {
    id: string;
    userId: string;
    type: "APPLICATION_UPDATE" | "LOTTERY_RESULT" | "TRANSACTION_UPDATE" | "SYSTEM";
    title: string;
    message: string;
    read: boolean;
    link?: string;
    createdAt: string;
}

export interface ActivityLog {
    id: string;
    userId: string;
    entityType: "APPLICATION" | "LISTING" | "TRANSACTION";
    entityId: string;
    action: string;
    description: string;
    metadata?: any;
    createdAt: string;
}

// ========================================
// MARKETPLACE EXTENSIONS
// ========================================

export interface Wishlist {
    id: string;
    userId: string;
    listingId: string;
    addedAt: string;
}
