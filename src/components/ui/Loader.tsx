
import React from "react";
import { Loader as LoaderIcon } from "lucide-react";

type LoaderProps = {
  size?: number;
  className?: string;
};

export function Loader({ size = 32, className = "" }: LoaderProps) {
  return (
    <div className={`flex items-center justify-center w-full ${className}`}>
      <LoaderIcon
        className="animate-spin text-muted-foreground"
        size={size}
        strokeWidth={2.5}
        aria-label="Loading"
      />
    </div>
  );
}

// Usage example (for reference):
// <Loader size={40} />
