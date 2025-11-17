// Utility for managing search filter history and saved filters

export interface SearchFilter {
    id: string;
    name?: string;
    timestamp: number;
    filters: {
        search?: string;
        minPrice?: string;
        maxPrice?: string;
        minArea?: string;
        maxArea?: string;
        bedrooms?: string;
        legalStatus?: string;
        status?: string;
    };
}

const SEARCH_HISTORY_KEY = "search-history";
const SAVED_FILTERS_KEY = "saved-filters";
const MAX_HISTORY = 10;

export const searchFilterUtils = {
    // Search History
    getSearchHistory: (): SearchFilter[] => {
        if (typeof window === "undefined") return [];
        const history = localStorage.getItem(SEARCH_HISTORY_KEY);
        return history ? JSON.parse(history) : [];
    },

    addToHistory: (filters: SearchFilter["filters"]) => {
        if (typeof window === "undefined") return;

        const history = searchFilterUtils.getSearchHistory();
        const newEntry: SearchFilter = {
            id: Date.now().toString(),
            timestamp: Date.now(),
            filters,
        };

        // Remove duplicates and add to beginning
        const filtered = history.filter((item) => JSON.stringify(item.filters) !== JSON.stringify(filters));
        const updated = [newEntry, ...filtered].slice(0, MAX_HISTORY);

        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
    },

    clearHistory: () => {
        if (typeof window === "undefined") return;
        localStorage.removeItem(SEARCH_HISTORY_KEY);
    },

    // Saved Filters
    getSavedFilters: (): SearchFilter[] => {
        if (typeof window === "undefined") return [];
        const saved = localStorage.getItem(SAVED_FILTERS_KEY);
        return saved ? JSON.parse(saved) : [];
    },

    saveFilter: (name: string, filters: SearchFilter["filters"]) => {
        if (typeof window === "undefined") return;

        const saved = searchFilterUtils.getSavedFilters();
        const newFilter: SearchFilter = {
            id: Date.now().toString(),
            name,
            timestamp: Date.now(),
            filters,
        };

        const updated = [newFilter, ...saved];
        localStorage.setItem(SAVED_FILTERS_KEY, JSON.stringify(updated));
    },

    deleteSavedFilter: (id: string) => {
        if (typeof window === "undefined") return;

        const saved = searchFilterUtils.getSavedFilters();
        const updated = saved.filter((item) => item.id !== id);
        localStorage.setItem(SAVED_FILTERS_KEY, JSON.stringify(updated));
    },

    // Active filters count
    getActiveFilterCount: (filters: SearchFilter["filters"]): number => {
        return Object.entries(filters).filter(([key, value]) => {
            if (key === "status") return false; // Don't count default status
            return value !== "" && value !== undefined && value !== null;
        }).length;
    },

    // Format filter for display
    formatFilterLabel: (key: string, value: string): string => {
        const labels: Record<string, string> = {
            search: "Tìm kiếm",
            minPrice: "Giá từ",
            maxPrice: "Giá đến",
            minArea: "Diện tích từ",
            maxArea: "Diện tích đến",
            bedrooms: "Phòng ngủ",
            legalStatus: "Pháp lý",
        };

        const label = labels[key] || key;

        if (key.includes("Price")) {
            return `${label}: ${(parseInt(value) / 1000000000).toFixed(1)}tỷ`;
        }
        if (key.includes("Area")) {
            return `${label}: ${value}m²`;
        }
        if (key === "bedrooms") {
            return `${value} phòng ngủ`;
        }

        return `${label}: ${value}`;
    },
};
