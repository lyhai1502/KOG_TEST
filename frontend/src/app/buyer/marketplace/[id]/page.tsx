"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, MapPin, Bed, Bath, Square, Calendar, CheckCircle2, AlertCircle, Heart, Share2, Phone, Mail, Home, FileText, CreditCard, TrendingUp, Shield } from "lucide-react";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { toast } from "sonner";

export default function ListingDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [showDepositModal, setShowDepositModal] = useState(false);

    const { data: listing, isLoading } = useQuery({
        queryKey: ["listing", params.id],
        queryFn: async () => {
            const item = MOCK_LISTINGS.find((l) => l.id === params.id);
            if (!item) throw new Error("Listing not found");
            return item;
        },
    });

    const handleDeposit = () => {
        setShowDepositModal(true);
    };

    const handleConfirmDeposit = () => {
        toast.success("Đặt cọc thành công! Chúng tôi sẽ liên hệ với bạn trong 24h.");
        setShowDepositModal(false);
        router.push("/buyer/transactions");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải...</p>
                </div>
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <p className="text-gray-600">Không tìm thấy tin đăng</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-8">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <Button variant="ghost" onClick={() => router.back()} className="mb-2">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Quay lại
                    </Button>
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">{listing.title}</h1>
                        <div className="flex gap-2">
                            <Button variant="outline" size="icon">
                                <Heart className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon">
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Images */}
                        <Card>
                            <CardContent className="p-0">
                                <div className="grid grid-cols-2 gap-2 p-2">
                                    <div className="col-span-2 h-96 bg-gray-200 rounded-lg overflow-hidden">
                                        <img
                                            src={listing.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&auto=format"}
                                            alt={listing.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {(
                                        listing.images?.slice(1, 5) || [
                                            "https://images.unsplash.com/photo-1502672260066-6bc35f0b1e1e?w=400&h=300&fit=crop",
                                            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
                                            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
                                            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
                                        ]
                                    ).map((url, i) => (
                                        <div key={i} className="h-48 bg-gray-200 rounded-lg overflow-hidden">
                                            <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Overview */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Thông tin tổng quan</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div>
                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                            <Square className="h-4 w-4" />
                                            <span className="text-sm">Diện tích</span>
                                        </div>
                                        <p className="text-xl font-bold">65 m²</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                            <Bed className="h-4 w-4" />
                                            <span className="text-sm">Phòng ngủ</span>
                                        </div>
                                        <p className="text-xl font-bold">2</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                            <Bath className="h-4 w-4" />
                                            <span className="text-sm">Phòng tắm</span>
                                        </div>
                                        <p className="text-xl font-bold">2</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-gray-600 mb-1">
                                            <Home className="h-4 w-4" />
                                            <span className="text-sm">Hướng</span>
                                        </div>
                                        <p className="text-xl font-bold">Đông Nam</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Mô tả chi tiết</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-gray-700">
                                <p>{listing.description}</p>
                                <div>
                                    <h4 className="font-semibold mb-2">Đặc điểm nổi bật:</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Vị trí đắc địa, gần trường học và bệnh viện</li>
                                        <li>Nội thất cơ bản, sẵn sàng ở ngay</li>
                                        <li>An ninh 24/7, có thang máy</li>
                                        <li>Sổ hồng đầy đủ, sang tên nhanh chóng</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Legal Status */}
                        <Card className="border-green-200 bg-green-50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-green-900">
                                    <Shield className="h-5 w-5" />
                                    Tình trạng pháp lý
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-green-800">Trạng thái sổ:</span>
                                    <span className="font-semibold text-green-900">{listing.legalStatus}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-green-800">Đủ điều kiện chuyển nhượng:</span>
                                    <span className="flex items-center gap-1 font-semibold text-green-900">
                                        <CheckCircle2 className="h-4 w-4" />
                                        {listing.transferEligible ? "Có" : "Chưa"}
                                    </span>
                                </div>
                                {listing.transferEligibleDate && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-green-800">Ngày được chuyển nhượng:</span>
                                        <span className="font-semibold text-green-900">{new Date(listing.transferEligibleDate).toLocaleDateString("vi-VN")}</span>
                                    </div>
                                )}
                                <div className="mt-4 p-3 bg-white rounded-lg">
                                    <p className="text-sm text-gray-700">
                                        <strong>Lưu ý:</strong> Căn hộ NOXH chỉ được chuyển nhượng sau 5 năm kể từ ngày ký hợp đồng mua bán. Người mua phải đáp ứng đủ điều kiện mua NOXH theo quy định.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Transaction History */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Lịch sử giao dịch
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 pb-4 border-b">
                                        <div className="bg-blue-100 p-3 rounded-lg">
                                            <Calendar className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-semibold">Mua lần đầu từ chủ đầu tư</h4>
                                                <span className="text-sm text-gray-600">01/2020</span>
                                            </div>
                                            <p className="text-sm text-gray-600">Giá: 800,000,000 VNĐ</p>
                                            <p className="text-sm text-gray-600">Người mua: Nguyễn Văn A</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="bg-green-100 p-3 rounded-lg">
                                            <TrendingUp className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-semibold">Đang rao bán</h4>
                                                <span className="text-sm text-gray-600">Hiện tại</span>
                                            </div>
                                            <p className="text-sm text-gray-600">Giá: {(listing.price / 1000000).toFixed(1)} tỷ VNĐ</p>
                                            <p className="text-sm text-green-600">Lãi: +{((listing.price - (listing.originalPrice || 800000000)) / 1000000).toFixed(1)} triệu VNĐ</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Price Card */}
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle>Thông tin giá</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-4xl font-bold text-blue-600">{(listing.price / 1000000).toFixed(1)}</span>
                                        <span className="text-xl text-gray-600">tỷ VNĐ</span>
                                    </div>
                                    <p className="text-sm text-gray-600">~{(listing.price / 65).toLocaleString("vi-VN")} VNĐ/m²</p>
                                    {listing.originalPrice && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Giá gốc: <span className="line-through">{(listing.originalPrice / 1000000).toFixed(1)} tỷ</span>
                                        </p>
                                    )}
                                </div>

                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Tiền đặt cọc</span>
                                        <span className="font-semibold">{((listing.price * 0.05) / 1000000).toFixed(0)} triệu</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Phí dịch vụ</span>
                                        <span className="font-semibold">2%</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Thuế chuyển nhượng</span>
                                        <span className="font-semibold">2%</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Button className="w-full" size="lg" onClick={handleDeposit}>
                                        <CreditCard className="h-5 w-5 mr-2" />
                                        Đặt cọc ngay
                                    </Button>
                                    <Button variant="outline" className="w-full">
                                        <Phone className="h-4 w-4 mr-2" />
                                        Liên hệ người bán
                                    </Button>
                                </div>

                                <div className="text-center text-xs text-gray-500 pt-2 border-t">
                                    <Shield className="h-4 w-4 inline mr-1" />
                                    Giao dịch được bảo vệ bởi Kim Oanh Group
                                </div>
                            </CardContent>
                        </Card>

                        {/* Seller Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Thông tin người bán</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 p-3 rounded-full">
                                        <Home className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Nguyễn Văn A</p>
                                        <p className="text-sm text-gray-600">Chủ sở hữu</p>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Phone className="h-4 w-4" />
                                        <span>090-xxx-xxxx</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Mail className="h-4 w-4" />
                                        <span>seller@example.com</span>
                                    </div>
                                </div>
                                <Button variant="outline" className="w-full">
                                    Xem hồ sơ
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Deposit Modal */}
            {showDepositModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <Card className="max-w-md w-full">
                        <CardHeader>
                            <CardTitle>Xác nhận đặt cọc</CardTitle>
                            <CardDescription>Bạn đang đặt cọc cho căn hộ: {listing.title}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="font-semibold text-blue-900 mb-2">Thông tin thanh toán</h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-blue-800">Tiền đặt cọc (5%):</span>
                                        <span className="font-bold text-blue-900">{((listing.price * 0.05) / 1000000).toFixed(0)} triệu VNĐ</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-blue-800">Phí dịch vụ:</span>
                                        <span className="font-bold text-blue-900">{((listing.price * 0.02) / 1000000).toFixed(1)} triệu VNĐ</span>
                                    </div>
                                    <div className="flex justify-between text-base border-t border-blue-300 pt-2 mt-2">
                                        <span className="text-blue-900 font-semibold">Tổng thanh toán:</span>
                                        <span className="font-bold text-blue-900">{((listing.price * 0.07) / 1000000).toFixed(0)} triệu VNĐ</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Phương thức thanh toán</label>
                                <select className="w-full px-3 py-2 border rounded-md">
                                    <option>Chuyển khoản ngân hàng</option>
                                    <option>Ví điện tử MoMo</option>
                                    <option>Ví điện tử ZaloPay</option>
                                    <option>Thẻ tín dụng/ghi nợ</option>
                                </select>
                            </div>

                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                                <p className="text-xs text-amber-900">
                                    <strong>Lưu ý:</strong> Tiền đặt cọc sẽ được hoàn trả 100% nếu giao dịch không thành công do lỗi từ người bán hoặc các vấn đề pháp lý.
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1" onClick={() => setShowDepositModal(false)}>
                                    Hủy
                                </Button>
                                <Button className="flex-1" onClick={handleConfirmDeposit}>
                                    Xác nhận đặt cọc
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
