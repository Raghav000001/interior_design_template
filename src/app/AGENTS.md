# src/app - Next.js App Router

**Parent**: [AGENTS.md](../../../AGENTS.md)

## OVERVIEW
App Router with route groups, admin dashboard (17 pages), REST API (24 handlers), and custom Swagger docs.

## STRUCTURE
```
app/
├── page.tsx                    # Homepage
├── layout.tsx                  # Root layout
├── (auth)/                     # Route group (not in URL)
│   └── login/page.tsx          # Login page
├── admin/                      # Admin dashboard subtree
│   ├── layout.tsx              # Admin shell (client-side auth guard)
│   ├── page.tsx                # Dashboard landing
│   ├── uploads/ media/ leads/ brochures/ consultations/
│   ├── navigation/ team/ blogs/ projects/ testimonials/
│   ├── services/ analytics/ theme/ settings/
│   └── seo/                    # SEO management subtree
│       ├── robots/ schema/ sitemap/
├── api/                        # REST API (24 route handlers)
│   ├── auth/[...nextauth]/     # NextAuth handler
│   ├── auth/register/          # Registration endpoint
│   ├── {resource}/route.ts     # Collection routes (GET/POST)
│   └── {resource}/[id]/route.ts # Dynamic routes (GET/PUT/DELETE)
└── docs/                       # Custom Swagger endpoint (NOT under /api)
    ├── route.ts                # GET /docs → Swagger UI HTML
    └── swagger.ts              # Swagger spec generator
```

## API ROUTES
All routes return `ApiResponse` wrapper. Pattern: collection + dynamic `[id]` segments.
Resources: projects, services, team, testimonials, leads, consultations, seo, brochures, blogs, uploads, dashboard/statistics.

## CONVENTIONS
- Route handlers in `route.ts` files (not `handler.ts`)
- Request validation via `src/lib/validations/` (Zod)
- Database models from `src/schemas/` (Mongoose)
- Auth via NextAuth v5 (`AUTH_SECRET` env var)
- Rate limiting applied per-handler via `src/lib/middleware/rate-limit.ts`

## UNIQUE
- `(auth)` route group hides login from URL path
- `/docs` endpoint outside `/api` namespace (non-standard)
- Admin layout uses client-side `useSession` guard, not server middleware
- SEO subtree has 3 dedicated pages: robots, schema, sitemap