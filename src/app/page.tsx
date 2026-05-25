"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expand-media";
import ExpertiseSection from "@/components/ui/expertise-section";
import { PortfolioSection } from "@/components/ui/portfolio-section";
import Testimonials from "@/components/ui/testimonials-columns-1";
import CtaSection from "@/components/ui/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1280&auto=format&fit=crop"
        bgImageSrc="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1920&auto=format&fit=crop"
        title="Elegant Interior Design"
        date="Transforming Spaces Into Art"
        scrollToExpand="Scroll to Explore Our Work"
      />

      <ExpertiseSection />
      <PortfolioSection />
      <Testimonials />
      <CtaSection />
    </div>
  );
}
