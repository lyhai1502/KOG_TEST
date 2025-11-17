"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Bed, Bath, Square, Eye, Trash2, GitCompare, AlertCircle, TrendingUp } from "lucide-react";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { useWishlistStore } from "@/store/wishlist.store";
import { Listing } from "@/types";
import { toast } from "sonner";

export default function WishlistPage() {
    const router = useRouter();
    const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
    const { items: wishlistIds, removeItem, clearAll } = useWishlistStore();

    // Get actual listings from wishlist IDs
    const { data: wishlist, isLoading } = useQuery({
        queryKey: ["wishlist", wishlistIds],
        queryFn: async () => {
            return MOCK_LISTINGS.filter((l) => wishlistIds.includes(l.id));
        },
    });

    const handleRemove = (id: string) => {
        removeItem(id);
        setSelectedForCompare(selectedForCompare.filter((i) => i !== id));
        toast.success("Đã xóa khỏi danh sách yêu thích");
    };

    const handleClearAll = () => {
        if (confirm("Bạn có chắc muốn xóa tất cả khỏi danh sách yêu thích?")) {
            clearAll();
            setSelectedForCompare([]);
            toast.success("Đã xóa tất cả khỏi danh sách yêu thích");
        }
    };

    const handleToggleCompare = (id: string) => {
        if (selectedForCompare.includes(id)) {
            setSelectedForCompare(selectedForCompare.filter((i) => i !== id));
        } else {
            if (selectedForCompare.length >= 4) {
                alert("Chỉ có thể so sánh tối đa 4 căn hộ");
                return;
            }
            setSelectedForCompare([...selectedForCompare, id]);
        }
    };

    const handleCompare = () => {
        const params = new URLSearchParams();
        selectedForCompare.forEach((id) => params.append("id", id));
        router.push(`/buyer/marketplace/compare?${params.toString()}`);
    };

    const stats = {
        total: wishlist?.length || 0,
        avgPrice: wishlist && wishlist.length > 0 ? wishlist.reduce((sum, l) => sum + l.price, 0) / wishlist.length : 0,
        minPrice: wishlist && wishlist.length > 0 ? Math.min(...wishlist.map((l) => l.price)) : 0,
        maxPrice: wishlist && wishlist.length > 0 ? Math.max(...wishlist.map((l) => l.price)) : 0,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Danh sách yêu thích</h1>
                        <p className="text-gray-600">Các căn hộ bạn quan tâm</p>
                    </div>
                    {selectedForCompare.length >= 2 && (
                        <Button onClick={handleCompare}>
                            <GitCompare className="h-4 w-4 mr-2" />
                            So sánh ({selectedForCompare.length})
                        </Button>
                    )}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Tổng số căn</CardDescription>
                            <CardTitle className="text-3xl">{stats.total}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-gray-600">Căn hộ đã lưu</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Giá trung bình</CardDescription>
                            <CardTitle className="text-3xl">{(stats.avgPrice / 1000000000).toFixed(1)}B</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-gray-600">VNĐ</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Giá thấp nhất</CardDescription>
                            <CardTitle className="text-3xl text-green-600">{(stats.minPrice / 1000000000).toFixed(1)}B</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-gray-600">VNĐ</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Giá cao nhất</CardDescription>
                            <CardTitle className="text-3xl text-red-600">{(stats.maxPrice / 1000000000).toFixed(1)}B</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-gray-600">VNĐ</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Wishlist Grid */}
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-600">Đang tải...</p>
                    </div>
                ) : !wishlist || wishlist.length === 0 ? (
                    <Card>
                        <CardContent className="py-16 text-center">
                            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Chưa có căn hộ yêu thích</h3>
                            <p className="text-gray-600 mb-6">Khám phá thị trường và lưu các căn hộ bạn quan tâm</p>
                            <Link href="/buyer/marketplace">
                                <Button>
                                    <TrendingUp className="h-4 w-4 mr-2" />
                                    Khám phá thị trường
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlist.map((listing) => (
                            <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                                <div className="relative">
                                    <img
                                        src={listing.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&auto=format"}
                                        alt={listing.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <button onClick={() => handleRemove(listing.id)} className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors">
                                        <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                                    </button>
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">{listing.status}</span>
                                    </div>
                                </div>

                                <CardContent className="p-4 space-y-3">
                                    <div>
                                        <h3 className="font-bold text-lg mb-1 line-clamp-1">{listing.title}</h3>
                                        <p className="text-sm text-gray-600 flex items-center gap-1">
                                            <MapPin className="h-4 w-4" />
                                            Quận 7, TP.HCM
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Bed className="h-4 w-4" />2 PN
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Bath className="h-4 w-4" />2 WC
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Square className="h-4 w-4" />
                                            65m²
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-2 border-t">
                                        <div>
                                            <p className="text-2xl font-bold text-blue-600">{(listing.price / 1000000000).toFixed(2)}B</p>
                                            {listing.originalPrice && listing.originalPrice !== listing.price && (
                                                <p className="text-xs text-gray-500 line-through">{(listing.originalPrice / 1000000000).toFixed(2)}B</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Eye className="h-3 w-3" />
                                            {listing.viewCount}
                                        </div>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <Button variant={selectedForCompare.includes(listing.id) ? "default" : "outline"} size="sm" className="flex-1" onClick={() => handleToggleCompare(listing.id)}>
                                            <GitCompare className="h-4 w-4 mr-1" />
                                            {selectedForCompare.includes(listing.id) ? "Đã chọn" : "So sánh"}
                                        </Button>
                                        <Link href={`/buyer/secondary-market/${listing.id}`} className="flex-1">
                                            <Button variant="default" size="sm" className="w-full">
                                                Xem chi tiết
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Bulk Actions */}
                {wishlist && wishlist.length > 0 && (
                    <Card>
                        <CardContent className="py-4 flex items-center justify-between">
                            <p className="text-sm text-gray-600">{selectedForCompare.length > 0 ? `Đã chọn ${selectedForCompare.length} căn để so sánh` : "Chọn tối thiểu 2 căn để so sánh"}</p>
                            <div className="flex gap-2">
                                {selectedForCompare.length > 0 && (
                                    <Button variant="outline" size="sm" onClick={() => setSelectedForCompare([])}>
                                        Bỏ chọn tất cả
                                    </Button>
                                )}
                                <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={handleClearAll}>
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Xóa tất cả
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
