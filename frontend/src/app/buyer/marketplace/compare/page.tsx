"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRef, useState, useEffect, Fragment } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CheckCircle2, XCircle, Minus, MapPin, Eye, Share2, CreditCard, Home, ArrowLeft, Printer, Download, TrendingUp, TrendingDown } from "lucide-react";
import { MOCK_LISTINGS } from "@/lib/mock-data";
import { Listing } from "@/types";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { toast } from "sonner";

const comparisonRows = [
    { label: "Giá bán", key: "price", type: "currency", category: "Thông tin giá" },
    { label: "Diện tích", key: "area", type: "area", category: "Thông tin cơ bản" },
    { label: "Phòng ngủ", key: "bedrooms", type: "number", category: "Thông tin cơ bản" },
    { label: "Phòng tắm", key: "bathrooms", type: "number", category: "Thông tin cơ bản" },
    { label: "Giá/m²", key: "pricePerSqm", type: "currency", category: "Thông tin giá" },
    { label: "Hướng", key: "direction", type: "text", category: "Thông tin cơ bản" },
    { label: "Tầng", key: "floor", type: "number", category: "Thông tin cơ bản" },
    { label: "Tình trạng sổ", key: "legalStatus", type: "text", category: "Thông tin pháp lý" },
    { label: "Đủ điều kiện chuyển nhượng", key: "transferEligible", type: "boolean", category: "Thông tin pháp lý" },
    { label: "Ngày được chuyển nhượng", key: "transferEligibleDate", type: "date", category: "Thông tin pháp lý" },
    { label: "Lượt xem", key: "viewCount", type: "number", category: "Thông tin bổ sung" },
    { label: "Trạng thái", key: "status", type: "text", category: "Thông tin bổ sung" },
];

