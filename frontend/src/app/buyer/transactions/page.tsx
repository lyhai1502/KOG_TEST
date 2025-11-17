"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, XCircle, FileText, Download, Eye, CreditCard, Home, Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { MOCK_TRANSACTIONS } from "@/lib/mock-data";
import { Transaction } from "@/types";

const statusConfig: Record<Transaction["status"], { label: string; color: string; icon: any }> = {
    INITIATED: { label: "Đang khởi tạo", color: "bg-blue-100 text-blue-800", icon: Clock },
    DEPOSIT_PAID: { label: "Đã đặt cọc", color: "bg-purple-100 text-purple-800", icon: CreditCard },
    PAYMENT_PENDING: { label: "Chờ thanh toán", color: "bg-yellow-100 text-yellow-800", icon: Clock },
    PAYMENT_COMPLETED: { label: "Đã thanh toán", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
    DOCUMENT_SIGNING: { label: "Ký hợp đồng", color: "bg-amber-100 text-amber-800", icon: FileText },
    TRANSFERRING: { label: "Đang chuyển nhượng", color: "bg-indigo-100 text-indigo-800", icon: Home },
    COMPLETED: { label: "Hoàn thành", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
    CANCELLED: { label: "Đã hủy", color: "bg-red-100 text-red-800", icon: XCircle },
};

export default function TransactionsPage() {
    const user = useAuthStore((state) => state.user);
    const [filterStatus, setFilterStatus] = useState<string>("ALL");

    const { data: transactions, isLoading } = useQuery({
        queryKey: ["transactions", user?.id],
        queryFn: async () => {
            // Mock API call
            return MOCK_TRANSACTIONS.filter((t) => t.buyerId === user?.id);
        },
    });

    const filteredTransactions = transactions?.filter((t) => filterStatus === "ALL" || t.status === filterStatus) || [];

    const stats = {
        total: transactions?.length || 0,
        completed: transactions?.filter((t) => t.status === ("COMPLETED" as const)).length || 0,
        inProgress: transactions?.filter((t) => (["DEPOSIT_PAID", "PAYMENT_COMPLETED", "DOCUMENT_SIGNING", "TRANSFERRING"] as const).includes(t.status as any)).length || 0,
        totalSpent: transactions?.reduce((sum, t) => sum + t.totalAmount, 0) || 0,
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Lịch sử giao dịch</h1>
                    <p className="text-gray-600">Theo dõi tất cả các giao dịch mua bán NOXH của bạn</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Tổng giao dịch</CardDescription>
                            <CardTitle className="text-3xl">{stats.total}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-gray-600">Tất cả các giao dịch</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Đang tiến hành</CardDescription>
                            <CardTitle className="text-3xl text-blue-600">{stats.inProgress}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-gray-600">Giao dịch chưa hoàn thành</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Đã hoàn thành</CardDescription>
                            <CardTitle className="text-3xl text-green-600">{stats.completed}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-gray-600">Giao dịch thành công</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Tổng chi tiêu</CardDescription>
                            <CardTitle className="text-3xl">{(stats.totalSpent / 1000000000).toFixed(1)}B</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-gray-600">Tất cả các giao dịch</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-wrap gap-2">
                            <Button variant={filterStatus === "ALL" ? "default" : "outline"} size="sm" onClick={() => setFilterStatus("ALL")}>
                                Tất cả
                            </Button>
                            {Object.entries(statusConfig).map(([status, config]) => (
                                <Button key={status} variant={filterStatus === status ? "default" : "outline"} size="sm" onClick={() => setFilterStatus(status)}>
                                    {config.label}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Transactions List */}
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-600">Đang tải giao dịch...</p>
                    </div>
                ) : filteredTransactions.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-2">Chưa có giao dịch nào</p>
                            <Button variant="link">Khám phá thị trường</Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {filteredTransactions.map((transaction) => {
                            const status = statusConfig[transaction.status];
                            const StatusIcon = status.icon;

                            return (
                                <Card key={transaction.id}>
                                    <CardContent className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                            {/* Left: Transaction Info */}
                                            <div className="flex-1 space-y-3">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-1">Căn hộ NOXH - {transaction.listingId}</h3>
                                                        <p className="text-sm text-gray-600">
                                                            Mã giao dịch: <span className="font-mono">{transaction.id}</span>
                                                        </p>
                                                    </div>
                                                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                                                        <StatusIcon className="h-3 w-3" />
                                                        {status.label}
                                                    </span>
                                                </div>

                                                {/* Timeline */}
                                                <div className="relative pl-6 space-y-2 border-l-2 border-gray-200">
                                                    {transaction.depositPaidAt && (
                                                        <div className="relative -left-[29px]">
                                                            <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-purple-500 border-2 border-white"></div>
                                                            <div className="ml-6">
                                                                <p className="text-sm font-medium">Đã đặt cọc</p>
                                                                <p className="text-xs text-gray-600">{new Date(transaction.depositPaidAt).toLocaleString("vi-VN")}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {transaction.paymentCompletedAt && (
                                                        <div className="relative -left-[29px]">
                                                            <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
                                                            <div className="ml-6">
                                                                <p className="text-sm font-medium">Thanh toán đầy đủ</p>
                                                                <p className="text-xs text-gray-600">{new Date(transaction.paymentCompletedAt).toLocaleString("vi-VN")}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {transaction.documentSignedAt && (
                                                        <div className="relative -left-[29px]">
                                                            <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-amber-500 border-2 border-white"></div>
                                                            <div className="ml-6">
                                                                <p className="text-sm font-medium">Đã ký hợp đồng</p>
                                                                <p className="text-xs text-gray-600">{new Date(transaction.documentSignedAt).toLocaleString("vi-VN")}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {transaction.completedAt && (
                                                        <div className="relative -left-[29px]">
                                                            <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-green-600 border-2 border-white"></div>
                                                            <div className="ml-6">
                                                                <p className="text-sm font-medium">Hoàn thành</p>
                                                                <p className="text-xs text-gray-600">{new Date(transaction.completedAt).toLocaleString("vi-VN")}</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Right: Amount & Actions */}
                                            <div className="lg:w-64 space-y-4">
                                                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Giá căn hộ:</span>
                                                        <span className="font-semibold">{(transaction.propertyPrice / 1000000000).toFixed(2)}B</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Phí dịch vụ:</span>
                                                        <span className="font-semibold">{(transaction.serviceFee / 1000000).toFixed(0)}M</span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Thuế:</span>
                                                        <span className="font-semibold">{(transaction.taxAmount / 1000000).toFixed(0)}M</span>
                                                    </div>
                                                    <div className="flex justify-between pt-2 border-t">
                                                        <span className="font-semibold">Tổng cộng:</span>
                                                        <span className="text-lg font-bold text-blue-600">{(transaction.totalAmount / 1000000000).toFixed(2)}B</span>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm" className="flex-1">
                                                        <Eye className="h-4 w-4 mr-1" />
                                                        Chi tiết
                                                    </Button>
                                                    {transaction.contractUrl && (
                                                        <Button variant="outline" size="sm" className="flex-1">
                                                            <Download className="h-4 w-4 mr-1" />
                                                            Hợp đồng
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}
