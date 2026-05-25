"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-neutral-900 border border-neutral-800 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <div className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg flex items-center justify-center bg-gradient-to-br from-pink-500/10 to-orange-500/10">
                  <span className="text-8xl">{active.emoji}</span>
                </div>
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-300 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-neutral-800 rounded-xl cursor-pointer border border-neutral-800"
          >
            <div className="flex gap-4 flex-col md:flex-row ">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <div className="h-40 w-40 md:h-14 md:w-14 rounded-lg flex items-center justify-center text-3xl bg-gradient-to-br from-pink-500/20 to-orange-500/20">
                  {card.emoji}
                </div>
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-400 text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-neutral-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 hover:text-white text-neutral-300 mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Full-service interior design",
    title: "Residential Design",
    src: "",
    emoji: "🏠",
    ctaText: "Explore",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Transform your living spaces with our comprehensive residential design services. From cozy apartment makeovers to full luxury home renovations, we craft interiors that reflect your personality and lifestyle.
          <br /><br />
          Our process includes space planning, material selection, custom furniture design, lighting design, and project management — ensuring every detail aligns with your vision and budget.
        </p>
      );
    },
  },
  {
    description: "Branded commercial environments",
    title: "Commercial & Retail",
    src: "",
    emoji: "🏢",
    ctaText: "Explore",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Create impactful commercial spaces that tell your brand story and drive customer engagement. We design offices, retail stores, restaurants, and hospitality venues that balance aesthetics with functionality.
          <br /><br />
          Our commercial solutions focus on traffic flow, brand integration, ergonomic workspaces, and durable material selection to withstand high-traffic environments while maintaining visual appeal.
        </p>
      );
    },
  },
  {
    description: "Stunning 3D previews",
    title: "3D Visualization & Rendering",
    src: "",
    emoji: "🎨",
    ctaText: "Explore",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          See your space before it exists with our photorealistic 3D rendering services. Our visualizations help clients make confident decisions about layouts, colors, materials, and furnishings.
          <br /><br />
          We deliver high-resolution renders, 360° virtual tours, and immersive walkthroughs that bring your design concepts to life with stunning accuracy and detail.
        </p>
      );
    },
  },
  {
    description: "Sustainable design solutions",
    title: "Eco-Friendly Design",
    src: "",
    emoji: "🌿",
    ctaText: "Explore",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Embrace sustainability without sacrificing style. Our eco-friendly design services incorporate recycled materials, energy-efficient lighting, sustainable wood sources, and low-VOC finishes.
          <br /><br />
          We help you achieve green building certifications while creating beautiful, healthy spaces that reduce environmental impact and promote wellbeing.
        </p>
      );
    },
  },
  {
    description: "Turnkey project execution",
    title: "Project Management",
    src: "",
    emoji: "📋",
    ctaText: "Explore",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          From concept to completion, our project management team ensures your design project runs smoothly. We coordinate contractors, manage timelines, track budgets, and handle procurement.
          <br /><br />
          With regular progress reports and transparent communication, we keep you informed at every stage, delivering your project on time and within budget — stress-free.
        </p>
      );
    },
  },
];