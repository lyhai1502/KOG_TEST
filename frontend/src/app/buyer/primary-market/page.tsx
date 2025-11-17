"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Search, Filter, MapPin, Bed, Bath, Square, TrendingUp, Eye, AlertCircle, Plus } from "lucide-react";
import Link from "next/link";
import { MOCK_PROJECTS, MOCK_UNITS } from "@/lib/mock-data";
import { useAuthStore } from "@/store/auth.store";

export default function PrimaryMarketPage() {
    const { user } = useAuthStore();
    const isBuyer = user?.role === "BUYER";
    const baseRole = isBuyer ? "buyer" : "admin";

    const [filters, setFilters] = useState({
        search: "",
        minPrice: "",
        maxPrice: "",
        bedrooms: "",
        projectId: "",
    });

    const { data: projects } = useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            return MOCK_PROJECTS;
        },
    });

    const { data: units } = useQuery({
        queryKey: ["units", filters],
        queryFn: async () => {
            let filtered = MOCK_UNITS.filter((u) => u.status === "AVAILABLE");

            if (filters.projectId) {
                filtered = filtered.filter((u) => u.projectId === filters.projectId);
            }

            if (filters.minPrice) {
                filtered = filtered.filter((u) => u.price >= parseInt(filters.minPrice) * 1000000);
            }

            if (filters.maxPrice) {
                filtered = filtered.filter((u) => u.price <= parseInt(filters.maxPrice) * 1000000);
            }

            if (filters.bedrooms) {
                filtered = filtered.filter((u) => u.bedrooms === parseInt(filters.bedrooms));
            }

            return filtered;
        },
    });

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const stats = {
        totalProjects: projects?.length || 0,
        totalUnits: MOCK_UNITS.filter((u) => u.status === "AVAILABLE").length,
        avgPrice: Math.round(MOCK_UNITS.filter((u) => u.status === "AVAILABLE").reduce((sum, u) => sum + u.price, 0) / MOCK_UNITS.filter((u) => u.status === "AVAILABLE").length / 1000000000) || 0,
        soldThisMonth: MOCK_UNITS.filter((u) => u.status === "SOLD").length,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thị trường Sơ cấp</h1>
                        <p className="text-gray-600">Dự án mới từ Chủ đầu tư - Kim Oanh Group</p>
                    </div>
                    {isBuyer && (
                        <Link href="/buyer/application/new">
                            <Button size="lg">
                                <Plus className="h-5 w-5 mr-2" />
                                Nộp hồ sơ đăng ký
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Dự án đang mở bán</CardDescription>
                            <CardTitle className="text-4xl">{stats.totalProjects}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-gray-600">
                                <Building2 className="h-4 w-4 mr-1" />
                                <span>Dự án NOXH</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Căn hộ còn trống</CardDescription>
                            <CardTitle className="text-4xl">{stats.totalUnits}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-green-600">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                <span>Sẵn sàng bán</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Giá trung bình</CardDescription>
                            <CardTitle className="text-3xl">{stats.avgPrice.toFixed(1)} tỷ</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">VNĐ/căn</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Đã bán tháng này</CardDescription>
                            <CardTitle className="text-4xl">{stats.soldThisMonth}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">Căn hộ</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Projects List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            Danh sách dự án ({projects?.length || 0})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {projects?.map((project: any) => (
                                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                                    <div className="relative h-40 bg-gray-200">
                                        <img
                                            src={project.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&auto=format"}
                                            alt={project.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-2 left-2">
                                            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">Đang mở bán</span>
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-lg mb-1">{project.name}</h3>
                                        <div className="flex items-center text-sm text-gray-600 mb-3">
                                            <MapPin className="h-3 w-3 mr-1" />
                                            <span className="line-clamp-1">
                                                {project.district}, {project.city}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                            <div>
                                                <span className="text-gray-500">Tổng căn:</span>
                                                <span className="font-semibold ml-1">{project.totalUnits}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500">Còn trống:</span>
                                                <span className="font-semibold text-green-600 ml-1">{project.availableUnits}</span>
                                            </div>
                                        </div>
                                        <div className="text-sm mb-3">
                                            <span className="text-gray-500">Giá:</span>
                                            <span className="font-semibold ml-1">
                                                {(project.priceRange.min / 1000000).toFixed(0)} - {(project.priceRange.max / 1000000).toFixed(0)} triệu
                                            </span>
                                        </div>
                                        <Link href={`/${baseRole}/primary-market/projects/${project.id}`}>
                                            <Button size="sm" className="w-full">
                                                <Eye className="h-4 w-4 mr-2" />
                                                Xem chi tiết dự án
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Bộ lọc căn hộ
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div>
                                <Label htmlFor="projectId">Dự án</Label>
                                <select id="projectId" className="w-full px-3 py-2 border rounded-md" value={filters.projectId} onChange={(e) => handleFilterChange("projectId", e.target.value)}>
                                    <option value="">Tất cả dự án</option>
                                    {projects?.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="minPrice">Giá từ (triệu)</Label>
                                <Input id="minPrice" type="number" placeholder="800" value={filters.minPrice} onChange={(e) => handleFilterChange("minPrice", e.target.value)} />
                            </div>

                            <div>
                                <Label htmlFor="maxPrice">Đến (triệu)</Label>
                                <Input id="maxPrice" type="number" placeholder="2000" value={filters.maxPrice} onChange={(e) => handleFilterChange("maxPrice", e.target.value)} />
                            </div>

                            <div>
                                <Label htmlFor="bedrooms">Phòng ngủ</Label>
                                <select id="bedrooms" className="w-full px-3 py-2 border rounded-md" value={filters.bedrooms} onChange={(e) => handleFilterChange("bedrooms", e.target.value)}>
                                    <option value="">Tất cả</option>
                                    <option value="1">1 phòng</option>
                                    <option value="2">2 phòng</option>
                                    <option value="3">3 phòng</option>
                                    <option value="4">4+ phòng</option>
                                </select>
                            </div>

                            <div className="flex items-end">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() =>
                                        setFilters({
                                            search: "",
                                            minPrice: "",
                                            maxPrice: "",
                                            bedrooms: "",
                                            projectId: "",
                                        })
                                    }
                                >
                                    Xóa bộ lọc
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Units Grid */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">{units?.length || 0} căn hộ có sẵn</h2>
                        <div className="flex items-center gap-2">
                            <Label>Sắp xếp:</Label>
                            <select className="px-3 py-2 border rounded-md">
                                <option>Giá thấp đến cao</option>
                                <option>Giá cao đến thấp</option>
                                <option>Diện tích lớn nhất</option>
                                <option>Mới nhất</option>
                            </select>
                        </div>
                    </div>

                    {units && units.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {units.map((unit: any) => {
                                const project = projects?.find((p) => p.id === unit.projectId);
                                return (
                                    <Card key={unit.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                                        <div className="relative h-48 bg-gray-200">
                                            <img
                                                src={unit.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"}
                                                alt={unit.code}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-3 left-3">
                                                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Mới từ CĐT</span>
                                            </div>
                                            <div className="absolute top-3 right-3">
                                                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Còn trống</span>
                                            </div>
                                        </div>

                                        <CardContent className="p-4">
                                            <div className="mb-2">
                                                <span className="text-xs text-gray-500">{project?.name}</span>
                                                <h3 className="font-bold text-lg">Căn {unit.code}</h3>
                                            </div>

                                            <div className="flex items-center text-gray-600 text-sm mb-3">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                <span className="line-clamp-1">
                                                    {project?.district}, {project?.city}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                                                <div className="flex items-center gap-1">
                                                    <Bed className="h-4 w-4 text-gray-500" />
                                                    <span>{unit.bedrooms} PN</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Bath className="h-4 w-4 text-gray-500" />
                                                    <span>{unit.bathrooms} WC</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Square className="h-4 w-4 text-gray-500" />
                                                    <span>{unit.area}m²</span>
                                                </div>
                                            </div>

                                            <div className="border-t pt-3 mb-3">
                                                <div className="flex items-baseline justify-between">
                                                    <div>
                                                        <span className="text-2xl font-bold text-blue-600">{(unit.price / 1000000).toFixed(0)}</span>
                                                        <span className="text-gray-600 ml-1">triệu VNĐ</span>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">~{(unit.price / unit.area).toLocaleString("vi-VN")} VNĐ/m²</p>
                                            </div>

                                            <div className="space-y-2">
                                                <Link href={`/${baseRole}/primary-market/units/${unit.id}`} className="block">
                                                    <Button className="w-full" size="sm">
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        Xem chi tiết
                                                    </Button>
                                                </Link>
                                                {isBuyer && (
                                                    <Link href="/buyer/application/new" className="block">
                                                        <Button variant="outline" className="w-full" size="sm">
                                                            <Plus className="h-4 w-4 mr-2" />
                                                            Đăng ký mua
                                                        </Button>
                                                    </Link>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <Card className="p-12">
                            <div className="text-center">
                                <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy căn hộ phù hợp</h3>
                                <p className="text-gray-600 mb-4">Thử điều chỉnh bộ lọc để xem thêm kết quả</p>
                                <Button
                                    onClick={() =>
                                        setFilters({
                                            search: "",
                                            minPrice: "",
                                            maxPrice: "",
                                            bedrooms: "",
                                            projectId: "",
                                        })
                                    }
                                >
                                    Xóa bộ lọc
                                </Button>
                            </div>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}
