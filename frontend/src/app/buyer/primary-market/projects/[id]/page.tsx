"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Calendar, TrendingUp, CheckCircle, AlertCircle, ArrowLeft, Bed, Bath, Square, Eye, Plus } from "lucide-react";
import Link from "next/link";
import { MOCK_PROJECTS, MOCK_UNITS } from "@/lib/mock-data";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { user } = useAuthStore();
    const isBuyer = user?.role === "BUYER";

    const { data: project, isLoading } = useQuery({
        queryKey: ["project", params.id],
        queryFn: async () => {
            const found = MOCK_PROJECTS.find((p) => p.id === params.id);
            if (!found) throw new Error("Project not found");
            return found;
        },
    });

    const { data: units } = useQuery({
        queryKey: ["project-units", params.id],
        queryFn: async () => {
            return MOCK_UNITS.filter((u) => u.projectId === params.id);
        },
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

    if (!project) {
        return (
            <div className="min-h-screen bg-gray-50">
                <DashboardHeader />
                <div className="max-w-7xl mx-auto p-6">
                    <Card className="p-12">
                        <div className="text-center">
                            <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy dự án</h3>
                            <Link href="/buyer/primary-market">
                                <Button>Quay lại danh sách</Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    const availableUnits = units?.filter((u) => u.status === "AVAILABLE") || [];
    const reservedUnits = units?.filter((u) => u.status === "RESERVED") || [];
    const soldUnits = units?.filter((u) => u.status === "SOLD") || [];

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
                {/* Breadcrumb Navigation */}
                <div className="flex items-center justify-between">
                    <Breadcrumb items={[{ label: "Thị trường sơ cấp", href: "/buyer/primary-market" }, { label: project.name }]} />
                    <Button variant="ghost" size="sm" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Quay lại
                    </Button>
                </div>

                {
                    /* Project Header */
                    <Card>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Image Gallery */}
                                <div className="space-y-4">
                                    <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                                        <img
                                            src={project.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&auto=format"}
                                            alt={project.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Dự án mới từ CĐT</span>
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">Đang mở bán</span>
                                        </div>
                                    </div>

                                    {project.images && project.images.length > 1 && (
                                        <div className="grid grid-cols-4 gap-2">
                                            {project.images.slice(1, 5).map((img, idx) => (
                                                <div key={idx} className="relative h-24 bg-gray-200 rounded overflow-hidden cursor-pointer hover:opacity-80">
                                                    <img src={img} alt={`${project.name} ${idx + 2}`} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Project Info */}
                                <div className="space-y-6">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.name}</h1>
                                        <p className="text-gray-600">{project.description}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                                            <div>
                                                <p className="font-medium">{project.address}</p>
                                                <p className="text-sm text-gray-600">
                                                    {project.district}, {project.city}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Building2 className="h-5 w-5 text-gray-500" />
                                            <div>
                                                <p className="font-medium">Chủ đầu tư</p>
                                                <p className="text-sm text-gray-600">{project.developer}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <Calendar className="h-5 w-5 text-gray-500" />
                                            <div>
                                                <p className="font-medium">Hoàn thành dự kiến</p>
                                                <p className="text-sm text-gray-600">{new Date(project.completionDate).toLocaleDateString("vi-VN")}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <CheckCircle className="h-5 w-5 text-gray-500" />
                                            <div>
                                                <p className="font-medium">Tình trạng pháp lý</p>
                                                <p className="text-sm text-gray-600">{project.legalStatus}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Giá từ</p>
                                                <p className="text-2xl font-bold text-blue-600">{(project.priceRange.min / 1000000).toFixed(0)} triệu</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Giá đến</p>
                                                <p className="text-2xl font-bold text-blue-600">{(project.priceRange.max / 1000000).toFixed(0)} triệu</p>
                                            </div>
                                        </div>
                                    </div>

                                    {isBuyer && (
                                        <div className="space-y-2">
                                            <Link href="/buyer/application/new">
                                                <Button className="w-full" size="lg">
                                                    <Plus className="h-5 w-5 mr-2" />
                                                    Đăng ký mua căn hộ
                                                </Button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                }
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Tổng số căn</CardDescription>
                            <CardTitle className="text-4xl">{project.totalUnits}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">Căn hộ</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Còn trống</CardDescription>
                            <CardTitle className="text-4xl text-green-600">{availableUnits.length}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-green-600">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                <span>Sẵn sàng</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Đang đặt cọc</CardDescription>
                            <CardTitle className="text-4xl text-orange-600">{reservedUnits.length}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">Chờ xác nhận</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Đã bán</CardDescription>
                            <CardTitle className="text-4xl text-gray-600">{soldUnits.length}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">Hoàn thành</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Amenities */}
                <Card>
                    <CardHeader>
                        <CardTitle>Tiện ích dự án</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {project.amenities?.map((amenity, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <span className="text-sm">{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Available Units */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Căn hộ có sẵn ({availableUnits.length})</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <TrendingUp className="h-4 w-4" />
                                <span>{availableUnits.length} căn đang mở bán</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {availableUnits.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {availableUnits.map((unit: any) => (
                                    <Card key={unit.id} className="border-2 hover:shadow-lg transition-shadow">
                                        <CardContent className="p-4">
                                            <div className="relative h-40 bg-gray-200 rounded mb-3 overflow-hidden">
                                                <img
                                                    src={unit.images?.[0] || "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop&auto=format"}
                                                    alt={unit.code}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute top-2 left-2">
                                                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">Còn trống</span>
                                                </div>
                                            </div>

                                            <div className="space-y-3">
                                                <div>
                                                    <h3 className="font-bold text-lg">Căn {unit.code}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        Tầng {unit.floor} • Block {unit.block}
                                                    </p>
                                                </div>

                                                <div className="grid grid-cols-3 gap-2 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Bed className="h-4 w-4 text-gray-500" />
                                                        <span>{unit.bedrooms} PN</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Bath className="h-4 w-4 text-gray-500" />
                                                        <span>{unit.bathrooms} WC</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Square className="h-4 w-4 text-gray-500" />
                                                        <span>{unit.area}m²</span>
                                                    </div>
                                                </div>

                                                <div className="border-t pt-3">
                                                    <div className="flex items-baseline justify-between mb-1">
                                                        <span className="text-xl font-bold text-blue-600">{(unit.price / 1000000).toFixed(0)}</span>
                                                        <span className="text-gray-600 text-sm">triệu VNĐ</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500">~{(unit.price / unit.area).toLocaleString("vi-VN")} VNĐ/m²</p>
                                                </div>

                                                <div className="flex gap-2">
                                                    <Link href={`/buyer/primary-market/units/${unit.id}`} className="flex-1">
                                                        <Button size="sm" className="w-full">
                                                            <Eye className="h-4 w-4 mr-1" />
                                                            Chi tiết
                                                        </Button>
                                                    </Link>
                                                    {isBuyer && (
                                                        <Link href="/buyer/application/new">
                                                            <Button size="sm" variant="outline">
                                                                <Plus className="h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-600">Hiện tại không có căn hộ nào còn trống</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
