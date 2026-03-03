import { X } from "lucide-react";

interface ChipProps {
  label: string;
  onRemove?: () => void;
  active?: boolean;
  onClick?: () => void;
}

export default function Chip({ label, onRemove, active, onClick }: ChipProps) {
  const base =
    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors";
  const activeClass = active
    ? "bg-blue-700 text-white"
    : "bg-background text-muted hover:bg-blue-50 hover:text-blue-700 border border-border";

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${base} ${activeClass}`}>
        {label}
        {onRemove && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.stopPropagation();
                onRemove();
              }
            }}
            className="ml-0.5"
            aria-label={`Verwijder ${label}`}
          >
            <X className="w-3 h-3" />
          </span>
        )}
      </button>
    );
  }

  return (
    <span className={`${base} ${activeClass}`}>
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 hover:text-error"
          aria-label={`Verwijder ${label}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}
