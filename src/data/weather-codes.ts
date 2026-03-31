export interface WeatherCondition {
  label: string;
  icon: string;
  nightIcon?: string;
}

export const weatherCodes: Record<number, WeatherCondition> = {
  0: { label: "Clear sky", icon: "Sun", nightIcon: "Moon" },
  1: { label: "Mainly clear", icon: "Sun", nightIcon: "Moon" },
  2: { label: "Partly cloudy", icon: "CloudSun", nightIcon: "CloudMoon" },
  3: { label: "Overcast", icon: "Cloud" },
  45: { label: "Foggy", icon: "CloudFog" },
  48: { label: "Depositing rime fog", icon: "CloudFog" },
  51: { label: "Light drizzle", icon: "CloudDrizzle" },
  53: { label: "Moderate drizzle", icon: "CloudDrizzle" },
  55: { label: "Dense drizzle", icon: "CloudDrizzle" },
  56: { label: "Freezing drizzle", icon: "CloudDrizzle" },
  57: { label: "Dense freezing drizzle", icon: "CloudDrizzle" },
  61: { label: "Slight rain", icon: "CloudRain" },
  63: { label: "Moderate rain", icon: "CloudRain" },
  65: { label: "Heavy rain", icon: "CloudRain" },
  66: { label: "Freezing rain", icon: "CloudRain" },
  67: { label: "Heavy freezing rain", icon: "CloudRain" },
  71: { label: "Slight snowfall", icon: "CloudSnow" },
  73: { label: "Moderate snowfall", icon: "CloudSnow" },
  75: { label: "Heavy snowfall", icon: "CloudSnow" },
  77: { label: "Snow grains", icon: "CloudSnow" },
  80: { label: "Slight showers", icon: "CloudRain" },
  81: { label: "Moderate showers", icon: "CloudRain" },
  82: { label: "Violent showers", icon: "CloudRain" },
  85: { label: "Slight snow showers", icon: "CloudSnow" },
  86: { label: "Heavy snow showers", icon: "CloudSnow" },
  95: { label: "Thunderstorm", icon: "CloudLightning" },
  96: { label: "Thunderstorm with hail", icon: "CloudLightning" },
  99: { label: "Thunderstorm with heavy hail", icon: "CloudLightning" },
};

export function getWeatherCondition(code: number, isDay: boolean = true): { label: string; icon: string } {
  const condition = weatherCodes[code] ?? { label: "Unknown", icon: "Cloud" };
  const icon = !isDay && condition.nightIcon ? condition.nightIcon : condition.icon;
  return { label: condition.label, icon };
}
