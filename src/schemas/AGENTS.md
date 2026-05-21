# src/schemas - Mongoose Domain Models

**Parent**: [AGENTS.md](../../../AGENTS.md)

## OVERVIEW
Mongoose schema definitions for MongoDB collections. Domain/persistence layer.

## FILES
- `index.ts` - Barrel export for all schemas
- `user.schema.ts` - User model with auth fields
- `project.schema.ts` - Portfolio projects
- `service.schema.ts` - Offered services
- `team.schema.ts` - Team members
- `testimonial.schema.ts` - Client testimonials
- `blog.schema.ts` - Blog posts
- `lead.schema.ts` - Contact form leads
- `consultation.schema.ts` - Consultation requests
- `seo.schema.ts` - SEO metadata
- `brochure.schema.ts` - Brochure management
- `navigation.schema.ts` - Site navigation config

## CONVENTIONS
- Filename pattern: `*.schema.ts`
- Use `mongoose.Schema<T>` generic for type safety
- Export both `ISchema` interface and `Schema` instance
- Barrel export via `index.ts`

## ANTI-PATTERNS
- Don't add business logic - keep schemas pure data definitions
- Avoid complex validation here - use `src/lib/validations/` for Zod schemas
- Keep Mongoose schemas in sync with Zod validations manually (no automation)

## PARALLEL DOMAIN
`src/lib/validations/` contains Zod schemas for the same domain - duplication risk.