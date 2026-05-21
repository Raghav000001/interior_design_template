import { Schema, Document } from 'mongoose';
import mongoose from 'mongoose';

export interface IBrochureDocument extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  brochureType: string;
  status: 'new' | 'downloaded' | 'contacted';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const brochureSchema = new Schema<IBrochureDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String },
    company: { type: String },
    brochureType: { type: String, required: true },
    status: { type: String, enum: ['new', 'downloaded', 'contacted'], default: 'new' },
    notes: { type: String },
  },
  { timestamps: true }
);

brochureSchema.index({ email: 1 });
brochureSchema.index({ status: 1 });
brochureSchema.index({ createdAt: -1 });

export const Brochure = mongoose.models.Brochure ?? mongoose.model<IBrochureDocument>('Brochure', brochureSchema);
