// Mock data for testing without backend

// PRIMARY MARKET: New projects from developers (CĐT)
export const MOCK_PROJECTS = [
    {
        id: "proj-1",
        name: "Kim Oanh Green Park",
        slug: "kim-oanh-green-park-primary",
        description: "Dự án Nhà ở Xã hội mới tại Quận 9 - Giai đoạn sơ cấp",
        developer: "Kim Oanh Group",
        district: "Quận 9",
        city: "TP. Hồ Chí Minh",
        address: "Đường Đỗ Xuân Hợp, P. Phước Long B, Quận 9",
        totalUnits: 450,
        availableUnits: 120,
        priceRange: {
            min: 800000000,
            max: 1500000000,
        },
        startDate: "2024-06-01",
        completionDate: "2026-03-31",
        status: "SELLING" as const,
        legalStatus: "Đang hoàn thiện thủ tục",
        amenities: ["Hồ bơi", "Phòng gym", "Khu vui chơi trẻ em", "Siêu thị", "Bãi đỗ xe ngầm"],
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&h=600&fit=crop&auto=format",
        ],
        lotteryDate: "2025-02-15",
        createdAt: "2024-06-01T00:00:00.000Z",
        updatedAt: "2025-01-20T00:00:00.000Z",
    },
    {
        id: "proj-2",
        name: "Sunview Town",
        slug: "sunview-town-primary",
        description: "Dự án ven sông tại Thủ Đức - Mở bán giai đoạn 1",
        developer: "Kim Oanh Group",
        district: "Thủ Đức",
        city: "TP. Hồ Chí Minh",
        address: "Đường Đỗ Xuân Hợp, P. Phú Hữu, TP. Thủ Đức",
        totalUnits: 320,
        availableUnits: 85,
        priceRange: {
            min: 850000000,
            max: 1600000000,
        },
        startDate: "2024-08-01",
        completionDate: "2026-06-30",
        status: "SELLING" as const,
        legalStatus: "Đã có sổ hồng",
        amenities: ["Công viên", "Sân tennis", "BBQ", "Playground"],
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&h=600&fit=crop&auto=format",
        ],
        lotteryDate: "2025-03-10",
        createdAt: "2024-08-01T00:00:00.000Z",
        updatedAt: "2025-01-20T00:00:00.000Z",
    },
    {
        id: "proj-3",
        name: "Urban Valley",
        slug: "urban-valley-primary",
        description: "Khu đô thị hiện đại tại Bình Tân",
        developer: "Kim Oanh Group",
        district: "Bình Tân",
        city: "TP. Hồ Chí Minh",
        address: "Đường Tên Lửa, P. Bình Trị Đông B, Q. Bình Tân",
        totalUnits: 280,
        availableUnits: 42,
        priceRange: {
            min: 750000000,
            max: 1400000000,
        },
        startDate: "2024-04-01",
        completionDate: "2025-12-31",
        status: "SELLING" as const,
        legalStatus: "Đã có sổ hồng",
        amenities: ["Trường học", "Bệnh viện", "Chợ"],
        images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&auto=format"],
        lotteryDate: "2025-02-28",
        createdAt: "2024-04-01T00:00:00.000Z",
        updatedAt: "2025-01-20T00:00:00.000Z",
    },
];

