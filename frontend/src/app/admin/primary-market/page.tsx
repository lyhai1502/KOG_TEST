"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, ClipboardList, TrendingUp, Eye } from "lucide-react";
import Link from "next/link";
import { MOCK_PROJECTS, MOCK_UNITS } from "@/lib/mock-data";

export default function AdminPrimaryMarketPage() {
    const { data: projects } = useQuery({
        queryKey: ["admin-projects"],
        queryFn: async () => {
            return MOCK_PROJECTS;
        },
    });

    const { data: units } = useQuery({
        queryKey: ["admin-units"],
        queryFn: async () => {
            return MOCK_UNITS;
        },
    });

    const availableUnits = units?.filter((u) => u.status === "AVAILABLE") || [];
    const reservedUnits = units?.filter((u) => u.status === "RESERVED") || [];
    const soldUnits = units?.filter((u) => u.status === "SOLD") || [];

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Quản lý Thị trường Sơ cấp</h1>
                    <p className="text-gray-600">Quản lý dự án và căn hộ từ chủ đầu tư</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Tổng dự án</CardDescription>
                            <CardTitle className="text-4xl">{projects?.length || 0}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-blue-600">
                                <Building2 className="h-4 w-4 mr-1" />
                                <span>Đang quản lý</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Căn hộ còn trống</CardDescription>
                            <CardTitle className="text-4xl">{availableUnits.length}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-green-600">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                <span>Sẵn sàng bán</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Đang đặt cọc</CardDescription>
                            <CardTitle className="text-4xl">{reservedUnits.length}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">Chờ xác nhận</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Đã bán</CardDescription>
                            <CardTitle className="text-4xl">{soldUnits.length}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">Hoàn thành</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Projects List */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Danh sách dự án</CardTitle>
                            <Button>
                                <Building2 className="h-4 w-4 mr-2" />
                                Thêm dự án mới
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {projects?.map((project: any) => {
                                const projectUnits = units?.filter((u) => u.projectId === project.id) || [];
                                const projectAvailable = projectUnits.filter((u) => u.status === "AVAILABLE").length;
                                const projectReserved = projectUnits.filter((u) => u.status === "RESERVED").length;
                                const projectSold = projectUnits.filter((u) => u.status === "SOLD").length;

                                return (
                                    <Card key={project.id} className="border-2">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <img
                                                    src={project.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=150&fit=crop&auto=format"}
                                                    alt={project.name}
                                                    className="w-32 h-24 object-cover rounded"
                                                />

                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="font-bold text-lg">{project.name}</h3>
                                                            <p className="text-sm text-gray-600">{project.address}</p>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                {project.district}, {project.city}
                                                            </p>
                                                        </div>
                                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Đang bán</span>
                                                    </div>

                                                    <div className="grid grid-cols-4 gap-4 mt-4 text-sm">
                                                        <div>
                                                            <p className="text-gray-500">Tổng căn</p>
                                                            <p className="font-semibold">{project.totalUnits}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500">Còn trống</p>
                                                            <p className="font-semibold text-green-600">{projectAvailable}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500">Đang cọc</p>
                                                            <p className="font-semibold text-orange-600">{projectReserved}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500">Đã bán</p>
                                                            <p className="font-semibold text-gray-600">{projectSold}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-4 mt-4 text-sm">
                                                        <div>
                                                            <span className="text-gray-500">Giá:</span>
                                                            <span className="font-semibold ml-2">
                                                                {(project.priceRange.min / 1000000).toFixed(0)} - {(project.priceRange.max / 1000000).toFixed(0)} triệu VNĐ
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="text-gray-500">Hoàn thành:</span>
                                                            <span className="font-semibold ml-2">{new Date(project.completionDate).toLocaleDateString("vi-VN")}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2 mt-4">
                                                        <Link href={`/admin/primary-market/projects/${project.id}`}>
                                                            <Button size="sm">
                                                                <Eye className="h-4 w-4 mr-2" />
                                                                Xem chi tiết
                                                            </Button>
                                                        </Link>
                                                        <Link href={`/admin/primary-market/projects/${project.id}`}>
                                                            <Button variant="outline" size="sm">
                                                                <ClipboardList className="h-4 w-4 mr-2" />
                                                                Danh sách căn hộ
                                                            </Button>
                                                        </Link>
                                                        <Button variant="outline" size="sm">
                                                            <Users className="h-4 w-4 mr-2" />
                                                            Hồ sơ đăng ký
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
