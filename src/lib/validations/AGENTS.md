# src/lib/validations - Zod Validation Schemas

**Parent**: [AGENTS.md](../../../../AGENTS.md)

## OVERVIEW
Zod schemas for runtime request validation. Parallel domain to `src/schemas/` (Mongoose).

## FILES
- `index.ts` - Barrel export
- `user.validation.ts` - User registration/login validation
- `contact.validation.ts` - Form submissions
- `project.validation.ts` - Project CRUD
- `service.validation.ts` - Service offerings
- `team.validation.ts` - Team member validation
- `testimonial.validation.ts` - Testimonial validation
- `blog.validation.ts` - Blog post validation
- `lead.validation.ts` - Lead form validation
- `consultation.validation.ts` - Consultation request validation
- `seo.validation.ts` - SEO metadata validation
- `brochure.validation.ts` - Brochure validation

## CONVENTIONS
- Filename pattern: `*.validation.ts` (not `*.schema.ts`)
- Use Zod for runtime request body validation
- Export typed inference: `Infer<typeof schema>` or `z.infer<typeof schema>`
- Barrel export via `index.ts`

## ANTI-PATTERNS
- Schema duplication with `src/schemas/` - different purpose (validation vs persistence)
- Don't add business logic to validation schemas
- Keep Zod schemas in sync with Mongoose schemas manually (no automation)

## PARALLEL DOMAIN
Mongoose schemas in `src/schemas/` - both define domain types but different layers.