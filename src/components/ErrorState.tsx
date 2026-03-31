import { CloudOff, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in text-center">
      <CloudOff size={40} className="text-white/25 mb-4" />
      <p className="text-sm font-body text-white/50 mb-4 max-w-xs">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white text-sm font-body transition-colors"
        >
          <RefreshCw size={14} />
          Try again
        </button>
      )}
    </div>
  );
}
