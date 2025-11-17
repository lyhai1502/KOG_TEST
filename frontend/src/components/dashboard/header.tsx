"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { LogOut, User, Home, ShoppingCart, Heart, History, LayoutDashboard, Building2, Store } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardHeader() {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    // Navigation items for all roles
    const getNavItems = () => {
        const baseRole = user?.role === "BUYER" ? "buyer" : "admin";
        const isAdmin = user?.role === "ADMIN";

        return [
            { href: `/${baseRole}/dashboard`, label: "Tổng quan", icon: LayoutDashboard },
            { href: `/${baseRole}/primary-market`, label: "Thị trường sơ cấp", icon: Building2 },
            { href: `/${baseRole}/secondary-market`, label: "Thị trường thứ cấp", icon: Store },
            { href: `/${baseRole}/wishlist`, label: "Yêu thích", icon: Heart },
            { href: `/${baseRole}/transactions`, label: "Giao dịch", icon: History },
        ];
    };

    const navItems = getNavItems();

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <Link href={user?.role === "BUYER" ? "/buyer/dashboard" : "/admin/dashboard"}>
                            <div className="cursor-pointer">
                                <h2 className="text-xl font-bold text-gray-900">Kim Oanh Group</h2>
                                <p className="text-sm text-gray-600">Sàn NOXH</p>
                            </div>
                        </Link>

                        {/* Main Navigation */}
                        <nav className="flex items-center gap-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                                return (
                                    <Link key={item.href} href={item.href}>
                                        <Button
                                            variant={isActive ? "default" : "ghost"}
                                            size="sm"
                                            className={cn("gap-2 transition-colors", isActive && "bg-primary text-primary-foreground shadow-sm")}
                                        >
                                            <Icon className="h-4 w-4" />
                                            {item.label}
                                        </Button>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <User className="h-5 w-5 text-gray-600" />
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                                <p className="text-xs text-gray-600">{user?.role}</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Đăng xuất
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
