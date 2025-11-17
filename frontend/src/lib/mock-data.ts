// Mock data for testing without backend
export const MOCK_USERS = [
    {
        id: "1",
        email: "admin@kimoanhgroup.com",
        password: "admin123",
        name: "Quản Trị Viên",
        role: "ADMIN" as const,
        phone: "0901234567",
        avatar: undefined,
        agencyName: undefined,
        createdAt: "2025-01-01T00:00:00.000Z",
    },
    {
        id: "2",
        email: "sales@kimoanhgroup.com",
        password: "sales123",
        name: "Nguyễn Văn Sales",
        role: "SALES" as const,
        phone: "0902345678",
        avatar: undefined,
        agencyName: undefined,
        createdAt: "2025-01-01T00:00:00.000Z",
    },
    {
        id: "3",
        email: "agency@kimoanhgroup.com",
        password: "agency123",
        name: "Trần Thị Agency",
        role: "AGENCY" as const,
        phone: "0903456789",
        avatar: undefined,
        agencyName: "ABC Real Estate",
        createdAt: "2025-01-01T00:00:00.000Z",
    },
    {
        id: "4",
        email: "buyer@example.com",
        password: "buyer123",
        name: "Nguyễn Thị Mai",
        role: "BUYER" as const,
        phone: "0904567890",
        avatar: undefined,
        agencyName: undefined,
        createdAt: "2025-01-15T00:00:00.000Z",
        idNumber: "001234567890",
        idType: "CCCD" as const,
        isVerified: true,
        verifiedAt: "2025-01-16T00:00:00.000Z",
    },
];

export const MOCK_PROJECTS = [
    {
        id: "1",
        name: "Kim Oanh Green Park",
        slug: "kim-oanh-green-park",
        description: "Dự án Nhà ở Xã hội cao cấp tại Bình Chánh",
        address: "123 Đường Nguyễn Hữu Thọ",
        district: "Bình Chánh",
        city: "TP. Hồ Chí Minh",
        totalUnits: 500,
        availableUnits: 320,
        priceRange: {
            min: 800000000,
            max: 1500000000,
        },
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"],
        amenities: ["Bể bơi", "Phòng gym", "Công viên", "Trường học", "Siêu thị"],
        legalStatus: "Đã có sổ hồng",
        developer: "Kim Oanh Group",
        completionDate: "2025-12-31T00:00:00.000Z",
        status: "SELLING" as const,
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
    },
    {
        id: "2",
        name: "Kim Oanh Riverside",
        slug: "kim-oanh-riverside",
        description: "Dự án ven sông tại Quận 7",
        address: "456 Đường Nguyễn Văn Linh",
        district: "Quận 7",
        city: "TP. Hồ Chí Minh",
        totalUnits: 300,
        availableUnits: 180,
        priceRange: {
            min: 1000000000,
            max: 1800000000,
        },
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"],
        amenities: ["View sông", "Bể bơi", "Sân tennis", "BBQ"],
        legalStatus: "Đang hoàn thiện thủ tục",
        developer: "Kim Oanh Group",
        completionDate: "2026-06-30T00:00:00.000Z",
        status: "SELLING" as const,
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
    },
    {
        id: "3",
        name: "Kim Oanh Luxury",
        slug: "kim-oanh-luxury",
        description: "Dự án cao cấp tại Thủ Đức",
        address: "789 Xa lộ Hà Nội",
        district: "Thủ Đức",
        city: "TP. Hồ Chí Minh",
        totalUnits: 200,
        availableUnits: 45,
        priceRange: {
            min: 1500000000,
            max: 2500000000,
        },
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
        amenities: ["Sky bar", "Phòng gym", "Yoga room", "Co-working space"],
        legalStatus: "Đã có sổ hồng",
        developer: "Kim Oanh Group",
        completionDate: "2025-09-30T00:00:00.000Z",
        status: "SELLING" as const,
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
    },
];

