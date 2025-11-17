"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Heart, Eye, MapPin, Bed, Bath, Maximize, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockGetMarketplaceListings, MOCK_UNITS, MOCK_WISHLISTS, MOCK_PROJECTS } from "@/lib/mock-data";
import { useAuthStore } from "@/store/auth.store";

export default function MarketplacePage() {
    const { user } = useAuthStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [selectedBedrooms, setSelectedBedrooms] = useState<number | null>(null);

    // Get marketplace listings
    const listings = mockGetMarketplaceListings({
        search: searchTerm,
        minPrice: priceRange.min ? parseInt(priceRange.min) : undefined,
        maxPrice: priceRange.max ? parseInt(priceRange.max) : undefined,
    }).data;

    // Get user's wishlist
    const userWishlists = MOCK_WISHLISTS.filter((w) => w.userId === user?.id);
    const wishlistIds = new Set(userWishlists.map((w) => w.listingId));

    // Get unit details for each listing
    const listingsWithUnits = listings.map((listing) => {
        const unit = MOCK_UNITS.find((u) => u.id === listing.unitId);
        const project = unit ? MOCK_PROJECTS.find((p) => p.id === unit.projectId) : null;
        return {
            ...listing,
            unit,
            project,
        };
    });

    const formatPrice = (price: number) => {
        if (price >= 1000000000) {
            return `${(price / 1000000000).toFixed(2)} tỷ`;
        }
        return `${(price / 1000000).toFixed(0)} triệu`;
    };

    const calculateProfit = (listingPrice: number, originalPrice: number) => {
        const profit = listingPrice - originalPrice;
        const percentage = (profit / originalPrice) * 100;
        return {
            profit,
            percentage,
        };
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Sàn Giao Dịch Thứ Cấp</h1>
                    <p className="mt-1 text-sm text-gray-500">Khám phá {listings.length} căn hộ NOXH đang giao dịch</p>
                </div>
                <Link href="/buyer/wishlist">
                    <Button variant="outline" className="gap-2">
                        <Heart className="h-4 w-4" />
                        Yêu thích ({userWishlists.length})
                    </Button>
                </Link>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input placeholder="Tìm kiếm theo tên dự án, vị trí..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                    </div>
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
                        <Filter className="h-4 w-4" />
                        Bộ lọc
                        <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                    </Button>
                </div>

                {/* Filter Panel */}
                {showFilters && (
                    <div className="rounded-lg border bg-white p-4">
                        <div className="grid gap-4 md:grid-cols-3">
                            {/* Price Range */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">Khoảng giá (VNĐ)</label>
                                <div className="mt-2 flex gap-2">
                                    <Input
                                        type="number"
                                        placeholder="Từ"
                                        value={priceRange.min}
                                        onChange={(e) =>
                                            setPriceRange((prev) => ({
                                                ...prev,
                                                min: e.target.value,
                                            }))
                                        }
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Đến"
                                        value={priceRange.max}
                                        onChange={(e) =>
                                            setPriceRange((prev) => ({
                                                ...prev,
                                                max: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                            </div>

                            {/* Bedrooms */}
                            <div>
                                <label className="text-sm font-medium text-gray-700">Số phòng ngủ</label>
                                <div className="mt-2 flex gap-2">
                                    {[1, 2, 3, 4].map((num) => (
                                        <Button
                                            key={num}
                                            variant={selectedBedrooms === num ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setSelectedBedrooms(selectedBedrooms === num ? null : num)}
                                        >
                                            {num}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Reset */}
                            <div className="flex items-end">
                                <Button
                                    variant="ghost"
                                    onClick={() => {
                                        setPriceRange({ min: "", max: "" });
                                        setSelectedBedrooms(null);
                                        setSearchTerm("");
                                    }}
                                >
                                    Xóa bộ lọc
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Listings Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {listingsWithUnits.map((listing) => {
                    const { unit } = listing;
                    const isWishlisted = wishlistIds.has(listing.id);
                    const { profit, percentage } = calculateProfit(listing.listingPrice, listing.originalPrice);

                    return (
                        <Link key={listing.id} href={`/buyer/marketplace/${listing.id}`} className="group overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-lg">
                            {/* Image */}
                            <div className="relative aspect-video overflow-hidden">
                                <Image src={listing.images[0]} alt={listing.title} fill className="object-cover transition-transform group-hover:scale-105" />
                                <div className="absolute right-2 top-2 flex gap-2">
                                    {listing.verificationStatus === "VERIFIED" && <Badge className="bg-green-500">Đã xác minh</Badge>}
                                    <button
                                        className={`rounded-full p-2 transition-colors ${isWishlisted ? "bg-red-500 text-white" : "bg-white text-gray-600 hover:bg-red-50"}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // TODO: Toggle wishlist
                                        }}
                                    >
                                        <Heart className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} />
                                    </button>
                                </div>
                                {listing.legalStatus === "ĐỦ_SỔ" && (
                                    <div className="absolute bottom-2 left-2">
                                        <Badge variant="secondary">Đã có sổ hồng</Badge>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 line-clamp-2">{listing.title}</h3>

                                {/* Price */}
                                <div className="mt-2">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-2xl font-bold text-primary">{formatPrice(listing.listingPrice)}</span>
                                        {profit > 0 && <span className="text-sm text-green-600">+{percentage.toFixed(1)}%</span>}
                                    </div>
                                    <div className="text-sm text-gray-500">{formatPrice(listing.pricePerSqm)}/m²</div>
                                </div>

                                {/* Unit Details */}
                                {unit && (
                                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <Maximize className="h-4 w-4" />
                                            {unit.area}m²
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Bed className="h-4 w-4" />
                                            {unit.bedrooms}PN
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Bath className="h-4 w-4" />
                                            {unit.bathrooms}WC
                                        </div>
                                    </div>
                                )}

                                {/* Location */}
                                <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                                    <MapPin className="h-4 w-4" />
                                    {listing.project?.name}
                                </div>

                                {/* Stats */}
                                <div className="mt-3 flex items-center justify-between border-t pt-3 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Eye className="h-4 w-4" />
                                        {listing.viewCount} lượt xem
                                    </div>
                                    <div>{listing.negotiable ? <span className="text-green-600">Có thể thương lượng</span> : <span className="text-gray-600">Giá cố định</span>}</div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Empty State */}
            {listings.length === 0 && (
                <div className="rounded-lg border-2 border-dashed p-12 text-center">
                    <Search className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">Không tìm thấy căn hộ</h3>
                    <p className="mt-2 text-sm text-gray-500">Thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm</p>
                </div>
            )}
        </div>
    );
}