// PRIMARY MARKET: Available units from projects
export const MOCK_UNITS = [
    // Project 1 units
    {
        id: "unit-1",
        projectId: "proj-1",
        code: "A-0502",
        floor: 5,
        block: "A",
        bedrooms: 2,
        bathrooms: 2,
        area: 65,
        price: 980000000,
        direction: "SOUTH" as const,
        status: "AVAILABLE" as const,
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop&auto=format"],
        features: ["Ban công", "View đẹp"],
        floorPlan: undefined,
        createdAt: "2024-06-01T00:00:00.000Z",
        updatedAt: "2025-01-20T00:00:00.000Z",
    },
    {
        id: "unit-2",
        projectId: "proj-1",
        code: "A-0805",
        floor: 8,
        block: "A",
        bedrooms: 2,
        bathrooms: 2,
        area: 68,
        price: 1020000000,
        direction: "EAST" as const,
        status: "AVAILABLE" as const,
        images: ["https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=600&h=400&fit=crop&auto=format"],
        features: ["Thoáng mát"],
        floorPlan: undefined,
        createdAt: "2024-06-01T00:00:00.000Z",
        updatedAt: "2025-01-20T00:00:00.000Z",
    },
    {
        id: "unit-3",
        projectId: "proj-1",
        code: "B-1203",
        floor: 12,
        block: "B",
        bedrooms: 3,
        bathrooms: 2,
        area: 85,
        price: 1275000000,
        direction: "SOUTH" as const,
        status: "AVAILABLE" as const,
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop&auto=format"],
        features: ["Rộng rãi"],
        floorPlan: undefined,
        createdAt: "2024-06-01T00:00:00.000Z",
        updatedAt: "2025-01-20T00:00:00.000Z",
    },
    {
        id: "unit-4",
        projectId: "proj-1",
        code: "A-0310",
        floor: 3,
        block: "A",
        bedrooms: 2,
        bathrooms: 1,
        area: 62,
        price: 930000000,
        direction: "NORTH" as const,
        status: "RESERVED" as const,
        images: ["https://images.unsplash.com/photo-1560185127-6a7e8cb54d7c?w=600&h=400&fit=crop&auto=format"],
        features: [],
        floorPlan: undefined,
        createdAt: "2024-06-01T00:00:00.000Z",
        updatedAt: "2025-01-20T00:00:00.000Z",
    },
    {
        id: "unit-5",
        projectId: "proj-1",
        code: "C-1501",
        floor: 15,
        block: "C",
        bedrooms: 3,
        bathrooms: 2,
        area: 90,
        price: 1350000000,
        direction: "WEST" as const,
        status: "AVAILABLE" as const,
        images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop&auto=format"],
        features: ["View toàn cảnh"],
        floorPlan: undefined,
        createdAt: "2024-06-01T00:00:00.000Z",
        updatedAt: "2025-01-20T00:00:00.000Z",
    },

    // Project 2 units
    {
        id: "unit-6",
        projectId: "proj-2",
        code: "T1-0702",
        floor: 7,
        block: "T1",
        bedrooms: 2,
        bathrooms: 2,
        area: 70,
        price: 1050000000,
        direction: "EAST" as const,
        status: "AVAILABLE" as const,
        images: ["https://images.unsplash.com/photo-1560185127-6a7e8cb54d7c?w=600&h=400&fit=crop&auto=format"],
        features: [],
        floorPlan: undefined,
        createdAt: "2024-08-01T00:00:00.000Z",
        updatedAt: "2025-01-20T00:00:00.000Z",
    },
    {
        id: "unit-7",
        projectId: "proj-2",
        code: "T2-1005",
        floor: 10,
        block: "T2",
        bedrooms: 3,
        bathrooms: 2,
        area: 88,
        price: 1408000000,
        direction: "SOUTH" as const,
        status: "AVAILABLE" as const,
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop&auto=format"],
        features: ["Cao tầng"],
        floorPlan: undefined,
        createdAt: "2024-08-01T00:00:00.000Z",
        updatedAt: "2025-01-20T00:00:00.000Z",
    },
    {
        id: "unit-8",
        projectId: "proj-2",
        code: "T1-0408",
        floor: 4,
        block: "T1",
        bedrooms: 2,
        bathrooms: 2,
        area: 66,
        price: 990000000,
        direction: "NORTH" as const,
        status: "SOLD" as const,
        images: ["https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&h=400&fit=crop&auto=format"],
        features: [],
        floorPlan: undefined,
        createdAt: "2024-08-01T00:00:00.000Z",
        updatedAt: "2025-01-20T00:00:00.000Z",
    },
    {
        id: "unit-9",
        projectId: "proj-2",
        code: "T3-1201",
        floor: 12,
        block: "T3",
        bedrooms: 3,
        bathrooms: 2,
        area: 92,
        price: 1472000000,
        direction: "WEST" as const,
        status: "AVAILABLE" as const,
        images: ["https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=600&h=400&fit=crop&auto=format"],
        features: ["Premium"],
        floorPlan: undefined,
        createdAt: "2024-08-01T00:00:00.000Z",
        updatedAt: "2025-01-20T00:00:00.000Z",
    },

    // Project 3 units
    {
        id: "unit-10",
        projectId: "proj-3",
        code: "P-0603",
        floor: 6,
        block: "P",
        bedrooms: 2,
        bathrooms: 1,
        area: 60,
        price: 900000000,
        direction: "SOUTH" as const,
        status: "AVAILABLE" as const,
        images: ["https://images.unsplash.com/photo-1560448204-444092ad36d8?w=600&h=400&fit=crop&auto=format"],
        features: [],
        floorPlan: undefined,
        createdAt: "2024-04-01T00:00:00.000Z",
        updatedAt: "2025-01-20T00:00:00.000Z",
    },
    {
        id: "unit-11",
        projectId: "proj-3",
        code: "P-0905",
        floor: 9,
        block: "P",
        bedrooms: 2,
        bathrooms: 2,
        area: 67,
        price: 1005000000,
        direction: "EAST" as const,
        status: "AVAILABLE" as const,
        images: ["https://images.unsplash.com/photo-1560185009-dddeb820c7b7?w=600&h=400&fit=crop&auto=format"],
        features: [],
        floorPlan: undefined,
        createdAt: "2024-04-01T00:00:00.000Z",
        updatedAt: "2025-01-20T00:00:00.000Z",
    },
    {
        id: "unit-12",
        projectId: "proj-3",
        code: "P-1102",
        floor: 11,
        block: "P",
        bedrooms: 3,
        bathrooms: 2,
        area: 82,
        price: 1148000000,
        direction: "NORTH" as const,
        status: "RESERVED" as const,
        images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop&auto=format"],
        features: [],
        floorPlan: undefined,
        createdAt: "2024-04-01T00:00:00.000Z",
        updatedAt: "2025-01-20T00:00:00.000Z",
    },
];

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

