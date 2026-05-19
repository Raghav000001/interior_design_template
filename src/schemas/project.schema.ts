import { Schema, model, Document, Types } from 'mongoose';

export interface IProjectDocument extends Document {
  title: string;
  description: string;
  category: 'residential' | 'commercial' | 'office' | 'hospitality';
  status: 'draft' | 'published' | 'archived';
  images: string[];
  client?: string;
  location?: string;
  year?: number;
  tags: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProjectDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['residential', 'commercial', 'office', 'hospitality'], required: true },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    images: [{ type: String }],
    client: { type: String },
    location: { type: String },
    year: { type: Number },
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

projectSchema.index({ title: 'text', description: 'text', tags: 'text' });
projectSchema.index({ category: 1, status: 1 });
projectSchema.index({ featured: 1, status: 1 });

export const Project = model<IProjectDocument>('Project', projectSchema);