export const MOCK_UNITS = [
    // Kim Oanh Green Park
    {
        id: "1",
        projectId: "1",
        code: "A1-01",
        floor: 1,
        block: "A1",
        area: 55.5,
        bedrooms: 2,
        bathrooms: 1,
        price: 950000000,
        direction: "EAST" as const,
        status: "AVAILABLE" as const,
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
        features: ["Ban công rộng", "View đẹp", "Thoáng mát"],
        floorPlan: undefined,
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
    },
    {
        id: "2",
        projectId: "1",
        code: "A1-02",
        floor: 1,
        block: "A1",
        area: 60.0,
        bedrooms: 2,
        bathrooms: 2,
        price: 1050000000,
        direction: "SOUTH" as const,
        status: "AVAILABLE" as const,
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
        features: ["2 WC", "Phòng khách rộng"],
        floorPlan: undefined,
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
    },
    {
        id: "3",
        projectId: "1",
        code: "A2-05",
        floor: 5,
        block: "A2",
        area: 70.0,
        bedrooms: 3,
        bathrooms: 2,
        price: 1350000000,
        direction: "NORTH" as const,
        status: "RESERVED" as const,
        images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"],
        features: ["3 phòng ngủ", "View công viên"],
        floorPlan: undefined,
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
    },
    {
        id: "4",
        projectId: "1",
        code: "B1-03",
        floor: 3,
        block: "B1",
        area: 58.0,
        bedrooms: 2,
        bathrooms: 1,
        price: 980000000,
        direction: "WEST" as const,
        status: "SOLD" as const,
        images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"],
        features: ["Giá tốt", "Vị trí đẹp"],
        floorPlan: undefined,
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
    },
    // Kim Oanh Riverside
    {
        id: "5",
        projectId: "2",
        code: "R1-10",
        floor: 10,
        block: "R1",
        area: 75.0,
        bedrooms: 3,
        bathrooms: 2,
        price: 1650000000,
        direction: "EAST" as const,
        status: "AVAILABLE" as const,
        images: ["https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=800"],
        features: ["View sông tuyệt đẹp", "Tầng cao"],
        floorPlan: undefined,
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
    },
    {
        id: "6",
        projectId: "2",
        code: "R2-05",
        floor: 5,
        block: "R2",
        area: 65.0,
        bedrooms: 2,
        bathrooms: 2,
        price: 1400000000,
        direction: "SOUTH" as const,
        status: "AVAILABLE" as const,
        images: ["https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800"],
        features: ["Nội thất cao cấp", "Smart home"],
        floorPlan: undefined,
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
    },
    // Kim Oanh Luxury
    {
        id: "7",
        projectId: "3",
        code: "L1-15",
        floor: 15,
        block: "L1",
        area: 90.0,
        bedrooms: 3,
        bathrooms: 3,
        price: 2200000000,
        direction: "SOUTHEAST" as const,
        status: "AVAILABLE" as const,
        images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"],
        features: ["Penthouse", "View toàn cảnh", "Nội thất sang trọng"],
        floorPlan: undefined,
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
    },
    {
        id: "8",
        projectId: "3",
        code: "L2-08",
        floor: 8,
        block: "L2",
        area: 80.0,
        bedrooms: 3,
        bathrooms: 2,
        price: 1900000000,
        direction: "NORTHEAST" as const,
        status: "RESERVED" as const,
        images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"],
        features: ["Thiết kế hiện đại", "Ánh sáng tự nhiên"],
        floorPlan: undefined,
        createdAt: "2025-01-01T00:00:00.000Z",
        updatedAt: "2025-01-01T00:00:00.000Z",
    },
];

// Mock authentication function
export function mockLogin(email: string, password: string) {
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password);

    if (!user) {
        throw new Error("Email hoặc mật khẩu không đúng");
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return {
        user: userWithoutPassword,
        accessToken: `mock_token_${user.id}_${Date.now()}`,
    };
}

// Mock register function
export function mockRegister(data: { email: string; password: string; name: string; role: "SALES" | "AGENCY" | "BUYER" | "SELLER"; phone?: string; agencyName?: string }) {
    // Check if user already exists
    const existingUser = MOCK_USERS.find((u) => u.email === data.email);
    if (existingUser) {
        throw new Error("Email đã được sử dụng");
    }

    const newUser: any = {
        id: `${MOCK_USERS.length + 1}`,
        email: data.email,
        password: data.password,
        name: data.name,
        role: data.role,
        phone: data.phone || "",
        avatar: undefined,
        agencyName: data.agencyName,
        createdAt: new Date().toISOString(),
    };

    MOCK_USERS.push(newUser);

    return { message: "Đăng ký thành công" };
}

