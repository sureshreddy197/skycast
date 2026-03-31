import { Clock, X } from "lucide-react";
import type { SavedCity, LocationData } from "../types/weather";

interface RecentSearchesProps {
  cities: SavedCity[];
  onSelect: (location: LocationData) => void;
  onRemove: (timestamp: number) => void;
  onClear: () => void;
}

export function RecentSearches({ cities, onSelect, onRemove, onClear }: RecentSearchesProps) {
  if (cities.length === 0) return null;

  return (
    <section
      className="animate-slide-up"
      style={{ animationDelay: "0.3s" }}
      aria-label="Recent searches"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-white/50">
          <Clock size={13} />
          <h3 className="text-sm font-body font-medium uppercase tracking-wider">
            Recent
          </h3>
        </div>
        <button
          onClick={onClear}
          className="text-[11px] font-body text-white/30 hover:text-white/60 transition-colors"
          aria-label="Clear all recent searches"
        >
          Clear all
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {cities.map((city) => (
          <div
            key={city.timestamp}
            className="group flex items-center gap-1.5 rounded-xl bg-white/[0.07] border border-white/10 pl-3 pr-1.5 py-1.5 hover:bg-white/[0.12] transition-colors"
          >
            <button
              onClick={() =>
                onSelect({
                  name: city.name,
                  country: city.country,
                  latitude: city.latitude,
                  longitude: city.longitude,
                  admin1: city.admin1,
                })
              }
              className="text-sm font-body text-white/70 hover:text-white transition-colors"
            >
              {city.name}
              <span className="text-white/30 ml-1 text-xs">{city.country}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(city.timestamp);
              }}
              className="p-1 rounded-lg text-white/20 hover:text-white/60 hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all"
              aria-label={`Remove ${city.name} from recent searches`}
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
