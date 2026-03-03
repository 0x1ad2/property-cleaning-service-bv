export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  currency: string;
  rating: number;
  tags: string[];
  inStock: boolean;
  image: string;
  description: string;
  shortDescription: string;
  variants?: ProductVariant[];
  createdAt: string;
  volume?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
}

export type ProductCategory =
  | "Schoonmaakmiddelen"
  | "Microvezel"
  | "Moppensets"
  | "Emmers & Toebehoren"
  | "Desinfectie"
  | "Beschermingsmiddelen";

export const CATEGORIES: ProductCategory[] = [
  "Schoonmaakmiddelen",
  "Microvezel",
  "Moppensets",
  "Emmers & Toebehoren",
  "Desinfectie",
  "Beschermingsmiddelen",
];

export interface CartItem {
  product: Product;
  quantity: number;
  variantId?: string;
}

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "newest"
  | "popular"
  | "name-asc";

export interface Filters {
  search: string;
  categories: ProductCategory[];
  priceRange: [number, number];
  inStockOnly: boolean;
  tags: string[];
}

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  company: string;
}

export interface AddressDetails {
  street: string;
  zip: string;
  city: string;
  country: string;
}

export type DeliveryOption = "standard" | "express";

export interface DeliveryChoice {
  option: DeliveryOption;
  cost: number;
  label: string;
  estimate: string;
}

export interface OrderDraft {
  customer: CustomerDetails;
  address: AddressDetails;
  delivery: DeliveryChoice;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryCost: number;
  total: number;
}

export interface OrderConfirmation {
  orderNumber: string;
  order: OrderDraft;
  placedAt: string;
}
