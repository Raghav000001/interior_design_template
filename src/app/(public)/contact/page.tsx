"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/providers/theme-provider";
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Navigation,
  Clock,
  Calendar,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  Building2,
  Smile,
  Globe,
  Award,
} from "lucide-react";

/* SVG filter — defines the liquid glass distortion */
const GlassFilter = () => (
  <svg style={{ display: "none" }}>
    <filter
      id="glass-distortion"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.001 0.005"
        numOctaves="1"
        seed="17"
        result="turbulence"
      />
      <feComponentTransfer in="turbulence" result="mapped">
        <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
        <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
        <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
      </feComponentTransfer>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
      <feSpecularLighting
        in="softMap"
        surfaceScale="5"
        specularConstant="1"
        specularExponent="100"
        lightingColor="white"
        result="specLight"
      >
        <fePointLight x="-200" y="-200" z="300" />
      </feSpecularLighting>
      <feComposite
        in="specLight"
        operator="arithmetic"
        k1="0"
        k2="1"
        k3="1"
        k4="0"
        result="litImage"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="softMap"
        scale="200"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

const contactInfo = [
  { icon: Phone, text: "+1 (555) 123-4567" },
  { icon: Mail, text: "hello@interiordesignstudio.com" },
  { icon: MapPin, text: "123 Design District, New York, NY 10001" },
];

const stats = [
  { value: "500+", label: "Projects Delivered", icon: Building2 },
  { value: "98%", label: "Client Satisfaction", icon: Smile },
  { value: "50+", label: "Cities Served", icon: Globe },
  { value: "24", label: "Design Awards", icon: Award },
];

const subjects = [
  { value: "", label: "Select a subject" },
  { value: "interior-design", label: "Interior Design Consultation" },
  { value: "project-estimate", label: "Project Estimate" },
  { value: "commercial", label: "Commercial Project" },
  { value: "residential", label: "Residential Project" },
  { value: "other", label: "Other" },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

export default function ContactPage() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    /* Simulate API call — replace with actual endpoint integration */
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message sent successfully! We'll get back to you within 24 hours.");
    setFormData(initialForm);
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col">
      <Toaster position="top-center" richColors />

      {/* ════════════════════════════════════════ */}
      {/* HERO */}
      {/* ════════════════════════════════════════ */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2070&auto=format&fit=crop")',
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
            <span>Let&apos;s Create Something Beautiful Together</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]">
            Get in
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your space? We&apos;re here to bring your vision
            to life — one conversation at a time.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#form-section"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold px-8 py-3.5 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Send a Message
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#map-section"
              className="group inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm text-white/90 px-8 py-3.5 rounded-2xl hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Visit Our Studio
            </a>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* ════════════════════════════════════════ */}
      {/* STATS */}
      {/* ════════════════════════════════════════ */}
      <section className="relative -mt-16 z-20 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-3xl overflow-hidden glossy shadow-xl"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="relative bg-card/60 backdrop-blur-xl px-8 py-10 text-center group hover:bg-card/80 transition-colors duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex justify-center mb-3">
                  <div className="inline-flex p-2 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <span className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <p className="relative mt-2 text-sm text-muted-foreground font-medium tracking-wide uppercase">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* FORM + CONTACT */}
      {/* ════════════════════════════════════════ */}
      <section
        id="form-section"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated background image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1920&auto=format&fit=crop")',
            backgroundSize: "cover",
            backgroundPosition: "center center",
            animation: "moveBackground 60s linear infinite",
          }}
        />

        {/* Dark overlay for readability — heavier at bottom where text sits */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/60 to-black/70" />

        {/* Invisible SVG filter definition */}
        <GlassFilter />

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-20">
          <motion.div
            {...fadeUp}
            className="text-center mb-14"
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
              Connect With Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Share Your
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Vision
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left column — contact info */}
            <motion.div {...fadeUp} className="text-white space-y-6 pt-4 md:pt-12">
              <p className="text-lg text-white/90 max-w-md leading-relaxed">
                Ready to transform your interior? Share your vision with us and
                our award-winning design team will bring it to life.
              </p>

              <div className="space-y-4 pt-4">
                {contactInfo.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/85">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right column — glass form card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative overflow-hidden rounded-3xl"
            >
              {/* Glass layer 1 — blurred backdrop with SVG liquid distortion */}
              <div
                className="absolute inset-0 z-0 overflow-hidden rounded-3xl"
                style={{
                  backdropFilter: "blur(3px)",
                  filter: "url(#glass-distortion)",
                  isolation: "isolate",
                }}
              />
              {/* Glass layer 2 — semi-transparent base (lighter in light mode, darker in dark) */}
              <div
                className="absolute inset-0 z-[1]"
                style={{
                  background: isDark
                    ? "rgba(255, 255, 255, 0.06)"
                    : "rgba(255, 255, 255, 0.2)",
                }}
              />
              {/* Glass layer 3 — inner highlights */}
              <div
                className="absolute inset-0 z-[2] rounded-3xl overflow-hidden pointer-events-none"
                style={{
                  boxShadow: isDark
                    ? "inset 1px 1px 0 0 rgba(255, 255, 255, 0.08), inset -1px -1px 0 0 rgba(255, 255, 255, 0.03)"
                    : "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.35), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.15)",
                }}
              />

              {/* Content layer (above all glass layers) */}
              <div className="relative z-[3] p-8 md:p-10">
                <h2 className="text-2xl font-semibold text-white mb-1">
                  Send Us a Message
                </h2>
                <p className="text-sm text-white/80 mb-8">
                  Fill out the form and we&apos;ll get back to you within 24
                  hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldWrapper label="Full Name" htmlFor="name">
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="bg-white/20 border-white/30 backdrop-blur-sm text-white placeholder:text-white/55 focus-visible:ring-primary"
                      />
                    </FieldWrapper>
                    <FieldWrapper label="Email Address" htmlFor="email">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="bg-white/20 border-white/30 backdrop-blur-sm text-white placeholder:text-white/55 focus-visible:ring-primary"
                      />
                    </FieldWrapper>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldWrapper label="Phone Number" htmlFor="phone">
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="bg-white/20 border-white/30 backdrop-blur-sm text-white placeholder:text-white/55 focus-visible:ring-primary"
                      />
                    </FieldWrapper>
                    <FieldWrapper label="Subject" htmlFor="subject">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className={cn(
                          "flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors",
                          "border-white/30 bg-white/20 backdrop-blur-sm text-white",
                          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                          "appearance-none cursor-pointer",
                        )}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                          backgroundPosition: "right 0.5rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        {subjects.map((s) => (
                          <option
                            key={s.value}
                            value={s.value}
                            className="text-gray-900 bg-white"
                          >
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </FieldWrapper>
                  </div>

                  <FieldWrapper label="Message" htmlFor="message">
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your project, style preferences, and any specific requirements..."
                      className="min-h-[120px] bg-white/20 border-white/30 backdrop-blur-sm text-white placeholder:text-white/55 focus-visible:ring-primary"
                    />
                  </FieldWrapper>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full h-12 text-base font-semibold",
                      "bg-gradient-to-r from-primary to-secondary",
                      "hover:from-primary hover:to-secondary",
                      "text-white shadow-lg shadow-primary/25",
                      "hover:shadow-xl hover:shadow-primary/30",
                      "hover:scale-[1.02] active:scale-[0.98]",
                      "transition-all duration-300",
                      "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100",
                    )}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* FUTURISTIC MAP */}
      {/* ════════════════════════════════════════ */}
      <section id="map-section" className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-muted/30" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(91,61,245,1) 1px, transparent 1px), linear-gradient(90deg, rgba(91,61,245,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
              Visit Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Find Us at the
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Design District
              </span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {/* Map container */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
              className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm group min-h-[400px] lg:min-h-[480px]"
            >
              {/* Decorative scan line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent z-20" />

              {/* Animated glow dot for location */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/50 animate-pulse" />
                  <div className="absolute -inset-3 rounded-full bg-primary/20 animate-ping" />
                  <div className="absolute -inset-6 rounded-full bg-primary/10 animate-ping [animation-delay:0.3s]" />
                </div>
              </div>

              {/* Map background — stylized map tiles */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background:
                    "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #1a1a2e 100%)",
                }}
              />

              {/* Grid pattern on map */}
              <div
                className="absolute inset-0 z-[1] opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(91,61,245,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(91,61,245,0.3) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              {/* Decorative orbital rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2]">
                <div className="w-64 h-64 rounded-full border border-primary/10 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-4 w-56 h-56 rounded-full border border-secondary/10 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-8 w-48 h-48 rounded-full border border-accent/10 animate-[spin_25s_linear_infinite]" />
              </div>

              {/* Fake roads */}
              <svg
                className="absolute inset-0 z-[3] w-full h-full opacity-30"
                viewBox="0 0 800 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 250 Q200 100 400 250 T800 250"
                  stroke="url(#roadGrad)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="8 8"
                  className="animate-[dash_3s_linear_infinite]"
                />
                <path
                  d="M400 0 Q250 200 400 400 T400 500"
                  stroke="url(#roadGrad)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="6 6"
                  className="animate-[dash_4s_linear_infinite]"
                />
                <path
                  d="M100 450 Q300 300 400 250 T700 100"
                  stroke="url(#roadGrad)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="5 5"
                  className="animate-[dash_5s_linear_infinite]"
                />
                <defs>
                  <linearGradient id="roadGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
                    <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Data node dots */}
              {[
                { x: "15%", y: "25%" },
                { x: "75%", y: "20%" },
                { x: "85%", y: "70%" },
                { x: "25%", y: "75%" },
                { x: "50%", y: "50%" },
              ].map((dot, i) => (
                <div
                  key={i}
                  className="absolute z-[4] w-2 h-2 rounded-full bg-primary/40"
                  style={{
                    left: dot.x,
                    top: dot.y,
                    boxShadow: "0 0 8px rgba(91,61,245,0.4)",
                  }}
                >
                  <div
                    className="absolute -inset-1 rounded-full bg-primary/20 animate-ping"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                </div>
              ))}

              {/* Ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/5 rounded-full blur-3xl z-[1]" />

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="ml-2 text-[10px] text-white/30 font-mono">
                  STUDIO.HQ
                </span>
              </div>

              {/* Coordinates overlay */}
              <div className="absolute bottom-4 right-4 z-10 text-[10px] text-white/20 font-mono">
                40.7580&deg;N &middot; 73.9855&deg;W
              </div>

              {/* Location label */}
              <div className="absolute bottom-4 left-4 z-10">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[11px] text-white/70 font-medium">
                    Design District, New York
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Info card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 flex flex-col justify-center"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-bl-full" />

              <div className="relative space-y-6">
                <div>
                  <div className="inline-flex p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 mb-4">
                    <Navigation className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">Our Location</h3>
                  <p className="text-sm text-muted-foreground/80 mt-1">
                    123 Design District Avenue
                    <br />
                    Suite 400, New York, NY 10001
                  </p>
                </div>

                <div className="h-px bg-border/50" />

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Studio Hours</p>
                      <p className="text-xs text-muted-foreground/70 mt-0.5">
                        Mon-Fri: 9:00 AM — 7:00 PM
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        Sat: 10:00 AM — 5:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Consultations</p>
                      <p className="text-xs text-muted-foreground/70 mt-0.5">
                        By appointment only
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        Virtual options available
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=123+Design+District+New+York+NY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Open in Google Maps
                  <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* Small wrapper to reduce repetition in form fields */
function FieldWrapper({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={htmlFor}
        className="text-white/90 text-sm font-medium tracking-wide"
      >
        {label}
      </Label>
      {children}
    </div>
  );
}
