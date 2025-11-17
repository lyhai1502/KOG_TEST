"use client";

import { Project } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Building2, MapPin, Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectListProps {
    projects: Project[];
    isLoading: boolean;
    pagination: {
        page: number;
        totalPages: number;
        onPageChange: (page: number) => void;
    };
}

export function ProjectList({ projects, isLoading, pagination }: ProjectListProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-40 bg-gray-200 rounded mb-4"></div>
                            <div className="space-y-2">
                                <div className="h-3 bg-gray-200 rounded"></div>
                                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (projects.length === 0) {
        return (
            <div className="text-center py-12">
                <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy dự án</h3>
                <p className="text-gray-600">Thử thay đổi bộ lọc hoặc tìm kiếm khác</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-primary" />
                                {project.name}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {project.district}, {project.city}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {project.images && project.images.length > 0 && (
                                <div className="h-40 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                                    <img src={project.images[0]} alt={project.name} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tổng số căn:</span>
                                    <span className="font-medium">{project.totalUnits}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Còn trống:</span>
                                    <span className="font-medium text-green-600">{project.availableUnits}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Giá:</span>
                                    <span className="font-medium">
                                        {formatCurrency(project.priceRange.min)} - {formatCurrency(project.priceRange.max)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600">
                                    <Calendar className="h-4 w-4" />
                                    <span>Hoàn thành: {formatDate(project.completionDate)}</span>
                                </div>
                            </div>
                            <Button className="w-full mt-4" variant="outline">
                                Xem chi tiết
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => pagination.onPageChange(pagination.page - 1)} disabled={pagination.page === 1}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-gray-600">
                        Trang {pagination.page} / {pagination.totalPages}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => pagination.onPageChange(pagination.page + 1)} disabled={pagination.page === pagination.totalPages}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
