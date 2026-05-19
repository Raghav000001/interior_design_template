import { Schema, model, Document } from 'mongoose';

export interface ITestimonialDocument extends Document {
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

const testimonialSchema = new Schema<ITestimonialDocument>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    company: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    image: { type: String },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

testimonialSchema.index({ approved: 1 });
testimonialSchema.index({ company: 1 });

export const Testimonial = model<ITestimonialDocument>('Testimonial', testimonialSchema);