"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, Search, Filter, MapPin, Bed, Bath, Square, TrendingUp, Eye, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { mockGetListings } from "@/lib/mock-data";

export default function AdminSecondaryMarketPage() {
    const [filters, setFilters] = useState({
        search: "",
        minPrice: "",
        maxPrice: "",
        status: "",
    });

    const { data: listings, isLoading } = useQuery({
        queryKey: ["admin-listings", filters],
        queryFn: async () => {
            return mockGetListings({
                minPrice: filters.minPrice ? parseInt(filters.minPrice) : undefined,
                maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
            });
        },
    });

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const activeListings = listings?.data.filter((l: any) => l.status === "ACTIVE") || [];
    const pendingListings = listings?.data.filter((l: any) => l.status === "PENDING") || [];

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý Thị trường Thứ cấp</h1>
                    <p className="text-gray-600">Quản lý tin đăng bán căn hộ từ cá nhân</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Tổng tin đăng</CardDescription>
                            <CardTitle className="text-4xl">{listings?.total || 0}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-blue-600">
                                <Store className="h-4 w-4 mr-1" />
                                <span>Trong hệ thống</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Đang hoạt động</CardDescription>
                            <CardTitle className="text-4xl">{activeListings.length}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-green-600">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                <span>Đã duyệt</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Chờ duyệt</CardDescription>
                            <CardTitle className="text-4xl">{pendingListings.length}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-orange-600">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                <span>Cần xem xét</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Giao dịch tháng này</CardDescription>
                            <CardTitle className="text-4xl">18</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-green-600">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                <span>+15% vs tháng trước</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Bộ lọc
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <Label htmlFor="search">Tìm kiếm</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input id="search" placeholder="Mã tin, địa chỉ..." className="pl-10" value={filters.search} onChange={(e) => handleFilterChange("search", e.target.value)} />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="status">Trạng thái</Label>
                                <select id="status" className="w-full px-3 py-2 border rounded-md" value={filters.status} onChange={(e) => handleFilterChange("status", e.target.value)}>
                                    <option value="">Tất cả</option>
                                    <option value="ACTIVE">Đang hoạt động</option>
                                    <option value="PENDING">Chờ duyệt</option>
                                    <option value="SOLD">Đã bán</option>
                                    <option value="EXPIRED">Hết hạn</option>
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
                        </div>
                    </CardContent>
                </Card>

                {/* Listings Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Danh sách tin đăng</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="text-center py-8">
                                <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                                <p className="text-gray-600">Đang tải...</p>
                            </div>
                        ) : listings && listings.data.length > 0 ? (
                            <div className="space-y-3">
                                {listings.data.map((listing: any) => (
                                    <Card key={listing.id} className="border-2 hover:shadow-md transition-shadow">
                                        <CardContent className="p-4">
                                            <div className="flex items-start gap-4">
                                                <img
                                                    src={listing.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=150&h=100&fit=crop&auto=format"}
                                                    alt={listing.title}
                                                    className="w-24 h-20 object-cover rounded"
                                                />

                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="font-bold">{listing.title}</h3>
                                                                <span className="text-xs text-gray-500">#{listing.id}</span>
                                                            </div>
                                                            <div className="flex items-center text-sm text-gray-600 mt-1">
                                                                <MapPin className="h-3 w-3 mr-1" />
                                                                <span>Dự án Kim Oanh Green Park • Quận 9</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            {listing.status === "ACTIVE" ? (
                                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">Đang bán</span>
                                                            ) : listing.status === "PENDING" ? (
                                                                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-semibold">Chờ duyệt</span>
                                                            ) : (
                                                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">Đã bán</span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-4 gap-4 mt-3 text-sm">
                                                        <div className="flex items-center gap-1">
                                                            <Bed className="h-4 w-4 text-gray-500" />
                                                            <span>2 PN</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Bath className="h-4 w-4 text-gray-500" />
                                                            <span>2 WC</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Square className="h-4 w-4 text-gray-500" />
                                                            <span>65m²</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Eye className="h-4 w-4 text-gray-500" />
                                                            <span>{listing.viewCount} lượt xem</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between mt-3">
                                                        <div>
                                                            <span className="text-lg font-bold text-blue-600">{(listing.price / 1000000).toFixed(1)} tỷ VNĐ</span>
                                                            <span className="text-xs text-gray-500 ml-2">~{(listing.price / 65).toLocaleString("vi-VN")} VNĐ/m²</span>
                                                        </div>

                                                        <div className="flex gap-2">
                                                            <Button size="sm" variant="outline">
                                                                <Eye className="h-4 w-4 mr-1" />
                                                                Chi tiết
                                                            </Button>
                                                            {listing.status === "PENDING" && (
                                                                <>
                                                                    <Button size="sm" variant="default">
                                                                        <CheckCircle className="h-4 w-4 mr-1" />
                                                                        Duyệt
                                                                    </Button>
                                                                    <Button size="sm" variant="destructive">
                                                                        <XCircle className="h-4 w-4 mr-1" />
                                                                        Từ chối
                                                                    </Button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-600">Không có tin đăng nào</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
