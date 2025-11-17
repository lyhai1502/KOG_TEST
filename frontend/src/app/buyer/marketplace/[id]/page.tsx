"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Maximize, Calendar, Phone, User, CheckCircle2, FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_MARKETPLACE_LISTINGS, MOCK_UNITS, MOCK_WISHLISTS, MOCK_PROJECTS } from "@/lib/mock-data";
import { useAuthStore } from "@/store/auth.store";

export default function ListingDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { user } = useAuthStore();
    const [selectedImage, setSelectedImage] = useState(0);

    // Get listing
    const listing = MOCK_MARKETPLACE_LISTINGS.find((l) => l.id === params.id);
    const unit = listing ? MOCK_UNITS.find((u) => u.id === listing.unitId) : null;
    const project = unit ? MOCK_PROJECTS.find((p) => p.id === unit.projectId) : null;

    // Check if wishlisted
    const isWishlisted = MOCK_WISHLISTS.some((w) => w.userId === user?.id && w.listingId === params.id);

    if (!listing || !unit) {
        return (
            <div className="rounded-lg border-2 border-dashed p-12 text-center">
                <h3 className="text-lg font-semibold text-gray-900">Không tìm thấy căn hộ</h3>
                <p className="mt-2 text-sm text-gray-500">Căn hộ này không tồn tại hoặc đã được gỡ bỏ</p>
                <Button className="mt-4" onClick={() => router.back()}>
                    Quay lại
                </Button>
            </div>
        );
    }

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

    const { profit, percentage } = calculateProfit(listing.listingPrice, listing.originalPrice);

    const legalStatusConfig = {
        ĐỦ_SỔ: {
            label: "Đã có sổ hồng riêng",
            color: "text-green-600",
            bgColor: "bg-green-50",
        },
        ĐANG_LÀM_SỔ: {
            label: "Đang làm sổ hồng",
            color: "text-yellow-600",
            bgColor: "bg-yellow-50",
        },
        CHƯA_CÓ_SỔ: {
            label: "Chưa có sổ hồng",
            color: "text-gray-600",
            bgColor: "bg-gray-50",
        },
    };

    const legalStatus = legalStatusConfig[listing.legalStatus];

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <Button variant="ghost" onClick={() => router.back()} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Quay lại
            </Button>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="space-y-6 lg:col-span-2">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-video overflow-hidden rounded-lg">
                            <Image src={listing.images[selectedImage]} alt={listing.title} fill className="object-cover" />
                            <div className="absolute right-4 top-4 flex gap-2">{listing.verificationStatus === "VERIFIED" && <Badge className="bg-green-500">Đã xác minh</Badge>}</div>
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-4 gap-2">
                            {listing.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative aspect-video overflow-hidden rounded-lg border-2 transition-all ${selectedImage === index ? "border-primary" : "border-transparent"}`}
                                >
                                    <Image src={image} alt={`${listing.title} - ${index + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Title and Stats */}
                    <div>
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900">{listing.title}</h1>
                                <div className="mt-2 flex items-center gap-2 text-gray-500">
                                    <MapPin className="h-4 w-4" />
                                    {project?.name}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        // TODO: Toggle wishlist
                                    }}
                                >
                                    <Heart className="h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* View Count */}
                        <div className="mt-4 flex items-center gap-1 text-sm text-gray-500">
                            <Eye className="h-4 w-4" />
                            {listing.viewCount} lượt xem
                        </div>
                    </div>

                    {/* Price Section */}
                    <div className="rounded-lg border bg-gradient-to-r from-primary/10 to-primary/5 p-6">
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="text-sm text-gray-600">Giá niêm yết</div>
                                <div className="mt-1 text-4xl font-bold text-primary">{formatPrice(listing.listingPrice)}</div>
                                <div className="mt-1 text-sm text-gray-600">{formatPrice(listing.pricePerSqm)}/m²</div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-600">Giá gốc</div>
                                <div className="mt-1 text-xl text-gray-500 line-through">{formatPrice(listing.originalPrice)}</div>
                                {profit > 0 && (
                                    <div className="mt-1 text-lg font-semibold text-green-600">
                                        +{formatPrice(profit)} (+{percentage.toFixed(1)}%)
                                    </div>
                                )}
                            </div>
                        </div>
                        {listing.negotiable && (
                            <div className="mt-4 rounded bg-white p-3 text-sm text-green-600">
                                <CheckCircle2 className="mr-2 inline h-4 w-4" />
                                Có thể thương lượng giá
                            </div>
                        )}
                    </div>

                    {/* Unit Details */}
                    <div className="rounded-lg border bg-white p-6">
                        <h2 className="text-xl font-semibold text-gray-900">Thông tin căn hộ</h2>
                        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-primary/10 p-3">
                                    <Maximize className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Diện tích</div>
                                    <div className="font-semibold">{unit.area}m²</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-primary/10 p-3">
                                    <Bed className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Phòng ngủ</div>
                                    <div className="font-semibold">{unit.bedrooms} phòng</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-primary/10 p-3">
                                    <Bath className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Phòng tắm</div>
                                    <div className="font-semibold">{unit.bathrooms} phòng</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-primary/10 p-3">
                                    <Calendar className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600">Nhận nhà</div>
                                    <div className="font-semibold">{listing.availableFrom}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="font-semibold text-gray-900">Mô tả chi tiết</h3>
                            <p className="mt-2 text-gray-600">{listing.description}</p>
                        </div>
                    </div>

                    {/* Legal Status */}
                    <div className="rounded-lg border bg-white p-6">
                        <h2 className="text-xl font-semibold text-gray-900">Tình trạng pháp lý</h2>
                        <div className={`mt-4 rounded-lg p-4 ${legalStatus.bgColor}`}>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className={`h-5 w-5 ${legalStatus.color}`} />
                                <span className={`text-lg font-semibold ${legalStatus.color}`}>{legalStatus.label}</span>
                            </div>
                            {listing.legalStatus === "ĐANG_LÀM_SỔ" && listing.transferEligibleDate && (
                                <p className="mt-2 text-sm text-gray-600">Dự kiến hoàn thành: {new Date(listing.transferEligibleDate).toLocaleDateString("vi-VN")}</p>
                            )}
                        </div>

                        <div className="mt-4 space-y-2">
                            <div className="flex items-center justify-between rounded-lg border p-3">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm">Giấy chứng nhận quyền sở hữu</span>
                                </div>
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <Download className="h-4 w-4" />
                                    Tải về
                                </Button>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-3">
                                <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-gray-400" />
                                    <span className="text-sm">Hợp đồng mua bán gốc</span>
                                </div>
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <Download className="h-4 w-4" />
                                    Tải về
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Seller Info */}
                    <div className="rounded-lg border bg-white p-6">
                        <h3 className="font-semibold text-gray-900">Thông tin người bán</h3>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <User className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <div className="font-semibold">{listing.sellerName}</div>
                                    <div className="text-sm text-gray-500">Chủ sở hữu hợp pháp</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="h-4 w-4" />
                                <span>{listing.sellerPhone}</span>
                            </div>
                        </div>

                        <div className="mt-6 space-y-2">
                            <Button className="w-full gap-2">
                                <Phone className="h-4 w-4" />
                                Liên hệ ngay
                            </Button>
                            <Button variant="outline" className="w-full">
                                Đặt lịch xem nhà
                            </Button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="rounded-lg border bg-white p-6">
                        <h3 className="font-semibold text-gray-900">Thao tác nhanh</h3>
                        <div className="mt-4 space-y-2">
                            <Button className="w-full" size="lg">
                                Đặt cọc ngay
                            </Button>
                            <Button variant="outline" className="w-full">
                                So sánh với căn khác
                            </Button>
                        </div>
                    </div>

                    {/* Related Listings */}
                    <div className="rounded-lg border bg-white p-6">
                        <h3 className="font-semibold text-gray-900">Căn hộ tương tự</h3>
                        <div className="mt-4 space-y-3">
                            {MOCK_MARKETPLACE_LISTINGS.filter((l) => l.id !== listing.id)
                                .slice(0, 2)
                                .map((relatedListing) => {
                                    const relatedUnit = MOCK_UNITS.find((u) => u.id === relatedListing.unitId);
                                    return (
                                        <Link key={relatedListing.id} href={`/buyer/marketplace/${relatedListing.id}`} className="block rounded-lg border p-3 transition-colors hover:bg-gray-50">
                                            <div className="relative aspect-video overflow-hidden rounded">
                                                <Image src={relatedListing.images[0]} alt={relatedListing.title} fill className="object-cover" />
                                            </div>
                                            <h4 className="mt-2 font-semibold line-clamp-1">{relatedListing.title}</h4>
                                            <div className="mt-1 text-lg font-bold text-primary">{formatPrice(relatedListing.listingPrice)}</div>
                                            {relatedUnit && (
                                                <div className="mt-1 text-sm text-gray-500">
                                                    {relatedUnit.area}m² · {relatedUnit.bedrooms}PN
                                                </div>
                                            )}
                                        </Link>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
