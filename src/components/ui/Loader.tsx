
import React from "react";
import { Loader as LoaderIcon, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type LoaderVariant = "spinner" | "dots" | "pulse" | "circle" | "default";

type LoaderProps = {
  size?: number;
  className?: string;
  variant?: LoaderVariant;
  fullScreen?: boolean;
  text?: string;
};

export function Loader({ 
  size = 32, 
  className = "", 
  variant = "default", 
  fullScreen = false,
  text
}: LoaderProps) {
  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return (
          <div className="relative">
            <div className={`h-${size / 4} w-${size / 4} rounded-full border-4 border-t-hr-purple-300 border-r-transparent border-b-hr-purple-100 border-l-transparent animate-spin`}></div>
          </div>
        );
      case "dots":
        return (
          <div className="flex space-x-2">
            <div className={`h-${size / 4} w-${size / 4} bg-hr-purple-300 rounded-full animate-bounce`}></div>
            <div className={`h-${size / 4} w-${size / 4} bg-hr-purple-300 rounded-full animate-bounce animation-delay-200`}></div>
            <div className={`h-${size / 4} w-${size / 4} bg-hr-purple-300 rounded-full animate-bounce animation-delay-400`}></div>
          </div>
        );
      case "pulse":
        return (
          <div className={`h-${size / 2} w-${size / 2} bg-hr-purple-300 rounded-full animate-pulse`}></div>
        );
      case "circle":
        return (
          <LoaderCircle
            className="animate-spin text-hr-purple-300"
            size={size}
            strokeWidth={2.5}
            aria-label="Loading"
          />
        );
      default:
        return (
          <LoaderIcon
            className="animate-spin text-muted-foreground"
            size={size}
            strokeWidth={2.5}
            aria-label="Loading"
          />
        );
    }
  };

  const containerClasses = cn(
    "flex flex-col items-center justify-center",
    fullScreen ? "fixed inset-0 bg-background/80 backdrop-blur-sm z-50" : "w-full",
    className
  );

  return (
    <div className={containerClasses}>
      {renderLoader()}
      {text && <p className="mt-4 text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}

// Usage examples (for reference):
// <Loader size={40} />
// <Loader variant="spinner" size={40} />
// <Loader variant="dots" size={40} />
// <Loader variant="pulse" size={40} />
// <Loader variant="circle" size={40} />
// <Loader fullScreen text="Loading data..." />
