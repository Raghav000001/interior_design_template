"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface MarqueeProps {
  className?: string;
  pauseOnHover?: boolean;
  children: React.ReactNode;
}

export function Marquee({ className, pauseOnHover, children }: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className={cn("relative flex overflow-hidden gap-[var(--gap,1rem)]", className)}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      <div
        className={cn(
          "flex shrink-0 animate-marquee gap-[var(--gap,1rem)]",
          isPaused && "[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 animate-marquee gap-[var(--gap,1rem)]",
          isPaused && "[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
