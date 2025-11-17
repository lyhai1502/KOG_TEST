"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { Project, Unit, ListingFilters, PaginatedResponse } from "@/types";
import { mockGetProjects, mockGetUnits } from "@/lib/mock-data";
import { DashboardHeader } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ProjectList } from "@/components/dashboard/project-list";
import { UnitList } from "@/components/dashboard/unit-list";
import { SearchFilters } from "@/components/dashboard/search-filters";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Building2, Home, Users } from "lucide-react";

export default function AdminDashboardPage() {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState<"overview" | "projects" | "units">("overview");
    const [filters, setFilters] = useState<ListingFilters>({
        page: 1,
        limit: 12,
    });

    const { data: projects } = useQuery({
        queryKey: ["admin-projects", filters],
        queryFn: async () => {
            return mockGetProjects(filters);
        },
    });

    const { data: units } = useQuery({
        queryKey: ["admin-units", filters],
        queryFn: async () => {
            return mockGetUnits(filters);
        },
    });

    // Calculate statistics
    const totalProjects = projects?.total || 0;
    const totalUnits = units?.total || 0;
    const availableUnits = units?.data.filter((u) => u.status === "AVAILABLE").length || 0;
    const soldUnits = units?.data.filter((u) => u.status === "SOLD").length || 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />
            <div className="flex">
                <Sidebar
                    activeTab={activeTab === "overview" ? "projects" : activeTab}
                    onTabChange={(tab) => {
                        if (tab === "projects" || tab === "units") {
                            setActiveTab(tab);
                        }
                    }}
                />
                <main className="flex-1 p-6">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Welcome Section */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">🎯 Admin Dashboard</h1>
                                <p className="text-gray-600 mt-1">Xin chào, {user?.name}! Quản lý toàn bộ hệ thống NOXH</p>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setActiveTab("overview")}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "overview" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                            >
                                <BarChart3 className="inline-block h-4 w-4 mr-2" />
                                Tổng quan
                            </button>
                            <button
                                onClick={() => setActiveTab("projects")}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "projects" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                            >
                                <Building2 className="inline-block h-4 w-4 mr-2" />
                                Quản lý Dự án
                            </button>
                            <button
                                onClick={() => setActiveTab("units")}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "units" ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}
                            >
                                <Home className="inline-block h-4 w-4 mr-2" />
                                Quản lý Căn hộ
                            </button>
                        </div>

                        {/* Overview Tab */}
                        {activeTab === "overview" && (
                            <div className="space-y-6">
                                {/* Statistics Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardDescription>Tổng số dự án</CardDescription>
                                            <CardTitle className="text-4xl">{totalProjects}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center text-sm text-green-600">
                                                <Building2 className="h-4 w-4 mr-1" />
                                                <span>Đang hoạt động</span>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardDescription>Tổng số căn hộ</CardDescription>
                                            <CardTitle className="text-4xl">{totalUnits}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center text-sm text-blue-600">
                                                <Home className="h-4 w-4 mr-1" />
                                                <span>Tất cả căn</span>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardDescription>Căn còn trống</CardDescription>
                                            <CardTitle className="text-4xl">{availableUnits}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center text-sm text-green-600">
                                                <span>✓ Sẵn sàng bán</span>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardDescription>Đã bán</CardDescription>
                                            <CardTitle className="text-4xl">{soldUnits}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <span>Hoàn thành giao dịch</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Admin Info */}
                                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Users className="h-5 w-5 text-blue-600" />
                                            Quyền Admin
                                        </CardTitle>
                                        <CardDescription className="text-gray-700">Bạn có toàn quyền truy cập và quản lý hệ thống</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2 text-sm text-gray-700">
                                            <p>✅ Xem và quản lý tất cả dự án</p>
                                            <p>✅ Xem và quản lý tất cả căn hộ</p>
                                            <p>✅ Quản lý người dùng (Sales, Agency)</p>
                                            <p>✅ Xem báo cáo và thống kê chi tiết</p>
                                            <p>✅ Cấu hình hệ thống</p>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Recent Projects Preview */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Dự án mới nhất</CardTitle>
                                        <CardDescription>3 dự án được cập nhật gần đây</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {projects?.data.slice(0, 3).map((project) => (
                                                <div key={project.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <Building2 className="h-5 w-5 text-primary" />
                                                        <div>
                                                            <p className="font-medium">{project.name}</p>
                                                            <p className="text-sm text-gray-600">
                                                                {project.district}, {project.city}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-medium text-green-600">
                                                            {project.availableUnits}/{project.totalUnits} còn trống
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* Projects Management Tab */}
                        {activeTab === "projects" && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold">Quản lý Dự án</h2>
                                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">+ Thêm dự án mới</button>
                                </div>

                                <SearchFilters filters={filters} onFiltersChange={setFilters} />

                                <ProjectList
                                    projects={projects?.data || []}
                                    isLoading={false}
                                    pagination={{
                                        page: projects?.page || 1,
                                        totalPages: projects?.totalPages || 1,
                                        onPageChange: (page) => setFilters({ ...filters, page }),
                                    }}
                                />
                            </div>
                        )}

                        {/* Units Management Tab */}
                        {activeTab === "units" && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold">Quản lý Căn hộ</h2>
                                    <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">+ Thêm căn hộ mới</button>
                                </div>

                                <SearchFilters filters={filters} onFiltersChange={setFilters} />

                                <UnitList
                                    units={units?.data || []}
                                    isLoading={false}
                                    pagination={{
                                        page: units?.page || 1,
                                        totalPages: units?.totalPages || 1,
                                        onPageChange: (page) => setFilters({ ...filters, page }),
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
