"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Search, Filter, MapPin, Bed, Bath, Square, TrendingUp, Heart, Eye, AlertCircle } from "lucide-react";
import Link from "next/link";
import { mockGetListings } from "@/lib/mock-data";

export default function MarketplacePage() {
    const [filters, setFilters] = useState({
        search: "",
        minPrice: "",
        maxPrice: "",
        minArea: "",
        maxArea: "",
        bedrooms: "",
        status: "ACTIVE",
    });

    const { data: listings, isLoading } = useQuery({
        queryKey: ["marketplace-listings", filters],
        queryFn: async () => {
            return mockGetListings({
                status: filters.status,
                minPrice: filters.minPrice ? parseInt(filters.minPrice) : undefined,
                maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
            });
        },
    });

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <Home className="h-8 w-8 text-blue-600" />
                        Sàn giao dịch NOXH
                    </h1>
                    <p className="text-gray-600 mt-2">Tìm kiếm và mua bán nhà ở xã hội đã qua sử dụng</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Tổng tin đang bán</CardDescription>
                            <CardTitle className="text-4xl">{listings?.total || 0}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-green-600">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                <span>+12% tuần này</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Giá trung bình</CardDescription>
                            <CardTitle className="text-3xl">1.2 tỷ</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">VNĐ/căn</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Giao dịch tháng này</CardDescription>
                            <CardTitle className="text-4xl">24</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">Căn đã bán</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Thời gian trung bình</CardDescription>
                            <CardTitle className="text-3xl">45</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">Ngày để bán</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Bộ lọc tìm kiếm
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <div className="lg:col-span-2">
                                <Label htmlFor="search">Tìm kiếm</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input id="search" placeholder="Tên dự án, địa chỉ..." className="pl-10" value={filters.search} onChange={(e) => handleFilterChange("search", e.target.value)} />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="minPrice">Giá từ (triệu)</Label>
                                <Input id="minPrice" type="number" placeholder="800" value={filters.minPrice} onChange={(e) => handleFilterChange("minPrice", e.target.value)} />
                            </div>

                            <div>
                                <Label htmlFor="maxPrice">Đến (triệu)</Label>
                                <Input id="maxPrice" type="number" placeholder="1500" value={filters.maxPrice} onChange={(e) => handleFilterChange("maxPrice", e.target.value)} />
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
                        </div>
                    </CardContent>
                </Card>

                {/* Listings Grid */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">{listings?.total || 0} căn hộ đang bán</h2>
                        <div className="flex items-center gap-2">
                            <Label>Sắp xếp:</Label>
                            <select className="px-3 py-2 border rounded-md">
                                <option>Mới nhất</option>
                                <option>Giá thấp đến cao</option>
                                <option>Giá cao đến thấp</option>
                                <option>Diện tích lớn nhất</option>
                            </select>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-gray-600">Đang tải...</p>
                        </div>
                    ) : listings && listings.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listings.data.map((listing: any) => (
                                <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="relative h-48 bg-gray-200">
                                        <img
                                            src={listing.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&auto=format"}
                                            alt={listing.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-3 right-3 flex gap-2">
                                            <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100">
                                                <Heart className="h-4 w-4 text-gray-600" />
                                            </button>
                                        </div>
                                        <div className="absolute bottom-3 left-3">
                                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Đang bán</span>
                                        </div>
                                    </div>

                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-lg mb-2 line-clamp-1">{listing.title}</h3>

                                        <div className="flex items-center text-gray-600 text-sm mb-3">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            <span className="line-clamp-1">Dự án Kim Oanh Green Park</span>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
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
                                        </div>

                                        <div className="border-t pt-3 mb-3">
                                            <div className="flex items-baseline justify-between">
                                                <div>
                                                    <span className="text-2xl font-bold text-blue-600">{(listing.price / 1000000).toFixed(1)}</span>
                                                    <span className="text-gray-600 ml-1">tỷ VNĐ</span>
                                                </div>
                                                {listing.originalPrice && (
                                                    <div className="text-sm">
                                                        <span className="text-gray-500 line-through">{(listing.originalPrice / 1000000).toFixed(1)} tỷ</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">~{(listing.price / 65).toLocaleString("vi-VN")} VNĐ/m²</p>
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Eye className="h-4 w-4" />
                                                <span>{listing.viewCount} lượt xem</span>
                                            </div>
                                            <span>2 ngày trước</span>
                                        </div>

                                        <div className="flex gap-2">
                                            <Link href={`/buyer/marketplace/${listing.id}`} className="flex-1">
                                                <Button className="w-full">Xem chi tiết</Button>
                                            </Link>
                                            <Button variant="outline" size="icon">
                                                <Heart className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
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
                                            minArea: "",
                                            maxArea: "",
                                            bedrooms: "",
                                            status: "ACTIVE",
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
