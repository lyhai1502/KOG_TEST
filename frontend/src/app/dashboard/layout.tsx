"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
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
        }, 100);

        return () => {
            clearTimeout(initCheck);
        };
    }, [isHydrated, isAuthenticated, router]);

    if (!isHydrated || !isAuthenticated) {
        return null;
    }

    return <div>{children}</div>;
}
