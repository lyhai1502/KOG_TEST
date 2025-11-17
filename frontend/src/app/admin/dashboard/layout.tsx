"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isAuthenticated, user, checkSession } = useAuthStore();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Đợi hydration hoàn tất
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated) return;

        // Delay check để đảm bảo store đã load từ localStorage
        const initCheck = setTimeout(() => {
            const isValid = checkSession();

            if (!isValid || !isAuthenticated) {
                router.push("/login");
                return;
            }

            if (user?.role !== "ADMIN") {
                toast.error("Bạn không có quyền truy cập trang này.");
                router.push("/dashboard");
                return;
            }
        }, 100);

        // Check session mỗi 30 giây
        const interval = setInterval(() => {
            const isStillValid = checkSession();
            if (!isStillValid) {
                toast.error("Phiên đăng nhập đã hết hạn (5 phút). Vui lòng đăng nhập lại.");
                router.push("/login");
            }
        }, 30000); // 30 seconds

        return () => {
            clearTimeout(initCheck);
            clearInterval(interval);
        };
    }, [isHydrated, isAuthenticated, user, checkSession, router]);

    if (!isHydrated || !isAuthenticated || user?.role !== "ADMIN") {
        return null;
    }

    return <div>{children}</div>;
}
