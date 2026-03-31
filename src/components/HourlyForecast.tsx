import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HourlyForecast as HourlyForecastType, TemperatureUnit } from "../types/weather";
import { getWeatherCondition } from "../data/weather-codes";
import { formatTemperatureShort, formatHour } from "../lib/weather-utils";
import { WeatherIcon } from "./WeatherIcon";

interface HourlyForecastProps {
  hours: HourlyForecastType[];
  unit: TemperatureUnit;
}

export function HourlyForecast({ hours, unit: _unit }: HourlyForecastProps) {
  void _unit;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 200;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="animate-slide-up"
      style={{ animationDelay: "0.1s" }}
      aria-label="Hourly forecast"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-body font-medium text-white/50 uppercase tracking-wider">
          Hourly Forecast
        </h3>
        <div className="flex gap-1">
          <button
            onClick={() => scroll("left")}
            className="p-1.5 rounded-lg bg-white/[0.07] hover:bg-white/[0.15] text-white/50 hover:text-white transition-colors"
            aria-label="Scroll hourly forecast left"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1.5 rounded-lg bg-white/[0.07] hover:bg-white/[0.15] text-white/50 hover:text-white transition-colors"
            aria-label="Scroll hourly forecast right"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1"
        role="list"
      >
        {hours.map((hour, index) => {
          const condition = getWeatherCondition(hour.weatherCode, hour.isDay);
          return (
            <div
              key={hour.time}
              role="listitem"
              className="flex-shrink-0 w-[72px] rounded-2xl bg-white/[0.07] backdrop-blur-sm border border-white/10 px-3 py-4 text-center transition-colors hover:bg-white/[0.12]"
            >
              <p className="text-[11px] font-body text-white/45 mb-2.5">
                {index === 0 ? "Now" : formatHour(hour.time)}
              </p>
              <WeatherIcon
                name={condition.icon}
                size={20}
                className="text-white/70 mx-auto mb-2.5"
              />
              <p className="text-sm font-display font-medium text-white">
                {formatTemperatureShort(hour.temperature)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
