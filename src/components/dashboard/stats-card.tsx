"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  change?: number;
  changeLabel?: string;
  icon: React.ElementType;
  trend?: "up" | "down" | "neutral";
  delay?: number;
}

export function StatsCard({
  title,
  value,
  change,
  changeLabel = "vs last month",
  icon: Icon,
  trend = "neutral",
  delay = 0,
}: StatsCardProps) {
  const [displayValue, setDisplayValue] = React.useState(0);
  const isNumeric = typeof value === "number";

  React.useEffect(() => {
    if (isNumeric) {
      const duration = 1500;
      const steps = 30;
      const stepDuration = duration / steps;
      const increment = (value as number) / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value as number);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [value, isNumeric]);

  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-3xl font-bold tracking-tight">
                {isNumeric ? displayValue : value}
              </p>
              {change !== undefined && (
                <div className={cn("flex items-center gap-1 text-sm", trendColor)}>
                  <TrendIcon className="h-4 w-4" />
                  <span className="font-medium">{Math.abs(change)}%</span>
                  <span className="text-muted-foreground">{changeLabel}</span>
                </div>
              )}
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}