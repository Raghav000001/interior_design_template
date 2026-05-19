import { z } from 'zod';

export const createSeoSchema = z.object({
  page: z.string().min(1, 'Page identifier is required'),
  title: z.string().min(1, 'SEO title is required').max(70),
  description: z.string().min(1, 'SEO description is required').max(160),
  keywords: z.array(z.string()).default([]),
  ogImage: z.string().url().optional(),
  canonicalUrl: z.string().url().optional(),
});

export const updateSeoSchema = createSeoSchema.partial();

export const seoQuerySchema = z.object({
  page: z.string().optional(),
  search: z.string().optional(),
  page_number: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type CreateSeoInput = z.infer<typeof createSeoSchema>;
export type UpdateSeoInput = z.infer<typeof updateSeoSchema>;
export type SeoQueryInput = z.infer<typeof seoQuerySchema>;