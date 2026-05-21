# src/lib - Utilities & Core Infrastructure

**Parent**: [AGENTS.md](../../../AGENTS.md)

## OVERVIEW
Application infrastructure layer: auth, DB, error handling, middleware, services, validations, types.

## SUBDIRS
| Directory | Purpose |
|-----------|---------|
| `auth/` | NextAuth v5 config (`auth.config.ts`) |
| `db/` | MongoDB connection (`mongodb.ts`) |
| `errors/` | Custom error classes (`AppError.ts`, `ApiResponse.ts`, `ErrorHandler.ts`) |
| `middleware/` | Rate limiting (in-memory Map), CORS, helmet |
| `services/` | Cloudinary upload service |
| `utils/` | Helper utilities (`ApiResponse.ts` wrapper) |
| `validations/` | Zod schemas (see parallel domain) |
| `types/` | TypeScript augmentations |

## KEY FILES
- `auth/auth.config.ts` - NextAuth v5 setup with `AUTH_SECRET`
- `db/mongodb.ts` - Mongoose connection, tolerates missing `MONGODB_URI` with warning
- `errors/ApiResponse.ts` - Standard API response wrapper (PascalCase naming)
- `middleware/rate-limit.ts` - Custom in-memory rate limiter (not Next.js middleware)

## CONVENTIONS
- PascalCase utility filenames (nonstandard): `ApiResponse.ts`, `AppError.ts`, `ErrorHandler.ts`
- Use `@/*` imports
- Middleware applied per-handler in `src/app/api/**`, not via `middleware.ts`
- `express-rate-limit` and `helmet` imported in route handlers (not Express context)

## ANTI-PATTERNS
- No `middleware.ts` - manual rate limiting per handler
- `express-rate-limit` used outside Express (in App Router handlers)
- `mongodb.ts` does not fail hard on missing `MONGODB_URI`
- No central env validation schema
- Circular deps between services possible

## ENV VARS IN PLAY
- Required: `MONGODB_URI`, `AUTH_SECRET`, `NEXTAUTH_URL`, `CLOUDINARY_*`
- Optional: `REDIS_URL`, `NODE_ENV`