# src/app/api - REST API Routes

**Parent**: [AGENTS.md](../../../../AGENTS.md)

## OVERVIEW
24 route handlers implementing CRUD for 10+ resources. All return `ApiResponse` wrapper.

## STRUCTURE
```
api/
├── auth/
│   ├── [...nextauth]/route.ts   # NextAuth v5 handler
│   └── register/route.ts        # User registration
├── projects/route.ts            # GET list, POST create
├── projects/[id]/route.ts       # GET/PUT/DELETE single
├── services/                    # Same pattern
├── team/                        # Same pattern
├── testimonials/                # Same pattern
├── leads/                       # Same pattern
├── consultations/               # Same pattern
├── blogs/                       # Same pattern
├── brochures/                   # Same pattern
├── seo/route.ts                 # SEO data
├── seo/[page]/route.ts          # Paginated SEO
├── uploads/route.ts             # File upload (Cloudinary)
└── dashboard/statistics/route.ts # Dashboard metrics
```

## CONVENTIONS
- Collection routes: `GET` (list), `POST` (create)
- Dynamic routes: `GET` (single), `PUT` (update), `DELETE` (remove)
- Request body validated via `src/lib/validations/` Zod schemas
- DB operations via `src/schemas/` Mongoose models
- Rate limiting applied via `src/lib/middleware/rate-limit.ts`
- `express-rate-limit` and `helmet` imported per-handler (not as middleware)

## ANTI-PATTERNS
- No `middleware.ts` - rate limiting is manual per-handler
- `express-rate-limit` used in App Router handlers (not Express middleware context)
- No centralized error handling - each handler wraps with `ApiResponse`
