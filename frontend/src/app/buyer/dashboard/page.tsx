"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    FileText,
    CheckCircle2,
    Clock,
    AlertCircle,
    Home,
    Plus,
    Eye,
    Building2,
    Store,
    Heart,
    History,
    TrendingUp,
    MapPin,
    Search,
    ArrowRight,
    Star,
    Users,
    Award,
    Shield,
    Sparkles,
} from "lucide-react";
import Link from "next/link";
import { mockGetApplications, MOCK_PROJECTS, MOCK_LISTINGS } from "@/lib/mock-data";
import { Application } from "@/types";

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    DRAFT: { label: "Đang soạn thảo", color: "bg-gray-100 text-gray-800", icon: FileText },
    SUBMITTED: { label: "Đã nộp", color: "bg-blue-100 text-blue-800", icon: CheckCircle2 },
    UNDER_REVIEW: { label: "Đang xem xét", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    NEED_SUPPLEMENT: { label: "Cần bổ sung", color: "bg-orange-100 text-orange-800", icon: AlertCircle },
    QUALIFIED: { label: "Đạt yêu cầu", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
    LOTTERY_PENDING: { label: "Chờ bốc thăm", color: "bg-purple-100 text-purple-800", icon: Clock },
    WON: { label: "Trúng", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
    NOT_WON: { label: "Không trúng", color: "bg-gray-100 text-gray-800", icon: AlertCircle },
    REJECTED: { label: "Bị từ chối", color: "bg-red-100 text-red-800", icon: AlertCircle },
};

export default function BuyerDashboardPage() {
    const { user } = useAuthStore();
    const [searchQuery, setSearchQuery] = useState("");

    const { data: applications } = useQuery({
        queryKey: ["buyer-applications", user?.id],
        queryFn: async () => {
            return mockGetApplications({ userId: user?.id });
        },
    });

    const featuredProjects = MOCK_PROJECTS.slice(0, 3);
    const hotListings = MOCK_LISTINGS.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0)).slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white p-8 md:p-12">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full -ml-36 -mb-36"></div>

                    <div className="relative z-10 max-w-3xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="h-6 w-6 text-yellow-300" />
                            <span className="text-yellow-300 font-semibold">Chào mừng trở lại!</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Xin chào, {user?.name}! 👋</h1>
                        <p className="text-xl text-blue-100 mb-8">Khám phá cơ hội sở hữu nhà ở xã hội với mức giá ưu đãi từ Kim Oanh Group</p>

                        {/* Quick Search */}
                        <div className="bg-white rounded-lg p-2 flex items-center gap-2 max-w-2xl">
                            <Search className="h-5 w-5 text-gray-400 ml-2" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm dự án, căn hộ..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 px-2 py-2 text-gray-900 outline-none"
                            />
                            <Button className="bg-blue-600 hover:bg-blue-700">Tìm kiếm</Button>
                        </div>
                    </div>
                </div>

                {/* Quick Access Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link href="/buyer/primary-market">
                        <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-500 cursor-pointer group">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-500 transition-colors">
                                        <Building2 className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Thị trường Sơ cấp</h3>
                                <p className="text-sm text-gray-600">Dự án mới từ chủ đầu tư</p>
                                <p className="text-2xl font-bold text-blue-600 mt-3">{MOCK_PROJECTS.length}</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/buyer/secondary-market">
                        <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-orange-500 cursor-pointer group">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-orange-100 rounded-lg group-hover:bg-orange-500 transition-colors">
                                        <Store className="h-7 w-7 text-orange-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Thị trường Thứ cấp</h3>
                                <p className="text-sm text-gray-600">Căn hộ chuyển nhượng</p>
                                <p className="text-2xl font-bold text-orange-600 mt-3">{MOCK_LISTINGS.length}</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/buyer/wishlist">
                        <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-pink-500 cursor-pointer group">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-pink-100 rounded-lg group-hover:bg-pink-500 transition-colors">
                                        <Heart className="h-7 w-7 text-pink-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-pink-600 transition-colors" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Yêu thích</h3>
                                <p className="text-sm text-gray-600">Danh sách quan tâm</p>
                                <p className="text-2xl font-bold text-pink-600 mt-3">0</p>
                            </CardContent>
                        </Card>
                    </Link>

                    <Link href="/buyer/transactions">
                        <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-green-500 cursor-pointer group">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-500 transition-colors">
                                        <History className="h-7 w-7 text-green-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">Giao dịch</h3>
                                <p className="text-sm text-gray-600">Lịch sử đặt cọc</p>
                                <p className="text-2xl font-bold text-green-600 mt-3">0</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Featured Projects */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                                Dự án nổi bật
                            </h2>
                            <p className="text-gray-600 mt-1">Các dự án đang mở bán từ Kim Oanh Group</p>
                        </div>
                        <Link href="/buyer/primary-market">
                            <Button variant="outline">
                                Xem tất cả
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {featuredProjects.map((project) => (
                            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                                <div className="relative h-48 bg-gradient-to-r from-blue-400 to-blue-600">
                                    <img src={project.images[0]} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600 flex items-center gap-1">
                                        <TrendingUp className="h-4 w-4" />
                                        Đang mở bán
                                    </div>
                                </div>
                                <CardContent className="p-5">
                                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{project.name}</h3>
                                    <div className="flex items-center text-gray-600 text-sm mb-3">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        <span>
                                            {project.district}, {project.city}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="text-xs text-gray-500">Giá từ</p>
                                            <p className="text-lg font-bold text-blue-600">{(project.priceRange.min / 1000000000).toFixed(1)} tỷ</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500">Còn trống</p>
                                            <p className="text-lg font-bold text-green-600">{project.availableUnits} căn</p>
                                        </div>
                                    </div>
                                    <Link href={`/buyer/primary-market/projects/${project.id}`}>
                                        <Button className="w-full" variant="outline">
                                            Xem chi tiết
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Hot Listings in Secondary Market */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <TrendingUp className="h-6 w-6 text-orange-500" />
                                Căn hộ hot - Thị trường thứ cấp
                            </h2>
                            <p className="text-gray-600 mt-1">Nhiều người quan tâm nhất tuần này</p>
                        </div>
                        <Link href="/buyer/secondary-market">
                            <Button variant="outline">
                                Xem tất cả
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {hotListings.map((listing) => (
                            <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                                <div className="relative h-48">
                                    <img
                                        src={listing.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"}
                                        alt={listing.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                                        <Eye className="h-4 w-4" />
                                        {listing.viewCount}
                                    </div>
                                </div>
                                <CardContent className="p-5">
                                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{listing.title}</h3>
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <p className="text-2xl font-bold text-orange-600">{(listing.price / 1000000000).toFixed(2)} tỷ</p>
                                            {listing.originalPrice && <p className="text-sm text-gray-500 line-through">{(listing.originalPrice / 1000000000).toFixed(2)} tỷ</p>}
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-600">{listing.legalStatus}</p>
                                        </div>
                                    </div>
                                    <Link href={`/buyer/secondary-market/${listing.id}`}>
                                        <Button className="w-full" variant="outline">
                                            Xem ngay
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Application Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="border-l-4 border-l-blue-500 bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <FileText className="h-8 w-8 text-blue-600" />
                                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">Tổng</span>
                            </div>
                            <p className="text-4xl font-bold text-gray-900 mb-1">{applications?.total || 0}</p>
                            <p className="text-sm text-gray-600">Hồ sơ đã nộp</p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-yellow-500 bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <Clock className="h-8 w-8 text-yellow-600" />
                                <span className="text-sm font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Chờ</span>
                            </div>
                            <p className="text-4xl font-bold text-gray-900 mb-1">{applications?.data.filter((a) => ["SUBMITTED", "UNDER_REVIEW"].includes(a.status)).length || 0}</p>
                            <p className="text-sm text-gray-600">Đang xử lý</p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-500 bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">Đạt</span>
                            </div>
                            <p className="text-4xl font-bold text-gray-900 mb-1">{applications?.data.filter((a) => ["QUALIFIED", "WON"].includes(a.status)).length || 0}</p>
                            <p className="text-sm text-gray-600">Hợp lệ</p>
                        </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-orange-500 bg-white">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-2">
                                <AlertCircle className="h-8 w-8 text-orange-600" />
                                <span className="text-sm font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Chú ý</span>
                            </div>
                            <p className="text-4xl font-bold text-gray-900 mb-1">{applications?.data.filter((a) => a.status === "NEED_SUPPLEMENT").length || 0}</p>
                            <p className="text-sm text-gray-600">Cần bổ sung</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Why Choose Us */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Guide Section */}
                    <Card className="border-l-4 border-l-blue-500 bg-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Home className="h-6 w-6 text-blue-600" />
                                Quy trình đăng ký NOXH
                            </CardTitle>
                            <CardDescription>4 bước đơn giản để sở hữu nhà</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold shadow-lg">
                                        1
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Chuẩn bị hồ sơ</p>
                                        <p className="text-sm text-gray-600">CMND/CCCD, Giấy thu nhập, Sổ hộ khẩu</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold shadow-lg">
                                        2
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Nộp hồ sơ online</p>
                                        <p className="text-sm text-gray-600">Điền form và upload tài liệu</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold shadow-lg">
                                        3
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Chờ xét duyệt</p>
                                        <p className="text-sm text-gray-600">2-5 ngày làm việc</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 font-bold shadow-lg">
                                        4
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Tham gia bốc thăm</p>
                                        <p className="text-sm text-gray-600">Nếu đạt yêu cầu và đủ số lượng</p>
                                    </div>
                                </div>

                                <Link href="/buyer/application/new">
                                    <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 mt-4">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Nộp hồ sơ ngay
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Benefits */}
                    <Card className="border-l-4 border-l-green-500 bg-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Award className="h-6 w-6 text-green-600" />
                                Ưu điểm của Kim Oanh
                            </CardTitle>
                            <CardDescription>Tại sao nên chọn chúng tôi?</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Shield className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Pháp lý minh bạch</p>
                                        <p className="text-sm text-gray-600">100% dự án có giấy phép đầy đủ</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Users className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Hỗ trợ tận tâm</p>
                                        <p className="text-sm text-gray-600">Đội ngũ tư vấn 24/7</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <TrendingUp className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Giá tốt nhất</p>
                                        <p className="text-sm text-gray-600">Ưu đãi đặc biệt cho NOXH</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <Building2 className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Chất lượng đảm bảo</p>
                                        <p className="text-sm text-gray-600">Xây dựng theo tiêu chuẩn cao</p>
                                    </div>
                                </div>

                                <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded mt-4">
                                    <p className="text-sm text-green-800 font-medium">
                                        🎉 Đã có <strong>10,000+</strong> khách hàng tin tưởng!
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* My Applications */}
                <Card className="border-2">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-2xl flex items-center gap-2">
                                    <FileText className="h-6 w-6 text-blue-600" />
                                    Hồ sơ của tôi
                                </CardTitle>
                                <CardDescription className="text-base mt-1">{applications?.total || 0} hồ sơ đăng ký • Theo dõi tiến độ xử lý</CardDescription>
                            </div>
                            <Link href="/buyer/application/new">
                                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                                    <Plus className="h-5 w-5 mr-2" />
                                    Nộp hồ sơ mới
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        {applications && applications.data.length > 0 ? (
                            <div className="space-y-4">
                                {applications.data.map((app: Application) => {
                                    const StatusIcon = statusConfig[app.status].icon;
                                    return (
                                        <div
                                            key={app.id}
                                            className="flex items-center justify-between p-5 bg-gradient-to-r from-white to-gray-50 rounded-xl border-2 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                                        >
                                            <div className="flex items-center gap-5 flex-1">
                                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-xl shadow-lg">
                                                    <Home className="h-7 w-7 text-white" />
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="font-bold text-xl text-gray-900">Hồ sơ #{app.id}</h3>
                                                        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 ${statusConfig[app.status].color} shadow-sm`}>
                                                            <StatusIcon className="h-4 w-4" />
                                                            {statusConfig[app.status].label}
                                                        </span>
                                                    </div>

                                                    <div className="text-sm text-gray-600 space-y-1.5">
                                                        <p className="flex items-center gap-2">
                                                            <Building2 className="h-4 w-4 text-blue-500" />
                                                            <strong>Dự án:</strong> {app.projectId === "1" ? "Kim Oanh Green Park" : app.projectId === "2" ? "Kim Oanh Riverside" : "Kim Oanh Luxury"}
                                                        </p>
                                                        <p className="flex items-center gap-2">
                                                            <Clock className="h-4 w-4 text-gray-500" />
                                                            <strong>Ngày nộp:</strong> {new Date(app.createdAt).toLocaleDateString("vi-VN")}
                                                        </p>
                                                        {app.reviewNotes && (
                                                            <p className="text-orange-600 flex items-start gap-2 bg-orange-50 p-2 rounded mt-2">
                                                                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                                                <span>
                                                                    <strong>Ghi chú:</strong> {app.reviewNotes}
                                                                </span>
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <Link href={`/buyer/application/${app.id}`}>
                                                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    Xem chi tiết
                                                </Button>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-dashed border-gray-300">
                                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                    <FileText className="h-10 w-10 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Chưa có hồ sơ nào</h3>
                                <p className="text-gray-600 mb-6 max-w-md mx-auto">Bắt đầu hành trình sở hữu nhà ở xã hội bằng cách nộp hồ sơ đăng ký ngay hôm nay</p>
                                <Link href="/buyer/application/new">
                                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                                        <Plus className="h-5 w-5 mr-2" />
                                        Nộp hồ sơ ngay
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
