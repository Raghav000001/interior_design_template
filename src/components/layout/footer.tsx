"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiGithub as Github,
  FiLinkedin as Linkedin,
  FiInstagram as Instagram,
} from "react-icons/fi";
import {
  ArrowUp,
  Sparkles,
  Palette,
  Home,
  Image,
  Briefcase,
  Users,
  Phone,
  Mail,
  Send,
} from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Image },
  { href: "/services", label: "Services", icon: Briefcase },
  { href: "/about", label: "About Us", icon: Users },
  { href: "/contact", label: "Contact", icon: Phone },
];

const services = [
  { label: "Residential Design", href: "/services" },
  { label: "Commercial Design", href: "/services" },
  { label: "Space Planning", href: "/services" },
  { label: "Consultation", href: "/services" },
];

const socialLinks = [
  { href: "#", icon: Github, label: "GitHub" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Instagram, label: "Instagram" },
  { href: "#", icon: Mail, label: "Email" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const } },
};

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className="footer-glossy relative"
    >
      <div className="max-w-7xl mx-auto px-6 py-16 pb-8">
        {/* Top row - 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="text-2xl">🎨</span>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
                InteriorDesign
              </span>
            </Link>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Transforming spaces into experiences through thoughtful design and meticulous craftsmanship. Creating interiors that inspire and endure.
            </p>
            {/* Tagline with icon */}
            <div className="flex items-center gap-2 text-xs text-primary/70">
              <Sparkles className="h-3 w-3" />
              <span>Premium interior design studio</span>
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground/60">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2.5 text-sm text-muted-foreground/80 hover:text-foreground transition-all duration-300"
                    >
                      <Icon className="h-3.5 w-3.5 text-primary/40 group-hover:text-primary/80 transition-colors duration-300" />
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Services Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground/60">
              Our Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="group flex items-center gap-2.5 text-sm text-muted-foreground/80 hover:text-foreground transition-all duration-300"
                  >
                    <Palette className="h-3.5 w-3.5 text-secondary/40 group-hover:text-secondary/80 transition-colors duration-300" />
                    <span className="relative">
                      {service.label}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-secondary to-accent group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-muted-foreground/60">
              Connect With Us
            </h4>
            <p className="text-sm text-muted-foreground/70 leading-relaxed">
              Follow us on social media for daily inspiration and the latest design trends.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="social-glossy flex items-center justify-center w-10 h-10 rounded-xl border border-border/50 bg-background/50 text-muted-foreground hover:text-white"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4 relative z-10" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          variants={itemVariants}
          className="relative my-14 p-8 rounded-2xl glossy overflow-hidden"
        >
          {/* Decorative gradient glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 text-center sm:text-left">
              <h4 className="text-lg font-semibold flex items-center gap-2 justify-center sm:justify-start">
                <Mail className="h-5 w-5 text-primary" />
                Stay Inspired
              </h4>
              <p className="text-sm text-muted-foreground/70 mt-1">
                Get the latest design trends, tips, and project inspiration delivered to your inbox.
              </p>
            </div>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-sm text-success"
              >
                <Sparkles className="h-4 w-4" />
                <span>Thanks for subscribing!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 sm:w-56 px-4 py-2.5 text-sm rounded-xl border border-border/60 bg-background/50 backdrop-blur-sm placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-300"
                />
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.95 }}
                  className="btn-glossy flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white rounded-xl whitespace-nowrap"
                >
                  <Send className="h-3.5 w-3.5" />
                  Subscribe
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="footer-divider my-10"
        />

        {/* Bottom row */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} InteriorDesign Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground/60">
            <Link href="#" className="hover:text-foreground transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-xl glossy text-primary shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-shadow duration-300"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-4 w-4" />
      </motion.button>
    </motion.footer>
  );
}