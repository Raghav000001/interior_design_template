"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Home,
  Building2,
  Eye,
  Leaf,
  ClipboardList,
  Paintbrush,
  Sofa,
  Lightbulb,
  ArrowUpRight,
  Sparkles,
  CheckCheck,
  ChevronRight,
  Palette,
  Ruler,
  Layers,
  Recycle,
  Users,
  Shovel,
} from "lucide-react";

/* ─── Data ─── */

const services = [
  {
    id: "residential",
    icon: Home,
    title: "Residential Design",
    tagline: "Homes that tell your story",
    description:
      "Full-service interior design for apartments, villas, and luxury homes. We transform living spaces into personalized sanctuaries that reflect your unique style and enhance your daily life.",
    features: [
      "Space planning & layout optimization",
      "Custom furniture design & sourcing",
      "Material & finish selection",
      "Lighting design & installation",
      "Art & accessory curation",
      "Full project management",
    ],
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&auto=format&fit=crop&q=80",
    color: "from-violet-500 to-purple-600",
    bgLight: "from-violet-50 to-purple-50",
  },
  {
    id: "commercial",
    icon: Building2,
    title: "Commercial Design",
    tagline: "Spaces that mean business",
    description:
      "Strategic interior design for offices, retail stores, restaurants, and hospitality venues. We create branded environments that captivate customers and inspire productivity.",
    features: [
      "Brand integration & identity design",
      "Traffic flow & spatial planning",
      "Ergonomic workspace solutions",
      "Acoustic & lighting engineering",
      "FF&E specification & procurement",
      "Permit & compliance management",
    ],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=80",
    color: "from-blue-500 to-cyan-600",
    bgLight: "from-blue-50 to-cyan-50",
  },
  {
    id: "visualization",
    icon: Eye,
    title: "3D Visualization",
    tagline: "See it before it exists",
    description:
      "Photorealistic 3D rendering and immersive virtual tours that let you experience your space before construction begins. Make confident decisions with crystal-clear previews.",
    features: [
      "Photorealistic 3D rendering",
      "360° immersive virtual tours",
      "AR/VR walkthrough experiences",
      "Material & lighting simulation",
      "Interactive design reviews",
      "Revision & iteration support",
    ],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&auto=format&fit=crop&q=80",
    color: "from-emerald-500 to-teal-600",
    bgLight: "from-emerald-50 to-teal-50",
  },
  {
    id: "sustainable",
    icon: Leaf,
    title: "Sustainable Design",
    tagline: "Beautifully responsible",
    description:
      "Eco-conscious design solutions that reduce environmental impact without compromising aesthetics. Sustainable luxury is not a trend — it's the future of design.",
    features: [
      "Sustainable material sourcing",
      "Energy-efficient lighting design",
      "Low-VOC & non-toxic finishes",
      "Recycled & upcycled furnishings",
      "Green certification guidance",
      "Waste reduction planning",
    ],
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80",
    color: "from-green-500 to-emerald-600",
    bgLight: "from-green-50 to-emerald-50",
  },
  {
    id: "project-management",
    icon: ClipboardList,
    title: "Project Management",
    tagline: "Stress-free execution",
    description:
      "End-to-end project management that turns design concepts into reality. We coordinate contractors, manage budgets, and ensure every detail is executed to perfection.",
    features: [
      "Contractor & vendor coordination",
      "Budget tracking & cost control",
      "Timeline & milestone management",
      "Quality assurance & inspections",
      "Procurement & logistics",
      "Move-in & styling support",
    ],
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=80",
    color: "from-amber-500 to-orange-600",
    bgLight: "from-amber-50 to-orange-50",
  },
  {
    id: "consultation",
    icon: Lightbulb,
    title: "Design Consultation",
    tagline: "Expert guidance on demand",
    description:
      "Professional design consultation services for clients who need expert guidance — from room makeovers to full-home design strategies. Flexible, focused, and actionable.",
    features: [
      "On-site & virtual consultations",
      "Room-by-room design strategies",
      "Color palette & material boards",
      "Furniture layout planning",
      "Budget-friendly recommendations",
      "DIY implementation guidance",
    ],
    image:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&auto=format&fit=crop&q=80",
    color: "from-rose-500 to-pink-600",
    bgLight: "from-rose-50 to-pink-50",
  },
];

const process = [
  {
    icon: Users,
    step: "01",
    title: "Discovery",
    description:
      "We learn about your lifestyle, preferences, and vision through in-depth consultations.",
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "Concept Development",
    description:
      "Our team creates mood boards, layouts, and 3D visualizations for your approval.",
  },
  {
    icon: Palette,
    step: "03",
    title: "Design Refinement",
    description:
      "We finalize material selections, furniture specs, and detailed construction documents.",
  },
  {
    icon: Shovel,
    step: "04",
    title: "Execution",
    description:
      "Skilled craftspeople bring the design to life with meticulous attention to detail.",
  },
  {
    icon: Sofa,
    step: "05",
    title: "Installation & Styling",
    description:
      "Furniture, art, and accessories are placed perfectly for the final reveal.",
  },
];

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Timelines vary by scope. A single room makeover may take 4-6 weeks, while full-home designs typically range from 3-8 months. We provide detailed timelines during our initial consultation.",
  },
  {
    q: "Do you work within a specific budget range?",
    a: "We tailor our services to a wide range of budgets. Our team is skilled at maximizing impact regardless of budget size, and we're transparent about costs from the outset.",
  },
  {
    q: "Can I be involved in the design process?",
    a: "Absolutely! We encourage client collaboration. You'll be involved in key decisions, reviews, and approvals throughout the project. How much involvement is entirely up to you.",
  },
  {
    q: "Do you offer virtual consultations?",
    a: "Yes, we offer both in-person and virtual consultations via video call. Our digital design process makes remote collaboration seamless and effective.",
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
  transition: { staggerChildren: 0.1 },
};

