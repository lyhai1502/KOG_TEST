"use client";

import { Building2, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
    activeTab: "projects" | "units";
    onTabChange: (tab: "projects" | "units") => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
            <nav className="p-4 space-y-2">
                <button
                    onClick={() => onTabChange("projects")}
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                        activeTab === "projects" ? "bg-primary text-primary-foreground" : "hover:bg-gray-100 text-gray-700"
                    )}
                >
                    <Building2 className="h-5 w-5" />
                    <span className="font-medium">Dự án</span>
                </button>
                <button
                    onClick={() => onTabChange("units")}
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                        activeTab === "units" ? "bg-primary text-primary-foreground" : "hover:bg-gray-100 text-gray-700"
                    )}
                >
                    <Home className="h-5 w-5" />
                    <span className="font-medium">Căn hộ</span>
                </button>
            </nav>
        </aside>
    );
}
