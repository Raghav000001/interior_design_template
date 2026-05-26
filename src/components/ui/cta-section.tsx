"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/theme-provider";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const CtaSection = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section className="relative w-full overflow-hidden bg-background py-24 md:py-32">
      <div className="absolute inset-0 h-full w-full">
        <SparklesCore
          id="cta-particles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={80}
          className="h-full w-full"
          particleColor={isDark ? "#FFFFFF" : "#5B3DF5"}
          speed={0.5}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 h-full w-full bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)]" />

      <div className="absolute inset-x-0 top-0 flex justify-center">
        <div className="relative w-full max-w-5xl">
          <div className="absolute left-[10%] top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute left-[10%] top-[2px] h-[2px] w-3/4 bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
          <div className="absolute left-[30%] top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-secondary to-transparent" />
          <div className="absolute left-[30%] top-[2px] h-[5px] w-1/4 bg-gradient-to-r from-transparent via-secondary to-transparent blur-sm" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.div {...fadeUp}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Let&apos;s create something beautiful</span>
          </motion.div>

          <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Ready to Transform
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Your Space?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Every space has a story waiting to be told. Let our award-winning
            design team bring your vision to life with timeless interiors
            crafted just for you.
          </p>

          <motion.div
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/contact"
              className={cn(
                "group inline-flex items-center gap-3",
                "bg-gradient-to-r from-primary to-secondary",
                "hover:from-primary hover:to-secondary",
                "text-primary-foreground font-semibold text-lg",
                "px-10 py-4 rounded-2xl",
                "shadow-lg shadow-primary/25",
                "hover:shadow-xl hover:shadow-primary/30",
                "hover:scale-105 active:scale-95",
                "transition-all duration-300",
              )}
            >
              Start Your Project
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/portfolio"
              className={cn(
                "group inline-flex items-center gap-3",
                "border border-border/50 bg-card/50",
                "hover:bg-accent/10",
                "text-muted-foreground hover:text-foreground font-semibold text-lg",
                "px-10 py-4 rounded-2xl",
                "backdrop-blur-sm",
                "hover:scale-105 active:scale-95",
                "transition-all duration-300",
              )}
            >
              View Our Work
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-center">
        <div className="relative w-full max-w-5xl">
          <div className="absolute left-[10%] bottom-0 h-px w-3/4 bg-gradient-to-r from-transparent via-accent to-transparent" />
          <div className="absolute left-[10%] bottom-[2px] h-[2px] w-3/4 bg-gradient-to-r from-transparent via-accent to-transparent blur-sm" />
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
