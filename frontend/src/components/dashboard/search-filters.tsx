"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";
import { ListingFilters } from "@/types";

interface SearchFiltersProps {
    filters: ListingFilters;
    onFiltersChange: (filters: ListingFilters) => void;
}

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleSearch = () => {
        onFiltersChange({ ...localFilters, page: 1 });
    };

    const handleReset = () => {
        const resetFilters: ListingFilters = { page: 1, limit: 12 };
        setLocalFilters(resetFilters);
        onFiltersChange(resetFilters);
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Tìm kiếm & Lọc</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="search">Từ khóa</Label>
                    <Input id="search" placeholder="Tìm kiếm..." value={localFilters.search || ""} onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="minPrice">Giá tối thiểu (VNĐ)</Label>
                    <Input
                        id="minPrice"
                        type="number"
                        placeholder="0"
                        value={localFilters.minPrice || ""}
                        onChange={(e) =>
                            setLocalFilters({
                                ...localFilters,
                                minPrice: e.target.value ? Number(e.target.value) : undefined,
                            })
                        }
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="maxPrice">Giá tối đa (VNĐ)</Label>
                    <Input
                        id="maxPrice"
                        type="number"
                        placeholder="0"
                        value={localFilters.maxPrice || ""}
                        onChange={(e) =>
                            setLocalFilters({
                                ...localFilters,
                                maxPrice: e.target.value ? Number(e.target.value) : undefined,
                            })
                        }
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="minArea">Diện tích tối thiểu (m²)</Label>
                    <Input
                        id="minArea"
                        type="number"
                        placeholder="0"
                        value={localFilters.minArea || ""}
                        onChange={(e) =>
                            setLocalFilters({
                                ...localFilters,
                                minArea: e.target.value ? Number(e.target.value) : undefined,
                            })
                        }
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="maxArea">Diện tích tối đa (m²)</Label>
                    <Input
                        id="maxArea"
                        type="number"
                        placeholder="0"
                        value={localFilters.maxArea || ""}
                        onChange={(e) =>
                            setLocalFilters({
                                ...localFilters,
                                maxArea: e.target.value ? Number(e.target.value) : undefined,
                            })
                        }
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="bedrooms">Số phòng ngủ</Label>
                    <Input
                        id="bedrooms"
                        type="number"
                        placeholder="0"
                        value={localFilters.bedrooms || ""}
                        onChange={(e) =>
                            setLocalFilters({
                                ...localFilters,
                                bedrooms: e.target.value ? Number(e.target.value) : undefined,
                            })
                        }
                    />
                </div>
            </div>
            <div className="flex gap-2 mt-4">
                <Button onClick={handleSearch}>
                    <Search className="h-4 w-4 mr-2" />
                    Tìm kiếm
                </Button>
                <Button variant="outline" onClick={handleReset}>
                    <X className="h-4 w-4 mr-2" />
                    Xóa bộ lọc
                </Button>
            </div>
        </div>
    );
}
