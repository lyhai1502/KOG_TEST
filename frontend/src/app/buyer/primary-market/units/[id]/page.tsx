"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Building2, MapPin, Bed, Bath, Square, Compass, CheckCircle, AlertCircle, ArrowLeft, Plus, DollarSign, FileText, Calendar } from "lucide-react";
import Link from "next/link";
import { MOCK_PROJECTS, MOCK_UNITS } from "@/lib/mock-data";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function UnitDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { user } = useAuthStore();
    const isBuyer = user?.role === "BUYER";
    const [showReservationModal, setShowReservationModal] = useState(false);

    const { data: unit, isLoading } = useQuery({
        queryKey: ["unit", params.id],
        queryFn: async () => {
            const found = MOCK_UNITS.find((u) => u.id === params.id);
            if (!found) throw new Error("Unit not found");
            return found;
        },
    });

    const { data: project } = useQuery({
        queryKey: ["project", unit?.projectId],
        queryFn: async () => {
            if (!unit?.projectId) return null;
            return MOCK_PROJECTS.find((p) => p.id === unit.projectId) || null;
        },
        enabled: !!unit?.projectId,
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

    if (!unit) {
        return (
            <div className="min-h-screen bg-gray-50">
                <DashboardHeader />
                <div className="max-w-7xl mx-auto p-6">
                    <Card className="p-12">
                        <div className="text-center">
                            <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy căn hộ</h3>
                            <Link href="/buyer/primary-market">
                                <Button>Quay lại danh sách</Button>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    const depositAmount = unit.price * 0.05; // 5% deposit
    const serviceFee = unit.price * 0.02; // 2% service fee
    const totalReservation = depositAmount + serviceFee;

    const getDirectionLabel = (direction: string) => {
        const directions: any = {
            EAST: "Đông",
            WEST: "Tây",
            SOUTH: "Nam",
            NORTH: "Bắc",
            NORTHEAST: "Đông Bắc",
            NORTHWEST: "Tây Bắc",
            SOUTHEAST: "Đông Nam",
            SOUTHWEST: "Tây Nam",
        };
        return directions[direction] || direction;
    };

    const getStatusBadge = (status: string) => {
        const badges: any = {
            AVAILABLE: { label: "Còn trống", color: "bg-green-500" },
            RESERVED: { label: "Đang đặt cọc", color: "bg-orange-500" },
            SOLD: { label: "Đã bán", color: "bg-gray-500" },
        };
        const badge = badges[status] || badges.AVAILABLE;
        return <span className={`${badge.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}>{badge.label}</span>;
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
                {/* Breadcrumb Navigation */}
                <div className="flex items-center justify-between">
                    <Breadcrumb
                        items={[
                            { label: "Thị trường sơ cấp", href: "/buyer/primary-market" },
                            ...(project ? [{ label: project.name, href: `/buyer/primary-market/projects/${project.id}` }] : []),
                            { label: unit.code },
                        ]}
                    />
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => router.back()}>
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Quay lại
                        </Button>
                        {project && (
                            <Link href={`/buyer/primary-market/projects/${project.id}`}>
                                <Button variant="ghost" size="sm">
                                    <Building2 className="h-4 w-4 mr-2" />
                                    Xem toàn bộ dự án {project.name}
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Unit Header */}
                <Card>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Image Gallery */}
                            <div className="space-y-4">
                                <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
                                    <img
                                        src={unit.images?.[0] || "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&auto=format"}
                                        alt={`Căn ${unit.code}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4">{getStatusBadge(unit.status)}</div>
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">Mới từ CĐT</span>
                                    </div>
                                </div>

                                {unit.images && unit.images.length > 1 && (
                                    <div className="grid grid-cols-4 gap-2">
                                        {[...unit.images, ...Array(4 - unit.images.length).fill("https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=150&fit=crop&auto=format")]
                                            .slice(0, 4)
                                            .map((img, idx) => (
                                                <div key={idx} className="relative h-24 bg-gray-200 rounded overflow-hidden cursor-pointer hover:opacity-80">
                                                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>

                            {/* Unit Info */}
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h1 className="text-3xl font-bold text-gray-900">Căn {unit.code}</h1>
                                        {unit.status === "AVAILABLE" && <CheckCircle className="h-6 w-6 text-green-600" />}
                                    </div>
                                    {project && (
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Building2 className="h-5 w-5" />
                                            <span className="font-medium">{project.name}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Bed className="h-6 w-6 text-gray-600" />
                                        <div>
                                            <p className="text-sm text-gray-600">Phòng ngủ</p>
                                            <p className="font-semibold">{unit.bedrooms} phòng</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Bath className="h-6 w-6 text-gray-600" />
                                        <div>
                                            <p className="text-sm text-gray-600">Phòng tắm</p>
                                            <p className="font-semibold">{unit.bathrooms} phòng</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Square className="h-6 w-6 text-gray-600" />
                                        <div>
                                            <p className="text-sm text-gray-600">Diện tích</p>
                                            <p className="font-semibold">{unit.area} m²</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Compass className="h-6 w-6 text-gray-600" />
                                        <div>
                                            <p className="text-sm text-gray-600">Hướng</p>
                                            <p className="font-semibold">{getDirectionLabel(unit.direction)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Building2 className="h-5 w-5 text-gray-500" />
                                        <div>
                                            <p className="font-medium">Vị trí</p>
                                            <p className="text-sm text-gray-600">
                                                Tầng {unit.floor} • Block {unit.block}
                                            </p>
                                        </div>
                                    </div>

                                    {project && (
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                                            <div>
                                                <p className="font-medium">Địa chỉ dự án</p>
                                                <p className="text-sm text-gray-600">
                                                    {project.address}, {project.district}, {project.city}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="border-t pt-4">
                                    <div className="mb-2">
                                        <p className="text-sm text-gray-600">Giá bán</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold text-blue-600">{(unit.price / 1000000).toFixed(0)}</span>
                                            <span className="text-gray-600">triệu VNĐ</span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">Đơn giá: ~{(unit.price / unit.area).toLocaleString("vi-VN")} VNĐ/m²</p>
                                    </div>
                                </div>

                                {isBuyer && unit.status === "AVAILABLE" && (
                                    <div className="space-y-2">
                                        <Button className="w-full" size="lg" onClick={() => setShowReservationModal(true)}>
                                            <DollarSign className="h-5 w-5 mr-2" />
                                            Đặt cọc căn hộ này
                                        </Button>
                                        <Link href="/buyer/application/new">
                                            <Button variant="outline" className="w-full" size="lg">
                                                <Plus className="h-5 w-5 mr-2" />
                                                Nộp hồ sơ đăng ký mua
                                            </Button>
                                        </Link>
                                    </div>
                                )}

                                {unit.status !== "AVAILABLE" && (
                                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                        <div className="flex items-center gap-2 text-orange-700">
                                            <AlertCircle className="h-5 w-5" />
                                            <p className="font-medium">
                                                {unit.status === "RESERVED" && "Căn hộ này đang được đặt cọc"}
                                                {unit.status === "SOLD" && "Căn hộ này đã được bán"}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Features */}
                {unit.features && unit.features.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Đặc điểm nổi bật</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {unit.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                        <span className="text-sm">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Payment Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin thanh toán</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-blue-50 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Tiền đặt cọc (5%)</p>
                                    <p className="text-xl font-bold text-blue-600">{(depositAmount / 1000000).toFixed(1)} triệu VNĐ</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Phí dịch vụ (2%)</p>
                                    <p className="text-xl font-bold text-gray-700">{(serviceFee / 1000000).toFixed(1)} triệu VNĐ</p>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">Tổng tiền cần thanh toán ngay:</span>
                                    <span className="text-2xl font-bold text-blue-600">{(totalReservation / 1000000).toFixed(1)} triệu VNĐ</span>
                                </div>
                            </div>

                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="h-5 w-5 text-yellow-700 mt-0.5" />
                                    <div className="text-sm text-yellow-700">
                                        <p className="font-medium mb-1">Lưu ý:</p>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Tiền đặt cọc sẽ được trừ vào tổng giá trị căn hộ khi ký hợp đồng chính thức</li>
                                            <li>Phí dịch vụ không hoàn lại trong mọi trường hợp</li>
                                            <li>Thời gian giữ chỗ: 30 ngày kể từ khi đặt cọc</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Project Amenities */}
                {project && project.amenities && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Tiện ích dự án</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {project.amenities.map((amenity, idx) => (
                                    <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                        <span className="text-sm">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>

            {/* Reservation Modal */}
            <Dialog open={showReservationModal} onOpenChange={setShowReservationModal}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Xác nhận đặt cọc căn hộ</DialogTitle>
                        <DialogDescription>Vui lòng xem xét kỹ thông tin trước khi tiếp tục</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Căn hộ:</span>
                                <span className="font-semibold">Căn {unit.code}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Diện tích:</span>
                                <span className="font-semibold">{unit.area}m²</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Giá bán:</span>
                                <span className="font-semibold">{(unit.price / 1000000).toFixed(0)} triệu VNĐ</span>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Tiền đặt cọc (5%):</span>
                                <span className="font-semibold">{(depositAmount / 1000000).toFixed(1)} triệu VNĐ</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Phí dịch vụ (2%):</span>
                                <span className="font-semibold">{(serviceFee / 1000000).toFixed(1)} triệu VNĐ</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t">
                                <span className="font-bold">Tổng thanh toán:</span>
                                <span className="text-xl font-bold text-blue-600">{(totalReservation / 1000000).toFixed(1)} triệu VNĐ</span>
                            </div>
                        </div>

                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-700">
                                <strong>Lưu ý:</strong> Sau khi đặt cọc, bạn có 30 ngày để hoàn tất thủ tục mua bán. Phí dịch vụ không được hoàn lại.
                            </p>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowReservationModal(false)}>
                            Hủy
                        </Button>
                        <Button
                            onClick={() => {
                                setShowReservationModal(false);
                                alert("Chức năng đặt cọc đang được phát triển!");
                            }}
                        >
                            <DollarSign className="h-4 w-4 mr-2" />
                            Xác nhận đặt cọc
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
