import { Schema, model, Document } from 'mongoose';

export interface IBlogDocument extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  author: string;
  status: 'draft' | 'published' | 'archived';
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema = new Schema<IBlogDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    featuredImage: { type: String },
    category: { type: String, required: true },
    tags: [{ type: String }],
    author: { type: String, required: true },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

blogSchema.index({ title: 'text', content: 'text' });
blogSchema.index({ slug: 1 });
blogSchema.index({ category: 1, status: 1 });
blogSchema.index({ tags: 1 });

export const Blog = model<IBlogDocument>('Blog', blogSchema);