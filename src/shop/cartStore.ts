import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "./types";
import { TAX_RATE } from "./data";

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  addItem: (product: Product, variantId?: string) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  getSubtotal: () => number;
  getTax: () => number;
  getTotal: (deliveryCost?: number) => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, variantId) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.product.id === product.id && i.variantId === variantId
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id && i.variantId === variantId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { product, quantity: 1, variantId }],
          };
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.product.id === productId && i.variantId === variantId)
          ),
        }));
      },

      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === productId && i.variantId === variantId
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getSubtotal: () =>
        get().items.reduce((sum, i) => {
          const price =
            i.variantId && i.product.variants
              ? (i.product.variants.find((v) => v.id === i.variantId)?.price ??
                i.product.price)
              : i.product.price;
          return sum + price * i.quantity;
        }, 0),

      getTax: () => get().getSubtotal() * TAX_RATE,

      getTotal: (deliveryCost = 0) =>
        get().getSubtotal() + get().getTax() + deliveryCost,

      getItemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "pcs-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
