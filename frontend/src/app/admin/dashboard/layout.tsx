"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Đợi hydration hoàn tất
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (!isHydrated) return;

        // Delay check để đảm bảo store đã load từ localStorage
        const initCheck = setTimeout(() => {
            if (!isAuthenticated) {
                router.push("/login");
                return;
            }

            if (user?.role !== "ADMIN") {
                toast.error("Bạn không có quyền truy cập trang này.");
                router.push("/dashboard");
                return;
            }
        }, 100);

        return () => {
            clearTimeout(initCheck);
        };
    }, [isHydrated, isAuthenticated, user, router]);

    if (!isHydrated || !isAuthenticated || user?.role !== "ADMIN") {
        return null;
    }

    return <div>{children}</div>;
}
