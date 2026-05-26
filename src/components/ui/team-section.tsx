"use client";

import Image from "next/image";
import { UserStar } from "lucide-react";

import { Marquee } from "@/components/ui/marquee";

const teamMembers = [
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    name: "Patrick Stewart",
    role: "CEO - Founder",
  },
  {
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    name: "Alena Rosser",
    role: "Director of Design",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    name: "Fletch Skinner",
    role: "Senior Architect",
  },
  {
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    name: "Marc Spector",
    role: "Interior Stylist",
  },
  {
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=80",
    name: "Natalia Skinner",
    role: "Design Researcher",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    name: "David Kim",
    role: "Project Lead",
  },
];

export default function TeamSection() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-12 md:py-24">
      <div>
        <svg
          className="absolute right-0 bottom-0 text-border"
          fill="none"
          height="154"
          viewBox="0 0 460 154"
          width="460"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_494_1104)">
            <path
              d="M-87.463 458.432C-102.118 348.092 -77.3418 238.841 -15.0744 188.274C57.4129 129.408 180.708 150.071 351.748 341.128C278.246 -374.233 633.954 380.602 548.123 42.7707"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="40"
            />
          </g>
          <defs>
            <clipPath id="clip0_494_1104">
              <rect fill="white" height="154" width="460" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-16 flex max-w-5xl flex-col items-center px-6 text-center lg:px-0">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <UserStar className="h-6 w-6" />
          </div>

          <h1 className="relative mb-4 font-medium text-4xl tracking-tight text-foreground sm:text-5xl">
            Meet Our Creative Team
            <svg
              className="absolute -top-2 -right-8 -z-10 w-24 text-border"
              fill="currentColor"
              height="86"
              viewBox="0 0 108 86"
              width="108"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M38.8484 16.236L15 43.5793L78.2688 15L18.1218 71L93 34.1172L70.2047 65.2739"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="28"
              />
            </svg>
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Our curated team of architects, interior designers, and stylists
            brings decades of collective expertise to every project we touch.
          </p>
        </div>

        <div className="relative w-full">
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-32 bg-linear-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-32 bg-linear-to-l from-background to-transparent" />

          <Marquee className="[--gap:1.5rem]" pauseOnHover>
            {teamMembers.map((member) => (
              <div
                className="flex w-64 shrink-0 flex-col"
                key={member.name}
              >
                <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-muted">
                  <Image
                    alt={member.name}
                    className="h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
                    fill
                    src={member.image}
                  />
                  <div className="absolute bottom-0 w-full rounded-lg bg-background/85 p-2">
                    <h3 className="font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        <div className="mx-auto mt-20 max-w-3xl px-6 text-center lg:px-0">
          <p className="mb-8 text-lg font-medium leading-relaxed text-foreground md:text-xl">
            The team&apos;s attention to detail and ability to translate our
            vision into reality exceeded every expectation. They transformed
            our space beyond what we imagined possible.
          </p>
          <div className="flex flex-col items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full">
              <Image
                alt="Natalia Kara"
                className="h-full w-full object-cover"
                fill
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
              />
            </div>
            <div className="text-center">
              <p className="font-semibold text-foreground">
                Natalia Kara
              </p>
              <p className="text-sm text-muted-foreground">
                CTO · Design Collection
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
