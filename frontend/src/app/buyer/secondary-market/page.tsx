"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Store,
    Search,
    Filter,
    MapPin,
    Bed,
    Bath,
    Square,
    TrendingUp,
    Heart,
    Eye,
    AlertCircle,
    Star,
    Sparkles,
    ArrowUpDown,
    Grid3x3,
    List,
    X,
    Save,
    History,
    Clock,
    Trash2,
    Bookmark,
} from "lucide-react";
import Link from "next/link";
import { mockGetListings } from "@/lib/mock-data";
import { useAuthStore } from "@/store/auth.store";
import { useWishlistStore } from "@/store/wishlist.store";
import { toast } from "sonner";
import { searchFilterUtils } from "@/lib/search-filter-utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function SecondaryMarketPage() {
    const { user } = useAuthStore();
    const isBuyer = user?.role === "BUYER";
    const baseRole = isBuyer ? "buyer" : "admin";
    const { items: wishlistIds, toggleItem, isInWishlist } = useWishlistStore();
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState("newest");
    const [filters, setFilters] = useState({
        search: "",
        minPrice: "",
        maxPrice: "",
        minArea: "",
        maxArea: "",
        bedrooms: "",
        legalStatus: "",
        status: "ACTIVE",
    });
    const [showSaveFilterModal, setShowSaveFilterModal] = useState(false);
    const [showHistoryModal, setShowHistoryModal] = useState(false);
    const [filterName, setFilterName] = useState("");
    const [savedFilters, setSavedFilters] = useState(searchFilterUtils.getSavedFilters());
    const [searchHistory, setSearchHistory] = useState(searchFilterUtils.getSearchHistory());

    useEffect(() => {
        // Update saved filters and history when they change
        setSavedFilters(searchFilterUtils.getSavedFilters());
        setSearchHistory(searchFilterUtils.getSearchHistory());
    }, []);

    const activeFilterCount = searchFilterUtils.getActiveFilterCount(filters);

    const handleWishlistToggle = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleItem(id);
        toast.success(isInWishlist(id) ? "Đã xóa khỏi yêu thích" : "Đã thêm vào yêu thích");
    };

    const { data: listings, isLoading } = useQuery({
        queryKey: ["marketplace-listings", filters],
        queryFn: async () => {
            // Add to search history when filters are applied
            if (activeFilterCount > 0) {
                searchFilterUtils.addToHistory(filters);
                setSearchHistory(searchFilterUtils.getSearchHistory());
            }

            return mockGetListings({
                status: filters.status,
                minPrice: filters.minPrice ? parseInt(filters.minPrice) : undefined,
                maxPrice: filters.maxPrice ? parseInt(filters.maxPrice) : undefined,
            });
        },
    });

    const handleFilterChange = (key: string, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    // Sort listings
    const sortedListings = listings?.data
        ? [...listings.data].sort((a: any, b: any) => {
              switch (sortBy) {
                  case "price-asc":
                      return a.price - b.price;
                  case "price-desc":
                      return b.price - a.price;
                  case "area-desc":
                      return (b.area || 0) - (a.area || 0);
                  case "views-desc":
                      return (b.viewCount || 0) - (a.viewCount || 0);
                  case "newest":
                  default:
                      return 0;
              }
          })
        : [];

    // Featured listings (top 3 by views)
    const featuredListings = listings?.data ? [...listings.data].sort((a: any, b: any) => (b.viewCount || 0) - (a.viewCount || 0)).slice(0, 3) : [];

    return (
        <div className="min-h-screen bg-gray-50">
            <DashboardHeader />

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Thị trường Thứ cấp</h1>
                        <p className="text-gray-600">Mua bán căn hộ NOXH qua sử dụng giữa các cá nhân</p>
                    </div>
                    {isBuyer && (
                        <Link href={`/${baseRole}/wishlist`}>
                            <Button variant="outline" size="lg">
                                <Heart className="h-5 w-5 mr-2" />
                                Danh sách yêu thích
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Tổng tin đang bán</CardDescription>
                            <CardTitle className="text-4xl">{listings?.total || 0}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-green-600">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                <span>+12% tuần này</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Giá trung bình</CardDescription>
                            <CardTitle className="text-3xl">1.2 tỷ</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">VNĐ/căn</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Giao dịch tháng này</CardDescription>
                            <CardTitle className="text-4xl">24</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">Căn đã bán</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardDescription>Thời gian trung bình</CardDescription>
                            <CardTitle className="text-3xl">45</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-600">Ngày để bán</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Featured Listings */}
                {featuredListings.length > 0 && (
                    <Card className="border-l-4 border-l-orange-500 bg-white">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-orange-600" />
                                <CardTitle>Căn hộ nổi bật</CardTitle>
                            </div>
                            <CardDescription>Những căn hộ được quan tâm nhiều nhất</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {featuredListings.map((listing: any) => (
                                    <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                                        <div className="relative h-48 bg-gray-200">
                                            <img
                                                src={listing.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&auto=format"}
                                                alt={listing.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-2 left-2">
                                                <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                                                    <Star className="h-3 w-3 fill-current" />
                                                    Nổi bật
                                                </span>
                                            </div>
                                            <div className="absolute top-2 right-2">
                                                <span className="bg-black/60 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    {listing.viewCount}
                                                </span>
                                            </div>
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="font-bold line-clamp-1 mb-2">{listing.title}</h3>
                                            <div className="flex items-center text-xs text-gray-600 mb-2">
                                                <MapPin className="h-3 w-3 mr-1" />
                                                <span className="line-clamp-1">Quận 9, TP. HCM</span>
                                            </div>
                                            <div className="flex items-baseline gap-1 mb-3">
                                                <span className="text-xl font-bold text-orange-600">{(listing.price / 1000000000).toFixed(2)}</span>
                                                <span className="text-sm text-gray-600">tỷ VNĐ</span>
                                            </div>
                                            <Link href={`/${baseRole}/secondary-market/${listing.id}`}>
                                                <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                                                    <Eye className="h-4 w-4 mr-2" />
                                                    Xem ngay
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Filter className="h-5 w-5" />
                                Bộ lọc tìm kiếm
                                {activeFilterCount > 0 && <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">{activeFilterCount}</span>}
                            </CardTitle>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" onClick={() => setShowHistoryModal(true)}>
                                    <History className="h-4 w-4 mr-2" />
                                    Lịch sử
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        if (activeFilterCount > 0) {
                                            setShowSaveFilterModal(true);
                                        } else {
                                            toast.error("Vui lòng chọn ít nhất một bộ lọc để lưu");
                                        }
                                    }}
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Lưu bộ lọc
                                </Button>
                                {activeFilterCount > 0 && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setFilters({
                                                search: "",
                                                minPrice: "",
                                                maxPrice: "",
                                                minArea: "",
                                                maxArea: "",
                                                bedrooms: "",
                                                legalStatus: "",
                                                status: "ACTIVE",
                                            });
                                            toast.success("Đã xóa tất cả bộ lọc");
                                        }}
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Xóa tất cả
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Filter Chips */}
                        {activeFilterCount > 0 && (
                            <div className="flex flex-wrap gap-2 pb-4 border-b">
                                {Object.entries(filters).map(([key, value]) => {
                                    if (!value || key === "status") return null;
                                    return (
                                        <div key={key} className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200">
                                            <span>{searchFilterUtils.formatFilterLabel(key, value)}</span>
                                            <button onClick={() => handleFilterChange(key, "")} className="hover:bg-blue-100 rounded-full p-0.5">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Saved Filters */}
                        {savedFilters.length > 0 && (
                            <div className="space-y-2">
                                <Label className="text-sm font-medium flex items-center gap-2">
                                    <Bookmark className="h-4 w-4" />
                                    Bộ lọc đã lưu
                                </Label>
                                <div className="flex flex-wrap gap-2">
                                    {savedFilters.slice(0, 3).map((saved) => (
                                        <Button
                                            key={saved.id}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setFilters({ ...filters, ...saved.filters });
                                                toast.success(`Đã áp dụng bộ lọc "${saved.name}"`);
                                            }}
                                        >
                                            {saved.name}
                                        </Button>
                                    ))}
                                    {savedFilters.length > 3 && (
                                        <Button variant="ghost" size="sm" onClick={() => setShowHistoryModal(true)}>
                                            +{savedFilters.length - 3} khác
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            <div className="lg:col-span-2">
                                <Label htmlFor="search">Tìm kiếm</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input id="search" placeholder="Tên dự án, địa chỉ..." className="pl-10" value={filters.search} onChange={(e) => handleFilterChange("search", e.target.value)} />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="minPrice">Giá từ (triệu)</Label>
                                <Input id="minPrice" type="number" placeholder="800" value={filters.minPrice} onChange={(e) => handleFilterChange("minPrice", e.target.value)} />
                            </div>

                            <div>
                                <Label htmlFor="maxPrice">Đến (triệu)</Label>
                                <Input id="maxPrice" type="number" placeholder="1500" value={filters.maxPrice} onChange={(e) => handleFilterChange("maxPrice", e.target.value)} />
                            </div>

                            <div>
                                <Label htmlFor="bedrooms">Phòng ngủ</Label>
                                <select id="bedrooms" className="w-full px-3 py-2 border rounded-md" value={filters.bedrooms} onChange={(e) => handleFilterChange("bedrooms", e.target.value)}>
                                    <option value="">Tất cả</option>
                                    <option value="1">1 phòng</option>
                                    <option value="2">2 phòng</option>
                                    <option value="3">3 phòng</option>
                                    <option value="4">4+ phòng</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Listings Grid */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">{sortedListings.length} căn hộ đang bán</h2>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Label className="text-sm">Sắp xếp:</Label>
                                <select className="px-3 py-2 border rounded-md text-sm" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <option value="newest">Mới nhất</option>
                                    <option value="price-asc">Giá thấp đến cao</option>
                                    <option value="price-desc">Giá cao đến thấp</option>
                                    <option value="area-desc">Diện tích lớn nhất</option>
                                    <option value="views-desc">Xem nhiều nhất</option>
                                </select>
                            </div>
                            <div className="flex gap-1 border rounded-md p-1">
                                <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
                                    <Grid3x3 className="h-4 w-4" />
                                </Button>
                                <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-gray-600">Đang tải...</p>
                        </div>
                    ) : sortedListings.length > 0 ? (
                        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                            {sortedListings.map((listing: any) => (
                                <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                                    <div className="relative h-48 bg-gray-200">
                                        <img
                                            src={listing.images?.[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&auto=format"}
                                            alt={listing.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-3 right-3 flex gap-2">
                                            <button className="bg-white p-2 rounded-full shadow hover:bg-gray-100 transition-colors" onClick={(e) => handleWishlistToggle(listing.id, e)}>
                                                <Heart className={`h-4 w-4 ${isInWishlist(listing.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                                            </button>
                                        </div>
                                        <div className="absolute bottom-3 left-3">
                                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">Cá nhân bán</span>
                                        </div>
                                    </div>

                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-lg mb-2 line-clamp-1">{listing.title}</h3>

                                        <div className="flex items-center text-gray-600 text-sm mb-3">
                                            <MapPin className="h-4 w-4 mr-1" />
                                            <span className="line-clamp-1">Dự án Kim Oanh Green Park</span>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                                            <div className="flex items-center gap-1">
                                                <Bed className="h-4 w-4 text-gray-500" />
                                                <span>2 PN</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Bath className="h-4 w-4 text-gray-500" />
                                                <span>2 WC</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Square className="h-4 w-4 text-gray-500" />
                                                <span>65m²</span>
                                            </div>
                                        </div>

                                        <div className="border-t pt-3 mb-3">
                                            <div className="flex items-baseline justify-between">
                                                <div>
                                                    <span className="text-2xl font-bold text-blue-600">{(listing.price / 1000000).toFixed(1)}</span>
                                                    <span className="text-gray-600 ml-1">tỷ VNĐ</span>
                                                </div>
                                                {listing.originalPrice && (
                                                    <div className="text-sm">
                                                        <span className="text-gray-500 line-through">{(listing.originalPrice / 1000000).toFixed(1)} tỷ</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">~{(listing.price / 65).toLocaleString("vi-VN")} VNĐ/m²</p>
                                        </div>

                                        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                                            <div className="flex items-center gap-1">
                                                <Eye className="h-4 w-4" />
                                                <span>{listing.viewCount} lượt xem</span>
                                            </div>
                                            <span>2 ngày trước</span>
                                        </div>

                                        <div className="flex gap-2">
                                            <Link href={`/buyer/secondary-market/${listing.id}`} className="flex-1">
                                                <Button className="w-full">Xem chi tiết</Button>
                                            </Link>
                                            <Button variant="outline" size="icon">
                                                <Heart className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="p-12">
                            <div className="text-center">
                                <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy căn hộ phù hợp</h3>
                                <p className="text-gray-600 mb-4">Thử điều chỉnh bộ lọc để xem thêm kết quả</p>
                                <Button
                                    onClick={() =>
                                        setFilters({
                                            search: "",
                                            minPrice: "",
                                            maxPrice: "",
                                            minArea: "",
                                            maxArea: "",
                                            bedrooms: "",
                                            legalStatus: "",
                                            status: "ACTIVE",
                                        })
                                    }
                                >
                                    Xóa bộ lọc
                                </Button>
                            </div>
                        </Card>
                    )}
                </div>
            </main>

            {/* Save Filter Modal */}
            <Dialog open={showSaveFilterModal} onOpenChange={setShowSaveFilterModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Lưu bộ lọc</DialogTitle>
                        <DialogDescription>Đặt tên cho bộ lọc này để sử dụng lại sau</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="filter-name">Tên bộ lọc</Label>
                            <Input id="filter-name" value={filterName} onChange={(e) => setFilterName(e.target.value)} placeholder="VD: Căn 2PN giá tốt Quận 9" autoFocus />
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                            <p className="text-sm font-medium">Bộ lọc hiện tại:</p>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(filters).map(([key, value]) => {
                                    if (!value || key === "status") return null;
                                    return (
                                        <span key={key} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                            {searchFilterUtils.formatFilterLabel(key, value)}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowSaveFilterModal(false)}>
                            Hủy
                        </Button>
                        <Button
                            onClick={() => {
                                if (!filterName.trim()) {
                                    toast.error("Vui lòng nhập tên bộ lọc");
                                    return;
                                }
                                searchFilterUtils.saveFilter(filterName, filters);
                                setSavedFilters(searchFilterUtils.getSavedFilters());
                                setFilterName("");
                                setShowSaveFilterModal(false);
                                toast.success("Đã lưu bộ lọc thành công!");
                            }}
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Lưu
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* History & Saved Filters Modal */}
            <Dialog open={showHistoryModal} onOpenChange={setShowHistoryModal}>
                <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Lịch sử & Bộ lọc đã lưu</DialogTitle>
                        <DialogDescription>Quản lý các bộ lọc và lịch sử tìm kiếm của bạn</DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* Saved Filters */}
                        {savedFilters.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <Bookmark className="h-4 w-4" />
                                        Bộ lọc đã lưu ({savedFilters.length})
                                    </h3>
                                </div>
                                <div className="space-y-2">
                                    {savedFilters.map((saved) => (
                                        <div key={saved.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                                            <div className="flex-1">
                                                <p className="font-medium">{saved.name}</p>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {Object.entries(saved.filters).map(([key, value]) => {
                                                        if (!value || key === "status") return null;
                                                        return (
                                                            <span key={key} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                                                {searchFilterUtils.formatFilterLabel(key, value)}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() => {
                                                        setFilters({ ...filters, ...saved.filters });
                                                        setShowHistoryModal(false);
                                                        toast.success(`Đã áp dụng "${saved.name}"`);
                                                    }}
                                                >
                                                    Áp dụng
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => {
                                                        searchFilterUtils.deleteSavedFilter(saved.id);
                                                        setSavedFilters(searchFilterUtils.getSavedFilters());
                                                        toast.success("Đã xóa bộ lọc");
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Search History */}
                        {searchHistory.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        Lịch sử tìm kiếm ({searchHistory.length})
                                    </h3>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => {
                                            searchFilterUtils.clearHistory();
                                            setSearchHistory([]);
                                            toast.success("Đã xóa lịch sử");
                                        }}
                                    >
                                        Xóa tất cả
                                    </Button>
                                </div>
                                <div className="space-y-2">
                                    {searchHistory.map((history) => (
                                        <div key={history.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                                            <div className="flex-1">
                                                <div className="flex flex-wrap gap-1">
                                                    {Object.entries(history.filters).map(([key, value]) => {
                                                        if (!value || key === "status") return null;
                                                        return (
                                                            <span key={key} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                                                {searchFilterUtils.formatFilterLabel(key, value)}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">{new Date(history.timestamp).toLocaleString("vi-VN")}</p>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => {
                                                    setFilters({ ...filters, ...history.filters });
                                                    setShowHistoryModal(false);
                                                    toast.success("Đã áp dụng lịch sử tìm kiếm");
                                                }}
                                            >
                                                Áp dụng
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {savedFilters.length === 0 && searchHistory.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <History className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                                <p>Chưa có lịch sử hoặc bộ lọc đã lưu</p>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button onClick={() => setShowHistoryModal(false)}>Đóng</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
