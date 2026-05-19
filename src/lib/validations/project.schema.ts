import { z } from 'zod';

export const projectCategories = ['residential', 'commercial', 'office', 'hospitality'] as const;
export const projectStatuses = ['draft', 'published', 'archived'] as const;

export const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(projectCategories),
  status: z.enum(projectStatuses).default('draft'),
  images: z.array(z.string().url()).default([]),
  client: z.string().optional(),
  location: z.string().optional(),
  year: z.number().int().positive().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
});

export const updateProjectSchema = createProjectSchema.partial();

export const projectQuerySchema = z.object({
  search: z.string().optional(),
  category: z.enum(projectCategories).optional(),
  status: z.enum(projectStatuses).optional(),
  featured: z.enum(['true', 'false']).transform(v => v === 'true').optional(),
  sort: z.string().default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectQueryInput = z.infer<typeof projectQuerySchema>;