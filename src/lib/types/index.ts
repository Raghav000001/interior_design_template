export type UserRole = 'admin' | 'editor' | 'viewer';

export interface PaginationOptions {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  meta?: {
    pagination?: PaginationMeta;
    [key: string]: unknown;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  docs: T[];
  meta: PaginationMeta;
}

export interface QueryOptions {
  search?: string;
  filters?: Record<string, unknown>;
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  resource_type: string;
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted';
export type ConsultationStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type BlogStatus = 'draft' | 'published' | 'archived';
export type ProjectCategory = 'residential' | 'commercial' | 'office' | 'hospitality';
export type ProjectStatus = 'draft' | 'published' | 'archived';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProject {
  _id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  images: string[];
  client?: string;
  location?: string;
  year?: number;
  tags: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IService {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  price?: string;
  features: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  author: string;
  status: BlogStatus;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITestimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITeamMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string;
  status: LeadStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IConsultation {
  _id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: Date;
  preferredTime: string;
  message?: string;
  address?: string;
  status: ConsultationStatus;
  notes?: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISeoSetting {
  _id: string;
  page: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalProjects: number;
  totalBlogs: number;
  totalLeads: number;
  totalConsultations: number;
  recentLeads: ILead[];
  recentConsultations: IConsultation[];
  projectsByCategory: Record<string, number>;
  leadsByStatus: Record<string, number>;
}