const staggerItem = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

/* ─── Component ─── */

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(services[0].id);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const active = services.find((s) => s.id === activeService) ?? services[0];

  return (
    <div className="flex flex-col">
      {/* ════════════════════════════════════════ */}
      {/* HERO */}
      {/* ════════════════════════════════════════ */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
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
            <span>Comprehensive Design Solutions</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]">
            Our
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            From concept to completion, we offer a full spectrum of interior
            design services tailored to transform any space into a work of art.
          </p>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
      </section>

      {/* ════════════════════════════════════════ */}
      {/* SERVICE TABS + DETAIL */}
      {/* ════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Tab bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2 justify-center mb-16"
          >
            {services.map((s) => {
              const Icon = s.icon;
              const isActive = activeService === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveService(s.id)}
                  className={cn(
                    "group relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                    isActive
                      ? "text-white shadow-lg"
                      : "text-muted-foreground hover:text-foreground bg-card/50 hover:bg-card border border-border/50",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="service-tab-bg"
                      className={cn(
                        "absolute inset-0 rounded-xl",
                        "bg-gradient-to-r",
                        s.color,
                      )}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="relative z-10">{s.title}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
              className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              {/* Image */}
              <div className="relative order-2 lg:order-1">
                <div className="relative overflow-hidden rounded-3xl aspect-[4/3] group">
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-10",
                      active.bgLight,
                    )}
                  />
                  <motion.img
                    key={active.image}
                    src={active.image}
                    alt={active.title}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                  {/* Floating tagline */}
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <span className="inline-block text-sm text-white/90 font-medium bg-white/20 backdrop-blur-md rounded-full px-4 py-2">
                      {active.tagline}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="order-1 lg:order-2">
                <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-3">
                  Service
                </span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  {active.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {active.description}
                </p>

                <div className="space-y-3 mb-8">
                  {active.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCheck className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground/90">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  Inquire About {active.title === "Design Consultation" ? "a" : active.title === "3D Visualization" ? "3D" : ""} {active.title}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* PROCESS */}
      {/* ════════════════════════════════════════ */}
      <section className="relative py-28 bg-muted/30 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-br from-primary/3 via-secondary/3 to-accent/3 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
              Our Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              How We Bring Your
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Vision to Life
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6 lg:gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-px bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30" />

            {process.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.12,
                    ease: [0.16, 1, 0.3, 1] as const,
                  }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Step circle */}
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 border border-border/50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500">
                    <Icon className="w-6 h-6 text-primary" />
                    {/* Step number */}
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground/70 leading-relaxed max-w-[220px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* WHY US / MINI SERVICE GRID */}
      {/* ════════════════════════════════════════ */}
      <section className="relative py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Designed Around
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                You
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-40px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Layers,
                title: "Tailored Approach",
                description:
                  "No two projects are alike. We craft unique solutions that reflect your personality, brand, and lifestyle.",
              },
              {
                icon: Sofa,
                title: "Premium Materials",
                description:
                  "We source from the world's finest artisans and manufacturers, ensuring quality that stands the test of time.",
              },
              {
                icon: Ruler,
                title: "Precision Execution",
                description:
                  "Our detailed project management ensures every measurement, finish, and installation is flawless.",
              },
              {
                icon: Recycle,
                title: "Sustainable Practices",
                description:
                  "We prioritize eco-friendly materials and processes, designing spaces that are as responsible as they are beautiful.",
              },
              {
                icon: Users,
                title: "Dedicated Team",
                description:
                  "Each project is assigned a lead designer and project manager who serve as your primary contacts throughout.",
              },
              {
                icon: Lightbulb,
                title: "Innovation-Driven",
                description:
                  "From VR walkthroughs to AI-powered space planning, we leverage technology to deliver superior results.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                  className="group relative overflow-hidden rounded-2xl p-8 border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                  <div className="relative">
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 mb-5 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* FAQ */}
      {/* ════════════════════════════════════════ */}
      <section className="relative py-28 bg-muted/30">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
              FAQ
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Frequently Asked
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex items-center justify-between w-full px-6 py-5 text-left transition-colors hover:bg-accent/5"
                >
                  <span className="text-sm font-medium pr-4">{faq.q}</span>
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 text-primary flex-shrink-0 transition-transform duration-300",
                      openFaq === i && "rotate-90",
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm text-muted-foreground/80 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
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
              'url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop")',
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
            Not Sure Where to Start?
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              We&apos;ll Guide You
            </span>
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            Book a free 30-minute discovery call and let us help you choose the
            perfect service package for your project.
          </p>
          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold px-10 py-4 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Book a Free Consultation
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
