import { z } from 'zod';

export const leadStatuses = ['new', 'contacted', 'qualified', 'converted'] as const;

export const createLeadSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  source: z.string().optional(),
});

export const updateLeadSchema = z.object({
  status: z.enum(leadStatuses).optional(),
  notes: z.string().optional(),
});

export const leadQuerySchema = z.object({
  search: z.string().optional(),
  status: z.enum(leadStatuses).optional(),
  sort: z.string().default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type LeadQueryInput = z.infer<typeof leadQuerySchema>;