export default function ComparePage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const ids = searchParams.getAll("id");
    const tableRef = useRef<HTMLDivElement>(null);
    const [isHeaderSticky, setIsHeaderSticky] = useState(false);

    const { data: listings, isLoading } = useQuery({
        queryKey: ["compare-listings", ids],
        queryFn: async () => {
            return MOCK_LISTINGS.filter((l) => ids.includes(l.id));
        },
    });

    // Sticky header detection
    useEffect(() => {
        const handleScroll = () => {
            if (tableRef.current) {
                const rect = tableRef.current.getBoundingClientRect();
                setIsHeaderSticky(rect.top < 80);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Print functionality
    const handlePrint = () => {
        window.print();
        toast.success("Đang chuẩn bị in...");
    };

    // Export to PDF (simplified - in production would use a library like jsPDF)
    const handleExportPDF = () => {
        toast.info("Chức năng xuất PDF sẽ được bổ sung sau");
        // In production: Use jsPDF or similar library
    };

    const formatValue = (listing: Listing, key: string, type: string, isHighest: boolean, isLowest: boolean) => {
        const value = (listing as any)[key];
        let formattedValue;

        switch (type) {
            case "currency":
                if (key === "pricePerSqm") {
                    formattedValue = `${(listing.price / 65 / 1000000).toFixed(1)}M VNĐ/m²`;
                } else {
                    formattedValue = `${(value / 1000000000).toFixed(2)} tỷ VNĐ`;
                }
                break;
            case "area":
                formattedValue = `65 m²`;
                break;
            case "number":
                if (key === "bedrooms") formattedValue = "2";
                else if (key === "bathrooms") formattedValue = "2";
                else if (key === "floor") formattedValue = "10";
                else formattedValue = value || "-";
                break;
            case "boolean":
                return value ? <CheckCircle2 className="h-5 w-5 text-green-600 mx-auto" /> : <XCircle className="h-5 w-5 text-red-600 mx-auto" />;
            case "date":
                formattedValue = value ? new Date(value).toLocaleDateString("vi-VN") : "-";
                break;
            case "text":
                if (key === "direction") formattedValue = "Đông Nam";
                else formattedValue = value || "-";
                break;
            default:
                formattedValue = value || "-";
        }

        // Add indicators for best/worst values
        if (type === "currency" || type === "number") {
            if (isLowest && (key === "price" || key === "pricePerSqm")) {
                return (
                    <div className="flex items-center justify-center gap-2">
                        <TrendingDown className="h-4 w-4 text-green-600" />
                        <span className="font-bold text-green-700">{formattedValue}</span>
                    </div>
                );
            }
            if (isHighest && (key === "price" || key === "pricePerSqm")) {
                return (
                    <div className="flex items-center justify-center gap-2">
                        <TrendingUp className="h-4 w-4 text-red-600" />
                        <span className="font-medium text-red-700">{formattedValue}</span>
                    </div>
                );
            }
            if (isHighest && key === "viewCount") {
                return (
                    <div className="flex items-center justify-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="font-bold text-green-700">{formattedValue}</span>
                    </div>
                );
            }
        }

        return <span>{formattedValue}</span>;
    };

    const getHighlightClass = (listings: Listing[], key: string, index: number) => {
        if (!listings || listings.length < 2) return "";

        const values = listings
            .map((l) => {
                if (key === "price") return l.price;
                if (key === "pricePerSqm") return l.price / 65;
                if (key === "viewCount") return l.viewCount;
                return null;
            })
            .filter((v) => v !== null) as number[];

        if (values.length === 0) return "";

        const currentValue = values[index];
        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);

        // For price, lower is better
        if (key === "price" || key === "pricePerSqm") {
            if (currentValue === minValue) return "bg-green-50";
            if (currentValue === maxValue) return "bg-red-50";
        }

        // For viewCount, higher is better
        if (key === "viewCount") {
            if (currentValue === maxValue) return "bg-green-50";
            if (currentValue === minValue) return "bg-red-50";
        }

        return "";
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <DashboardHeader />
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-600">Đang tải...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!listings || listings.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50">
                <DashboardHeader />
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Quay lại
                    </Button>
                    <Card>
                        <CardContent className="py-16 text-center">
                            <p className="text-gray-600 mb-4">Chưa có căn hộ nào để so sánh</p>
                            <Link href="/buyer/secondary-market">
                                <Button>Khám phá thị trường</Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
                {/* Breadcrumb Navigation */}
                <div className="flex items-center justify-between">
                    <Breadcrumb items={[{ label: "Marketplace", href: "/buyer/marketplace" }, { label: "So sánh căn hộ" }]} />
                    <Button variant="ghost" size="sm" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Quay lại
                    </Button>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">So sánh căn hộ</h1>
                        <p className="text-gray-600">Đang so sánh {listings.length} căn hộ</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handlePrint} className="print:hidden">
                            <Printer className="h-4 w-4 mr-2" />
                            In
                        </Button>
                        <Button variant="outline" onClick={handleExportPDF} className="print:hidden">
                            <Download className="h-4 w-4 mr-2" />
                            Xuất PDF
                        </Button>
                        <Button variant="outline" className="print:hidden">
                            <Share2 className="h-4 w-4 mr-2" />
                            Chia sẻ
                        </Button>
                    </div>
                </div>

                {/* Comparison Table */}
                <div ref={tableRef} className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                        <thead className={isHeaderSticky ? "sticky top-20 z-10 shadow-md" : ""}>
                            <tr className="border-b">
                                <th className="p-4 text-left bg-gray-50 font-semibold w-48">Tiêu chí</th>
                                {listings.map((listing) => (
                                    <th key={listing.id} className="p-4 bg-gray-50 min-w-[280px]">
                                        <Card className="m-0 border-0 shadow-none">
                                            <div className="relative">
                                                <img
                                                    src={listing.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=280&h=180&fit=crop&auto=format"}
                                                    alt={listing.title}
                                                    className="w-full h-40 object-cover rounded-t-lg"
                                                />
                                                <div className="absolute top-2 left-2">
                                                    <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">{listing.status}</span>
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <h3 className="font-bold text-sm mb-1 line-clamp-2">{listing.title}</h3>
                                                <p className="text-xs text-gray-600 flex items-center gap-1">
                                                    <MapPin className="h-3 w-3" />
                                                    Quận 7, TP.HCM
                                                </p>
                                                <div className="mt-3 space-y-2">
                                                    <Link href={`/buyer/secondary-market/${listing.id}`}>
                                                        <Button variant="outline" size="sm" className="w-full">
                                                            <Eye className="h-4 w-4 mr-1" />
                                                            Xem chi tiết
                                                        </Button>
                                                    </Link>
                                                    <Button size="sm" className="w-full">
                                                        <CreditCard className="h-4 w-4 mr-1" />
                                                        Đặt cọc
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {(() => {
                                const categories = [...new Set(comparisonRows.map((r) => r.category))];
                                let currentRow = 0;

                                return categories.map((category) => {
                                    const categoryRows = comparisonRows.filter((r) => r.category === category);

                                    return (
                                        <Fragment key={category}>
                                            {/* Category Header */}
                                            <tr className="bg-blue-50">
                                                <td colSpan={listings.length + 1} className="p-3 font-bold text-blue-900 border-t-2 border-blue-200">
                                                    {category}
                                                </td>
                                            </tr>

                                            {/* Category Rows */}
                                            {categoryRows.map((row) => {
                                                const rowClass = currentRow++ % 2 === 0 ? "bg-white" : "bg-gray-50";

                                                // Calculate best/worst for each row
                                                const values = listings
                                                    .map((l: Listing, i: number) => {
                                                        if (row.key === "price") return { value: l.price, index: i };
                                                        if (row.key === "pricePerSqm") return { value: l.price / 65, index: i };
                                                        if (row.key === "viewCount") return { value: l.viewCount, index: i };
                                                        return null;
                                                    })
                                                    .filter((v: any) => v !== null) as { value: number; index: number }[];

                                                const maxValue = values.length > 0 ? Math.max(...values.map((v) => v.value)) : null;
                                                const minValue = values.length > 0 ? Math.min(...values.map((v) => v.value)) : null;

                                                return (
                                                    <tr key={row.key} className={rowClass}>
                                                        <td className="p-4 font-medium text-gray-700 pl-8">{row.label}</td>
                                                        {listings.map((listing: Listing, colIndex: number) => {
                                                            const currentVal = values.find((v) => v.index === colIndex);
                                                            const isHighest = currentVal && maxValue !== null && currentVal.value === maxValue;
                                                            const isLowest = currentVal && minValue !== null && currentVal.value === minValue;

                                                            return (
                                                                <td key={listing.id} className={`p-4 text-center ${getHighlightClass(listings, row.key, colIndex)}`}>
                                                                    {formatValue(listing, row.key, row.type, isHighest || false, isLowest || false)}
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                );
                                            })}
                                        </Fragment>
                                    );
                                });
                            })()}
                        </tbody>
                    </table>
                </div>

                {/* Summary & Legend */}
                <Card className="print:break-inside-avoid">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-blue-600" />
                            Hướng dẫn đọc bảng so sánh
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <h4 className="font-semibold text-sm">Màu nền ô:</h4>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
                                    <span>Giá trị tốt nhất (giá thấp nhất hoặc lượt xem cao nhất)</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <div className="w-4 h-4 bg-red-50 border border-red-200 rounded"></div>
                                    <span>Giá trị kém nhất (giá cao nhất hoặc lượt xem thấp nhất)</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-semibold text-sm">Biểu tượng:</h4>
                                <div className="flex items-center gap-2 text-sm">
                                    <TrendingDown className="h-4 w-4 text-green-600" />
                                    <span>Giá tốt nhất (thấp nhất)</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <TrendingUp className="h-4 w-4 text-red-600" />
                                    <span>Giá cao nhất</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                    <span>Lượt xem cao nhất (phổ biến)</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-3 border-t">
                            <p className="text-sm text-gray-600">
                                <strong>Lưu ý:</strong> Thông tin chỉ mang tính chất tham khảo. Vui lòng liên hệ trực tiếp với người bán hoặc đại lý để xác nhận chi tiết chính xác nhất.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Print Stylesheet */}
                <style jsx global>{`
                    @media print {
                        body {
                            print-color-adjust: exact;
                            -webkit-print-color-adjust: exact;
                        }
                        .print\\:hidden {
                            display: none !important;
                        }
                        .print\\:break-inside-avoid {
                            break-inside: avoid;
                        }
                        thead {
                            display: table-header-group;
                        }
                        tr {
                            break-inside: avoid;
                        }
                    }
                `}</style>
            </main>
        </div>
    );
}