// Mock get projects with filters
export function mockGetProjects(filters?: { search?: string; minPrice?: number; maxPrice?: number; page?: number; limit?: number }) {
    let filteredProjects = [...MOCK_PROJECTS];

    if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filteredProjects = filteredProjects.filter(
            (p) => p.name.toLowerCase().includes(searchLower) || p.address.toLowerCase().includes(searchLower) || p.district.toLowerCase().includes(searchLower)
        );
    }

    if (filters?.minPrice) {
        filteredProjects = filteredProjects.filter((p) => p.priceRange.min >= filters.minPrice!);
    }

    if (filters?.maxPrice) {
        filteredProjects = filteredProjects.filter((p) => p.priceRange.max <= filters.maxPrice!);
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
        data: filteredProjects.slice(startIndex, endIndex),
        total: filteredProjects.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProjects.length / limit),
    };
}

// Mock get units with filters
export function mockGetUnits(filters?: {
    projectId?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    minArea?: number;
    maxArea?: number;
    bedrooms?: number;
    direction?: string;
    status?: string;
    page?: number;
    limit?: number;
}) {
    let filteredUnits = [...MOCK_UNITS];

    if (filters?.projectId) {
        filteredUnits = filteredUnits.filter((u) => u.projectId === filters.projectId);
    }

    if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filteredUnits = filteredUnits.filter((u) => u.code.toLowerCase().includes(searchLower));
    }

    if (filters?.minPrice) {
        filteredUnits = filteredUnits.filter((u) => u.price >= filters.minPrice!);
    }

    if (filters?.maxPrice) {
        filteredUnits = filteredUnits.filter((u) => u.price <= filters.maxPrice!);
    }

    if (filters?.minArea) {
        filteredUnits = filteredUnits.filter((u) => u.area >= filters.minArea!);
    }

    if (filters?.maxArea) {
        filteredUnits = filteredUnits.filter((u) => u.area <= filters.maxArea!);
    }

    if (filters?.bedrooms) {
        filteredUnits = filteredUnits.filter((u) => u.bedrooms === filters.bedrooms);
    }

    if (filters?.direction) {
        filteredUnits = filteredUnits.filter((u) => u.direction === filters.direction);
    }

    if (filters?.status) {
        filteredUnits = filteredUnits.filter((u) => u.status === filters.status);
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
        data: filteredUnits.slice(startIndex, endIndex),
        total: filteredUnits.length,
        page,
        limit,
        totalPages: Math.ceil(filteredUnits.length / limit),
    };
}

// ========================================
// PRIMARY MARKET - APPLICATION MOCK DATA
// ========================================

