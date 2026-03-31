import { useState, useRef, useEffect, useCallback } from "react";
import { Search, MapPin, X, Loader2 } from "lucide-react";
import type { GeocodingResult, LocationData } from "../types/weather";
import { searchCities } from "../lib/api";

interface SearchBarProps {
  onSelectCity: (location: LocationData) => void;
  onRequestLocation: () => void;
  geoLoading: boolean;
}

export function SearchBar({ onSelectCity, onRequestLocation, geoLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const handleSearch = useCallback(async (value: string) => {
    if (value.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setSearching(true);
    try {
      const cities = await searchCities(value);
      setResults(cities);
      setIsOpen(cities.length > 0);
      setHighlightIndex(-1);
    } catch {
      setResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => handleSearch(value), 300);
  };

  const selectCity = (city: GeocodingResult) => {
    onSelectCity({
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
      admin1: city.admin1,
    });
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      const selected = results[highlightIndex];
      if (selected) selectCity(selected);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md mx-auto">
      <div className="relative flex items-center">
        <label htmlFor="city-search" className="sr-only">
          Search for a city
        </label>
        <Search
          size={18}
          className="absolute left-4 text-white/50 pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id="city-search"
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setIsOpen(true)}
          placeholder="Search city..."
          autoComplete="off"
          className="w-full pl-11 pr-20 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/40 text-sm font-body focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
        />
        <div className="absolute right-2 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setResults([]);
                setIsOpen(false);
              }}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
          <button
            type="button"
            onClick={onRequestLocation}
            disabled={geoLoading}
            className="p-2 rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-colors disabled:opacity-40"
            aria-label="Use current location"
          >
            {geoLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <MapPin size={16} />
            )}
          </button>
        </div>
        {searching && (
          <Loader2 size={14} className="absolute right-24 text-white/40 animate-spin" />
        )}
      </div>

      {isOpen && results.length > 0 && (
        <ul
          role="listbox"
          className="absolute z-50 w-full mt-2 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl overflow-hidden"
        >
          {results.map((city, index) => (
            <li
              key={city.id}
              role="option"
              aria-selected={highlightIndex === index}
              className={`px-4 py-2.5 cursor-pointer text-sm font-body transition-colors ${
                highlightIndex === index
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => selectCity(city)}
              onMouseEnter={() => setHighlightIndex(index)}
            >
              <span className="font-medium">{city.name}</span>
              {city.admin1 && (
                <span className="text-white/50">, {city.admin1}</span>
              )}
              <span className="text-white/40"> — {city.country}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
