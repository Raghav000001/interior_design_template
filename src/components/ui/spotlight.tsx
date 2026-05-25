import * as React from "react";
import { cn } from "@/lib/utils/cn";

interface SpotlightProps {
  className?: string;
  fill?: string;
}

export function Spotlight({ className, fill = "white", ...props }: SpotlightProps) {
  return (
    <div
      {...props}
      className={cn(
        "absolute pointer-events-none",
        className
      )}
      style={{
        background: `radial-gradient(circle at center, ${fill} 0%, transparent 70%)`,
        filter: "blur(80px)",
      }}
    />
  );
}
Spotlight.displayName = "Spotlight";