"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ProjectCard } from "@/components/ui/project-card";
import { Pagination } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  ArrowUpRight,
  Building2,
  Home,
  Hotel,
  Store,
  ArrowRight,
  CheckCheck,
  SwatchBook,
} from "lucide-react";

const ITEMS_PER_PAGE = 6;

const CATEGORIES = ["All", "Residential", "Commercial", "Hospitality", "Retail"];

const CATEGORY_ICONS: Record<string, typeof Home> = {
  All: SwatchBook,
  Residential: Home,
  Commercial: Building2,
  Hospitality: Hotel,
  Retail: Store,
};

const PROJECTS = [
  {
    id: 1,
    title: "Modern Luxe Residence",
    description:
      "A minimalist living space reimagined with warm materials, natural light, and curated art pieces for a serene urban sanctuary.",
    imgSrc:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1932&auto=format&fit=crop",
    category: "Residential",
    link: "#",
    linkText: "View Project",
  },
  {
    id: 2,
    title: "Azure Corporate Hub",
    description:
      "A tech-forward office environment blending biophilic design with collaborative workspaces and state-of-the-art amenities.",
    imgSrc:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1974&auto=format&fit=crop",
    category: "Commercial",
    link: "#",
    linkText: "Explore Space",
  },
  {
    id: 3,
    title: "The Artisan Hotel",
    description:
      "A boutique hospitality experience where craftsmanship meets contemporary luxury across 48 uniquely designed guest suites.",
    imgSrc:
      "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=1964&auto=format&fit=crop",
    category: "Hospitality",
    link: "#",
    linkText: "See Details",
  },
  {
    id: 4,
    title: "Coastal Retreat Villa",
    description:
      "An oceanfront residence designed around indoor-outdoor living, featuring panoramic views and sustainable local materials.",
    imgSrc:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop",
    category: "Residential",
    link: "#",
    linkText: "View Project",
  },
  {
    id: 5,
    title: "Verdant Office Park",
    description:
      "A campus-style workspace integrating living green walls, rooftop gardens, and flexible zones for hybrid work culture.",
    imgSrc:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    category: "Commercial",
    link: "#",
    linkText: "Explore Space",
  },
  {
    id: 6,
    title: "The Glass Pavilion",
    description:
      "A destination restaurant featuring sculptural interiors, a dramatic wine display, and terraced dining overlooking the city skyline.",
    imgSrc:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
    category: "Hospitality",
    link: "#",
    linkText: "See Details",
  },
  {
    id: 7,
    title: "Urban Loft Studio",
    description:
      "An adaptive reuse of a warehouse into a creative studio with exposed structure, modular furniture, and flexible living quarters.",
    imgSrc:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    category: "Residential",
    link: "#",
    linkText: "View Project",
  },
  {
    id: 8,
    title: "Maison de Luxe Boutique",
    description:
      "A flagship retail concept with sculptural display fixtures, curated material palette, and an immersive brand journey across two floors.",
    imgSrc:
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?q=80&w=1932&auto=format&fit=crop",
    category: "Retail",
    link: "#",
    linkText: "Explore Space",
  },
  {
    id: 9,
    title: "Skyline Penthouse",
    description:
      "A penthouse residence with panoramic city views, custom millwork, a private terrace garden, and smart-home integrated systems.",
    imgSrc:
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?q=80&w=1974&auto=format&fit=crop",
    category: "Residential",
    link: "#",
    linkText: "View Project",
  },
];

