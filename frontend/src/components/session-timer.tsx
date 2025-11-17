"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { Clock } from "lucide-react";

export function SessionTimer() {
    const { sessionExpiry, isAuthenticated } = useAuthStore();
    const [timeLeft, setTimeLeft] = useState<string>("");

    useEffect(() => {
        if (!isAuthenticated || !sessionExpiry) return;

        const updateTimer = () => {
            const now = Date.now();
            const remaining = sessionExpiry - now;

            if (remaining <= 0) {
                setTimeLeft("Hết hạn");
                return;
            }

            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);

        return () => clearInterval(interval);
    }, [sessionExpiry, isAuthenticated]);

    if (!isAuthenticated || !sessionExpiry) return null;

    const now = Date.now();
    const remaining = sessionExpiry - now;
    const isExpiringSoon = remaining < 60000; // < 1 phút

    return (
        <div className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-full ${isExpiringSoon ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}>
            <Clock className="h-4 w-4" />
            <span className="font-medium">{timeLeft}</span>
        </div>
    );
}
