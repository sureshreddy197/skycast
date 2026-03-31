import { CloudSun } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 animate-fade-in text-center">
      <div className="relative mb-6">
        <CloudSun size={56} className="text-white/15" />
        <div className="absolute -inset-4 rounded-full bg-white/5 blur-xl" />
      </div>
      <h2 className="text-lg font-display font-medium text-white/60 mb-2">
        Welcome to SkyCast
      </h2>
      <p className="text-sm font-body text-white/30 max-w-xs leading-relaxed">
        Search for a city or use your current location to see the weather forecast.
      </p>
    </div>
  );
}
