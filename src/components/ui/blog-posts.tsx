import Link from "next/link";
import { cn } from "@/lib/utils";
import { MoveRight, Star } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  href: string;
  views: number;
  readTime?: number;
  rating?: number;
  className?: string;
}

interface GridSectionProps {
  title: string;
  description: string;
  backgroundLabel?: string;
  backgroundPosition?: "left" | "right";
  posts?: BlogPost[];
  className?: string;
  onPostClick?: (post: BlogPost) => void;
}

export const Component = ({
  title,
  description,
  backgroundLabel,
  backgroundPosition = "left",
  posts = [],
  className,
  onPostClick,
}: GridSectionProps) => {
  return (
    <section
      className={cn(
        "container relative my-20 py-10 mx-auto px-4",
        className
      )}
    >
      <h1 className="text-center text-4xl font-semibold capitalize !leading-[1.4] md:text-5xl lg:text-6xl mb-2">
        {title}
      </h1>

      {backgroundLabel && (
        <span
          className={cn(
            "absolute -top-10 -z-50 select-none text-[80px] font-extrabold leading-[1] text-black/[0.03] sm:text-[120px] md:text-[250px] lg:text-[400px] text-foreground/[0.025]",
            backgroundPosition === "left" ? "-left-[18%]" : "-right-[28%]"
          )}
        >
          {backgroundLabel}
        </span>
      )}

      <p className="mx-auto max-w-[800px] text-center text-xl !leading-[2] text-foreground/50 md:text-2xl mb-8">
        {description}
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-[1fr_0.5fr]">
        {posts.map((post, index) => {
          const {
            id,
            title: postTitle,
            category,
            imageUrl,
            views,
            readTime,
            rating = 4,
            className: postClassName,
          } = post;

          const isPrimary = index === 0;

          return (
            <Link
              key={id || index}
              href={onPostClick ? "#" : post.href}
              style={{ backgroundImage: `url(${imageUrl})` }}
              onClick={(e) => {
                if (onPostClick) {
                  e.preventDefault();
                  onPostClick(post);
                }
              }}
              className={cn(
                "group relative flex min-h-[240px] cursor-pointer flex-col justify-end overflow-hidden rounded-[20px] bg-cover bg-center bg-no-repeat p-4 text-white transition-all duration-300 hover:scale-[0.98] hover:rotate-[0.3deg] sm:min-h-[300px] sm:p-5",
                isPrimary &&
                  "col-span-1 md:col-span-2 lg:col-span-1 lg:row-span-2",
                postClassName
              )}
            >
              <div className="absolute inset-0 -z-0 h-[130%] w-full bg-gradient-to-t from-black/80 to-transparent transition-all duration-500 group-hover:h-full" />

              <article className="relative z-0 flex items-end">
                <div className="flex flex-1 flex-col gap-2 sm:gap-3">
                  <h1 className="text-xl font-semibold sm:text-2xl md:text-3xl lg:text-4xl">
                    {postTitle}
                  </h1>
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <span className="w-fit rounded-md bg-white/40 px-2 py-px text-sm capitalize text-white backdrop-blur-md sm:text-base">
                      {category}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            width={16}
                            height={16}
                            className="sm:h-5 sm:w-5"
                            key={idx}
                            stroke={idx < rating ? "#ffa534" : "#B9B8B8aa"}
                            fill={idx < rating ? "#ffa534" : "#B9B8B8aa"}
                          />
                        ))}
                      </div>
                      <span className="text-sm font-thin sm:text-lg">
                        ({views} Views)
                      </span>
                    </div>
                    {readTime && (
                      <div className="text-base font-semibold sm:text-xl">
                        {readTime} min read
                      </div>
                    )}
                  </div>
                </div>
                <MoveRight
                  className="hidden shrink-0 transition-all duration-300 group-hover:translate-x-2 sm:block"
                  color="white"
                  width={40}
                  height={40}
                  strokeWidth={1.25}
                />
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