// SECONDARY MARKET: Listings (resale from individuals) - keeping old structure
export const MOCK_PROJECTS_OLD = [
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

export const MOCK_UNITS_OLD = [
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
        images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1502672260066-6bc35f0b1e1e?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
        ],

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
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=400&h=300&fit=crop",
        ],

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
    {
        id: "3",
        unitId: "5",
        sellerId: "7",
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=400&h=300&fit=crop",
        ],

        title: "Căn hộ 2PN tầng trung C3-12 - Giá rẻ",
        description: "Căn hộ 65m², 2 phòng ngủ, hướng Đông Nam, view thoáng mát. Sổ hồng đầy đủ.",
        price: 950000000,
        negotiable: true,

        legalStatus: "ĐỦ_SỔ" as const,
        transferEligible: true,
        transferEligibleDate: "2025-03-01",

        originalPrice: 900000000,
        purchaseDate: "2023-08-10",

        status: "ACTIVE" as const,
        publishedAt: "2025-11-05T14:30:00.000Z",
        expiresAt: "2026-02-05T14:30:00.000Z",
        viewCount: 312,

        createdAt: "2025-11-03T14:30:00.000Z",
        updatedAt: "2025-11-05T14:30:00.000Z",
    },
    {
        id: "4",
        unitId: "6",
        sellerId: "8",
        images: [
            "https://images.unsplash.com/photo-1502005097973-6a7082348e28?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=400&h=300&fit=crop",
        ],

        title: "Bán gấp căn D1-08 tầng 8 - Nội thất đầy đủ",
        description: "Căn 2PN đầy đủ nội thất cao cấp, máy lạnh, tủ bếp, giường tủ. Ở ngay không cần sửa chữa.",
        price: 1150000000,
        negotiable: true,

        legalStatus: "ĐỦ_SỔ" as const,
        transferEligible: true,
        transferEligibleDate: "2025-05-15",

        originalPrice: 1100000000,
        purchaseDate: "2024-02-20",

        status: "ACTIVE" as const,
        publishedAt: "2025-11-12T09:00:00.000Z",
        expiresAt: "2026-02-12T09:00:00.000Z",
        viewCount: 189,

        createdAt: "2025-11-10T09:00:00.000Z",
        updatedAt: "2025-11-12T09:00:00.000Z",
    },
    {
        id: "5",
        unitId: "7",
        sellerId: "7",
        images: [
            "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
        ],

        title: "Căn 3PN E2-15 tầng cao - View sông tuyệt đẹp",
        description: "Căn hộ 85m², 3 phòng ngủ, tầng 15, view sông Sài Gòn cực đẹp. Thiết kế thông minh, thoáng mát.",
        price: 1650000000,
        negotiable: false,

        legalStatus: "ĐỦ_SỔ" as const,
        transferEligible: true,
        transferEligibleDate: "2025-07-01",

        originalPrice: 1600000000,
        purchaseDate: "2024-06-10",

        status: "ACTIVE" as const,
        publishedAt: "2025-11-08T11:00:00.000Z",
        expiresAt: "2026-02-08T11:00:00.000Z",
        viewCount: 267,

        createdAt: "2025-11-06T11:00:00.000Z",
        updatedAt: "2025-11-08T11:00:00.000Z",
    },
    {
        id: "6",
        unitId: "8",
        sellerId: "8",
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=400&h=300&fit=crop",
        ],

        title: "Chuyển nhượng gấp F1-20 - Giá tốt nhất khu vực",
        description: "Chủ cần tiền bán gấp căn 2PN, nội thất cơ bản, giá rẻ hơn thị trường 100 triệu.",
        price: 880000000,
        negotiable: true,

        legalStatus: "ĐỦ_SỔ" as const,
        transferEligible: true,
        transferEligibleDate: "2025-04-01",

        originalPrice: 850000000,
        purchaseDate: "2023-10-05",

        status: "ACTIVE" as const,
        publishedAt: "2025-11-14T16:20:00.000Z",
        expiresAt: "2026-02-14T16:20:00.000Z",
        viewCount: 421,

        createdAt: "2025-11-13T16:20:00.000Z",
        updatedAt: "2025-11-14T16:20:00.000Z",
    },
    {
        id: "7",
        unitId: "1",
        sellerId: "7",
        images: [
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=400&h=300&fit=crop",
        ],

        title: "Căn góc 3PN G2-07 - Vị trí VIP Block G",
        description: "Căn góc 90m², 3PN 2WC, ban công rộng, ánh sáng tự nhiên cả ngày. Đã hoàn thiện sang trọng.",
        price: 1750000000,
        negotiable: true,

        legalStatus: "ĐỦ_SỔ" as const,
        transferEligible: true,
        transferEligibleDate: "2025-08-15",

        originalPrice: 1700000000,
        purchaseDate: "2024-07-25",

        status: "ACTIVE" as const,
        publishedAt: "2025-11-07T10:15:00.000Z",
        expiresAt: "2026-02-07T10:15:00.000Z",
        viewCount: 198,

        createdAt: "2025-11-05T10:15:00.000Z",
        updatedAt: "2025-11-07T10:15:00.000Z",
    },
    {
        id: "8",
        unitId: "2",
        sellerId: "8",
        images: [
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1600047508788-786f8a39a1e6?w=400&h=300&fit=crop",
        ],

        title: "Căn hộ H1-11 tầng 11 - Hướng Bắc mát mẻ",
        description: "2 phòng ngủ, hướng Bắc mát mẻ quanh năm. Gần trường học, siêu thị. Phù hợp gia đình trẻ.",
        price: 1020000000,
        negotiable: true,

        legalStatus: "ĐANG_LÀM_SỔ" as const,
        transferEligible: false,
        transferEligibleDate: "2026-03-01",

        originalPrice: 1000000000,
        purchaseDate: "2024-11-15",

        status: "ACTIVE" as const,
        publishedAt: "2025-11-11T13:45:00.000Z",
        expiresAt: "2026-02-11T13:45:00.000Z",
        viewCount: 156,

        createdAt: "2025-11-09T13:45:00.000Z",
        updatedAt: "2025-11-11T13:45:00.000Z",
    },
    {
        id: "9",
        unitId: "4",
        sellerId: "7",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400&h=300&fit=crop",
        ],

        title: "Penthouse I3-25 tầng 25 - Căn duy nhất",
        description: "Penthouse 120m², tầng 25, view 360 độ toàn cảnh thành phố. Thiết kế duplex sang trọng.",
        price: 2500000000,
        negotiable: false,

        legalStatus: "ĐỦ_SỔ" as const,
        transferEligible: true,
        transferEligibleDate: "2025-09-01",

        originalPrice: 2400000000,
        purchaseDate: "2024-08-30",

        status: "ACTIVE" as const,
        publishedAt: "2025-11-06T08:30:00.000Z",
        expiresAt: "2026-02-06T08:30:00.000Z",
        viewCount: 534,

        createdAt: "2025-11-04T08:30:00.000Z",
        updatedAt: "2025-11-06T08:30:00.000Z",
    },
    {
        id: "10",
        unitId: "5",
        sellerId: "8",
        images: [
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1600566752229-250ed79c2c7a?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=400&h=300&fit=crop",
        ],

        title: "Căn 2PN J1-06 - Smart Home đầy đủ",
        description: "Căn hộ thông minh, điều khiển bằng giọng nói, camera an ninh. Nội thất hiện đại, sang trọng.",
        price: 1280000000,
        negotiable: true,

        legalStatus: "ĐỦ_SỔ" as const,
        transferEligible: true,
        transferEligibleDate: "2025-06-20",

        originalPrice: 1250000000,
        purchaseDate: "2024-05-10",

        status: "ACTIVE" as const,
        publishedAt: "2025-11-13T15:00:00.000Z",
        expiresAt: "2026-02-13T15:00:00.000Z",
        viewCount: 223,

        createdAt: "2025-11-11T15:00:00.000Z",
        updatedAt: "2025-11-13T15:00:00.000Z",
    },
    {
        id: "11",
        unitId: "6",
        sellerId: "7",
        images: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600607687644-aab4f92099c5?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1600607688960-e095ff83135c?w=400&h=300&fit=crop",
        ],

        title: "Căn studio K2-04 - Lý tưởng cho người độc thân",
        description: "Studio 35m², thiết kế tối ưu không gian. Đầy đủ tiện nghi, giá cả phải chăng cho sinh viên, người đi làm.",
        price: 650000000,
        negotiable: true,

        legalStatus: "ĐỦ_SỔ" as const,
        transferEligible: true,
        transferEligibleDate: "2025-02-15",

        originalPrice: 620000000,
        purchaseDate: "2023-06-20",

        status: "ACTIVE" as const,
        publishedAt: "2025-11-15T12:00:00.000Z",
        expiresAt: "2026-02-15T12:00:00.000Z",
        viewCount: 389,

        createdAt: "2025-11-14T12:00:00.000Z",
        updatedAt: "2025-11-15T12:00:00.000Z",
    },
    {
        id: "12",
        unitId: "7",
        sellerId: "8",
        images: [
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1600563438938-a650a5f2a7f8?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1600563440091-a0bf08f9d21d?w=400&h=300&fit=crop",
        ],

        title: "Căn 4PN L1-18 - Rộng rãi cho gia đình đông người",
        description: "Căn hộ 110m², 4 phòng ngủ, 3 WC. Phù hợp gia đình 3 thế hệ. Thiết kế thông thoáng, đầy đủ ánh sáng.",
        price: 1980000000,
        negotiable: true,

        legalStatus: "ĐỦ_SỔ" as const,
        transferEligible: true,
        transferEligibleDate: "2025-10-01",

        originalPrice: 1950000000,
        purchaseDate: "2024-09-15",

        status: "ACTIVE" as const,
        publishedAt: "2025-11-09T14:20:00.000Z",
        expiresAt: "2026-02-09T14:20:00.000Z",
        viewCount: 176,

        createdAt: "2025-11-07T14:20:00.000Z",
        updatedAt: "2025-11-09T14:20:00.000Z",
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
        propertyPrice: 1050000000,
        depositAmount: 50000000,
        depositPaidAt: "2025-11-12T10:00:00.000Z",

        transferTax: 21000000,
        taxAmount: 21000000,
        serviceFee: 10500000,
        otherFees: 2000000,
        totalAmount: 1083500000,

        paymentMethod: "BANK_TRANSFER" as const,
        paymentStatus: "PARTIAL" as const,

        contractUrl: "/contracts/contract-tx-1.pdf",

        status: "DEPOSIT_PAID" as const,

        initiatedAt: "2025-11-12T09:00:00.000Z",
        paymentCompletedAt: undefined,
        documentSignedAt: undefined,
        completedAt: undefined,

        createdAt: "2025-11-12T09:00:00.000Z",
        updatedAt: "2025-11-12T10:00:00.000Z",
    },
    {
        id: "2",
        listingId: "2",
        buyerId: "4",
        sellerId: "7",

        agreedPrice: 900000000,
        propertyPrice: 900000000,
        depositAmount: 45000000,
        depositPaidAt: "2025-10-01T10:00:00.000Z",

        transferTax: 18000000,
        taxAmount: 18000000,
        serviceFee: 9000000,
        otherFees: 1500000,
        totalAmount: 928500000,

        paymentMethod: "BANK_TRANSFER" as const,
        paymentStatus: "COMPLETED" as const,

        contractUrl: "/contracts/contract-tx-2.pdf",

        status: "COMPLETED" as const,

        initiatedAt: "2025-10-01T09:00:00.000Z",
        paymentCompletedAt: "2025-10-15T14:00:00.000Z",
        documentSignedAt: "2025-10-20T10:00:00.000Z",
        completedAt: "2025-11-01T11:00:00.000Z",

        createdAt: "2025-10-01T09:00:00.000Z",
        updatedAt: "2025-11-01T11:00:00.000Z",
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
