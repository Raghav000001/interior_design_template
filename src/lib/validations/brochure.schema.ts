import { z } from 'zod';

export const brochureStatuses = ['new', 'downloaded', 'contacted'] as const;

export const createBrochureSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  brochureType: z.string().min(1, 'Brochure type is required'),
});

export const updateBrochureSchema = z.object({
  status: z.enum(brochureStatuses).optional(),
  notes: z.string().optional(),
});

export const brochureQuerySchema = z.object({
  search: z.string().optional(),
  status: z.enum(brochureStatuses).optional(),
  sort: z.string().default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type CreateBrochureInput = z.infer<typeof createBrochureSchema>;
export type UpdateBrochureInput = z.infer<typeof updateBrochureSchema>;
export type BrochureQueryInput = z.infer<typeof brochureQuerySchema>;
