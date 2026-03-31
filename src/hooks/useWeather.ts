import { useState, useCallback } from "react";
import type { WeatherData, LocationData, TemperatureUnit } from "../types/weather";
import { fetchWeather } from "../lib/api";

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export function useWeather() {
  const [state, setState] = useState<WeatherState>({
    data: null,
    loading: false,
    error: null,
  });

  const loadWeather = useCallback(async (location: LocationData, unit: TemperatureUnit) => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await fetchWeather(location, unit);
      setState({ data, loading: false, error: null });
    } catch {
      setState({ data: null, loading: false, error: "Failed to load weather data. Please try again." });
    }
  }, []);

  return { ...state, loadWeather };
}
