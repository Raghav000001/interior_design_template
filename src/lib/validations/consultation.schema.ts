import { z } from 'zod';

export const consultationStatuses = ['pending', 'confirmed', 'completed', 'cancelled'] as const;

export const createConsultationSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
  serviceType: z.string().min(1, 'Service type is required'),
  preferredDate: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date'),
  preferredTime: z.string().min(1, 'Preferred time is required'),
  message: z.string().optional(),
  address: z.string().optional(),
});

export const updateConsultationSchema = z.object({
  status: z.enum(consultationStatuses).optional(),
  notes: z.string().optional(),
  assignedTo: z.string().optional(),
});

export const consultationQuerySchema = z.object({
  search: z.string().optional(),
  status: z.enum(consultationStatuses).optional(),
  date: z.string().optional(),
  sort: z.string().default('preferredDate'),
  order: z.enum(['asc', 'desc']).default('asc'),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});

export type CreateConsultationInput = z.infer<typeof createConsultationSchema>;
export type UpdateConsultationInput = z.infer<typeof updateConsultationSchema>;
export type ConsultationQueryInput = z.infer<typeof consultationQuerySchema>;