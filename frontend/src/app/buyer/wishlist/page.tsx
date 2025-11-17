"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Heart, ArrowLeft, Trash2, Share2, Bed, Bath, Maximize, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_MARKETPLACE_LISTINGS, MOCK_UNITS, MOCK_WISHLISTS, MOCK_PROJECTS } from "@/lib/mock-data";
import { useAuthStore } from "@/store/auth.store";

export default function WishlistPage() {
    const router = useRouter();
    const { user } = useAuthStore();

    // Get user's wishlists
    const userWishlists = MOCK_WISHLISTS.filter((w) => w.userId === user?.id);

    // Get listings with unit details
    const wishlistItems = userWishlists
        .map((wishlist) => {
            const listing = MOCK_MARKETPLACE_LISTINGS.find((l) => l.id === wishlist.listingId);
            const unit = listing ? MOCK_UNITS.find((u) => u.id === listing.unitId) : null;
            const project = unit ? MOCK_PROJECTS.find((p) => p.id === unit.projectId) : null;
            return {
                wishlist,
                listing,
                unit,
                project,
            };
        })
        .filter((item) => item.listing && item.unit);

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
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Danh sách yêu thích</h1>
                        <p className="mt-1 text-sm text-gray-500">Bạn có {wishlistItems.length} căn hộ đã lưu</p>
                    </div>
                </div>
                <Link href="/buyer/marketplace">
                    <Button variant="outline">Khám phá thêm</Button>
                </Link>
            </div>

            {/* Empty State */}
            {wishlistItems.length === 0 && (
                <div className="rounded-lg border-2 border-dashed p-12 text-center">
                    <Heart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">Chưa có căn hộ yêu thích</h3>
                    <p className="mt-2 text-sm text-gray-500">Khám phá sàn giao dịch và lưu những căn hộ bạn quan tâm</p>
                    <Link href="/buyer/marketplace">
                        <Button className="mt-4">Khám phá sàn giao dịch</Button>
                    </Link>
                </div>
            )}

            {/* Wishlist Grid */}
            {wishlistItems.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {wishlistItems.map((item) => {
                        const { wishlist, listing, unit, project } = item;
                        if (!listing || !unit) return null;

                        const { profit, percentage } = calculateProfit(listing.listingPrice, listing.originalPrice);

                        return (
                            <div key={wishlist.id} className="group overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-lg">
                                {/* Image */}
                                <Link href={`/buyer/marketplace/${listing.id}`} className="relative block aspect-video overflow-hidden">
                                    <Image src={listing.images[0]} alt={listing.title} fill className="object-cover transition-transform group-hover:scale-105" />
                                    <div className="absolute right-2 top-2 flex gap-2">{listing.verificationStatus === "VERIFIED" && <Badge className="bg-green-500">Đã xác minh</Badge>}</div>
                                    {listing.legalStatus === "ĐỦ_SỔ" && (
                                        <div className="absolute bottom-2 left-2">
                                            <Badge variant="secondary">Đã có sổ hồng</Badge>
                                        </div>
                                    )}
                                </Link>

                                {/* Content */}
                                <div className="p-4">
                                    <Link href={`/buyer/marketplace/${listing.id}`}>
                                        <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-primary">{listing.title}</h3>
                                    </Link>

                                    {/* Price */}
                                    <div className="mt-2">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-bold text-primary">{formatPrice(listing.listingPrice)}</span>
                                            {profit > 0 && <span className="text-sm text-green-600">+{percentage.toFixed(1)}%</span>}
                                        </div>
                                        <div className="text-sm text-gray-500">{formatPrice(listing.pricePerSqm)}/m²</div>
                                    </div>

                                    {/* Unit Details */}
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

                                    {/* Location */}
                                    <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                                        <MapPin className="h-4 w-4" />
                                        {item.project?.name}
                                    </div>

                                    {/* Added Date */}
                                    <div className="mt-2 text-xs text-gray-400">Đã lưu: {new Date(wishlist.addedAt).toLocaleDateString("vi-VN")}</div>

                                    {/* Actions */}
                                    <div className="mt-4 flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 gap-2"
                                            onClick={() => {
                                                // TODO: Remove from wishlist
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Xóa
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                // TODO: Share listing
                                            }}
                                        >
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Quick Actions */}
            {wishlistItems.length > 0 && (
                <div className="rounded-lg border bg-white p-6">
                    <h3 className="font-semibold text-gray-900">Thao tác nhanh</h3>
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                        <Button variant="outline" className="w-full">
                            So sánh đã chọn
                        </Button>
                        <Button variant="outline" className="w-full">
                            Chia sẻ danh sách
                        </Button>
                        <Button variant="outline" className="w-full">
                            Xuất PDF
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
