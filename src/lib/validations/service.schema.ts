import { z } from 'zod';

export const createServiceSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().optional(),
  price: z.string().optional(),
  features: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  order: z.number().int().nonnegative().default(0),
});

export const updateServiceSchema = createServiceSchema.partial();

export const serviceQuerySchema = z.object({
  search: z.string().optional(),
  isActive: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  sort: z.string().default('order'),
  order: z.enum(['asc', 'desc']).default('asc'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;
export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
export type ServiceQueryInput = z.infer<typeof serviceQuerySchema>;