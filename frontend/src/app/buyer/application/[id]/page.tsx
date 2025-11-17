"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, FileText, CheckCircle2, Clock, AlertCircle, Download, Upload, User, DollarSign, Home, Award, Calendar } from "lucide-react";
import { MOCK_APPLICATIONS } from "@/lib/mock-data";
import { Application } from "@/types";

const statusConfig: Record<
    string,
    {
        label: string;
        color: string;
        icon: any;
        description: string;
    }
> = {
    DRAFT: {
        label: "Đang soạn thảo",
        color: "bg-gray-100 text-gray-800",
        icon: FileText,
        description: "Hồ sơ chưa được nộp",
    },
    SUBMITTED: {
        label: "Đã nộp",
        color: "bg-blue-100 text-blue-800",
        icon: CheckCircle2,
        description: "Hồ sơ đã được nộp và đang chờ xem xét",
    },
    UNDER_REVIEW: {
        label: "Đang xem xét",
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock,
        description: "Cán bộ đang kiểm tra và đánh giá hồ sơ của bạn",
    },
    NEED_SUPPLEMENT: {
        label: "Cần bổ sung",
        color: "bg-orange-100 text-orange-800",
        icon: AlertCircle,
        description: "Hồ sơ cần bổ sung thêm tài liệu hoặc thông tin",
    },
    QUALIFIED: {
        label: "Đạt yêu cầu",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle2,
        description: "Hồ sơ đạt yêu cầu và đủ điều kiện mua NOXH",
    },
    LOTTERY_PENDING: {
        label: "Chờ bốc thăm",
        color: "bg-purple-100 text-purple-800",
        icon: Clock,
        description: "Đang chờ đợi kết quả bốc thăm",
    },
    WON: {
        label: "Trúng",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle2,
        description: "Chúc mừng! Bạn đã trúng trong đợt bốc thăm",
    },
    NOT_WON: {
        label: "Không trúng",
        color: "bg-gray-100 text-gray-800",
        icon: AlertCircle,
        description: "Rất tiếc, bạn không trúng trong đợt này",
    },
    REJECTED: {
        label: "Bị từ chối",
        color: "bg-red-100 text-red-800",
        icon: AlertCircle,
        description: "Hồ sơ không đạt yêu cầu",
    },
};

const documentStatusConfig: Record<string, { label: string; color: string }> = {
    PENDING: { label: "Chờ xem xét", color: "bg-yellow-100 text-yellow-800" },
    APPROVED: { label: "Đã duyệt", color: "bg-green-100 text-green-800" },
    REJECTED: { label: "Từ chối", color: "bg-red-100 text-red-800" },
};

