import { ArrowUpDown, Grid3X3, List } from "lucide-react";
import type { SortOption } from "../types";
import { useShopStore } from "../shopStore";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Populairst" },
  { value: "newest", label: "Nieuwst" },
  { value: "price-asc", label: "Prijs laag → hoog" },
  { value: "price-desc", label: "Prijs hoog → laag" },
  { value: "name-asc", label: "Naam A–Z" },
];

interface SortBarProps {
  resultCount: number;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

export default function SortBar({ resultCount, view, onViewChange }: SortBarProps) {
  const sort = useShopStore((s) => s.sort);
  const setSort = useShopStore((s) => s.setSort);

  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <p className="text-sm text-muted">
        <span className="font-semibold text-strong">{resultCount}</span>{" "}
        {resultCount === 1 ? "product" : "producten"} gevonden
      </p>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1 border border-border rounded-lg p-0.5">
          <button
            onClick={() => onViewChange("grid")}
            className={`p-1.5 rounded-md transition-colors ${
              view === "grid"
                ? "bg-blue-700 text-white"
                : "text-muted hover:text-strong"
            }`}
            aria-label="Raster weergave"
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={`p-1.5 rounded-md transition-colors ${
              view === "list"
                ? "bg-blue-700 text-white"
                : "text-muted hover:text-strong"
            }`}
            aria-label="Lijst weergave"
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-muted hidden sm:block" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="text-sm border border-border rounded-lg px-3 py-2 bg-white text-strong focus:border-blue-700 focus:ring-2 focus:ring-blue-100 outline-none transition-all cursor-pointer"
            aria-label="Sorteer op"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
