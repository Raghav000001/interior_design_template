import { Schema, model, Document } from 'mongoose';

export interface IConsultationDocument extends Document {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: Date;
  preferredTime: string;
  message?: string;
  address?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
}

const consultationSchema = new Schema<IConsultationDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    serviceType: { type: String, required: true },
    preferredDate: { type: Date, required: true },
    preferredTime: { type: String, required: true },
    message: { type: String },
    address: { type: String },
    status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
    notes: { type: String },
    assignedTo: { type: String },
  },
  { timestamps: true }
);

consultationSchema.index({ email: 1 });
consultationSchema.index({ status: 1 });
consultationSchema.index({ preferredDate: 1 });

export const Consultation = model<IConsultationDocument>('Consultation', consultationSchema);