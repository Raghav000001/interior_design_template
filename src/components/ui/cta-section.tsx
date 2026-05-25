"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";

const CtaSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-slate-900 py-32">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_70%)] pointer-events-none" />
      <Boxes />

      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            Ready to Transform
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">
              Your Space?
            </span>
          </h2>

          <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s bring your vision to life. Get in touch with our design
            team and start your journey toward a space that truly inspires.
          </p>

          <motion.div
            className="mt-10 inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/contact"
              className={cn(
                "group inline-flex items-center gap-3",
                "bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500",
                "hover:from-pink-600 hover:via-purple-600 hover:to-sky-600",
                "text-white font-semibold text-lg",
                "px-10 py-4 rounded-2xl",
                "shadow-lg shadow-purple-500/25",
                "hover:shadow-xl hover:shadow-purple-500/30",
                "transition-all duration-300",
              )}
            >
              Contact Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
