import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "../cartStore";
import { useShopStore } from "../shopStore";
import { formatPrice } from "../utils";
import Drawer from "./Drawer";

export default function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getTax = useCartStore((s) => s.getTax);
  const getTotal = useCartStore((s) => s.getTotal);
  const openCheckout = useShopStore((s) => s.openCheckout);

  function handleCheckout() {
    closeCart();
    openCheckout();
  }

  return (
    <Drawer open={isOpen} onClose={closeCart} title="Winkelwagen">
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full px-6 py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-background flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-muted" />
          </div>
          <h3 className="text-lg font-bold text-strong mb-2">
            Uw winkelwagen is leeg
          </h3>
          <p className="text-sm text-muted mb-6">
            Voeg producten toe om te beginnen met winkelen
          </p>
          <button
            onClick={closeCart}
            className="px-6 py-2.5 bg-blue-700 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 transition-colors"
          >
            Verder winkelen
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.map((item) => {
              const variant = item.variantId
                ? item.product.variants?.find((v) => v.id === item.variantId)
                : null;
              const unitPrice = variant?.price ?? item.product.price;

              return (
                <div
                  key={`${item.product.id}-${item.variantId ?? ""}`}
                  className="flex gap-4 p-3 bg-background rounded-xl"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-800 shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-strong truncate">
                      {item.product.name}
                    </h4>
                    {variant && (
                      <p className="text-xs text-muted">{variant.name}</p>
                    )}
                    <p className="text-sm font-bold text-blue-700 mt-1">
                      {formatPrice(unitPrice)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.variantId
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-md border border-border text-muted hover:text-strong hover:border-strong transition-colors"
                          aria-label="Verminder aantal"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-strong">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.variantId
                            )
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-md border border-border text-muted hover:text-strong hover:border-strong transition-colors"
                          aria-label="Verhoog aantal"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.variantId)
                        }
                        className="p-1.5 text-muted hover:text-error transition-colors"
                        aria-label="Verwijder item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary + checkout */}
          <div className="border-t border-border px-6 py-5 space-y-3 bg-white">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotaal</span>
              <span className="font-medium text-strong">
                {formatPrice(getSubtotal())}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted">BTW (21%)</span>
              <span className="font-medium text-strong">
                {formatPrice(getTax())}
              </span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t border-border">
              <span className="font-bold text-strong">Totaal</span>
              <span className="font-bold text-strong">
                {formatPrice(getTotal())}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-md mt-2"
            >
              Afrekenen
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={clearCart}
              className="w-full text-center text-xs text-muted hover:text-error transition-colors py-1"
            >
              Winkelwagen legen
            </button>
          </div>
        </div>
      )}
    </Drawer>
  );
}
