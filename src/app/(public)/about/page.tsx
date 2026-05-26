"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import {
  Target,
  Eye,
  Heart,
  Shield,
  Lightbulb,
  Users,
  Quote,
  ArrowUpRight,
  Sparkles,
  CheckCheck,
} from "lucide-react";
import Link from "next/link";

/* ─── Data ─── */

const stats = [
  { value: "12+", label: "Years Experience" },
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24", label: "Awards Won" },
];

const timeline = [
  {
    year: "2014",
    title: "Founded with a Vision",
    description:
      "Two passionate architects set out to redefine interior design — fusing modern aesthetics with timeless craftsmanship.",
  },
  {
    year: "2016",
    title: "First Major Commission",
    description:
      "Completed our first luxury residential project, earning industry recognition and setting the standard for our future work.",
  },
  {
    year: "2019",
    title: "Expanded to Commercial",
    description:
      "Launched our commercial division, designing award-winning retail, hospitality, and office spaces across the city.",
  },
  {
    year: "2022",
    title: "Global Recognition",
    description:
      "Received international design awards and expanded our team to 40+ designers, architects, and project managers.",
  },
  {
    year: "2025",
    title: "Sustainable Futures",
    description:
      "Pioneered eco-conscious design practices with our Green Certification program, leading the industry in sustainability.",
  },
  {
    year: "Today",
    title: "Innovation Continues",
    description:
      "Pushing boundaries with cutting-edge design technology, AR visualization, and AI-assisted space planning.",
  },
];

const teamMembers = [
  {
    name: "Patrick Stewart",
    role: "CEO & Founder",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    bio: "Visionary leader with 20+ years transforming spaces into experiences.",
  },
  {
    name: "Alena Rosser",
    role: "Director of Design",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    bio: "Award-winning designer known for blending luxury with functionality.",
  },
  {
    name: "Fletch Skinner",
    role: "Senior Architect",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    bio: "Master of structural aesthetics and spatial innovation.",
  },
  {
    name: "Natalia Skinner",
    role: "Design Researcher",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=80",
    bio: "Trend forecaster who translates cultural shifts into design.",
  },
  {
    name: "David Kim",
    role: "Project Lead",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    bio: "Ensures every project delivers on time, on budget, and beyond expectations.",
  },
  {
    name: "Elena Vasquez",
    role: "Interior Stylist",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    bio: "Creates curated interiors that tell unique stories through texture and tone.",
  },
];

const values = [
  {
    icon: Heart,
    title: "Passion-Driven Design",
    description:
      "Every project is fueled by genuine care for how spaces shape human experiences and emotions.",
  },
  {
    icon: Shield,
    title: "Uncompromising Quality",
    description:
      "We source the finest materials and collaborate with master craftspeople to ensure flawless execution.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description:
      "From AI-powered planning to immersive VR previews, we embrace technology to elevate design.",
  },
  {
    icon: Users,
    title: "Client-Centered",
    description:
      "Your vision guides every decision. We listen, collaborate, and deliver beyond expectations.",
  },
];

/* ─── Animations ─── */

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { staggerChildren: 0.12 },
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

/* ─── Component ─── */

