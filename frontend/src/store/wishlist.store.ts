import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
    items: string[]; // Array of listing IDs
    addItem: (id: string) => void;
    removeItem: (id: string) => void;
    toggleItem: (id: string) => void;
    isInWishlist: (id: string) => boolean;
    clearAll: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (id) => {
                const currentItems = get().items;
                if (!currentItems.includes(id)) {
                    set({ items: [...currentItems, id] });
                }
            },
            removeItem: (id) => {
                set({ items: get().items.filter((item) => item !== id) });
            },
            toggleItem: (id) => {
                const currentItems = get().items;
                if (currentItems.includes(id)) {
                    set({ items: currentItems.filter((item) => item !== id) });
                } else {
                    set({ items: [...currentItems, id] });
                }
            },
            isInWishlist: (id) => {
                return get().items.includes(id);
            },
            clearAll: () => {
                set({ items: [] });
            },
        }),
        {
            name: "wishlist-storage",
        }
    )
);
