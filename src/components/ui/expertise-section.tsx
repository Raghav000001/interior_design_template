"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  Building2,
  Eye,
  Leaf,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

const items = [
  {
    icon: Home,
    label: "Residential",
    title: "Residential Design",
    description: "Full-service interior design",
    video: "https://assets.mixkit.co/videos/3090/3090-720.mp4",

    card: {
      heading: "Residential Design",
      badge: "Featured",
      goal:
        "Transform your living spaces with comprehensive residential design services. From cozy apartment makeovers to full luxury home renovations, we craft interiors that reflect your personality and lifestyle.",

      tasks: [
        {
          title: "Space planning & layout",
          meta: "Completed in 3.2s",
          status: "completed",
        },
        {
          title: "Material & finish selection",
          meta: "Completed in 5.8s",
          status: "completed",
        },
        {
          title: "Custom furniture design",
          meta: "Completed in 4.2s",
          status: "completed",
        },
        {
          title: "Project management & delivery",
          meta: "Completed in 6.1s",
          status: "completed",
        },
      ],
    },
  },

  {
    icon: Building2,
    label: "Commercial",
    title: "Commercial & Retail",
    description: "Branded commercial environments",
    video: "https://assets.mixkit.co/videos/917/917-720.mp4",

    card: {
      heading: "Commercial Design",
      badge: "Enterprise",
      goal:
        "Create impactful commercial spaces that tell your brand story and drive customer engagement. We design offices, retail stores, restaurants, and hospitality venues that balance aesthetics with functionality.",

      tasks: [
        {
          title: "Brand integration & identity",
          meta: "Completed in 4.1s",
          status: "completed",
        },
        {
          title: "Traffic flow planning",
          meta: "Completed in 6.3s",
          status: "completed",
        },
        {
          title: "Ergonomic workspace design",
          meta: "Completed in 8.9s",
          status: "completed",
        },
        {
          title: "Material & fixture selection",
          meta: "Completed in 5.2s",
          status: "completed",
        },
      ],
    },
  },

  {
    icon: Eye,
    label: "Visualization",
    title: "3D Visualization & Rendering",
    description: "Stunning 3D previews",
    video: "https://assets.mixkit.co/videos/3112/3112-720.mp4",

    card: {
      heading: "3D Visualization",
      badge: "Preview",
      goal:
        "See your space before it exists with photorealistic 3D rendering services. Our visualizations help clients make confident decisions about layouts, colors, materials, and furnishings.",

      tasks: [
        {
          title: "Create 3D model",
          meta: "Completed in 5.2s",
          status: "completed",
        },
        {
          title: "Apply materials & lighting",
          meta: "Completed in 7.6s",
          status: "completed",
        },
        {
          title: "Generate high-res renders",
          meta: "Completed in 5.8s",
          status: "completed",
        },
        {
          title: "Build 360° virtual tour",
          meta: "Completed in 7.2s",
          status: "completed",
        },
      ],
    },
  },

  {
    icon: Leaf,
    label: "Eco Design",
    title: "Eco-Friendly Design",
    description: "Sustainable design solutions",
    video: "https://assets.mixkit.co/videos/2065/2065-720.mp4",

    card: {
      heading: "Sustainable Design",
      badge: "Green",
      goal:
        "Embrace sustainability without sacrificing style. Our eco-friendly design services incorporate recycled materials, energy-efficient lighting, sustainable wood sources, and low-VOC finishes.",

      tasks: [
        {
          title: "Sustainable material sourcing",
          meta: "Completed in 3.8s",
          status: "completed",
        },
        {
          title: "Energy efficiency planning",
          meta: "Completed in 5.9s",
          status: "completed",
        },
        {
          title: "Green certification assessment",
          meta: "Completed in 4.7s",
          status: "completed",
        },
        {
          title: "Low-impact finish selection",
          meta: "Completed in 3.4s",
          status: "completed",
        },
      ],
    },
  },

  {
    icon: ClipboardList,
    label: "Project Mgmt",
    title: "Project Management",
    description: "Turnkey project execution",
    video: "https://assets.mixkit.co/videos/41184/41184-720.mp4",

    card: {
      heading: "Project Management",
      badge: "End-to-End",
      goal:
        "From concept to completion, our project management team ensures your design project runs smoothly. We coordinate contractors, manage timelines, track budgets, and handle procurement.",

      tasks: [
        {
          title: "Contractor coordination",
          meta: "Completed in 2.7s",
          status: "completed",
        },
        {
          title: "Timeline & milestone tracking",
          meta: "Completed in 4.5s",
          status: "completed",
        },
        {
          title: "Budget & procurement",
          meta: "Completed in 6.3s",
          status: "completed",
        },
        {
          title: "Progress reporting",
          meta: "Completed in 3.8s",
          status: "completed",
        },
      ],
    },
  },
];