export const MOCK_APPLICATIONS = [
    {
        id: "1",
        userId: "4",
        projectId: "1",
        unitId: undefined,
        status: "QUALIFIED" as const,

        fullName: "Nguyễn Văn Khách",
        idNumber: "001234567890",
        idType: "CCCD" as const,
        dateOfBirth: "1990-05-15",
        phoneNumber: "0904567890",
        email: "buyer1@example.com",
        permanentAddress: "123 Đường ABC, Quận 1, TP.HCM",
        currentAddress: "123 Đường ABC, Quận 1, TP.HCM",

        monthlyIncome: 15000000,
        hasExistingHouse: false,
        familyMembers: 4,

        isPriorityGroup: false,

        documents: [
            {
                id: "d1",
                type: "ID_CARD" as const,
                fileName: "cccd.pdf",
                fileUrl: "/uploads/cccd.pdf",
                uploadedAt: "2025-11-01T10:00:00.000Z",
                status: "APPROVED" as const,
            },
            {
                id: "d2",
                type: "INCOME_PROOF" as const,
                fileName: "salary.pdf",
                fileUrl: "/uploads/salary.pdf",
                uploadedAt: "2025-11-01T10:05:00.000Z",
                status: "APPROVED" as const,
            },
        ],

        eligibilityScore: 85,
        reviewNotes: "Hồ sơ đầy đủ, đạt yêu cầu",
        reviewedBy: "1",
        reviewedAt: "2025-11-05T14:00:00.000Z",

        preferredUnitType: "2 phòng ngủ",
        submittedAt: "2025-11-01T09:30:00.000Z",
        qualifiedAt: "2025-11-05T14:00:00.000Z",

        createdAt: "2025-11-01T09:00:00.000Z",
        updatedAt: "2025-11-05T14:00:00.000Z",
    },
    {
        id: "2",
        userId: "5",
        projectId: "1",
        status: "UNDER_REVIEW" as const,

        fullName: "Trần Thị Mai",
        idNumber: "001234567891",
        idType: "CCCD" as const,
        dateOfBirth: "1985-08-20",
        phoneNumber: "0905678901",
        email: "buyer2@example.com",
        permanentAddress: "456 Đường XYZ, Quận 7, TP.HCM",
        currentAddress: "456 Đường XYZ, Quận 7, TP.HCM",

        monthlyIncome: 12000000,
        hasExistingHouse: false,
        familyMembers: 3,

        isPriorityGroup: true,
        priorityType: "GIA_ĐÌNH_CHÍNH_SÁCH" as const,
        priorityDocument: "/uploads/priority.pdf",

        documents: [
            {
                id: "d3",
                type: "ID_CARD" as const,
                fileName: "cccd.pdf",
                fileUrl: "/uploads/cccd2.pdf",
                uploadedAt: "2025-11-10T08:00:00.000Z",
                status: "PENDING" as const,
            },
        ],

        preferredUnitType: "3 phòng ngủ",
        submittedAt: "2025-11-10T08:30:00.000Z",

        createdAt: "2025-11-10T08:00:00.000Z",
        updatedAt: "2025-11-10T08:00:00.000Z",
    },
    {
        id: "3",
        userId: "6",
        projectId: "2",
        status: "NEED_SUPPLEMENT" as const,

        fullName: "Lê Văn Nam",
        idNumber: "001234567892",
        idType: "CCCD" as const,
        dateOfBirth: "1992-03-10",
        phoneNumber: "0906789012",
        email: "buyer3@example.com",
        permanentAddress: "789 Đường DEF, Thủ Đức, TP.HCM",
        currentAddress: "789 Đường DEF, Thủ Đức, TP.HCM",

        monthlyIncome: 10000000,
        hasExistingHouse: true,
        existingHouseAddress: "100 Đường GHI, Quận 9",
        familyMembers: 2,

        isPriorityGroup: false,

        documents: [
            {
                id: "d4",
                type: "ID_CARD" as const,
                fileName: "cccd.pdf",
                fileUrl: "/uploads/cccd3.pdf",
                uploadedAt: "2025-11-08T09:00:00.000Z",
                status: "APPROVED" as const,
            },
            {
                id: "d5",
                type: "INCOME_PROOF" as const,
                fileName: "income.pdf",
                fileUrl: "/uploads/income.pdf",
                uploadedAt: "2025-11-08T09:05:00.000Z",
                status: "REJECTED" as const,
                rejectReason: "Giấy tờ không rõ ràng, cần bổ sung",
            },
        ],

        reviewNotes: "Cần bổ sung giấy tờ chứng minh thu nhập",
        reviewedBy: "1",
        reviewedAt: "2025-11-09T10:00:00.000Z",

        preferredUnitType: "1 phòng ngủ",
        submittedAt: "2025-11-08T09:30:00.000Z",

        createdAt: "2025-11-08T09:00:00.000Z",
        updatedAt: "2025-11-09T10:00:00.000Z",
    },
];

// ========================================
// SECONDARY MARKET - LISTING MOCK DATA
// ========================================

