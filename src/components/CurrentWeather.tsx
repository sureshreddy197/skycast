import { Droplets, Wind, Thermometer, Eye } from "lucide-react";
import type { WeatherData, TemperatureUnit } from "../types/weather";
import { getWeatherCondition } from "../data/weather-codes";
import { formatTemperature, formatTemperatureShort, formatWindSpeed } from "../lib/weather-utils";
import { WeatherIcon } from "./WeatherIcon";

interface CurrentWeatherProps {
  data: WeatherData;
  unit: TemperatureUnit;
}

export function CurrentWeather({ data, unit }: CurrentWeatherProps) {
  const { current, location, daily } = data;
  const condition = getWeatherCondition(current.weatherCode, current.isDay);
  const todayForecast = daily[0];

  return (
    <section
      className="animate-fade-in text-center"
      aria-label="Current weather conditions"
    >
      <div className="mb-1">
        <h2 className="text-2xl md:text-3xl font-display font-semibold text-white tracking-tight">
          {location.name}
        </h2>
        <p className="text-sm text-white/50 font-body mt-0.5">
          {location.admin1 ? `${location.admin1}, ` : ""}
          {location.country}
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 my-4">
        <WeatherIcon name={condition.icon} size={48} className="text-white/90" />
        <span className="text-7xl md:text-8xl font-display font-light text-white tracking-tighter leading-none">
          {formatTemperatureShort(current.temperature)}
        </span>
      </div>

      <p className="text-base text-white/70 font-body font-medium mb-1">
        {condition.label}
      </p>

      {todayForecast && (
        <p className="text-sm text-white/45 font-body">
          H: {formatTemperatureShort(todayForecast.tempMax)} &nbsp;
          L: {formatTemperatureShort(todayForecast.tempMin)}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
        <DetailCard
          icon={<Thermometer size={16} />}
          label="Feels like"
          value={formatTemperature(current.apparentTemperature, unit)}
        />
        <DetailCard
          icon={<Droplets size={16} />}
          label="Humidity"
          value={`${current.humidity}%`}
        />
        <DetailCard
          icon={<Wind size={16} />}
          label="Wind"
          value={formatWindSpeed(current.windSpeed, unit)}
        />
        <DetailCard
          icon={<Eye size={16} />}
          label="UV Index"
          value={todayForecast ? String(Math.round(todayForecast.uvIndex)) : "—"}
        />
      </div>
    </section>
  );
}

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white/[0.07] backdrop-blur-sm border border-white/10 px-4 py-3 text-center transition-colors hover:bg-white/[0.12]">
      <div className="flex items-center justify-center gap-1.5 text-white/40 mb-1">
        {icon}
        <span className="text-[11px] font-body uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-lg font-display font-medium text-white">{value}</p>
    </div>
  );
}
