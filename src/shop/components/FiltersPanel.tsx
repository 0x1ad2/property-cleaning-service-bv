import { Search, X, RotateCcw, Check, Filter } from "lucide-react";
import { CATEGORIES } from "../types";
import { PRICE_MAX } from "../data";
import { useShopStore } from "../shopStore";
import { hasActiveFilters } from "../utils";
import Chip from "./Chip";

export default function FiltersPanel() {
  const filters = useShopStore((s) => s.filters);
  const setSearch = useShopStore((s) => s.setSearch);
  const toggleCategory = useShopStore((s) => s.toggleCategory);
  const setPriceRange = useShopStore((s) => s.setPriceRange);
  const toggleInStockOnly = useShopStore((s) => s.toggleInStockOnly);
  const resetFilters = useShopStore((s) => s.resetFilters);

  const active = hasActiveFilters(filters);

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-strong font-bold">
          <Filter className="w-4 h-4" />
          Filters
        </div>
        {active && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs font-medium text-blue-700 hover:text-blue-800 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        )}
      </div>

      {/* Search */}
      <div>
        <label htmlFor="shop-search" className="text-xs font-semibold text-strong block mb-2">
          Zoeken
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            id="shop-search"
            type="text"
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Zoek producten..."
            className="w-full pl-9 pr-8 py-2.5 text-sm rounded-lg border border-border bg-white focus:border-blue-700 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          />
          {filters.search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-strong"
              aria-label="Wis zoekopdracht"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div>
        <p className="text-xs font-semibold text-strong mb-2">Categorieën</p>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isActive = filters.categories.includes(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-muted hover:bg-background hover:text-strong"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    isActive
                      ? "bg-blue-700 border-blue-700"
                      : "border-border"
                  }`}
                >
                  {isActive && <Check className="w-3 h-3 text-white" />}
                </span>
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price range */}
      <div>
        <p className="text-xs font-semibold text-strong mb-2">
          Prijsbereik:{" "}
          <span className="font-normal text-muted">
            €{filters.priceRange[0]} – €{filters.priceRange[1]}
          </span>
        </p>
        <div className="space-y-3 px-1">
          <div>
            <label className="text-[10px] text-muted uppercase tracking-wider">Min</label>
            <input
              type="range"
              min={0}
              max={PRICE_MAX}
              step={5}
              value={filters.priceRange[0]}
              onChange={(e) =>
                setPriceRange([
                  Math.min(Number(e.target.value), filters.priceRange[1]),
                  filters.priceRange[1],
                ])
              }
              className="w-full accent-blue-700"
            />
          </div>
          <div>
            <label className="text-[10px] text-muted uppercase tracking-wider">Max</label>
            <input
              type="range"
              min={0}
              max={PRICE_MAX}
              step={5}
              value={filters.priceRange[1]}
              onChange={(e) =>
                setPriceRange([
                  filters.priceRange[0],
                  Math.max(Number(e.target.value), filters.priceRange[0]),
                ])
              }
              className="w-full accent-blue-700"
            />
          </div>
        </div>
      </div>

      {/* In-stock toggle */}
      <div>
        <button
          onClick={toggleInStockOnly}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors ${
            filters.inStockOnly
              ? "bg-blue-50 text-blue-700 font-medium"
              : "text-muted hover:bg-background hover:text-strong"
          }`}
        >
          <span
            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
              filters.inStockOnly
                ? "bg-blue-700 border-blue-700"
                : "border-border"
            }`}
          >
            {filters.inStockOnly && <Check className="w-3 h-3 text-white" />}
          </span>
          Alleen op voorraad
        </button>
      </div>

      {/* Active filter chips */}
      {active && (
        <div>
          <p className="text-xs font-semibold text-strong mb-2">Actieve filters</p>
          <div className="flex flex-wrap gap-1.5">
            {filters.search && (
              <Chip
                label={`"${filters.search}"`}
                onRemove={() => setSearch("")}
                active
              />
            )}
            {filters.categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onRemove={() => toggleCategory(cat)}
                active
              />
            ))}
            {filters.inStockOnly && (
              <Chip
                label="Op voorraad"
                onRemove={toggleInStockOnly}
                active
              />
            )}
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < PRICE_MAX) && (
              <Chip
                label={`€${filters.priceRange[0]}–€${filters.priceRange[1]}`}
                onRemove={() => setPriceRange([0, PRICE_MAX])}
                active
              />
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
