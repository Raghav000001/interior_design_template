# src/app/admin - Admin Dashboard

**Parent**: [AGENTS.md](../../../../AGENTS.md)

## OVERVIEW
17 admin subpages for managing interior design business: portfolio, leads, blog, SEO, team, settings.

## STRUCTURE
```
admin/
├── layout.tsx          # Admin shell - client-side useSession auth guard
├── page.tsx            # Dashboard landing (metrics overview)
├── uploads/            # Media upload management
├── media/              # Media library
├── leads/              # Contact form leads
├── brochures/          # Brochure management
├── consultations/      # Consultation requests
├── navigation/         # Site navigation config
├── team/               # Team member CRUD
├── blogs/              # Blog post management
├── projects/           # Portfolio project CRUD
├── analytics/          # Dashboard analytics
├── testimonials/       # Client testimonials
├── services/           # Service offerings
├── theme/              # Theme customization
├── settings/           # General settings
└── seo/                # SEO management hub
    ├── robots/         # robots.txt config
    ├── schema/         # Structured data (JSON-LD)
    └── sitemap/        # Sitemap management
```

## CONVENTIONS
- Each subpage has its own `page.tsx`
- Layout uses `SessionProvider` + `useSession` for client-side auth guard
- No server-side route protection (anti-pattern)
- Admin pages use `AdminLayout` component from `src/components/layout/`

## ANTI-PATTERNS
- Client-side auth guard in layout - redirect race condition possible
- No server-side middleware for route protection
- Large subtree (17 pages) without shared data fetching patterns