const STATS = [
  { value: "500+", label: "Projects" },
  { value: "4", label: "Categories" },
  { value: "98%", label: "Happy Clients" },
  { value: "40+", label: "Design Awards" },
];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects = useMemo(
    () =>
      activeCategory === "All"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeCategory),
    [activeCategory],
  );

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = useMemo(
    () =>
      filteredProjects.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [filteredProjects, currentPage],
  );

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    const el = document.getElementById("gallery");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById("gallery");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeIcon = CATEGORY_ICONS[activeCategory] ?? SwatchBook;

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
              'url("https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop")',
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
            <span>Our Portfolio — Design Excellence in Every Detail</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]">
            Our
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Portfolio
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Explore our curated collection of transformative projects — from
            intimate residential spaces to large-scale commercial environments,
            each telling its own unique story.
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
              href="/services"
              className="group inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm text-white/90 px-8 py-3.5 rounded-2xl hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Explore Services
            </Link>
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
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="relative bg-card/60 backdrop-blur-xl px-8 py-10 text-center group hover:bg-card/80 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.value}
              </span>
              <p className="relative mt-2 text-sm text-muted-foreground font-medium tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* FEATURED PROJECT */}
      {/* ════════════════════════════════════════ */}
      <section className="relative py-28 md:py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-br from-primary/3 via-secondary/3 to-accent/3 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
              Featured Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              A Glimpse Into
              <br />
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Our Craft
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
            className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/50 backdrop-blur-sm"
          >
            <div className="grid lg:grid-cols-2">
              {/* Image side */}
              <div className="relative overflow-hidden min-h-[300px] lg:min-h-full">
                <img
                  src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1974&auto=format&fit=crop"
                  alt="Featured project"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

                {/* Category badge */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-white/90">
                    <Sparkles className="w-3 h-3" />
                    Featured Project
                  </span>
                </div>
              </div>

              {/* Content side */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-3">
                  Residential
                </span>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                  Modern Luxe Residence
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  A minimalist living space reimagined with warm materials,
                  natural light, and curated art pieces. This project embodies
                  our philosophy of creating serene urban sanctuaries that
                  balance aesthetics with everyday functionality.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Custom walnut millwork throughout",
                    "Hand-selected Italian marble surfaces",
                    "Smart-integrated ambient lighting",
                    "Curated contemporary art collection",
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground/90">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="#"
                  className="group/link inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  View Full Case Study
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════ */}
      {/* FILTER + GALLERY */}
      {/* ════════════════════════════════════════ */}
      <section id="gallery" className="relative pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
              Browse by Category
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              All Projects
            </h2>
          </motion.div>

          {/* Category filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const Icon = CATEGORY_ICONS[cat] ?? SwatchBook;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    "group relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                    isActive
                      ? "text-white shadow-lg"
                      : "text-muted-foreground hover:text-foreground bg-card/50 hover:bg-card border border-border/50",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="project-filter-bg"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="relative z-10 w-4 h-4" />
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Active category indicator */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-10 text-sm text-muted-foreground"
          >
            <span>Showing</span>
            <span className="font-semibold text-foreground">
              {filteredProjects.length}
            </span>
            <span>
              {activeCategory === "All" ? "projects" : `${activeCategory.toLowerCase()} projects`}
            </span>
            {activeCategory !== "All" && (
              <button
                onClick={() => handleCategoryChange("All")}
                className="ml-2 text-xs text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
              >
                Clear filter
              </button>
            )}
          </motion.div>

          {/* Project cards grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${currentPage}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {paginatedProjects.map((project) => (
                <motion.div key={project.id} variants={cardVariants}>
                  <ProjectCard
                    imgSrc={project.imgSrc}
                    title={project.title}
                    description={project.description}
                    link={project.link}
                    linkText={project.linkText}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {filteredProjects.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              className="mt-14"
            />
          )}

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <SwatchBook className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-foreground">
                No projects found
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                No projects match the &ldquo;{activeCategory}&rdquo; category yet.
              </p>
              <button
                onClick={() => handleCategoryChange("All")}
                className="mt-6 text-sm font-medium text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
              >
                View all projects
              </button>
            </motion.div>
          )}
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
              'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop")',
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
            Inspired by What You See?
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Let&apos;s Create Yours
            </span>
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            Every project begins with a conversation. Share your vision with us
            and let&apos;s design something extraordinary together.
          </p>
          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold px-10 py-4 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Start Your Project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
