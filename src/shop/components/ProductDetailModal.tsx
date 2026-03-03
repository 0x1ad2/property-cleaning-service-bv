import { useState } from "react";
import { Star, ShoppingCart, Package, Check } from "lucide-react";
import { formatPrice } from "../utils";
import { useCartStore } from "../cartStore";
import { useShopStore } from "../shopStore";
import Modal from "./Modal";

export default function ProductDetailModal() {
  const product = useShopStore((s) => s.selectedProduct);
  const selectProduct = useShopStore((s) => s.selectProduct);
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    undefined,
  );
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const activeVariant = product.variants?.find((v) => v.id === selectedVariant);
  const displayPrice = activeVariant?.price ?? product.price;

  function handleAdd() {
    addItem(product!, selectedVariant);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      selectProduct(null);
      openCart();
    }, 600);
  }

  function handleClose() {
    setSelectedVariant(undefined);
    setAdded(false);
    selectProduct(null);
  }

  return (
    <Modal open={!!product} onClose={handleClose} size="lg">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="relative h-72 md:h-full min-h-[320px] bg-gradient-to-br from-slate-900 to-slate-800">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {!product.inStock && (
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-error/90 text-white text-sm font-semibold rounded-lg">
              Niet op voorraad
            </div>
          )}
          {product.tags.includes("bestseller") && product.inStock && (
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-blue-700 to-sky-500 text-white text-sm font-semibold rounded-lg">
              Bestseller
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-6 md:p-8 flex flex-col">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
            {product.category}
          </p>
          <h2 className="text-2xl font-bold text-strong mb-3">
            {product.name}
          </h2>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-muted">
              {product.rating} / 5
            </span>
          </div>

          <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
            {product.description}
          </p>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-semibold text-strong mb-2">Variant</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant.id)}
                    className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                      selectedVariant === variant.id
                        ? "border-blue-700 bg-blue-50 text-blue-700 font-medium"
                        : "border-border text-muted hover:border-blue-300 hover:text-strong"
                    }`}
                  >
                    {variant.name} — {formatPrice(variant.price)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 bg-background text-xs text-muted rounded-full border border-border"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stock indicator */}
          <div className="flex items-center gap-2 mb-6">
            <Package className="w-4 h-4 text-muted" />
            <span
              className={`text-sm font-medium ${
                product.inStock ? "text-success" : "text-error"
              }`}
            >
              {product.inStock ? "Op voorraad" : "Niet op voorraad"}
            </span>
          </div>

          {/* Price + Add to cart */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <span className="text-2xl font-bold text-strong">
                {formatPrice(displayPrice)}
              </span>
              {product.volume && (
                <span className="text-sm text-muted ml-1">
                  / {product.volume}
                </span>
              )}
            </div>
            <button
              onClick={handleAdd}
              disabled={!product.inStock || added}
              className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all shadow-sm ${
                added
                  ? "bg-success text-white"
                  : "bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  Toegevoegd
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Toevoegen
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
