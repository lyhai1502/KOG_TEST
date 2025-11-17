"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

export default function BuyerDashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isAuthenticated, checkSession } = useAuthStore();
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
    }, [isHydrated, isAuthenticated, checkSession, router]);

    if (!isHydrated || !isAuthenticated) {
        return null;
    }

    return <div>{children}</div>;
}