export const MOCK_LISTINGS = [
    {
        id: "1",
        unitId: "4",
        sellerId: "7",

        title: "Chuyển nhượng căn B1-03 Kim Oanh Green Park",
        description: "Căn hộ đẹp, view công viên, đã hoàn thiện nội thất cơ bản. Giá tốt cho người thiện chí.",
        price: 1050000000,
        negotiable: true,

        legalStatus: "ĐỦ_SỔ" as const,
        transferEligible: true,
        transferEligibleDate: "2025-06-01",

        originalPrice: 980000000,
        purchaseDate: "2024-03-15",

        status: "ACTIVE" as const,
        publishedAt: "2025-11-01T10:00:00.000Z",
        expiresAt: "2026-02-01T10:00:00.000Z",
        viewCount: 245,

        createdAt: "2025-10-28T10:00:00.000Z",
        updatedAt: "2025-11-01T10:00:00.000Z",
    },
    {
        id: "2",
        unitId: "3",
        sellerId: "8",

        title: "Sang nhượng A2-05 - 3PN, view đẹp",
        description: "Căn góc 3 phòng ngủ, vị trí đẹp, giá hợp lý. Đang làm sổ hồng.",
        price: 1400000000,
        negotiable: true,

        legalStatus: "ĐANG_LÀM_SỔ" as const,
        transferEligible: false,
        transferEligibleDate: "2026-01-15",

        originalPrice: 1350000000,
        purchaseDate: "2024-12-20",

        status: "ACTIVE" as const,
        publishedAt: "2025-11-10T08:00:00.000Z",
        expiresAt: "2026-02-10T08:00:00.000Z",
        viewCount: 128,

        createdAt: "2025-11-08T08:00:00.000Z",
        updatedAt: "2025-11-10T08:00:00.000Z",
    },
];

// ========================================
// TRANSACTION MOCK DATA
// ========================================

export const MOCK_TRANSACTIONS = [
    {
        id: "1",
        listingId: "1",
        buyerId: "4",
        sellerId: "7",

        agreedPrice: 1050000000,
        depositAmount: 50000000,
        depositPaidAt: "2025-11-12T10:00:00.000Z",

        transferTax: 21000000,
        serviceFee: 10500000,
        otherFees: 2000000,
        totalAmount: 1083500000,

        paymentMethod: "BANK_TRANSFER" as const,
        paymentStatus: "PARTIAL" as const,

        status: "DEPOSIT_PAID" as const,

        initiatedAt: "2025-11-12T09:00:00.000Z",

        createdAt: "2025-11-12T09:00:00.000Z",
        updatedAt: "2025-11-12T10:00:00.000Z",
    },
];

// Mock function to get applications
export function mockGetApplications(filters?: { userId?: string; projectId?: string; status?: string; page?: number; limit?: number }) {
    let filtered = [...MOCK_APPLICATIONS];

    if (filters?.userId) {
        filtered = filtered.filter((a) => a.userId === filters.userId);
    }

    if (filters?.projectId) {
        filtered = filtered.filter((a) => a.projectId === filters.projectId);
    }

    if (filters?.status) {
        filtered = filtered.filter((a) => a.status === filters.status);
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
        data: filtered.slice(startIndex, endIndex),
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
    };
}

// Mock function to get listings
export function mockGetListings(filters?: { sellerId?: string; projectId?: string; status?: string; minPrice?: number; maxPrice?: number; page?: number; limit?: number }) {
    let filtered = [...MOCK_LISTINGS];

    if (filters?.sellerId) {
        filtered = filtered.filter((l) => l.sellerId === filters.sellerId);
    }

    if (filters?.status) {
        filtered = filtered.filter((l) => l.status === filters.status);
    }

    if (filters?.minPrice) {
        filtered = filtered.filter((l) => l.price >= filters.minPrice!);
    }

    if (filters?.maxPrice) {
        filtered = filtered.filter((l) => l.price <= filters.maxPrice!);
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
        data: filtered.slice(startIndex, endIndex),
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
    };
}

// Mock function to get transactions
export function mockGetTransactions(filters?: { buyerId?: string; sellerId?: string; status?: string; page?: number; limit?: number }) {
    let filtered = [...MOCK_TRANSACTIONS];

    if (filters?.buyerId) {
        filtered = filtered.filter((t) => t.buyerId === filters.buyerId);
    }

    if (filters?.sellerId) {
        filtered = filtered.filter((t) => t.sellerId === filters.sellerId);
    }

    if (filters?.status) {
        filtered = filtered.filter((t) => t.status === filters.status);
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
        data: filtered.slice(startIndex, endIndex),
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
    };
}

// ========================================
// MARKETPLACE MOCK DATA
// ========================================

