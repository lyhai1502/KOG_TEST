"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle2, Clock, AlertCircle, Home, Plus, Eye } from "lucide-react";
import Link from "next/link";
import { mockGetApplications } from "@/lib/mock-data";
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

    const { data: applications } = useQuery({
        queryKey: ["buyer-applications", user?.id],
        queryFn: async () => {
            return mockGetApplications({ userId: user?.id });
        },
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />

            <main className="max-w-7xl mx-auto p-6 space-y-6">
                {/* Welcome Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Xin chào, {user?.name}!</h1>
                        <p className="text-gray-600 mt-1">Theo dõi hồ sơ đăng ký mua NOXH của bạn</p>
                    </div>

                    <Link href="/buyer/application/new">
                        <Button size="lg">
                            <Plus className="h-5 w-5 mr-2" />
                            Nộp hồ sơ mới
                        </Button>
                    </Link>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Tổng hồ sơ</CardDescription>
                            <CardTitle className="text-4xl">{applications?.total || 0}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-gray-600">
                                <FileText className="h-4 w-4 mr-1" />
                                <span>Đã nộp</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Đang xử lý</CardDescription>
                            <CardTitle className="text-4xl">{applications?.data.filter((a) => ["SUBMITTED", "UNDER_REVIEW"].includes(a.status)).length || 0}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-yellow-600">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>Chờ duyệt</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Đạt yêu cầu</CardDescription>
                            <CardTitle className="text-4xl">{applications?.data.filter((a) => ["QUALIFIED", "WON"].includes(a.status)).length || 0}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-green-600">
                                <CheckCircle2 className="h-4 w-4 mr-1" />
                                <span>Hợp lệ</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Cần bổ sung</CardDescription>
                            <CardTitle className="text-4xl">{applications?.data.filter((a) => a.status === "NEED_SUPPLEMENT").length || 0}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-orange-600">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                <span>Cần xử lý</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Marketplace Quick Access */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Home className="h-5 w-5 text-purple-600" />
                                Sàn Giao Dịch Thứ Cấp
                            </CardTitle>
                            <CardDescription>Khám phá các căn hộ NOXH đang giao dịch</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 mb-4">Tìm kiếm và mua căn hộ NOXH từ các chủ sở hữu hiện tại với giá cả minh bạch và pháp lý đầy đủ.</p>
                            <Link href="/buyer/marketplace">
                                <Button variant="outline" className="w-full">
                                    Khám phá ngay
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-r from-rose-50 to-red-50 border-rose-200">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-rose-600" />
                                Danh Sách Yêu Thích
                            </CardTitle>
                            <CardDescription>Các căn hộ bạn đã lưu</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600 mb-4">Quản lý danh sách các căn hộ bạn quan tâm và so sánh để đưa ra quyết định tốt nhất.</p>
                            <Link href="/buyer/wishlist">
                                <Button variant="outline" className="w-full">
                                    Xem danh sách
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Guide Section */}
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Home className="h-5 w-5 text-blue-600" />
                            Hướng dẫn đăng ký mua NOXH
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                                <div>
                                    <p className="font-medium">Chuẩn bị hồ sơ</p>
                                    <p className="text-sm text-gray-600">CMND/CCCD, Giấy chứng nhận thu nhập, Giấy tờ nhà ở (nếu có)</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                                <div>
                                    <p className="font-medium">Nộp hồ sơ trực tuyến</p>
                                    <p className="text-sm text-gray-600">Điền thông tin và tải lên giấy tờ cần thiết</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                                <div>
                                    <p className="font-medium">Chờ xét duyệt</p>
                                    <p className="text-sm text-gray-600">Hệ thống tự động kiểm tra và chấm điểm hồ sơ (2-5 ngày làm việc)</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
                                <div>
                                    <p className="font-medium">Nhận kết quả</p>
                                    <p className="text-sm text-gray-600">Nếu đạt yêu cầu, bạn sẽ được tham gia bốc thăm (nếu số hồ sơ vượt số căn)</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Applications List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Hồ sơ của tôi</CardTitle>
                        <CardDescription>{applications?.total || 0} hồ sơ đăng ký</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {applications && applications.data.length > 0 ? (
                            <div className="space-y-4">
                                {applications.data.map((app: Application) => {
                                    const StatusIcon = statusConfig[app.status].icon;
                                    return (
                                        <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="bg-blue-100 p-3 rounded-lg">
                                                    <Home className="h-6 w-6 text-blue-600" />
                                                </div>

                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <h3 className="font-semibold text-lg">Hồ sơ #{app.id}</h3>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusConfig[app.status].color}`}>
                                                            <StatusIcon className="h-3 w-3" />
                                                            {statusConfig[app.status].label}
                                                        </span>
                                                    </div>

                                                    <div className="text-sm text-gray-600 space-y-1">
                                                        <p>
                                                            <strong>Dự án:</strong> {app.projectId === "1" ? "Kim Oanh Green Park" : app.projectId === "2" ? "Kim Oanh Riverside" : "Kim Oanh Luxury"}
                                                        </p>
                                                        <p>
                                                            <strong>Ngày nộp:</strong> {new Date(app.createdAt).toLocaleDateString("vi-VN")}
                                                        </p>
                                                        {app.reviewNotes && (
                                                            <p className="text-orange-600">
                                                                <strong>Ghi chú:</strong> {app.reviewNotes}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <Link href={`/buyer/application/${app.id}`}>
                                                <Button variant="outline" size="sm">
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    Xem chi tiết
                                                </Button>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có hồ sơ nào</h3>
                                <p className="text-gray-600 mb-4">Bắt đầu bằng cách nộp hồ sơ đăng ký mua NOXH</p>
                                <Link href="/buyer/application/new">
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
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
