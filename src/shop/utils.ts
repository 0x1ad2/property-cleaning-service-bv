import type { Product, Filters, SortOption } from "./types";

export function formatPrice(price: number, currency = "EUR"): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency,
  }).format(price);
}

export function filterProducts(products: Product[], filters: Filters): Product[] {
  return products.filter((p) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const match =
        p.name.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filters.categories.length > 0 && !filters.categories.includes(p.category)) {
      return false;
    }

    if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) {
      return false;
    }

    if (filters.inStockOnly && !p.inStock) {
      return false;
    }

    if (filters.tags.length > 0 && !filters.tags.some((t) => p.tags.includes(t))) {
      return false;
    }

    return true;
  });
}

export function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "popular":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "nl"));
    default:
      return sorted;
  }
}

export function generateOrderNumber(): string {
  const prefix = "PCS";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export const DEFAULT_FILTERS: Filters = {
  search: "",
  categories: [],
  priceRange: [0, 200],
  inStockOnly: false,
  tags: [],
};

export function hasActiveFilters(filters: Filters): boolean {
  return (
    filters.search !== "" ||
    filters.categories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 200 ||
    filters.inStockOnly ||
    filters.tags.length > 0
  );
}
