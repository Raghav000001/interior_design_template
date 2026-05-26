"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils/cn";
import {
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/blogs", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const t = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  const isDark = resolvedTheme === "dark";

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 h-16 w-[70%] max-w-5xl rounded-2xl overflow-hidden transition-all duration-500",
          scrolled
            ? "navbar-glossy shadow-lg shadow-primary/5"
            : "bg-background/60 backdrop-blur-sm shadow-sm"
        )}
      >
        {/* Top accent gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 via-secondary/30 to-accent/30 to-transparent" />

        <div className="flex h-full items-center justify-between px-6 mx-auto relative">
          {/* Left side - Logo/Brand */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-2xl">🎨</span>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
              InteriorDesign
            </span>
          </Link>

          {/* Center - Navigation Links (desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "nav-link px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                    isActive
                      ? "text-foreground nav-link active"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side - Theme toggle and buttons */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className="relative p-2 rounded-xl hover:bg-accent/10 transition-all duration-300 group"
              aria-label="Toggle theme"
            >
              <motion.div
                key={isDark ? "dark" : "light"}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {isDark ? (
                  <Sun className="h-5 w-5 text-amber-400 group-hover:text-amber-300 transition-colors" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition-colors" />
                )}
              </motion.div>
              {/* Glow ring on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {/* CTA Button */}
            <Link
              href="/admin"
              className="btn-glossy hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white rounded-xl shadow-lg shadow-primary/10"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Dashboard</span>
              <ArrowUpRight className="h-3 w-3 opacity-70" />
            </Link>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-xl hover:bg-accent/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 md:hidden"
            >
              <div className="glossy h-full rounded-l-2xl p-6 pt-20 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = link.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent/5"
                        )}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="mobile-active"
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="mt-auto pt-4 border-t border-border/50">
                  <Link
                    href="/admin"
                    className="btn-glossy flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-medium text-white rounded-xl"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}