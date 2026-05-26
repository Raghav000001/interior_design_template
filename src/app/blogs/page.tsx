"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Component } from "@/components/ui/blog-posts";
import { GlassBlogCard } from "@/components/ui/glass-blog-card-shadcnui";
import { Pagination } from "@/components/ui/pagination";
import {
  Sparkles,
  ArrowUpRight,
  PenLine,
  Eye,
  BookOpen,
  Users,
  Star,
  TrendingUp,
} from "lucide-react";

const ITEMS_PER_PAGE = 9;

const STATS = [
  { value: "200+", label: "Articles Published", icon: PenLine },
  { value: "50K+", label: "Monthly Readers", icon: Users },
  { value: "4.8", label: "Avg. Reader Rating", icon: Star },
  { value: "12+", label: "Expert Authors", icon: BookOpen },
];

const FEATURED_BLOGS = [
  {
    id: 1,
    title: "Turning a 1970s Fixer-Upper Into a Modern Minimalist Haven",
    category: "Residential",
    imageUrl:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&auto=format&fit=crop",
    href: "/blogs/modern-minimalist-haven",
    views: 2840,
    readTime: 8,
    rating: 5,
  },
  {
    id: 2,
    title: "Biophilic Design: Bringing the Outdoors Into Urban Interiors",
    category: "Commercial",
    imageUrl:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop",
    href: "/blogs/biophilic-design-urban",
    views: 1950,
    readTime: 10,
    rating: 4,
  },
  {
    id: 3,
    title: "The Art of Small Space Living: 400 sq ft Done Right",
    category: "Space Optimization",
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
    href: "/blogs/small-space-living",
    views: 3240,
    readTime: 6,
    rating: 5,
  },
];

const ALL_BLOGS = [
  {
    slug: "natural-light-open-plan",
    title: "Maximizing Natural Light in Open-Plan Living Spaces",
    excerpt:
      "Natural light transforms a room. Discover expert strategies for optimizing windows, choosing reflective materials, and arranging furniture to capture every ray of sunlight throughout the day.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
    author: { name: "Sarah Chen", avatar: "https://github.com/shadcn.png" },
    date: "12 May 2026",
    readTime: "7 min read",
    tags: ["Design Tips", "Lighting"],
  },
  {
    slug: "color-psychology-interior-design",
    title: "Color Psychology in Interior Design: What Your Walls Say About You",
    excerpt:
      "From calming blues to energizing yellows, the colors you choose shape the mood of every room. Learn how leading designers use color psychology to create impactful spaces.",
    image:
      "https://images.unsplash.com/photo-1616046229478-5dac3cfaa153?w=800&auto=format&fit=crop",
    author: { name: "Marcus Rivera", avatar: "https://github.com/shadcn.png" },
    date: "8 May 2026",
    readTime: "9 min read",
    tags: ["Color Theory", "Psychology"],
  },
  {
    slug: "sustainable-materials-modern-interiors",
    title: "Sustainable Materials That Are Redefining Modern Interiors",
    excerpt:
      "Eco-friendly design is no longer a compromise. Explore the latest sustainable materials — from bamboo flooring to recycled glass countertops — that deliver both beauty and environmental responsibility.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
    author: { name: "Priya Kapoor", avatar: "https://github.com/shadcn.png" },
    date: "2 May 2026",
    readTime: "11 min read",
    tags: ["Sustainability", "Materials"],
  },
  {
    slug: "layering-lighting-professional-designer",
    title: "How to Layer Lighting Like a Professional Designer",
    excerpt:
      "Great lighting is the secret weapon of every stunning interior. Master ambient, task, and accent lighting layers to transform any room from flat to fabulous.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop",
    author: { name: "Elena Vasquez", avatar: "https://github.com/shadcn.png" },
    date: "27 Apr 2026",
    readTime: "6 min read",
    tags: ["Lighting", "Design Tips"],
  },
  {
    slug: "mixing-vintage-contemporary-furniture",
    title: "Mixing Vintage and Contemporary Furniture Like a Pro",
    excerpt:
      "The most memorable interiors tell a story. Learn the art of juxtaposing eras — blending mid-century classics with modern minimalism for spaces that feel curated, not chaotic.",
    image:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&auto=format&fit=crop",
    author: { name: "James Okafor", avatar: "https://github.com/shadcn.png" },
    date: "20 Apr 2026",
    readTime: "8 min read",
    tags: ["Furniture", "Style Guide"],
  },
  {
    slug: "home-office-productivity-guide",
    title: "The Complete Guide to Designing a Home Office That Boosts Productivity",
    excerpt:
      "Remote work is here to stay. Discover ergonomic layouts, acoustic treatments, and biophilic elements that turn a home office into a productivity powerhouse.",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop",
    author: { name: "Sarah Chen", avatar: "https://github.com/shadcn.png" },
    date: "14 Apr 2026",
    readTime: "12 min read",
    tags: ["Workspace", "Productivity"],
  },
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

export default function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(ALL_BLOGS.length / ITEMS_PER_PAGE);
  const paginatedBlogs = useMemo(
    () =>
      ALL_BLOGS.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ),
    [currentPage]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const el = document.getElementById("latest");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
              'url("https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop")',
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
            <span>Design Insights & Inspiration</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]">
            Our
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Journal
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Stories, insights, and expert perspectives from the front lines of
            interior design — where creativity meets craftsmanship.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="#latest"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold px-8 py-3.5 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Read Latest
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 border border-white/20 bg-white/10 backdrop-blur-sm text-white/90 px-8 py-3.5 rounded-2xl hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Share Your Story
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
          {STATS.map((stat) => {
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
      {/* FEATURED STORIES */}
      {/* ════════════════════════════════════════ */}
      <Component
        title="Interior Design Stories That Inspire"
        description="Real transformations, expert insights, and design philosophies behind our most celebrated projects — from concept to completion."
        backgroundLabel="STORIES"
        backgroundPosition="left"
        posts={FEATURED_BLOGS}
        className="mb-4 pt-20 md:pt-28"
      />

      {/* ════════════════════════════════════════ */}
      {/* LATEST ARTICLES */}
      {/* ════════════════════════════════════════ */}
      <section id="latest" className="container mx-auto px-4 pb-20">
        <motion.div {...fadeUp} className="mb-12 text-center max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
            Dive Deeper
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Latest
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Articles
            </span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Dive deeper into design principles, trends, and expert advice from
            our award-winning team.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {paginatedBlogs.map((post) => (
            <motion.div key={post.slug} variants={cardVariants}>
              <Link href={`/blogs/${post.slug}`}>
                <GlassBlogCard
                  title={post.title}
                  excerpt={post.excerpt}
                  image={post.image}
                  author={post.author}
                  date={post.date}
                  readTime={post.readTime}
                  tags={post.tags}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          className="mt-14"
        />
      </section>

      {/* ════════════════════════════════════════ */}
      {/* CTA */}
      {/* ════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop")',
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
            Have a Story to Tell?
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              We&apos;d Love to Feature It
            </span>
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            Whether it&apos;s a remarkable renovation, a design challenge you
            overcame, or insights from your creative journey — share your
            experience with our community.
          </p>
          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold px-10 py-4 rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Submit Your Story
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
