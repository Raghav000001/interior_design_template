"use client";

import { useParams, notFound } from "next/navigation";
import { Calendar, Eye, User, ChevronLeft, Clock, Tag } from "lucide-react";
import Link from "next/link";
import { GlassBlogCard } from "@/components/ui/glass-blog-card-shadcnui";

interface BlogDetail {
  id: number;
  title: string;
  slug: string;
  content: string[];
  category: string;
  imageUrl: string;
  author: string;
  date: string;
  views: number;
  readTime: number;
  tags: string[];
}

const ALL_BLOG_DATA: Record<string, BlogDetail> = {
  "modern-minimalist-haven": {
    id: 1,
    title: "Turning a 1970s Fixer-Upper Into a Modern Minimalist Haven",
    slug: "modern-minimalist-haven",
    content: [
      "When our clients first walked us through the 1972 split-level, the potential was buried under shag carpet, dark wood paneling, and a series of questionable DIY renovations. But beneath the layers of outdated finishes lay exceptional bones — vaulted ceilings, original hardwood floors, and a floor plan that flowed beautifully from public to private spaces.",
      "Our approach was guided by a single principle: honor the architecture while stripping away everything that didn't serve the way this family of four actually lives. We opened up the kitchen to the living area by removing a load-bearing wall and replacing it with a slim steel column wrapped in warm oak. The result is a seamless great room where morning light pours through newly enlarged windows and travels across pale limestone floors.",
      "The material palette was deliberately restrained: white oak millwork, limestone surfaces, matte black fixtures, and soft linen textiles. This minimalist backdrop lets the homeowners' growing art collection take center stage, while every piece of furniture was chosen for both sculptural quality and everyday comfort.",
      "The primary suite became a sanctuary of calm. We reconfigured the layout to include a walk-in dressing room and a spa-like bathroom finished in honed marble and warm brass. Outside, floor-to-ceiling glass doors open onto a newly landscaped courtyard, blurring the line between indoors and out — a key principle of modern minimalist living that transforms how the family experiences their home year-round.",
    ],
    category: "Residential",
    imageUrl:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&auto=format&fit=crop",
    author: "Sarah Chen",
    date: "15 May 2026",
    views: 2840,
    readTime: 8,
    tags: ["minimalist", "residential", "renovation", "modern"],
  },
  "biophilic-design-urban": {
    id: 2,
    title: "Biophilic Design: Bringing the Outdoors Into Urban Interiors",
    slug: "biophilic-design-urban",
    content: [
      "In the heart of a bustling downtown, our latest commercial project proves that nature and urban living aren't mutually exclusive. The brief was clear: create a workspace that didn't just house employees but nurtured them. The answer lay in biophilic design — a science-backed approach that integrates natural elements into built environments to reduce stress, boost creativity, and improve cognitive function.",
      "We started by reimagining the building's core. A central atrium, previously a dark lightwell, was opened up and crowned with a new skylight. A living wall spanning four stories now climbs the atrium, planted with ferns, mosses, and trailing vines that thrive in indirect light. The sound of a custom water feature masks the city's hum, creating an acoustic environment that feels miles away from the traffic below.",
      "Material choices were driven by texture and authenticity. We specified untreated oak, hand-troweled clay plaster, cork flooring, and wool upholstery — materials that age gracefully and improve with touch. Each meeting room features a different botanical theme, from desert succulents to tropical foliage, giving employees a reason to explore the building rather than defaulting to the same desk every day.",
      "The results have been remarkable. Air quality testing showed a 40% improvement over the previous office, employee satisfaction scores rose by 62%, and unscheduled absences dropped by a third. Biophilic design isn't just aesthetically pleasing — it's a tangible investment in human wellbeing that pays dividends in productivity and happiness.",
    ],
    category: "Commercial",
    imageUrl:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop",
    author: "Marcus Rivera",
    date: "8 May 2026",
    views: 1950,
    readTime: 10,
    tags: ["biophilic", "commercial", "workspace", "wellness"],
  },
  "small-space-living": {
    id: 3,
    title: "The Art of Small Space Living: 400 sq ft Done Right",
    slug: "small-space-living",
    content: [
      "Four hundred square feet. For many, that number conjures images of cramped studios and impossible storage puzzles. But for our client — a young professional in a coveted downtown neighborhood — it was an opportunity to prove that square footage is no measure of a home's potential. The challenge: design a space that felt expansive, functioned for both work and entertaining, and reflected her vibrant personality.",
      "Every square inch was analyzed for dual purpose. The custom joinery wall we designed serves as entryway storage, pantry, home office nook, media console, and display shelving — all within a twelve-foot run. A sliding panel hides the desk when not in use, and the dining table folds down from the wall to seat six. The Murphy bed, framed in warm oak and fitted with integrated lighting, turns the living area into a guest-ready bedroom in under thirty seconds.",
      "The visual trick that makes the space feel twice its size is a continuous floor-to-ceiling curtain track that allows the client to shift the perceived boundaries of the room throughout the day. Pulled back, the curtains reveal floor-to-ceiling mirrors that double the light. Closed, they create an intimate cocoon around the sleeping area. This fluidity — the ability to reshape the space moment by moment — is the true luxury of thoughtful small-space design.",
      "The project proved that constraints breed creativity. By editing ruthlessly and investing in multifunctional custom pieces, we delivered a home that feels far larger than its floor plan suggests. Our client now hosts dinner parties for ten, works from home comfortably, and falls asleep each night in a space that feels like a carefully crafted jewel box — proof that the best design isn't about how much space you have, but how thoughtfully you use it.",
    ],
    category: "Space Optimization",
    imageUrl:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop",
    author: "Priya Kapoor",
    date: "2 May 2026",
    views: 3240,
    readTime: 6,
    tags: ["small-space", "optimization", "multifunctional", "studio"],
  },
  "natural-light-open-plan": {
    id: 4,
    title: "Maximizing Natural Light in Open-Plan Living Spaces",
    slug: "natural-light-open-plan",
    content: [
      "Natural light isn't just a luxury — it's a fundamental ingredient of great design. When we took on this open-plan renovation in a classic Victorian terrace, the interior was dark, compartmentalized, and cut off from the south-facing garden. The homeowners dreamed of a light-filled space that connected the kitchen, dining, and living areas without losing the period charm that first drew them to the property.",
      "Our first move was strategic subtraction. We removed two non-structural walls and replaced a small window with a full-height bi-fold door system that opens the entire rear wall to the garden. To bring light deeper into the plan, we installed a slim skylight run that tracks the sun's path across the main living spine. Light wells lined with white-painted brick bounce daylight into what was once the darkest corner of the kitchen.",
      "Material choices amplified the effect. Pale terrazzo flooring reflects light upward, while matte-white cabinetry and open shelving prevent visual weight from accumulating at eye level. We specified sheer linen curtains that filter harsh afternoon sun into a soft, diffused glow. A large mirror opposite the garden doors acts as a secondary light source, doubling the visual depth of the room.",
      "The transformation was dramatic. Where the space once felt cramped and shadowy, it now feels expansive and alive — the light changes throughout the day, creating an ever-evolving atmosphere that the homeowners describe as living inside a slowly turning kaleidoscope. It's a powerful reminder that the best light source is already available: we just need to design to capture it.",
    ],
    category: "Design Tips",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop",
    author: "Sarah Chen",
    date: "12 May 2026",
    views: 1870,
    readTime: 7,
    tags: ["lighting", "open-plan", "renovation", "victorian"],
  },
  "color-psychology-interior-design": {
    id: 5,
    title: "Color Psychology in Interior Design: What Your Walls Say About You",
    slug: "color-psychology-interior-design",
    content: [
      "Color is the most immediate emotional tool in a designer's arsenal. Step into a room painted in deep navy and you'll feel your heart rate slow; walk into a space washed in saffron yellow and your energy lifts. This isn't coincidence — it's color psychology, a discipline that draws on centuries of artistic tradition and decades of environmental psychology research.",
      "In a recent residential project, our client wanted a home that supported their dual needs: focused work during the day and relaxed entertaining in the evenings. We divided the palette by zone. The home office was painted in a muted sage green — a color associated with concentration and equilibrium. The living room, by contrast, was wrapped in a warm terracotta that encourages conversation and creates a sense of enclosure and safety.",
      "The science supports these choices. Studies have shown that blue wavelengths increase productivity in task-oriented settings, while warm tones trigger social bonding behaviors. But color psychology isn't one-size-fits-all. We always begin with a color emotion workshop: asking clients to bring images that evoke how they want to feel in each room, then translating those emotional responses into a tailored palette.",
      "The most powerful insight from our practice? Saturation matters more than hue. A pale blush pink can be calming; a high-saturation fuchsia can be energizing. By controlling intensity rather than just picking a color, we can fine-tune the emotional impact of every room. Our clients often tell us that the colors we chose transformed not just their home, but how they feel living in it.",
    ],
    category: "Color Theory",
    imageUrl:
      "https://images.unsplash.com/photo-1616046229478-5dac3cfaa153?w=1200&auto=format&fit=crop",
    author: "Marcus Rivera",
    date: "8 May 2026",
    views: 2150,
    readTime: 9,
    tags: ["color-theory", "psychology", "palette", "design-science"],
  },
  "sustainable-materials-modern-interiors": {
    id: 6,
    title: "Sustainable Materials That Are Redefining Modern Interiors",
    slug: "sustainable-materials-modern-interiors",
    content: [
      "The most exciting frontier in interior design isn't a new style — it's a new standard. Sustainable materials have evolved far beyond burlap and bamboo. Today's eco-conscious options rival conventional materials in durability, beauty, and cost, and they're transforming how we specify everything from flooring to countertops to upholstery.",
      "For a recent eco-retail fit-out, we specified a revolutionary material made from compressed mushroom root — mycelium — for acoustic wall panels. Not only are they fully compostable at end of life, but they also outperform traditional foam panels in sound absorption. The client's customers frequently touch the walls, drawn to the organic texture, sparking conversations about sustainability that align perfectly with the brand's values.",
      "In the same project, we used recycled glass terrazzo for all floor surfaces. Each batch has a slightly different composition of glass flecks, creating a unique, terrazzo-like pattern that tells the story of its material origins. The countertops are made from paper composite — a material that's lighter than stone, heat-resistant to 350 degrees, and made from 100% post-consumer recycled paper bonded with a water-based resin.",
      "The biggest myth we encounter is that sustainable design costs more. While some premium bio-based materials carry a higher upfront price, many alternatives — like reclaimed wood, recycled metal fixtures, and locally sourced stone — are competitively priced or even cheaper than their virgin counterparts. More importantly, clients report that the story behind each material adds an emotional richness to their spaces that no mass-produced finish can replicate.",
    ],
    category: "Sustainability",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop",
    author: "Priya Kapoor",
    date: "2 May 2026",
    views: 1420,
    readTime: 11,
    tags: ["sustainability", "materials", "eco-friendly", "innovation"],
  },
  "layering-lighting-professional-designer": {
    id: 7,
    title: "How to Layer Lighting Like a Professional Designer",
    slug: "layering-lighting-professional-designer",
    content: [
      "Ask any seasoned interior designer what single element makes or breaks a room, and nine out of ten will say lighting. Yet it remains the most overlooked aspect of home design. The difference between a flat, uninspiring room and a rich, inviting one is almost never the furniture — it's how the light touches every surface.",
      "Professional designers think in three layers. Ambient lighting provides the base illumination — typically overhead fixtures, recessed lights, or cove lighting that fills the room with even, shadow-free light. Task lighting focuses on work zones: a reading lamp beside an armchair, under-cabinet lights in the kitchen, a directed pendant over the dining table. Accent lighting is the secret layer — it draws the eye to architectural features, art, or texture, using spotlights, wall washers, or picture lights.",
      "In a recent living room project, we installed a dimmable track system on the ceiling that lets the homeowner adjust between five distinct lighting scenes. A 'morning' scene floods the room with cool, even light for reading. 'Evening' switches to warm, low-level pools of light around seating areas. 'Entertainment' dims everything except accent lights on the art and a single pendant over the coffee table, creating instant drama.",
      "The most important rule of lighting design: never rely on a single source. Even the most beautiful chandelier creates harsh shadows if it's the only light in the room. We recommend at least three independent light sources in every room, controlled on separate dimmers. This flexibility lets you reshape the mood of a space instantly — transitioning from bright and productive to warm and intimate at the touch of a button.",
    ],
    category: "Lighting",
    imageUrl:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop",
    author: "Elena Vasquez",
    date: "27 Apr 2026",
    views: 2630,
    readTime: 6,
    tags: ["lighting", "layering", "ambient", "design-tips"],
  },
  "mixing-vintage-contemporary-furniture": {
    id: 8,
    title: "Mixing Vintage and Contemporary Furniture Like a Pro",
    slug: "mixing-vintage-contemporary-furniture",
    content: [
      "The most memorable interiors have a quality that's hard to pin down — a sense that the space has evolved over time, layered with pieces that tell a story. That patina of personality almost always comes from mixing eras. When a 1950s Danish sideboard sits beside a minimalist contemporary sofa, both pieces become more interesting. The contrast creates a visual dialogue that a showroom-matched set can never achieve.",
      "The key to successful mixing is finding a common thread. In a recent project, we anchored a living room with a 1970s Pierre Paulin armchair in bright orange wool. The rest of the room was deliberately neutral — a pale gray modular sofa, white walls, oak flooring — letting the vintage piece sing as the focal point. The client's contemporary art collection bridged the eras, with abstract canvases that echoed the curves and colors of the mid-century pieces.",
      "Scale is the hidden variable that trips up most amateur mixers. A delicate Victorian side table can look lost next to a massive sectional; a bulky 1980s armoire can overwhelm a sleek modern bed. We always photograph the space and sketch to scale before committing to a vintage find. If a piece is too large, we might use it as a statement piece in a larger room; too small, it becomes an accent on a console or a grouping of three on a wall.",
      "The golden rule: let each era dominate a different element. Contemporary for large upholstered pieces (sofas, beds), vintage for case goods (sideboards, desks, cabinets), and a mix for accessories and lighting. This distribution ensures the space feels intentional rather than chaotic. Our clients often tell us that guests can't identify exactly why the room feels so special — they just know it has soul.",
    ],
    category: "Furniture",
    imageUrl:
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1200&auto=format&fit=crop",
    author: "James Okafor",
    date: "20 Apr 2026",
    views: 1980,
    readTime: 8,
    tags: ["vintage", "contemporary", "mixing", "furniture"],
  },
  "home-office-productivity-guide": {
    id: 9,
    title: "The Complete Guide to Designing a Home Office That Boosts Productivity",
    slug: "home-office-productivity-guide",
    content: [
      "The way we work has fundamentally changed, yet most home offices are still afterthoughts — a desk squeezed into a corner of the bedroom, a laptop balanced on the kitchen island. Research shows that a well-designed workspace can increase productivity by up to 30%, reduce stress, and even improve physical health. Designing a home office isn't a luxury — it's an investment in your professional output.",
      "We start with zoning. A productive home office needs three distinct zones: a focus zone for deep work, a collaboration zone for video calls, and a rest zone for breaks. Even in a small room, these zones can be defined by furniture arrangement, lighting, and color. The focus zone faces away from the door and windows to minimize visual distraction. The collaboration zone has a neutral background — essential for professional video calls. The rest zone is a comfortable chair with a view, no screens allowed.",
      "Ergonomics is non-negotiable. We specify height-adjustable desks for every home office project — the ability to alternate between sitting and standing throughout the day reduces back pain by 54% and improves energy levels. The monitor should be at eye level, with the top third of the screen at or just below eye height. Keyboard and mouse at elbow height. Good task lighting prevents eye strain: a quality adjustable arm lamp directed at documents, not the screen.",
      "The finishing touch is what we call cognitive zoning — using scent, sound, and texture to signal to your brain that it's time to work. A dedicated playlist, a specific essential oil diffuser blend, even the texture of a particular writing surface can create Pavlovian productivity triggers. One of our clients uses a signal lamp that switches from green (focus time) to yellow (available) to red (in a meeting), helping family members respect work boundaries without interrupting.",
    ],
    category: "Workspace",
    imageUrl:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&auto=format&fit=crop",
    author: "Sarah Chen",
    date: "14 Apr 2026",
    views: 3410,
    readTime: 12,
    tags: ["home-office", "productivity", "ergonomics", "workspace"],
  },
};

