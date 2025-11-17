"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";
import { mockGetProjects, mockGetUnits } from "@/lib/mock-data";
import { Project, Unit, ListingFilters, PaginatedResponse } from "@/types";
import { DashboardHeader } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ProjectList } from "@/components/dashboard/project-list";
import { UnitList } from "@/components/dashboard/unit-list";
import { SearchFilters } from "@/components/dashboard/search-filters";

export default function DashboardPage() {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState<"projects" | "units">("projects");
    const [filters, setFilters] = useState<ListingFilters>({
        page: 1,
        limit: 12,
    });

    const { data: projects, isLoading: loadingProjects } = useQuery({
        queryKey: ["projects", filters],
        queryFn: async () => {
            // Using mock data for testing
            return mockGetProjects(filters);

            // Uncomment below to use real API
            // const response = await api.get<PaginatedResponse<Project>>("/projects", {
            //     params: filters,
            // });
            // return response.data;
        },
        enabled: activeTab === "projects",
    });

    const { data: units, isLoading: loadingUnits } = useQuery({
        queryKey: ["units", filters],
        queryFn: async () => {
            // Using mock data for testing
            return mockGetUnits(filters);

            // Uncomment below to use real API
            // const response = await api.get<PaginatedResponse<Unit>>("/units", {
            //     params: filters,
            // });
            // return response.data;
        },
        enabled: activeTab === "units",
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />
            <div className="flex">
                <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
                <main className="flex-1 p-6">
                    <div className="max-w-7xl mx-auto space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Xin chào, {user?.name}!</h1>
                            <p className="text-gray-600 mt-1">Quản lý và tìm kiếm sản phẩm NOXH</p>
                        </div>

                        <SearchFilters filters={filters} onFiltersChange={setFilters} />

                        {activeTab === "projects" && (
                            <ProjectList
                                projects={projects?.data || []}
                                isLoading={loadingProjects}
                                pagination={{
                                    page: projects?.page || 1,
                                    totalPages: projects?.totalPages || 1,
                                    onPageChange: (page) => setFilters({ ...filters, page }),
                                }}
                            />
                        )}

                        {activeTab === "units" && (
                            <UnitList
                                units={units?.data || []}
                                isLoading={loadingUnits}
                                pagination={{
                                    page: units?.page || 1,
                                    totalPages: units?.totalPages || 1,
                                    onPageChange: (page) => setFilters({ ...filters, page }),
                                }}
                            />
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
