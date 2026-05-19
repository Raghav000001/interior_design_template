import { Schema, model, Document } from 'mongoose';

export interface IServiceDocument extends Document {
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

const serviceSchema = new Schema<IServiceDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String },
    price: { type: String },
    features: [{ type: String }],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

serviceSchema.index({ isActive: 1, order: 1 });

export const Service = model<IServiceDocument>('Service', serviceSchema);