import { motion } from "motion/react";
import { ShoppingCart, Star, Eye } from "lucide-react";
import type { Product } from "../types";
import { formatPrice } from "../utils";
import { useCartStore } from "../cartStore";
import { useShopStore } from "../shopStore";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const selectProduct = useShopStore((s) => s.selectProduct);

  function handleAddToCart(e: React.MouseEvent) {
    e.stopPropagation();
    addItem(product);
    openCart();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-border/50 transition-all duration-300 flex flex-col"
    >
      <div
        className="relative h-56 overflow-hidden cursor-pointer bg-gradient-to-br from-slate-900 to-slate-800"
        onClick={() => selectProduct(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {!product.inStock && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-error/90 text-white text-xs font-semibold rounded-lg">
            Niet op voorraad
          </div>
        )}
        {product.tags.includes("bestseller") && product.inStock && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-blue-700 to-sky-500 text-white text-xs font-semibold rounded-lg">
            Bestseller
          </div>
        )}

        <button
          onClick={() => selectProduct(product)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-lg text-muted hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm"
          aria-label={`Bekijk ${product.name}`}
        >
          <Eye className="w-4 h-4" />
        </button>

        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur px-2 py-1 rounded-lg">
          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium text-white">{product.rating}</span>
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col">
        <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3
          className="text-sm font-bold text-strong mb-1.5 line-clamp-2 cursor-pointer hover:text-blue-700 transition-colors"
          onClick={() => selectProduct(product)}
        >
          {product.name}
        </h3>
        <p className="text-xs text-muted mb-4 line-clamp-2 flex-1">
          {product.shortDescription}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-lg font-bold text-strong">
              {formatPrice(product.price)}
            </span>
            {product.volume && (
              <span className="text-xs text-muted ml-1">/ {product.volume}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-700 text-white text-xs font-semibold rounded-lg hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
            aria-label={`${product.name} toevoegen aan winkelwagen`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Toevoegen</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
