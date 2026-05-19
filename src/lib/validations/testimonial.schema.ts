import { z } from 'zod';

export const createTestimonialSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  role: z.string().min(1, 'Role is required').max(100),
  company: z.string().min(1, 'Company is required').max(100),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  rating: z.number().int().min(1).max(5),
  image: z.string().url().optional(),
  approved: z.boolean().default(false),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();

export const testimonialQuerySchema = z.object({
  approved: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  sort: z.string().default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type CreateTestimonialInput = z.infer<typeof createTestimonialSchema>;
export type UpdateTestimonialInput = z.infer<typeof updateTestimonialSchema>;
export type TestimonialQueryInput = z.infer<typeof testimonialQuerySchema>;