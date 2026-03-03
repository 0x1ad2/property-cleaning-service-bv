import { create } from "zustand";
import type { Filters, SortOption, Product } from "./types";
import { DEFAULT_FILTERS } from "./utils";

interface ShopState {
  filters: Filters;
  sort: SortOption;
  page: number;
  pageSize: number;
  selectedProduct: Product | null;
  isCheckoutOpen: boolean;

  setSearch: (search: string) => void;
  toggleCategory: (category: Filters["categories"][number]) => void;
  setPriceRange: (range: [number, number]) => void;
  toggleInStockOnly: () => void;
  toggleTag: (tag: string) => void;
  resetFilters: () => void;
  setSort: (sort: SortOption) => void;
  setPage: (page: number) => void;
  loadMore: () => void;
  selectProduct: (product: Product | null) => void;
  openCheckout: () => void;
  closeCheckout: () => void;
}

export const useShopStore = create<ShopState>()((set) => ({
  filters: { ...DEFAULT_FILTERS },
  sort: "popular",
  page: 1,
  pageSize: 12,
  selectedProduct: null,
  isCheckoutOpen: false,

  setSearch: (search) =>
    set((s) => ({ filters: { ...s.filters, search }, page: 1 })),

  toggleCategory: (category) =>
    set((s) => {
      const cats = s.filters.categories.includes(category)
        ? s.filters.categories.filter((c) => c !== category)
        : [...s.filters.categories, category];
      return { filters: { ...s.filters, categories: cats }, page: 1 };
    }),

  setPriceRange: (range) =>
    set((s) => ({ filters: { ...s.filters, priceRange: range }, page: 1 })),

  toggleInStockOnly: () =>
    set((s) => ({
      filters: { ...s.filters, inStockOnly: !s.filters.inStockOnly },
      page: 1,
    })),

  toggleTag: (tag) =>
    set((s) => {
      const tags = s.filters.tags.includes(tag)
        ? s.filters.tags.filter((t) => t !== tag)
        : [...s.filters.tags, tag];
      return { filters: { ...s.filters, tags }, page: 1 };
    }),

  resetFilters: () => set({ filters: { ...DEFAULT_FILTERS }, page: 1 }),

  setSort: (sort) => set({ sort, page: 1 }),

  setPage: (page) => set({ page }),

  loadMore: () => set((s) => ({ page: s.page + 1 })),

  selectProduct: (product) => set({ selectedProduct: product }),

  openCheckout: () => set({ isCheckoutOpen: true }),

  closeCheckout: () => set({ isCheckoutOpen: false }),
}));
