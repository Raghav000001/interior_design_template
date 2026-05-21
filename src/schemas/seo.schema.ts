import { Schema, Document } from 'mongoose';
import mongoose from 'mongoose';

export interface ISeoSettingDocument extends Document {
  page: string;
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const seoSettingSchema = new Schema<ISeoSettingDocument>(
  {
    page: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: [{ type: String }],
    ogImage: { type: String },
    canonicalUrl: { type: String },
  },
  { timestamps: true }
);

export const SeoSetting = mongoose.models.SeoSetting ?? mongoose.model<ISeoSettingDocument>('SeoSetting', seoSettingSchema);