import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in" role="status">
      <Loader2 size={32} className="text-white/40 animate-spin mb-4" />
      <p className="text-sm font-body text-white/40">Fetching weather data...</p>
    </div>
  );
}
