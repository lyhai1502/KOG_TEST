"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { SessionTimer } from "@/components/session-timer";
import { LogOut, User } from "lucide-react";

export function DashboardHeader() {
    const router = useRouter();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Kim Oanh Group</h2>
                        <p className="text-sm text-gray-600">Sàn NOXH</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <SessionTimer />
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
