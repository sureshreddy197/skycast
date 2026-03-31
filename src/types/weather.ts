export interface GeocodingResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  country_code: string;
  admin1?: string;
}

export interface GeocodingResponse {
  results?: GeocodingResult[];
}

export interface CurrentWeatherAPI {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
  is_day: number;
}

export interface HourlyWeatherAPI {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  relative_humidity_2m: number[];
  wind_speed_10m: number[];
  is_day: number[];
}

export interface DailyWeatherAPI {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
  precipitation_probability_max: number[];
}

export interface WeatherAPIResponse {
  latitude: number;
  longitude: number;
  current: CurrentWeatherAPI;
  hourly: HourlyWeatherAPI;
  daily: DailyWeatherAPI;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  isDay: boolean;
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  sunrise: string;
  sunset: string;
  uvIndex: number;
  precipitationChance: number;
}

export interface CurrentWeather {
  temperature: number;
  humidity: number;
  apparentTemperature: number;
  weatherCode: number;
  windSpeed: number;
  isDay: boolean;
}

export interface WeatherData {
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  location: LocationData;
}

export interface LocationData {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
}

export type TemperatureUnit = "celsius" | "fahrenheit";

export interface SavedCity {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
  timestamp: number;
}
