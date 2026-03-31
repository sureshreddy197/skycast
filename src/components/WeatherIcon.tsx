import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
};

interface WeatherIconProps {
  name: string;
  size?: number;
  className?: string;
}

export function WeatherIcon({ name, size = 24, className = "" }: WeatherIconProps) {
  const Icon = iconMap[name] ?? Cloud;
  return <Icon size={size} className={className} />;
}