export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();

    const { data: application, isLoading } = useQuery({
        queryKey: ["application", params.id],
        queryFn: async () => {
            // Mock API call
            const app = MOCK_APPLICATIONS.find((a) => a.id === params.id);
            if (!app) throw new Error("Application not found");
            return app as Application;
        },
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
                    <p className="text-gray-600">Đang tải...</p>
                </div>
            </div>
        );
    }

    if (!application) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <p className="text-gray-600">Không tìm thấy hồ sơ</p>
                </div>
            </div>
        );
    }

    const StatusIcon = statusConfig[application.status].icon;

    // Timeline data
    const timelineSteps = [
        {
            status: "DRAFT",
            date: application.createdAt,
            completed: true,
            title: "Tạo hồ sơ",
            description: "Hồ sơ được khởi tạo",
        },
        {
            status: "SUBMITTED",
            date: application.submittedAt,
            completed: !!application.submittedAt,
            title: "Nộp hồ sơ",
            description: "Hồ sơ đã được nộp",
        },
        {
            status: "UNDER_REVIEW",
            date: application.reviewedAt,
            completed: !!application.reviewedAt,
            title: "Xem xét hồ sơ",
            description: "Cán bộ đang xem xét",
        },
        {
            status: "QUALIFIED",
            date: application.qualifiedAt,
            completed: !!application.qualifiedAt,
            title: "Đạt yêu cầu",
            description: `Điểm đánh giá: ${application.eligibilityScore}/100`,
        },
    ];

    if (application.lottery) {
        timelineSteps.push({
            status: "LOTTERY_PENDING",
            date: application.lottery.drawDate,
            completed: application.status === "WON" || application.status === "NOT_WON",
            title: "Bốc thăm",
            description: `Số thứ tự: ${application.lottery.lotteryNumber}`,
        });
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-8">
                    <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Quay lại
                    </Button>

                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">Hồ sơ #{application.id}</h1>
                            <p className="text-gray-600 mt-1">Nộp ngày {new Date(application.createdAt).toLocaleDateString("vi-VN")}</p>
                        </div>

                        <div className={`px-6 py-3 rounded-full flex items-center gap-2 ${statusConfig[application.status].color}`}>
                            <StatusIcon className="h-5 w-5" />
                            <span className="font-semibold">{statusConfig[application.status].label}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Status Timeline */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Tiến trình xử lý</CardTitle>
                                <CardDescription>{statusConfig[application.status].description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {timelineSteps.map((step, index) => {
                                        const StepIcon = statusConfig[step.status].icon;
                                        const isLast = index === timelineSteps.length - 1;

                                        return (
                                            <div key={step.status} className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div
                                                        className={`
                            w-10 h-10 rounded-full flex items-center justify-center
                            ${step.completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"}
                          `}
                                                    >
                                                        <StepIcon className="h-5 w-5" />
                                                    </div>
                                                    {!isLast && <div className={`w-0.5 h-12 mt-2 ${step.completed ? "bg-green-500" : "bg-gray-200"}`} />}
                                                </div>

                                                <div className="flex-1 pb-8">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h3 className={`font-semibold ${step.completed ? "text-gray-900" : "text-gray-400"}`}>{step.title}</h3>
                                                        {step.date && (
                                                            <span className="text-sm text-gray-500 flex items-center gap-1">
                                                                <Calendar className="h-3 w-3" />
                                                                {new Date(step.date).toLocaleDateString("vi-VN")}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className={`text-sm ${step.completed ? "text-gray-600" : "text-gray-400"}`}>{step.description}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                {application.status === "NEED_SUPPLEMENT" && application.reviewNotes && (
                                    <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="font-medium text-orange-900 mb-1">Yêu cầu bổ sung</p>
                                                <p className="text-sm text-orange-800">{application.reviewNotes}</p>
                                                <Button size="sm" className="mt-3">
                                                    <Upload className="h-4 w-4 mr-2" />
                                                    Bổ sung tài liệu
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {application.status === "QUALIFIED" && (
                                    <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <div className="flex-1">
                                                <p className="font-medium text-green-900 mb-2">Hồ sơ đạt yêu cầu</p>
                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-green-700">Điểm đánh giá</p>
                                                        <p className="text-2xl font-bold text-green-900">{application.eligibilityScore}/100</p>
                                                    </div>
                                                    {application.isPriorityGroup && (
                                                        <div>
                                                            <p className="text-green-700">Đối tượng ưu tiên</p>
                                                            <p className="font-semibold text-green-900 flex items-center gap-1">
                                                                <Award className="h-4 w-4" />
                                                                {application.priorityType}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Personal Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Thông tin cá nhân
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <dl className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <dt className="text-gray-600 mb-1">Họ và tên</dt>
                                        <dd className="font-medium">{application.fullName}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-600 mb-1">Ngày sinh</dt>
                                        <dd className="font-medium">{new Date(application.dateOfBirth).toLocaleDateString("vi-VN")}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-600 mb-1">CMND/CCCD</dt>
                                        <dd className="font-medium">{application.idNumber}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-600 mb-1">Điện thoại</dt>
                                        <dd className="font-medium">{application.phoneNumber}</dd>
                                    </div>
                                    <div className="col-span-2">
                                        <dt className="text-gray-600 mb-1">Email</dt>
                                        <dd className="font-medium">{application.email}</dd>
                                    </div>
                                    <div className="col-span-2">
                                        <dt className="text-gray-600 mb-1">Địa chỉ thường trú</dt>
                                        <dd className="font-medium">{application.permanentAddress}</dd>
                                    </div>
                                </dl>
                            </CardContent>
                        </Card>

                        {/* Income & Housing */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5" />
                                    Thu nhập & Nhà ở
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <dl className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <dt className="text-gray-600 mb-1">Thu nhập hàng tháng</dt>
                                        <dd className="font-medium">{application.monthlyIncome.toLocaleString("vi-VN")} VNĐ</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-600 mb-1">Tình trạng nhà ở</dt>
                                        <dd className="font-medium">{application.hasExistingHouse ? "Đã có nhà" : "Chưa có nhà"}</dd>
                                    </div>
                                    <div>
                                        <dt className="text-gray-600 mb-1">Số thành viên gia đình</dt>
                                        <dd className="font-medium">{application.familyMembers} người</dd>
                                    </div>
                                </dl>
                            </CardContent>
                        </Card>

                        {/* Documents */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5" />
                                    Tài liệu đã nộp
                                </CardTitle>
                                <CardDescription>{application.documents.length} tài liệu</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {application.documents.map((doc) => (
                                        <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <FileText className="h-5 w-5 text-gray-400" />
                                                <div>
                                                    <p className="font-medium text-sm">{doc.fileName}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${documentStatusConfig[doc.status].color}`}>{documentStatusConfig[doc.status].label}</span>
                                                        <span className="text-xs text-gray-500">{new Date(doc.uploadedAt).toLocaleDateString("vi-VN")}</span>
                                                    </div>
                                                    {doc.rejectReason && <p className="text-xs text-red-600 mt-1">{doc.rejectReason}</p>}
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Thông tin dự án</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 text-sm">
                                    <div>
                                        <p className="text-gray-600 mb-1">Dự án</p>
                                        <p className="font-semibold">
                                            {application.projectId === "1" ? "Kim Oanh Green Park" : application.projectId === "2" ? "Kim Oanh Riverside" : "Kim Oanh Luxury"}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1">Loại căn hộ</p>
                                        <p className="font-semibold">{application.preferredUnitType}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 mb-1">Mã hồ sơ</p>
                                        <p className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{application.id}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Hành động</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Button className="w-full" variant="outline">
                                    <Download className="h-4 w-4 mr-2" />
                                    Tải xuống hồ sơ
                                </Button>
                                {application.status === "NEED_SUPPLEMENT" && (
                                    <Button className="w-full">
                                        <Upload className="h-4 w-4 mr-2" />
                                        Bổ sung tài liệu
                                    </Button>
                                )}
                                <Button className="w-full" variant="outline">
                                    <FileText className="h-4 w-4 mr-2" />
                                    In hồ sơ
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Help */}
                        <Card className="bg-blue-50 border-blue-200">
                            <CardHeader>
                                <CardTitle className="text-blue-900">Cần hỗ trợ?</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-blue-800 space-y-2">
                                <p>Hotline: 1900-xxxx</p>
                                <p>Email: support@kimoanhgroup.com</p>
                                <p className="text-xs">Giờ làm việc: 8:00 - 17:00 (T2-T6)</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
