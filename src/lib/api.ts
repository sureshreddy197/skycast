import type {
  GeocodingResponse,
  GeocodingResult,
  WeatherAPIResponse,
  WeatherData,
  LocationData,
  HourlyForecast,
  DailyForecast,
  TemperatureUnit,
} from "../types/weather";

const GEO_BASE = "https://geocoding-api.open-meteo.com/v1";
const WEATHER_BASE = "https://api.open-meteo.com/v1";

export async function searchCities(query: string): Promise<GeocodingResult[]> {
  if (query.trim().length < 2) return [];

  const url = new URL(`${GEO_BASE}/search`);
  url.searchParams.set("name", query.trim());
  url.searchParams.set("count", "6");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Failed to search cities");

  const data: GeocodingResponse = await response.json();
  return data.results ?? [];
}

export async function fetchWeather(
  location: LocationData,
  unit: TemperatureUnit
): Promise<WeatherData> {
  const tempUnit = unit === "celsius" ? "celsius" : "fahrenheit";
  const windUnit = unit === "celsius" ? "kmh" : "mph";

  const url = new URL(`${WEATHER_BASE}/forecast`);
  url.searchParams.set("latitude", location.latitude.toString());
  url.searchParams.set("longitude", location.longitude.toString());
  url.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day"
  );
  url.searchParams.set(
    "hourly",
    "temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,is_day"
  );
  url.searchParams.set(
    "daily",
    "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_probability_max"
  );
  url.searchParams.set("temperature_unit", tempUnit);
  url.searchParams.set("wind_speed_unit", windUnit);
  url.searchParams.set("timezone", "auto");
  url.searchParams.set("forecast_days", "7");

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Failed to fetch weather data");

  const raw: WeatherAPIResponse = await response.json();
  return transformWeatherData(raw, location);
}

function transformWeatherData(
  raw: WeatherAPIResponse,
  location: LocationData
): WeatherData {
  const now = new Date();
  const currentHourIndex = raw.hourly.time.findIndex((t) => {
    const hourDate = new Date(t);
    return hourDate >= now;
  });

  const startIdx = Math.max(0, currentHourIndex);
  const hourly: HourlyForecast[] = raw.hourly.time
    .slice(startIdx, startIdx + 24)
    .map((time, i) => {
      const idx = startIdx + i;
      return {
        time,
        temperature: raw.hourly.temperature_2m[idx]!,
        weatherCode: raw.hourly.weather_code[idx]!,
        humidity: raw.hourly.relative_humidity_2m[idx]!,
        windSpeed: raw.hourly.wind_speed_10m[idx]!,
        isDay: raw.hourly.is_day[idx] === 1,
      };
    });

  const daily: DailyForecast[] = raw.daily.time.map((date, i) => ({
    date,
    weatherCode: raw.daily.weather_code[i]!,
    tempMax: raw.daily.temperature_2m_max[i]!,
    tempMin: raw.daily.temperature_2m_min[i]!,
    sunrise: raw.daily.sunrise[i]!,
    sunset: raw.daily.sunset[i]!,
    uvIndex: raw.daily.uv_index_max[i]!,
    precipitationChance: raw.daily.precipitation_probability_max[i]!,
  }));

  return {
    current: {
      temperature: raw.current.temperature_2m,
      humidity: raw.current.relative_humidity_2m,
      apparentTemperature: raw.current.apparent_temperature,
      weatherCode: raw.current.weather_code,
      windSpeed: raw.current.wind_speed_10m,
      isDay: raw.current.is_day === 1,
    },
    hourly,
    daily,
    location,
  };
}

export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<LocationData> {
  const url = new URL(`${GEO_BASE}/search`);
  url.searchParams.set("name", `${latitude.toFixed(2)},${longitude.toFixed(2)}`);
  url.searchParams.set("count", "1");
  url.searchParams.set("language", "en");
  url.searchParams.set("format", "json");

  const response = await fetch(url.toString());
  if (!response.ok) {
    return {
      name: "Current Location",
      country: "",
      latitude,
      longitude,
    };
  }

  const data: GeocodingResponse = await response.json();
  const result = data.results?.[0];
  if (!result) {
    return {
      name: "Current Location",
      country: "",
      latitude,
      longitude,
    };
  }

  return {
    name: result.name,
    country: result.country,
    latitude: result.latitude,
    longitude: result.longitude,
    admin1: result.admin1,
  };
}
