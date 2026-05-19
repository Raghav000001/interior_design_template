import { z } from 'zod';

export const blogStatuses = ['draft', 'published', 'archived'] as const;

export const createBlogSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().max(500).optional(),
  featuredImage: z.string().url().optional(),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).default([]),
  author: z.string().min(1, 'Author is required'),
  status: z.enum(blogStatuses).default('draft'),
});

export const updateBlogSchema = createBlogSchema.partial();

export const blogQuerySchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(blogStatuses).optional(),
  tag: z.string().optional(),
  sort: z.string().default('createdAt'),
  order: z.enum(['asc', 'desc']).default('desc'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogSchema>;
export type BlogQueryInput = z.infer<typeof blogQuerySchema>;