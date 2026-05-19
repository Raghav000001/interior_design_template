import { z } from 'zod';

export const createTeamSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  role: z.string().min(1, 'Role is required').max(100),
  bio: z.string().optional(),
  image: z.string().url().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  linkedin: z.string().url().optional(),
  twitter: z.string().url().optional(),
  order: z.number().int().nonnegative().default(0),
  isActive: z.boolean().default(true),
});

export const updateTeamSchema = createTeamSchema.partial();

export const teamQuerySchema = z.object({
  isActive: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  sort: z.string().default('order'),
  order: z.enum(['asc', 'desc']).default('asc'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type UpdateTeamInput = z.infer<typeof updateTeamSchema>;
export type TeamQueryInput = z.infer<typeof teamQuerySchema>;