const RELATED_POSTS = [
  {
    slug: "natural-light-open-plan",
    title: "Maximizing Natural Light in Open-Plan Living Spaces",
    excerpt:
      "Natural light transforms a room. Discover expert strategies for optimizing windows and choosing reflective materials.",
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
      "From calming blues to energizing yellows, the colors you choose shape the mood of every room.",
    image:
      "https://images.unsplash.com/photo-1616046229478-5dac3cfaa153?w=800&auto=format&fit=crop",
    author: { name: "Marcus Rivera", avatar: "https://github.com/shadcn.png" },
    date: "8 May 2026",
    readTime: "9 min read",
    tags: ["Color Theory", "Psychology"],
  },
  {
    slug: "home-office-productivity-guide",
    title: "The Complete Guide to Designing a Home Office That Boosts Productivity",
    excerpt:
      "Remote work is here to stay. Discover ergonomic layouts and biophilic elements for a productive workspace.",
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop",
    author: { name: "Sarah Chen", avatar: "https://github.com/shadcn.png" },
    date: "14 Apr 2026",
    readTime: "12 min read",
    tags: ["Workspace", "Productivity"],
  },
];

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.id as string;
  const blog = ALL_BLOG_DATA[slug];

  if (!blog) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <section className="relative flex h-[50vh] min-h-[400px] items-end">
        <div
          style={{ backgroundImage: `url(${blog.imageUrl})` }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="container relative z-10 mx-auto px-4 pb-10 sm:pb-12 text-white">
          <Link
            href="/blogs"
            className="mb-4 sm:mb-6 flex items-center gap-2 text-xs sm:text-sm text-white/70 transition-colors hover:text-white"
          >
            <ChevronLeft className="size-3 sm:size-4" />
            Back to Blogs
          </Link>

          <span className="mb-2 sm:mb-3 inline-block rounded-md bg-white/20 px-2 py-0.5 text-xs sm:px-3 sm:py-1 sm:text-sm font-medium capitalize backdrop-blur-sm">
            {blog.category}
          </span>

          <h1 className="max-w-4xl text-xl font-bold leading-tight sm:text-2xl md:text-4xl lg:text-5xl">
            {blog.title}
          </h1>

          <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-white/70">
            <span className="flex items-center gap-1 sm:gap-1.5">
              <User className="size-3 sm:size-4" />
              {blog.author}
            </span>
            <span className="flex items-center gap-1 sm:gap-1.5">
              <Calendar className="size-3 sm:size-4" />
              {blog.date}
            </span>
            <span className="flex items-center gap-1 sm:gap-1.5">
              <Eye className="size-3 sm:size-4" />
              {blog.views.toLocaleString()} views
            </span>
            <span className="flex items-center gap-1 sm:gap-1.5">
              <Clock className="size-3 sm:size-4" />
              {blog.readTime} min read
            </span>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 sm:py-16">
        <article className="prose prose-sm sm:prose-lg mx-auto max-w-3xl dark:prose-invert">
          {blog.content.map((paragraph, index) => (
            <p key={index} className="text-base sm:text-lg leading-relaxed text-foreground/80 first:mt-0">
              {paragraph}
            </p>
          ))}
        </article>

        <div className="mx-auto mt-8 sm:mt-12 flex max-w-3xl flex-wrap items-center gap-2 border-t pt-6 sm:pt-8">
          <Tag className="size-3 sm:size-4 text-muted-foreground" />
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-secondary px-2 py-0.5 text-xs sm:px-3 sm:py-1 sm:text-sm capitalize text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-secondary/30 py-10 sm:py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 sm:mb-10 text-xl sm:text-2xl font-semibold md:text-3xl">
            Related Articles
          </h2>
          <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {RELATED_POSTS.map((post) => (
              <Link key={post.slug} href={`/blogs/${post.slug}`}>
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
