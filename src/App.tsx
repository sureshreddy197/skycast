import { useEffect, useCallback, useRef } from "react";
import { CloudSun } from "lucide-react";
import type { LocationData, TemperatureUnit, SavedCity } from "./types/weather";
import { reverseGeocode } from "./lib/api";
import { getBackgroundGradient } from "./lib/weather-utils";
import { useWeather } from "./hooks/useWeather";
import { useGeolocation } from "./hooks/useGeolocation";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { SearchBar } from "./components/SearchBar";
import { CurrentWeather } from "./components/CurrentWeather";
import { HourlyForecast } from "./components/HourlyForecast";
import { DailyForecast } from "./components/DailyForecast";
import { RecentSearches } from "./components/RecentSearches";
import { UnitToggle } from "./components/UnitToggle";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { EmptyState } from "./components/EmptyState";

const MAX_RECENT = 5;

export default function App() {
  const { data, loading, error, loadWeather } = useWeather();
  const geo = useGeolocation();
  const [unit, setUnit] = useLocalStorage<TemperatureUnit>("skycast-unit", "celsius");
  const [recentCities, setRecentCities] = useLocalStorage<SavedCity[]>("skycast-recent", []);
  const currentLocationRef = useRef<LocationData | null>(null);

  const handleSelectCity = useCallback(
    (location: LocationData) => {
      currentLocationRef.current = location;
      loadWeather(location, unit);

      setRecentCities((prev) => {
        const filtered = prev.filter(
          (c) =>
            !(
              c.latitude.toFixed(2) === location.latitude.toFixed(2) &&
              c.longitude.toFixed(2) === location.longitude.toFixed(2)
            )
        );
        return [
          {
            name: location.name,
            country: location.country,
            latitude: location.latitude,
            longitude: location.longitude,
            admin1: location.admin1,
            timestamp: Date.now(),
          },
          ...filtered,
        ].slice(0, MAX_RECENT);
      });
    },
    [loadWeather, unit, setRecentCities]
  );

  const handleUnitChange = useCallback(
    (newUnit: TemperatureUnit) => {
      setUnit(newUnit);
      if (currentLocationRef.current) {
        loadWeather(currentLocationRef.current, newUnit);
      }
    },
    [setUnit, loadWeather]
  );

  const handleRemoveRecent = useCallback(
    (timestamp: number) => {
      setRecentCities((prev) => prev.filter((c) => c.timestamp !== timestamp));
    },
    [setRecentCities]
  );

  const handleClearRecent = useCallback(() => {
    setRecentCities([]);
  }, [setRecentCities]);

  useEffect(() => {
    if (geo.latitude !== null && geo.longitude !== null) {
      reverseGeocode(geo.latitude, geo.longitude).then((location) => {
        handleSelectCity(location);
      });
    }
  }, [geo.latitude, geo.longitude, handleSelectCity]);

  const bgGradient = data
    ? getBackgroundGradient(data.current.weatherCode, data.current.isDay)
    : "from-slate-900 via-indigo-950 to-slate-900";

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${bgGradient} transition-all duration-1000`}
    >
      <div className="min-h-screen backdrop-blur-0">
        <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10">
          <header className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2.5">
              <CloudSun size={22} className="text-white/60" />
              <h1 className="text-lg font-display font-semibold text-white/80 tracking-tight">
                SkyCast
              </h1>
            </div>
            <UnitToggle unit={unit} onChange={handleUnitChange} />
          </header>

          <div className="mb-8">
            <SearchBar
              onSelectCity={handleSelectCity}
              onRequestLocation={geo.requestLocation}
              geoLoading={geo.loading}
            />
            {geo.error && (
              <p className="text-xs font-body text-red-300/70 text-center mt-2">
                {geo.error}
              </p>
            )}
          </div>

          <main className="space-y-8">
            {loading && <LoadingState />}
            {error && (
              <ErrorState
                message={error}
                onRetry={
                  currentLocationRef.current
                    ? () => loadWeather(currentLocationRef.current!, unit)
                    : undefined
                }
              />
            )}
            {!loading && !error && !data && (
              <>
                <EmptyState />
                <RecentSearches
                  cities={recentCities}
                  onSelect={handleSelectCity}
                  onRemove={handleRemoveRecent}
                  onClear={handleClearRecent}
                />
              </>
            )}
            {!loading && !error && data && (
              <>
                <CurrentWeather data={data} unit={unit} />
                <HourlyForecast hours={data.hourly} unit={unit} />
                <DailyForecast days={data.daily} unit={unit} />
                <RecentSearches
                  cities={recentCities}
                  onSelect={handleSelectCity}
                  onRemove={handleRemoveRecent}
                  onClear={handleClearRecent}
                />
              </>
            )}
          </main>

          <footer className="text-center mt-12 pb-6">
            <p className="text-[11px] font-body text-white/20">
              Weather data by{" "}
              <a
                href="https://open-meteo.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/10 hover:text-white/40 transition-colors"
              >
                Open-Meteo
              </a>
              . No API key required.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
