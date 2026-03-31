import { Droplets } from "lucide-react";
import type { DailyForecast as DailyForecastType, TemperatureUnit } from "../types/weather";
import { getWeatherCondition } from "../data/weather-codes";
import { formatTemperatureShort, formatDayShort } from "../lib/weather-utils";
import { WeatherIcon } from "./WeatherIcon";

interface DailyForecastProps {
  days: DailyForecastType[];
  unit: TemperatureUnit;
}

export function DailyForecast({ days, unit: _unit }: DailyForecastProps) {
  void _unit;

  const allMaxTemps = days.map((d) => d.tempMax);
  const allMinTemps = days.map((d) => d.tempMin);
  const globalMax = Math.max(...allMaxTemps);
  const globalMin = Math.min(...allMinTemps);
  const range = globalMax - globalMin || 1;

  return (
    <section
      className="animate-slide-up"
      style={{ animationDelay: "0.2s" }}
      aria-label="7-day forecast"
    >
      <h3 className="text-sm font-body font-medium text-white/50 uppercase tracking-wider mb-3">
        7-Day Forecast
      </h3>

      <div className="rounded-2xl bg-white/[0.07] backdrop-blur-sm border border-white/10 divide-y divide-white/[0.06] overflow-hidden">
        {days.map((day) => {
          const condition = getWeatherCondition(day.weatherCode, true);
          const barLeft = ((day.tempMin - globalMin) / range) * 100;
          const barWidth = ((day.tempMax - day.tempMin) / range) * 100;

          return (
            <div
              key={day.date}
              className="grid grid-cols-[70px_28px_1fr_auto] sm:grid-cols-[90px_28px_36px_1fr_auto] items-center gap-2 sm:gap-3 px-4 py-3 hover:bg-white/[0.04] transition-colors"
            >
              <span className="text-sm font-body font-medium text-white/80 truncate">
                {formatDayShort(day.date)}
              </span>

              <WeatherIcon
                name={condition.icon}
                size={18}
                className="text-white/60"
              />

              {day.precipitationChance > 0 ? (
                <span className="hidden sm:flex items-center gap-0.5 text-[11px] font-body text-blue-300/70">
                  <Droplets size={10} />
                  {day.precipitationChance}%
                </span>
              ) : (
                <span className="hidden sm:block" />
              )}

              <div className="flex items-center gap-2">
                <span className="text-xs font-body text-white/40 w-8 text-right tabular-nums">
                  {formatTemperatureShort(day.tempMin)}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-white/10 relative min-w-[60px]">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-blue-400 to-orange-400"
                    style={{
                      left: `${barLeft}%`,
                      width: `${Math.max(barWidth, 4)}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-body text-white/70 w-8 tabular-nums">
                  {formatTemperatureShort(day.tempMax)}
                </span>
              </div>

              <span className="text-[10px] font-body text-white/30 w-10 text-right hidden sm:block">
                UV {Math.round(day.uvIndex)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