export default function AboutPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="flex flex-col">
      {/* ════════════════════════════════════════ */}
      {/* HERO */}
      {/* ════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1920&auto=format&fit=crop")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-24 pb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-4 py-1.5 text-sm text-white/80 mb-8"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Since 2014 — Crafting Excellence</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]">
            We Design
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Experiences
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            An award-winning interior design studio transforming spaces into
            narratives. We believe every room has a story — let us help you tell
            yours.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold px-8 py-3.5 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Start Your Project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm text-white/90 px-8 py-3.5 rounded-2xl hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              View Our Portfolio
            </Link>
          </motion.div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* ════════════════════════════════════════ */}
      {/* STATS */}
      {/* ════════════════════════════════════════ */}
      <section className="relative -mt-16 z-20 max-w-6xl mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-3xl overflow-hidden glossy shadow-xl"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="relative bg-card/60 backdrop-blur-xl px-8 py-10 text-center group hover:bg-card/80 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.value}
              </span>
              <p className="relative mt-2 text-sm text-muted-foreground font-medium tracking-wide uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* STORY + MISSION/VISION */}
      {/* ════════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/3 via-secondary/3 to-accent/3 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              From a Shared Dream to an
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Award-Winning Studio
              </span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/40 to-accent/40" />

            <div className="space-y-16">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                  className={cn(
                    "relative flex flex-col md:flex-row items-start gap-6 md:gap-12",
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                  )}
                >
                  {/* Dot */}
                  <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 top-1 w-[11px] h-[11px] rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30 z-10" />

                  {/* Year badge */}
                  <div
                    className={cn(
                      "hidden md:flex w-1/2",
                      i % 2 === 0 ? "justify-end" : "justify-start",
                    )}
                  >
                    <span className="inline-block text-4xl font-bold text-primary/20 select-none">
                      {item.year}
                    </span>
                  </div>

                  {/* Content card */}
                  <div
                    className={cn(
                      "relative ml-12 md:ml-0 md:w-1/2",
                    )}
                  >
                    <div className="glossy rounded-2xl p-6 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 group">
                      {/* Mobile year */}
                      <span className="md:hidden inline-block text-xs font-bold tracking-wider text-primary mb-2">
                        {item.year}
                      </span>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground/80 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* MISSION & VISION */}
      {/* ════════════════════════════════════════ */}
      <section className="relative py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                content:
                  "To transform spaces into inspiring environments that enhance how people live, work, and connect. We blend artistic vision with technical precision to create interiors that are as functional as they are beautiful.",
                color: "from-primary/20 to-primary/5",
                accent: "text-primary",
              },
              {
                icon: Eye,
                title: "Our Vision",
                content:
                  "To be the global standard for design excellence — pioneering sustainable, human-centered interiors that adapt to tomorrow's needs while celebrating timeless beauty and craftsmanship.",
                color: "from-secondary/20 to-secondary/5",
                accent: "text-secondary",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                className={cn(
                  "relative overflow-hidden rounded-3xl p-8 md:p-10",
                  "border border-border/50 bg-card/50 backdrop-blur-sm",
                  "hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500",
                  "group",
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-30 group-hover:opacity-50 transition-opacity duration-500",
                    item.color,
                  )}
                />
                <div className="relative">
                  <div
                    className={cn(
                      "inline-flex p-3 rounded-2xl bg-gradient-to-br from-white to-white/50 dark:from-white/10 dark:to-white/5 shadow-sm mb-5",
                    )}
                  >
                    <item.icon className={cn("w-6 h-6", item.accent)} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* TEAM */}
      {/* ════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
              Our Team
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Meet the Creative Minds
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              A diverse collective of designers, architects, and dreamers united
              by a single purpose — creating spaces that inspire.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-40px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={staggerItem}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Social-like hover overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <div className="flex gap-2">
                      {["#", "#", "#"].map((href, i) => (
                        <a
                          key={i}
                          href={href}
                          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
                        >
                          <svg
                            className="w-3.5 h-3.5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary/70 font-medium mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground/70 mt-2 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-primary/20 pointer-events-none transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* VALUES */}
      {/* ════════════════════════════════════════ */}
      <section className="relative py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
              What We Stand For
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              The principles that guide every decision, every design, and every
              relationship we build.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-40px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={staggerItem}
                  className="group relative overflow-hidden rounded-2xl p-8 border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                >
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative">
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 mb-5 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* TESTIMONIAL HIGHLIGHT */}
      {/* ════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <Quote className="w-12 h-12 text-primary/20 mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-foreground/90">
              &ldquo;They didn&apos;t just design our home — they understood
              how we wanted to live. Every corner tells our story.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                  alt="Client"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">Sarah & Michael Chen</p>
                <p className="text-xs text-muted-foreground">
                  Residential Project, Beverly Hills
                </p>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* CTA */}
      {/* ════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1920&auto=format&fit=crop")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/60 to-black/70" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative z-10 max-w-3xl mx-auto px-6 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Ready to Create Something
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Extraordinary?
            </span>
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            Let&apos;s collaborate and turn your vision into a space that
            inspires. Every great design begins with a conversation.
          </p>
          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold px-10 py-4 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Get in Touch
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
