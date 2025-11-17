"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DashboardHeader } from "@/components/dashboard/header";
import {
    ArrowLeft,
    MapPin,
    Bed,
    Bath,
    Square,
    Calendar,
    CheckCircle2,
    AlertCircle,
    Heart,
    Share2,
    Phone,
    Mail,
    Home,
    FileText,
    CreditCard,
    TrendingUp,
    Shield,
    User,
    Building2,
    Compass,
    Eye,
    DollarSign,
    Clock,
    MessageCircle,
    Star,
} from "lucide-react";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { useAuthStore } from "@/store/auth.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { toast } from "sonner";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Video, Facebook, Twitter, Linkedin } from "lucide-react";

export default function ListingDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { user } = useAuthStore();
    const isBuyer = user?.role === "BUYER";
    const { toggleItem, isInWishlist } = useWishlistStore();
    const [showDepositModal, setShowDepositModal] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(0);
    const [showLightbox, setShowLightbox] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showVirtualTourModal, setShowVirtualTourModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contactForm, setContactForm] = useState({ name: "", phone: "", email: "", message: "" });

    const handleWishlistToggle = () => {
        toggleItem(params.id);
        toast.success(isInWishlist(params.id) ? "Đã xóa khỏi yêu thích" : "Đã thêm vào yêu thích");
    };

    const { data: listing, isLoading } = useQuery({
        queryKey: ["listing", params.id],
        queryFn: async () => {
            const item = MOCK_LISTINGS.find((l) => l.id === params.id);
            if (!item) throw new Error("Listing not found");
            return item;
        },
    });

    // Related listings (same price range)
    const { data: relatedListings } = useQuery({
        queryKey: ["related-listings", listing?.price],
        queryFn: async () => {
            if (!listing) return [];
            return MOCK_LISTINGS.filter((l) => l.id !== listing.id && Math.abs(l.price - listing.price) < 300000000).slice(0, 3);
        },
        enabled: !!listing,
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <DashboardHeader />
                <div className="max-w-7xl mx-auto p-6">
                    <div className="text-center py-12">
                        <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-600">Đang tải...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="min-h-screen bg-gray-50">
                <DashboardHeader />
                <div className="max-w-7xl mx-auto p-6">
                    <Card className="p-12">
                        <div className="text-center">
                            <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy tin đăng</h3>
                            <Button onClick={() => router.back()}>Quay lại</Button>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    const depositAmount = listing.price * 0.05; // 5% deposit
    const serviceFee = listing.price * 0.02; // 2% service fee
    const totalDeposit = depositAmount + serviceFee;

    const images = listing.images || [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1502672260066-6bc35f0b1e1e?w=800&h=600&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&auto=format",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&auto=format",
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
                {/* Breadcrumb Navigation */}
                <div className="flex items-center justify-between">
                    <Breadcrumb items={[{ label: "Thị trường thứ cấp", href: "/buyer/secondary-market" }, { label: listing.title }]} />
                    <Button variant="ghost" size="sm" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Quay lại
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Images Gallery */}
                        <Card>
                            <CardContent className="p-4">
                                <div className="space-y-3">
                                    <div
                                        className="relative h-96 bg-gray-200 rounded-lg overflow-hidden cursor-pointer group"
                                        onClick={() => {
                                            setLightboxIndex(selectedImage);
                                            setShowLightbox(true);
                                        }}
                                    >
                                        <img src={images[selectedImage]} alt={listing.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-lg">
                                                <Eye className="h-6 w-6" />
                                            </div>
                                        </div>
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Cá nhân bán</span>
                                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Đang bán</span>
                                        </div>
                                        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                            <Eye className="h-4 w-4" />
                                            {listing.viewCount} lượt xem
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        {images.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setSelectedImage(idx)}
                                                className={`relative h-24 bg-gray-200 rounded overflow-hidden transition-all ${
                                                    selectedImage === idx ? "ring-2 ring-blue-600 scale-105" : "hover:ring-2 hover:ring-gray-300"
                                                }`}
                                            >
                                                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Title & Price */}
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                                        <div className="flex items-center text-gray-600 mb-2">
                                            <MapPin className="h-5 w-5 mr-2" />
                                            <span>Dự án Kim Oanh Green Park • Quận 9, TP. HCM</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Clock className="h-4 w-4" />
                                            <span>Đăng 3 ngày trước</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {isBuyer && (
                                            <Button variant="outline" size="icon" onClick={handleWishlistToggle} className={isInWishlist(params.id) ? "text-red-500 border-red-500" : ""}>
                                                <Heart className={`h-5 w-5 ${isInWishlist(params.id) ? "fill-current" : ""}`} />
                                            </Button>
                                        )}
                                        <Button variant="outline" size="icon" onClick={() => setShowShareModal(true)}>
                                            <Share2 className="h-5 w-5" />
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={() => setShowVirtualTourModal(true)} title="Xem tour 3D">
                                            <Video className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="text-4xl font-bold text-blue-600">{(listing.price / 1000000000).toFixed(2)}</span>
                                        <span className="text-xl text-gray-600">tỷ VNĐ</span>
                                    </div>
                                    {listing.originalPrice && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-500 line-through">{(listing.originalPrice / 1000000000).toFixed(2)} tỷ</span>
                                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">
                                                Giảm {(((listing.originalPrice - listing.price) / listing.originalPrice) * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                    )}
                                    <p className="text-sm text-gray-500 mt-2">~{(listing.price / 65).toLocaleString("vi-VN")} VNĐ/m²</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Thông tin chi tiết</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-blue-50 rounded-lg">
                                            <Bed className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Phòng ngủ</p>
                                            <p className="font-semibold">2 phòng</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-green-50 rounded-lg">
                                            <Bath className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Phòng tắm</p>
                                            <p className="font-semibold">2 phòng</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-orange-50 rounded-lg">
                                            <Square className="h-6 w-6 text-orange-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Diện tích</p>
                                            <p className="font-semibold">65 m²</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-purple-50 rounded-lg">
                                            <Compass className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Hướng</p>
                                            <p className="font-semibold">Đông Nam</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t mt-6 pt-6">
                                    <h3 className="font-semibold mb-3">Đặc điểm khác</h3>
                                    <div className="grid grid-cols-2 gap-3 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4 text-gray-500" />
                                            <span>Tầng: 8/15</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Home className="h-4 w-4 text-gray-500" />
                                            <span>Nội thất: Đầy đủ</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-gray-500" />
                                            <span>Pháp lý: {listing.legalStatus}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <span>Bàn giao: Ngay</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Description */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Mô tả</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 leading-relaxed">
                                    Căn hộ NOXH 2 phòng ngủ tại dự án Kim Oanh Green Park, vị trí đắc địa tại Quận 9. Căn hộ đầy đủ nội thất, sổ hồng chính chủ, sẵn sàng bàn giao ngay. View đẹp,
                                    thoáng mát, an ninh 24/7. Gần trường học, bệnh viện, siêu thị tiện lợi.
                                    <br />
                                    <br />
                                    Tiện ích nội khu: Hồ bơi, phòng gym, khu vui chơi trẻ em, siêu thị mini, bãi đỗ xe rộng rãi. Giao thông thuận lợi, dễ dàng di chuyển đến trung tâm thành phố.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Transaction History */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Lịch sử giao dịch
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-shrink-0 w-32 text-sm text-gray-600">01/2020</div>
                                        <div className="flex-1">
                                            <p className="font-semibold">Mua từ chủ đầu tư</p>
                                            <p className="text-sm text-gray-600">Giá gốc: {(listing.originalPrice! / 1000000000).toFixed(2)} tỷ VNĐ</p>
                                        </div>
                                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-shrink-0 w-32 text-sm text-gray-600">Hiện tại</div>
                                        <div className="flex-1">
                                            <p className="font-semibold">Đang rao bán</p>
                                            <p className="text-sm text-blue-600">Giá bán: {(listing.price / 1000000000).toFixed(2)} tỷ VNĐ</p>
                                            <p className="text-sm text-green-600">Lời: +{((listing.price - listing.originalPrice!) / 1000000).toFixed(0)} triệu VNĐ</p>
                                        </div>
                                        <AlertCircle className="h-5 w-5 text-orange-600" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Related Listings */}
                        {relatedListings && relatedListings.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Căn hộ tương tự</CardTitle>
                                    <CardDescription>Các căn hộ khác trong cùng phân khúc giá</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {relatedListings.map((item: any) => (
                                            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                                                <div className="relative h-32 bg-gray-200">
                                                    <img src={item.images?.[0] || images[0]} alt={item.title} className="w-full h-full object-cover" />
                                                </div>
                                                <CardContent className="p-3">
                                                    <h4 className="font-semibold text-sm line-clamp-1 mb-1">{item.title}</h4>
                                                    <p className="text-lg font-bold text-blue-600">{(item.price / 1000000000).toFixed(2)} tỷ</p>
                                                    <Link href={`/buyer/secondary-market/${item.id}`}>
                                                        <Button size="sm" variant="outline" className="w-full mt-2">
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            Xem
                                                        </Button>
                                                    </Link>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Action Card */}
                        {isBuyer && (
                            <Card className="sticky top-6">
                                <CardHeader>
                                    <CardTitle>Liên hệ và đặt cọc</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button className="w-full" size="lg" onClick={() => setShowContactModal(true)}>
                                        <Phone className="h-5 w-5 mr-2" />
                                        Liên hệ người bán
                                    </Button>
                                    <Button variant="outline" className="w-full" size="lg" onClick={() => setShowDepositModal(true)}>
                                        <DollarSign className="h-5 w-5 mr-2" />
                                        Đặt cọc ngay
                                    </Button>
                                    <Button variant="outline" className="w-full" onClick={handleWishlistToggle}>
                                        <Heart className={`h-5 w-5 mr-2 ${isInWishlist(params.id) ? "fill-red-500 text-red-500" : ""}`} />
                                        {isInWishlist(params.id) ? "Đã lưu" : "Lưu tin"}
                                    </Button>
                                    <Button variant="outline" className="w-full" onClick={() => setShowContactModal(true)}>
                                        <MessageCircle className="h-5 w-5 mr-2" />
                                        Liên hệ người bán
                                    </Button>
                                </CardContent>
                            </Card>
                        )}

                        {/* Seller Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Thông tin người bán
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <User className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">Nguyễn Văn A</p>
                                        <div className="flex items-center gap-1 text-sm text-green-600">
                                            <CheckCircle2 className="h-4 w-4" />
                                            <span>Đã xác thực</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span>4.8/5 (12 đánh giá)</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <FileText className="h-4 w-4" />
                                        <span>5 tin đăng</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Clock className="h-4 w-4" />
                                        <span>Tham gia 2 năm</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Legal Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5" />
                                    Pháp lý
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Sổ hồng đầy đủ</p>
                                        <p className="text-sm text-gray-600">Chính chủ, không tranh chấp</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Đủ điều kiện chuyển nhượng</p>
                                        <p className="text-sm text-gray-600">Đã đủ thời gian sở hữu</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-medium">Hỗ trợ vay ngân hàng</p>
                                        <p className="text-sm text-gray-600">Lên đến 70%</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            {/* Deposit Modal */}
            <Dialog open={showDepositModal} onOpenChange={setShowDepositModal}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Xác nhận đặt cọc</DialogTitle>
                        <DialogDescription>Chi tiết thanh toán cho căn hộ {listing.title}</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Giá căn hộ:</span>
                                <span className="font-semibold">{(listing.price / 1000000000).toFixed(2)} tỷ VNĐ</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tiền đặt cọc (5%):</span>
                                <span className="font-semibold">{(depositAmount / 1000000).toFixed(1)} triệu VNĐ</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Phí dịch vụ (2%):</span>
                                <span className="font-semibold">{(serviceFee / 1000000).toFixed(1)} triệu VNĐ</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t">
                                <span className="font-bold">Tổng thanh toán:</span>
                                <span className="text-xl font-bold text-blue-600">{(totalDeposit / 1000000).toFixed(1)} triệu VNĐ</span>
                            </div>
                        </div>

                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-700">
                                <strong>Lưu ý:</strong> Sau khi đặt cọc, bạn có 7 ngày để hoàn tất thủ tục. Tiền cọc sẽ được trừ vào tổng giá trị khi ký hợp đồng chính thức.
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDepositModal(false)}>
                            Hủy
                        </Button>
                        <Button
                            onClick={() => {
                                setShowDepositModal(false);
                                alert("Chức năng đặt cọc đang được phát triển!");
                            }}
                        >
                            <DollarSign className="h-4 w-4 mr-2" />
                            Xác nhận đặt cọc
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Contact Modal - Enhanced */}
            <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Liên hệ người bán</DialogTitle>
                        <DialogDescription>Gửi tin nhắn để được tư vấn chi tiết về căn hộ</DialogDescription>
                    </DialogHeader>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            toast.success("Đã gửi tin nhắn! Người bán sẽ liên hệ lại với bạn sớm.");
                            setShowContactModal(false);
                            setContactForm({ name: "", phone: "", email: "", message: "" });
                        }}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="contact-name">Họ tên *</Label>
                            <Input id="contact-name" value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} placeholder="Nguyễn Văn A" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact-phone">Số điện thoại *</Label>
                            <Input
                                id="contact-phone"
                                type="tel"
                                value={contactForm.phone}
                                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                                placeholder="0901234567"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact-email">Email</Label>
                            <Input
                                id="contact-email"
                                type="email"
                                value={contactForm.email}
                                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                placeholder="example@email.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact-message">Tin nhắn</Label>
                            <Textarea
                                id="contact-message"
                                value={contactForm.message}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContactForm({ ...contactForm, message: e.target.value })}
                                placeholder="Tôi quan tâm đến căn hộ này. Vui lòng liên hệ lại với tôi."
                                rows={4}
                            />
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="flex items-start gap-2 text-sm">
                                <Phone className="h-4 w-4 text-blue-600 mt-0.5" />
                                <div>
                                    <p className="font-medium text-blue-900">Hoặc gọi trực tiếp</p>
                                    <p className="text-blue-700">0901 234 567</p>
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setShowContactModal(false)}>
                                Hủy
                            </Button>
                            <Button type="submit">
                                <MessageCircle className="h-4 w-4 mr-2" />
                                Gửi tin nhắn
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Share Modal */}
            <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Chia sẻ căn hộ</DialogTitle>
                        <DialogDescription>Chia sẻ thông tin căn hộ này với bạn bè</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <Input value={`${window.location.origin}/buyer/secondary-market/${params.id}`} readOnly className="flex-1" />
                            <Button
                                size="sm"
                                variant={copied ? "default" : "outline"}
                                onClick={() => {
                                    navigator.clipboard.writeText(`${window.location.origin}/buyer/secondary-market/${params.id}`);
                                    setCopied(true);
                                    toast.success("Đã sao chép link!");
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                            >
                                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <Button
                                variant="outline"
                                className="flex-col h-auto py-3"
                                onClick={() => {
                                    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
                                    window.open(url, "_blank", "width=600,height=400");
                                }}
                            >
                                <Facebook className="h-6 w-6 mb-1 text-blue-600" />
                                <span className="text-xs">Facebook</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-col h-auto py-3"
                                onClick={() => {
                                    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(listing.title)}`;
                                    window.open(url, "_blank", "width=600,height=400");
                                }}
                            >
                                <Twitter className="h-6 w-6 mb-1 text-sky-500" />
                                <span className="text-xs">Twitter</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-col h-auto py-3"
                                onClick={() => {
                                    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
                                    window.open(url, "_blank", "width=600,height=400");
                                }}
                            >
                                <Linkedin className="h-6 w-6 mb-1 text-blue-700" />
                                <span className="text-xs">LinkedIn</span>
                            </Button>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button onClick={() => setShowShareModal(false)}>Đóng</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Virtual Tour Modal */}
            <Dialog open={showVirtualTourModal} onOpenChange={setShowVirtualTourModal}>
                <DialogContent className="sm:max-w-4xl h-[600px]">
                    <DialogHeader>
                        <DialogTitle>Tour 3D - {listing.title}</DialogTitle>
                        <DialogDescription>Khám phá căn hộ với công nghệ 360°</DialogDescription>
                    </DialogHeader>

                    <div className="flex-1 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center space-y-3">
                            <Video className="h-16 w-16 text-gray-400 mx-auto" />
                            <div>
                                <p className="font-medium text-gray-700">Tour 3D đang được cập nhật</p>
                                <p className="text-sm text-gray-500">Vui lòng liên hệ người bán để xem căn hộ trực tiếp</p>
                            </div>
                            <Button onClick={() => setShowContactModal(true)}>
                                <Phone className="h-4 w-4 mr-2" />
                                Liên hệ xem nhà
                            </Button>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowVirtualTourModal(false)}>
                            Đóng
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Image Lightbox */}
            <ImageLightbox images={images} initialIndex={lightboxIndex} isOpen={showLightbox} onClose={() => setShowLightbox(false)} />
        </div>
    );
}
