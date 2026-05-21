import { Schema, Document } from 'mongoose';
import mongoose from 'mongoose';

export interface ILeadDocument extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILeadDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },
    company: { type: String },
    message: { type: String, required: true },
    source: { type: String },
    status: { type: String, enum: ['new', 'contacted', 'qualified', 'converted'], default: 'new' },
    notes: { type: String },
  },
  { timestamps: true }
);

leadSchema.index({ email: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ createdAt: -1 });

export const Lead = mongoose.models.Lead ?? mongoose.model<ILeadDocument>('Lead', leadSchema);