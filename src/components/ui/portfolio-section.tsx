"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const portfolioData = [
  {
    category: "Residential",
    title: "Modern Minimalist Living Room",
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2832&auto=format&fit=crop",
    content: (
      <PortfolioDetail
        description="A serene minimalist living room transformation featuring clean lines, natural materials, and a carefully curated neutral palette. The space balances comfort with sophisticated simplicity."
        details={[
          { label: "Client", value: "Private Residence, Palo Alto" },
          { label: "Year", value: "2025" },
          { label: "Area", value: "2,400 sq ft" },
          { label: "Duration", value: "14 weeks" },
        ]}
        images={[
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2832&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2874&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2827&auto=format&fit=crop",
        ]}
      />
    ),
  },
  {
    category: "Commercial",
    title: "Flagship Retail Boutique",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2938&auto=format&fit=crop",
    content: (
      <PortfolioDetail
        description="A flagship retail environment designed to immerse customers in the brand experience. Custom fixtures, strategic lighting, and fluid circulation patterns guide discovery."
        details={[
          { label: "Client", value: "Luxe Haus, San Francisco" },
          { label: "Year", value: "2025" },
          { label: "Area", value: "3,800 sq ft" },
          { label: "Duration", value: "18 weeks" },
        ]}
        images={[
          "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2938&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1555633514-abd7b254b7e3?q=80&w=2932&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=2904&auto=format&fit=crop",
        ]}
      />
    ),
  },
  {
    category: "Office",
    title: "Creative Tech Headquarters",
    src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2938&auto=format&fit=crop",
    content: (
      <PortfolioDetail
        description="A dynamic office environment blending collaboration zones with quiet focus areas. Biophilic design elements, adjustable workstations, and breakout spaces foster innovation."
        details={[
          { label: "Client", value: "NovaTech Solutions" },
          { label: "Year", value: "2024" },
          { label: "Area", value: "12,000 sq ft" },
          { label: "Duration", value: "24 weeks" },
        ]}
        images={[
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2938&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2940&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2940&auto=format&fit=crop",
        ]}
      />
    ),
  },
  {
    category: "Hospitality",
    title: "Rooftop Restaurant & Lounge",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940&auto=format&fit=crop",
    content: (
      <PortfolioDetail
        description="An elevated dining experience with panoramic city views. Warm wood accents, ambient lighting, and curated art create an intimate yet vibrant atmosphere."
        details={[
          { label: "Client", value: "Skyline Hospitality Group" },
          { label: "Year", value: "2025" },
          { label: "Area", value: "4,200 sq ft" },
          { label: "Duration", value: "20 weeks" },
        ]}
        images={[
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2940&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2874&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2940&auto=format&fit=crop",
        ]}
      />
    ),
  },
  {
    category: "Residential",
    title: "Luxury Master Suite",
    src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2940&auto=format&fit=crop",
    content: (
      <PortfolioDetail
        description="A tranquil master suite designed as a personal sanctuary. Layered textures, a bespoke headwall, and an ensuite spa bathroom redefine residential luxury."
        details={[
          { label: "Client", value: "Private Residence, Napa Valley" },
          { label: "Year", value: "2024" },
          { label: "Area", value: "1,800 sq ft" },
          { label: "Duration", value: "12 weeks" },
        ]}
        images={[
          "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2940&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2940&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2940&auto=format&fit=crop",
        ]}
      />
    ),
  },
  {
    category: "Residential",
    title: "Contemporary Kitchen Design",
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2940&auto=format&fit=crop",
    content: (
      <PortfolioDetail
        description="A chef-inspired kitchen with concealed storage, waterfall islands, and smart technology integration. The design prioritizes both functionality and aesthetics."
        details={[
          { label: "Client", value: "Private Residence, Marin County" },
          { label: "Year", value: "2025" },
          { label: "Area", value: "650 sq ft" },
          { label: "Duration", value: "10 weeks" },
        ]}
        images={[
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2940&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?q=80&w=2940&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2940&auto=format&fit=crop",
        ]}
      />
    ),
  },
];

function PortfolioDetail({
  description,
  details,
  images,
}: {
  description: string;
  details: { label: string; value: string }[];
  images: string[];
}) {
  return (
    <div className="space-y-8">
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl leading-relaxed">
        {description}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="bg-neutral-50 dark:bg-neutral-800 rounded-xl p-4"
          >
            <p className="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              {detail.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              {detail.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="relative h-48 md:h-64 rounded-2xl overflow-hidden"
          >
            <Image
              src={img}
              alt={`Project image ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const cards = portfolioData.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout />
  ));

  return (
    <section className="bg-background py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-[2px] w-8 bg-gradient-to-r from-pink-400 to-orange-400" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Our Portfolio
            </span>
            <div className="h-[2px] w-8 bg-gradient-to-l from-pink-400 to-orange-400" />
          </div>
          <h2 className="text-[52px] md:text-[60px] leading-[56px] md:leading-[64px] tracking-tight font-bold max-w-2xl mx-auto">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-lg">
            Explore our curated collection of interior design projects spanning residential,
            commercial, office, and hospitality spaces.
          </p>
        </motion.div>
      </div>

      <Carousel items={cards} />
    </section>
  );
}