export const MOCK_MARKETPLACE_LISTINGS = [
    {
        id: "ML001",
        unitId: "1",
        sellerId: "5",
        sellerName: "Nguyễn Văn Seller",
        sellerPhone: "0901234567",
        title: "Căn hộ 2PN view công viên - Kim Oanh Green Park",
        description: "Căn hộ đẹp, view công viên, đã hoàn thiện nội thất cơ bản. Sổ hồng riêng, pháp lý đầy đủ. Khu vực an ninh, gần trường học và siêu thị.",
        listingPrice: 950000000,
        originalPrice: 900000000,
        pricePerSqm: 15800000,
        listedAt: "2024-11-01T10:00:00Z",
        status: "ACTIVE" as const,
        legalStatus: "ĐỦ_SỔ" as const,
        transferEligible: true,
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
        ],
        viewCount: 245,
        verificationStatus: "VERIFIED" as const,
        availableFrom: "2024-12-01",
        negotiable: true,
        createdAt: "2024-11-01T10:00:00Z",
        updatedAt: "2024-11-01T10:00:00Z",
    },
    {
        id: "ML002",
        unitId: "2",
        sellerId: "6",
        sellerName: "Trần Thị Buyer",
        sellerPhone: "0912345678",
        title: "3PN hướng Đông Nam - Kim Oanh Green Park",
        description: "3PN rộng rãi, hướng Đông Nam đón gió. Khu vực yên tĩnh, an ninh tốt. Gần trung tâm thương mại và bệnh viện.",
        listingPrice: 1250000000,
        originalPrice: 1200000000,
        pricePerSqm: 17857000,
        listedAt: "2024-10-28T14:30:00Z",
        status: "ACTIVE" as const,
        legalStatus: "ĐANG_LÀM_SỔ" as const,
        transferEligible: true,
        transferEligibleDate: "2025-01-15",
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800", "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800"],
        viewCount: 189,
        verificationStatus: "VERIFIED" as const,
        availableFrom: "2024-11-20",
        negotiable: true,
        createdAt: "2024-10-28T14:30:00Z",
        updatedAt: "2024-10-28T14:30:00Z",
    },
    {
        id: "ML003",
        unitId: "5",
        sellerId: "7",
        sellerName: "Lê Minh Premium",
        sellerPhone: "0923456789",
        title: "Penthouse sang trọng - Kim Oanh Luxury",
        description: "Penthouse sang trọng, view toàn cảnh thành phố. Full nội thất cao cấp, thiết kế hiện đại. Vị trí đắc địa, pháp lý hoàn chỉnh.",
        listingPrice: 2600000000,
        originalPrice: 2500000000,
        pricePerSqm: 26000000,
        listedAt: "2024-11-05T09:00:00Z",
        status: "ACTIVE" as const,
        legalStatus: "ĐỦ_SỔ" as const,
        transferEligible: true,
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
        ],
        viewCount: 421,
        verificationStatus: "VERIFIED" as const,
        availableFrom: "Ngay",
        negotiable: false,
        createdAt: "2024-11-05T09:00:00Z",
        updatedAt: "2024-11-05T09:00:00Z",
    },
];

export const MOCK_WISHLISTS = [
    {
        id: "WL001",
        userId: "4", // buyer user
        listingId: "ML001",
        addedAt: "2024-11-10T15:30:00Z",
    },
    {
        id: "WL002",
        userId: "4",
        listingId: "ML003",
        addedAt: "2024-11-12T10:20:00Z",
    },
];

// Mock function to get marketplace listings
export function mockGetMarketplaceListings(filters?: { search?: string; minPrice?: number; maxPrice?: number; bedrooms?: number; status?: string; page?: number; limit?: number }) {
    let filtered = [...MOCK_MARKETPLACE_LISTINGS];

    if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter((l) => l.title.toLowerCase().includes(searchLower) || l.description.toLowerCase().includes(searchLower));
    }

    if (filters?.minPrice) {
        filtered = filtered.filter((l) => l.listingPrice >= filters.minPrice!);
    }

    if (filters?.maxPrice) {
        filtered = filtered.filter((l) => l.listingPrice <= filters.maxPrice!);
    }

    if (filters?.status) {
        filtered = filtered.filter((l) => l.status === filters.status);
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 12;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
        data: filtered.slice(startIndex, endIndex),
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit),
    };
}

// Mock function to get wishlists
export function mockGetWishlists(userId: string) {
    return MOCK_WISHLISTS.filter((w) => w.userId === userId);
}
