import { cn } from "@/lib/utils";

interface CloverIconProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "default";
  animated?: boolean;
}

const sizeClasses = {
  default: "w-full h-full",
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
};

export function CloverIcon({ className, size = "md", animated = false }: CloverIconProps) {
  return (
    <div className={cn(sizeClasses[size], animated && "animate-bounce-slow", className)}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
        <defs>
          <radialGradient id="mainCloverGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#22c55e" />
          </radialGradient>
        </defs>
        <g fill="url(#mainCloverGradient)">
          <ellipse cx="35" cy="35" rx="18" ry="24" transform="rotate(-45 35 35)" />
          <ellipse cx="65" cy="35" rx="18" ry="24" transform="rotate(45 65 35)" />
          <ellipse cx="35" cy="65" rx="18" ry="24" transform="rotate(45 35 65)" />
          <ellipse cx="65" cy="65" rx="18" ry="24" transform="rotate(-45 65 65)" />
          <rect x="47" y="65" width="6" height="28" rx="3" fill="#16a34a" />
        </g>
      </svg>
    </div>
  );
}