export default function ExpertiseSection() {
  const [activeTab, setActiveTab] = useState(0);
  const activeItem = items[activeTab];

  const totalTasks = activeItem.card.tasks.length;

  return (
    <section className="bg-[#f5f5f3] py-20 overflow-hidden">
      {/* TOP */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-14 items-start mb-10">
          {/* LEFT */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8 bg-gradient-to-r from-pink-400 to-orange-400" />
              <span className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[#888]">
                What We Do
              </span>
            </div>
            <h2 className="text-[52px] md:text-[60px] leading-[56px] md:leading-[64px] tracking-tight font-bold text-[#131313] max-w-2xl">
              Bringing your{" "}
              <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                vision
              </span>
              {" "}to life
            </h2>
          </div>

          {/* RIGHT */}
          <div className="space-y-6 pt-2">
            <p className="text-[17px] leading-[34px] text-[#555] max-w-lg font-light">
              Comprehensive interior design services — from concept to
              completion, crafted with precision by our expert team.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 border-2 border-[#f5f5f3]" />
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 border-2 border-[#f5f5f3]" />
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 border-2 border-[#f5f5f3]" />
              </div>
              <span className="text-[14px] text-[#999]">
                Crafting <span className="text-[#131313] font-medium">200+</span> dream spaces
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE AREA */}
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* FLOATING TABS */}
        <div className="absolute left-2 bottom-16 z-20">
          <div className="bg-white rounded-[28px] shadow-xl border border-[#e8e8e8] p-3 w-[240px]">
            <div className="flex flex-col gap-2">
              {items.map((tab, index) => {
                const Icon = tab.icon;

                return (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`
                      group flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 border
                      ${
                        activeTab === index
                          ? "bg-[#f4fbf7] border-[#266347]"
                          : "border-transparent hover:border-[#266347] hover:bg-[#f8fffb]"
                      }
                    `}
                  >
                    <Icon
                      className={`
                        w-5 h-5 transition-colors duration-300
                        ${
                          activeTab === index
                            ? "text-[#266347]"
                            : "text-[#131313] group-hover:text-[#266347]"
                        }
                      `}
                    />

                    <span
                      className={`
                        text-[15px] font-medium transition-colors duration-300
                        ${
                          activeTab === index
                            ? "text-[#266347]"
                            : "text-[#131313] group-hover:text-[#266347]"
                        }
                      `}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* VIDEO CONTAINER */}
        <div
          className="relative overflow-hidden h-[690px]"
          style={{
            clipPath:
              "polygon(0 0, 92% 0, 100% 12%, 100% 100%, 30% 100%, 22% 88%, 0 88%)",
            borderRadius: "34px",
          }}
        >
          {/* BACKGROUND VIDEO */}
          <AnimatePresence mode="wait">
            <motion.video
              key={activeItem.video}
              src={activeItem.video}
              autoPlay
              muted
              loop
              playsInline
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/10" />

          {/* CENTER CARD */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.card.heading}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 14 }}
                transition={{ duration: 0.35 }}
                className="w-[320px] rounded-[26px] border border-white/30 bg-white/80 backdrop-blur-xl shadow-2xl p-5"
              >
                {/* HEADER */}
                <div className="flex items-center justify-between">
                  <h3 className="text-[18px] font-semibold text-[#131313]">
                    {activeItem.card.heading}
                  </h3>

                  <span className="text-[11px] bg-[#eef8f2] text-[#266347] px-2 py-1 rounded-md">
                    {activeItem.card.badge}
                  </span>
                </div>

                {/* GOAL */}
                <div className="mt-4 border border-[#e7e7e7] rounded-xl p-3">
                  <p className="text-[11px] text-[#777]">Goal</p>
                  <p className="text-[13px] leading-[20px] mt-1 text-[#131313]">
                    {activeItem.card.goal}
                  </p>
                </div>

                {/* TASKS */}
                <div className="mt-4 flex flex-col gap-3">
                  {activeItem.card.tasks.map((task, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="mt-[2px]">
                        <CheckCircle2 className="w-4 h-4 text-[#266347]" />
                      </div>

                      <div>
                        <p className="text-[13px] line-through text-[#666]">
                          {task.title}
                        </p>
                        <p className="text-[11px] text-[#999]">
                          {task.meta}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between mt-5 text-[11px] text-[#888]">
                  <span>
                    {totalTasks}/{totalTasks} tasks complete
                  </span>
                  <span className="text-[#266347] font-medium">All done ✓</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
