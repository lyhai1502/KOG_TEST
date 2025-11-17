"use client";

import { Unit } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatArea } from "@/lib/utils";
import { Home, Maximize, Bed, Bath, Navigation, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface UnitListProps {
    units: Unit[];
    isLoading: boolean;
    pagination: {
        page: number;
        totalPages: number;
        onPageChange: (page: number) => void;
    };
}

const statusColors = {
    AVAILABLE: "bg-green-100 text-green-800",
    RESERVED: "bg-yellow-100 text-yellow-800",
    SOLD: "bg-red-100 text-red-800",
    BLOCKED: "bg-gray-100 text-gray-800",
};

const statusLabels = {
    AVAILABLE: "Còn trống",
    RESERVED: "Đã đặt cọc",
    SOLD: "Đã bán",
    BLOCKED: "Đã khóa",
};

export function UnitList({ units, isLoading, pagination }: UnitListProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                        <CardHeader>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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

    if (units.length === 0) {
        return (
            <div className="text-center py-12">
                <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy căn hộ</h3>
                <p className="text-gray-600">Thử thay đổi bộ lọc hoặc tìm kiếm khác</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {units.map((unit) => (
                    <Card key={unit.id} className="hover:shadow-lg transition-all duration-300">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Home className="h-5 w-5 text-primary" />
                                    {unit.code}
                                </CardTitle>
                                <span className={cn("px-2 py-1 text-xs font-medium rounded-full", statusColors[unit.status])}>{statusLabels[unit.status]}</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {unit.images && unit.images.length > 0 && (
                                <div className="h-40 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                                    <img src={unit.images[0]} alt={unit.code} className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div className="space-y-3">
                                <div className="text-2xl font-bold text-primary">{formatCurrency(unit.price)}</div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Maximize className="h-4 w-4" />
                                        <span>{formatArea(unit.area)}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Navigation className="h-4 w-4" />
                                        <span>{unit.direction}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Bed className="h-4 w-4" />
                                        <span>{unit.bedrooms} PN</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Bath className="h-4 w-4" />
                                        <span>{unit.bathrooms} WC</span>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">Tầng:</span> {unit.floor} | <span className="font-medium">Block:</span> {unit.block}
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
