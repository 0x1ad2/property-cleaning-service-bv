import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { ShoppingCart, SlidersHorizontal, X } from "lucide-react";
import { products } from "../shop/data";
import { filterProducts, sortProducts } from "../shop/utils";
import { useShopStore } from "../shop/shopStore";
import { useCartStore } from "../shop/cartStore";
import ProductCard from "../shop/components/ProductCard";
import FiltersPanel from "../shop/components/FiltersPanel";
import SortBar from "../shop/components/SortBar";
import ProductDetailModal from "../shop/components/ProductDetailModal";
import CartDrawer from "../shop/components/CartDrawer";
import CheckoutStepper from "../shop/components/CheckoutStepper";

function Hero() {
  return (
    <section className="relative h-[340px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        <img
          src="/images/optimized/Property cleaning service - AI Image board (1).webp"
          alt="Professionele schoonmaakproducten"
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-3"
        >
          Property Cleaning Service B.V.
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight max-w-3xl"
        >
          Professionele{" "}
          <span className="bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
            Schoonmaakproducten
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-lg text-white/70 max-w-xl"
        >
          Alles wat u nodig heeft voor een schone werkomgeving, direct bestellen
          bij uw vertrouwde partner
        </motion.p>
      </div>
    </section>
  );
}

export default function ShopPage() {
  const filters = useShopStore((s) => s.filters);
  const sort = useShopStore((s) => s.sort);
  const page = useShopStore((s) => s.page);
  const pageSize = useShopStore((s) => s.pageSize);
  const loadMore = useShopStore((s) => s.loadMore);
  const openCart = useCartStore((s) => s.openCart);
  const getItemCount = useCartStore((s) => s.getItemCount);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(
    () => sortProducts(filterProducts(products, filters), sort),
    [filters, sort],
  );
  const displayed = filtered.slice(0, page * pageSize);
  const hasMore = displayed.length < filtered.length;
  const itemCount = getItemCount();

  return (
    <>
      <Hero />

      <section className="py-8 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Desktop filters sidebar */}
            <div className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 bg-white rounded-2xl p-5 shadow-sm border border-border/50">
                <FiltersPanel />
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              <SortBar
                resultCount={filtered.length}
                view={view}
                onViewChange={setView}
              />

              {/* Mobile filter toggle */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setFiltersOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-lg text-sm font-medium text-strong hover:border-blue-300 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
              </div>

              {/* Product grid */}
              {displayed.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center border border-border">
                    <ShoppingCart className="w-10 h-10 text-muted" />
                  </div>
                  <h3 className="text-lg font-bold text-strong mb-2">
                    Geen producten gevonden
                  </h3>
                  <p className="text-sm text-muted">
                    Probeer andere filters of zoektermen
                  </p>
                </div>
              ) : (
                <>
                  <div
                    className={
                      view === "grid"
                        ? "grid sm:grid-cols-2 xl:grid-cols-3 gap-5"
                        : "space-y-4"
                    }
                  >
                    {displayed.map((product, idx) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={idx}
                      />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="text-center mt-10">
                      <button
                        onClick={loadMore}
                        className="px-8 py-3 bg-white border border-border text-sm font-semibold text-strong rounded-lg hover:border-blue-300 hover:text-blue-700 transition-colors shadow-sm"
                      >
                        Meer laden ({filtered.length - displayed.length}{" "}
                        resterende)
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Floating cart button (mobile) */}
      <button
        onClick={openCart}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-blue-700 text-white rounded-full shadow-xl hover:bg-blue-800 transition-colors flex items-center justify-center lg:hidden"
        aria-label="Open winkelwagen"
      >
        <ShoppingCart className="w-6 h-6" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {/* Mobile filters drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setFiltersOpen(false)}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl p-5 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-strong">Filters</span>
              <button
                onClick={() => setFiltersOpen(false)}
                className="p-2 text-muted hover:text-strong"
                aria-label="Sluit filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <FiltersPanel />
          </motion.div>
        </div>
      )}

      {/* Overlays */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutStepper />
    </>
  );
}
