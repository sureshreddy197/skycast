import type { TemperatureUnit } from "../types/weather";

interface UnitToggleProps {
  unit: TemperatureUnit;
  onChange: (unit: TemperatureUnit) => void;
}

export function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <div
      className="inline-flex rounded-xl bg-white/[0.07] border border-white/10 p-0.5"
      role="radiogroup"
      aria-label="Temperature unit"
    >
      <button
        role="radio"
        aria-checked={unit === "celsius"}
        onClick={() => onChange("celsius")}
        className={`px-3 py-1.5 rounded-[10px] text-xs font-body font-medium transition-all ${
          unit === "celsius"
            ? "bg-white/20 text-white shadow-sm"
            : "text-white/40 hover:text-white/70"
        }`}
      >
        °C
      </button>
      <button
        role="radio"
        aria-checked={unit === "fahrenheit"}
        onClick={() => onChange("fahrenheit")}
        className={`px-3 py-1.5 rounded-[10px] text-xs font-body font-medium transition-all ${
          unit === "fahrenheit"
            ? "bg-white/20 text-white shadow-sm"
            : "text-white/40 hover:text-white/70"
        }`}
      >
        °F
      </button>
    </div>
  );
}
