# Interior Design CMS & Portfolio Platform

> Full-stack business management platform for interior design firms — portfolio showcase, lead management, blog engine, SEO controls, and analytics dashboard.

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06b6d4)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47a248)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Overview

A production-ready interior design business platform built with **Next.js 16 App Router**, featuring a public-facing portfolio with blog and a comprehensive admin dashboard for managing every aspect of the business — from leads and consultations to SEO metadata and team profiles.

### Key Features

| Area | Capabilities |
|------|-------------|
| **Portfolio** | Project showcase with categories, tags, featured items, and image galleries |
| **Lead Management** | Capture, track, and manage client inquiries with status workflows |
| **Consultation Booking** | Schedule and manage design consultations with date/time preferences |
| **Blog Engine** | Full CMS with drafts, publishing, categories, tags, and view tracking |
| **SEO Controls** | Per-page meta tags, robots.txt, JSON-LD structured data, sitemap generation |
| **Analytics Dashboard** | Real-time stats, charts (Recharts), recent leads, upcoming consultations |
| **Team Management** | Team member profiles with social links and ordering |
| **Testimonials** | Client reviews with ratings and approval workflow |
| **Service Catalog** | Service offerings with pricing, features, and icons |
| **Theme System** | Dark/light mode with persistent preferences |
| **Cloudinary Integration** | Image upload and management for projects, team, blog |
| **API Documentation** | Auto-generated Swagger UI at `/docs` |

---

## Tech Stack

### Frontend
- **Next.js 16** — App Router, Server Components, Route Handlers
- **React 19** — Hooks, Context API, concurrent rendering
- **TypeScript 5** — Strict mode, path aliases (`@/*`)
- **Tailwind CSS v4** — Utility-first styling via `@tailwindcss/postcss`
- **Radix UI** — Accessible, unstyled primitives (dialog, dropdown, select, tabs, tooltip)
- **Framer Motion** — Staggered animations, page transitions
- **Recharts** — Dashboard data visualization
- **Lucide React** — Consistent icon system
- **Sonner** — Toast notifications

### Backend
- **Next.js Route Handlers** — RESTful API (24 endpoints)
- **MongoDB + Mongoose** — Document database with schema validation
- **Mongoose Paginate v2** — Pagination for list endpoints
- **NextAuth v5** — JWT-based authentication
- **Zod v4** — Runtime request validation
- **bcryptjs** — Password hashing
- **Cloudinary** — Cloud image storage and transformation

### Security & Performance
- **Helmet** — HTTP security headers
- **express-rate-limit** — Per-endpoint rate limiting
- **CORS** — Cross-origin request control
- **ioredis** — Optional Redis session caching

---

## Project Structure

```
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/login/             # Authentication (route group)
│   │   ├── admin/                    # Admin dashboard (17 pages)
│   │   │   ├── seo/                  # SEO management (robots, schema, sitemap)
│   │   │   └── ...                   # Leads, projects, blogs, team, etc.
│   │   ├── api/                      # REST API (24 route handlers)
│   │   │   ├── auth/                 # NextAuth + registration
│   │   │   ├── {resource}/           # Collection routes (GET/POST)
│   │   │   └── {resource}/[id]/      # Dynamic routes (GET/PUT/DELETE)
│   │   ├── docs/                     # Swagger API documentation
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Homepage
│   ├── components/                   # Global component library
│   │   ├── ui/                       # Reusable primitives (Card, Badge, Dialog...)
│   │   ├── layout/                   # Admin layout, navigation shells
│   │   ├── providers/                # Theme, session providers
│   │   ├── dashboard/                # Stats cards, widgets
│   │   └── charts/                   # Recharts-based visualizations
│   ├── lib/                          # Infrastructure layer
│   │   ├── auth/                     # NextAuth v5 configuration
│   │   ├── db/                       # MongoDB connection
│   │   ├── errors/                   # AppError, ApiResponse, ErrorHandler
│   │   ├── middleware/               # Rate limiting, CORS, Helmet
│   │   ├── services/                 # Cloudinary upload service
│   │   ├── utils/                    # Response wrappers
│   │   └── validations/              # Zod request validation schemas
│   ├── schemas/                      # Mongoose domain models
│   └── types/                        # TypeScript augmentations
├── scripts/
│   ├── seed.ts                       # Database seeding (safe, non-destructive)
│   └── seed-admin.ts                 # Admin user creation
└── public/                           # Static assets
```

---

## Getting Started

### Prerequisites

- **Node.js 20+**
- **MongoDB** (local or Atlas)
- **Cloudinary** account (for image uploads)

### Installation

```bash
# Clone and install
git clone <repository-url>
cd interior-design-template
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials
```

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `AUTH_SECRET` | Yes | NextAuth JWT secret |
| `NEXTAUTH_URL` | Yes | Base URL (e.g., `http://localhost:3000`) |
| `CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret |
| `REDIS_URL` | No | Redis URL for session caching |

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Seed the Database

```bash
# Populate with sample data (projects, team, blogs, leads, etc.)
npx tsx scripts/seed.ts

# Create admin user
npx tsx scripts/seed-admin.ts
```

Admin credentials: `admin@interiordesign.com` / `Admin@123`

### Build for Production

```bash
npm run build
npm run start
```

---

## API Endpoints

| Resource | Collection | Single Item |
|----------|-----------|-------------|
| Projects | `GET/POST /api/projects` | `GET/PUT/DELETE /api/projects/[id]` |
| Services | `GET/POST /api/services` | `GET/PUT/DELETE /api/services/[id]` |
| Team | `GET/POST /api/team` | `GET/PUT/DELETE /api/team/[id]` |
| Blogs | `GET/POST /api/blogs` | `GET/PUT/DELETE /api/blogs/[id]` |
| Leads | `GET/POST /api/leads` | `GET/PUT/DELETE /api/leads/[id]` |
| Consultations | `GET/POST /api/consultations` | `GET/PUT/DELETE /api/consultations/[id]` |
| Testimonials | `GET/POST /api/testimonials` | `GET/PUT/DELETE /api/testimonials/[id]` |
| Brochures | `GET/POST /api/brochures` | `GET/PUT/DELETE /api/brochures/[id]` |
| SEO | `GET/POST /api/seo` | `GET /api/seo/[page]` |
| Uploads | `POST /api/uploads` | — |
| Dashboard | `GET /api/dashboard/statistics` | — |
| Auth | `POST /api/auth/register` | `POST /api/auth/[...nextauth]` |

Full interactive documentation: [http://localhost:3000/docs](http://localhost:3000/docs)

---

## Architecture Decisions

- **Dual schema layer** — Mongoose schemas (`src/schemas/`) for persistence, Zod schemas (`src/lib/validations/`) for runtime validation
- **Global component library** — Reusable UI primitives in `components/ui/` rather than feature-colocated components
- **Custom middleware** — Rate limiting and security headers applied per-handler via `src/lib/middleware/`
- **ApiResponse wrapper** — Consistent JSON response format across all API routes
- **PascalCase utilities** — `ApiResponse.ts`, `AppError.ts` for infrastructure classes

---

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```

---

## Deployment

Deploy to [Vercel](https://vercel.com/new) with the required environment variables configured in the Vercel dashboard.

---

## License

MIT
