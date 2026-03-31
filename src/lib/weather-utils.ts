import type { TemperatureUnit } from "../types/weather";

export function formatTemperature(value: number, unit: TemperatureUnit): string {
  return `${Math.round(value)}°${unit === "celsius" ? "C" : "F"}`;
}

export function formatTemperatureShort(value: number): string {
  return `${Math.round(value)}°`;
}

export function formatWindSpeed(value: number, unit: TemperatureUnit): string {
  return `${Math.round(value)} ${unit === "celsius" ? "km/h" : "mph"}`;
}

export function formatHour(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
}

export function formatDay(isoString: string): string {
  const date = new Date(isoString + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(isoString + "T00:00:00");
  target.setHours(0, 0, 0, 0);

  const diffDays = Math.round(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";

  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function formatDayShort(isoString: string): string {
  const date = new Date(isoString + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(isoString + "T00:00:00");
  target.setHours(0, 0, 0, 0);

  const diffDays = Math.round(
    (target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tmrw";

  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function getBackgroundGradient(weatherCode: number, isDay: boolean): string {
  if (!isDay) {
    return "from-slate-900 via-indigo-950 to-slate-900";
  }

  if (weatherCode <= 1) return "from-sky-400 via-blue-500 to-indigo-600";
  if (weatherCode <= 3) return "from-blue-400 via-slate-400 to-blue-600";
  if (weatherCode <= 48) return "from-slate-400 via-gray-500 to-slate-600";
  if (weatherCode <= 67) return "from-slate-500 via-blue-600 to-slate-700";
  if (weatherCode <= 77) return "from-slate-300 via-blue-200 to-slate-400";
  if (weatherCode <= 82) return "from-slate-600 via-blue-700 to-slate-800";
  return "from-slate-700 via-purple-800 to-slate-900";
}
