<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PROJECT KNOWLEDGE BASE

**Generated:** 2026-05-21  
**Commit:** 73f6fad  
**Branch:** master

## OVERVIEW
Next.js 16 App Router project with MongoDB/Mongoose, NextAuth v5, Zod validations, and custom API docs. Single package (no workspace). Interior design business admin with portfolio, blog, SEO, and lead management.

## STRUCTURE
```
./
├── src/
│   ├── app/           # App Router (pages + API routes)
│   │   ├── (auth)/    # Route group for login
│   │   ├── admin/     # Admin dashboard (17 subpages)
│   │   ├── api/       # REST API (24 route handlers)
│   │   └── docs/      # Custom Swagger endpoint
│   ├── components/    # Global component library (not feature-colocated)
│   │   ├── ui/        # Reusable UI primitives (13 files)
│   │   ├── layout/    # Layout shells (admin-layout, etc.)
│   │   ├── providers/ # Theme provider, session provider
│   │   ├── dashboard/ # Dashboard widgets
│   │   └── charts/    # Chart components
│   ├── lib/           # Infrastructure layer (auth, db, errors, middleware, services)
│   ├── schemas/       # Mongoose models (domain/persistence layer)
│   └── types/         # TypeScript augmentations
├── public/            # Static assets
├── scripts/           # Ad hoc ops scripts (seed.ts, seed-admin.ts)
├── next.config.ts     # Empty - no custom overrides
├── tsconfig.json      # @/* → ./src/* alias
├── eslint.config.mjs  # Flat config, core-web-vitals + typescript
└── postcss.config.mjs # Tailwind v4 via @tailwindcss/postcss
```

## WHERE TO LOOK
| Task | Location | Notes |
|------|----------|-------|
| Pages/routes | `src/app/**/page.tsx` | App Router, route groups `(auth)` |
| API routes | `src/app/api/**/route.ts` | REST CRUD + dynamic `[id]` segments |
| Admin pages | `src/app/admin/**/page.tsx` | 17 subpages including SEO subtree |
| Database models | `src/schemas/*.schema.ts` | Mongoose schemas, barrel export via `index.ts` |
| Request validation | `src/lib/validations/*.validation.ts` | Zod schemas (parallel to schemas/) |
| Auth setup | `src/lib/auth/auth.config.ts` | NextAuth v5, `AUTH_SECRET` env var |
| Error handling | `src/lib/errors/` | Custom `AppError`, `ApiResponse` wrapper |
| Rate limiting | `src/lib/middleware/rate-limit.ts` | Custom in-memory Map (not framework middleware) |
| Cloudinary uploads | `src/lib/services/cloudinary.ts` | Image upload service |
| Custom docs | `src/app/docs/route.ts` | Swagger UI at `/docs` (outside `/api`) |
| Seed scripts | `scripts/seed.ts`, `scripts/seed-admin.ts` | Load `.env` directly, not in npm scripts |

## CONVENTIONS
- **Path alias**: `@/*` → `./src/*` (from tsconfig.json)
- **Naming**: PascalCase for utilities (`ApiResponse.ts`, `AppError.ts`) - nonstandard
- **Linting**: ESLint flat config (`eslint.config.mjs`), extends `core-web-vitals` + `typescript`
- **Styling**: Tailwind v4 via `@tailwindcss/postcss` (no `tailwind.config.*` file)
- **API return**: All routes wrap responses with `ApiResponse` utility
- **TypeScript**: `strict: true`, `moduleResolution: "bundler"`, `noEmit: true`, `isolatedModules: true`
- **Route pattern**: Collection routes (`/resource/route.ts`) + dynamic routes (`/resource/[id]/route.ts`)

## ANTI-PATTERNS (THIS PROJECT)
- **Dual domain trees**: `src/schemas/` (Mongoose) and `src/lib/validations/` (Zod) both define domain models - causes confusion
- **No tests**: Zero test setup (no Jest, Vitest, or Playwright configured)
- **No CI/CD**: Vercel-only deployment, no GitHub Actions, Docker, or vercel.json
- **No middleware.ts**: Rate limiting implemented in `src/lib/middleware/`, not via Next.js middleware
- **Client-side admin auth**: `src/app/admin/layout.tsx` uses `useSession` guard instead of server-side protection
- **Components not feature-colocated**: Global library pattern (`components/ui/`, `components/layout/`) instead of colocating with features
- **Inconsistent env handling**: Seed scripts load `.env` directly, runtime reads `process.env.*`, no central validation schema

## UNIQUE STYLES
- Custom Swagger docs endpoint at `/docs` (outside `/api` namespace)
- Rate limiting via custom in-memory Map in `src/lib/middleware/rate-limit.ts`
- Redis optional (ioredis) for session cache
- Cloudinary for image uploads
- Admin dashboard with SEO management subtree (`/admin/seo/robots`, `/admin/seo/schema`, `/admin/seo/sitemap`)
- `express-rate-limit` and `helmet` used in API route handlers (not as Express middleware)

## COMMANDS
```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
npm run start    # Start production server
# scripts/seed.ts        # Seed database (manual, loads .env)
# scripts/seed-admin.ts  # Create admin user (manual, loads .env)
```

## NOTES
- NextAuth v5 uses `AUTH_SECRET` (not `NEXTAUTH_SECRET`)
- Environment: MongoDB, Cloudinary required; Redis optional
- App Router lives under `src/app` (not root `app/`)
- Required env vars: `MONGODB_URI`, `AUTH_SECRET`, `NEXTAUTH_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Optional env vars: `REDIS_URL`, `NODE_ENV`
- `.env.example` exists but is incomplete vs runtime usage
- `mongodb.ts` tolerates missing `MONGODB_URI` with a warning (not a hard fail)
- `swagger.ts` falls back to `http://localhost:3000` for `NEXTAUTH_URL`
