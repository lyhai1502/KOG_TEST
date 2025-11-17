import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "@/types";

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    sessionExpiry: number | null;
    setAuth: (user: User, token: string) => void;
    logout: () => void;
    checkSession: () => boolean;
}

const SESSION_DURATION = 5 * 60 * 1000; // 5 phút (milliseconds)

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            sessionExpiry: null,
            setAuth: (user, token) => {
                const expiry = Date.now() + SESSION_DURATION;
                localStorage.setItem("access_token", token);
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem("session_expiry", expiry.toString());
                set({ user, token, isAuthenticated: true, sessionExpiry: expiry });
            },
            logout: () => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("user");
                localStorage.removeItem("session_expiry");
                set({ user: null, token: null, isAuthenticated: false, sessionExpiry: null });
            },
            checkSession: () => {
                const state = get();
                const now = Date.now();

                // Nếu chưa đăng nhập
                if (!state.isAuthenticated) {
                    return false;
                }

                // Lấy sessionExpiry từ state hoặc localStorage
                let expiry = state.sessionExpiry;
                if (!expiry) {
                    const storedExpiry = localStorage.getItem("session_expiry");
                    if (storedExpiry) {
                        expiry = parseInt(storedExpiry, 10);
                        // Update state với expiry từ localStorage
                        set({ sessionExpiry: expiry });
                    } else {
                        return false;
                    }
                }

                // Nếu session hết hạn
                if (now > expiry) {
                    get().logout();
                    return false;
                }

                return true;
            },
        }),
        {
            name: "auth-storage",
        }
    )
);
