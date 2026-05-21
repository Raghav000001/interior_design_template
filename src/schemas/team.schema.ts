import { Schema, Document } from 'mongoose';
import mongoose from 'mongoose';

export interface ITeamMemberDocument extends Document {
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

const teamMemberSchema = new Schema<ITeamMemberDocument>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true },
    bio: { type: String },
    image: { type: String },
    email: { type: String },
    phone: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

teamMemberSchema.index({ order: 1 });
teamMemberSchema.index({ isActive: 1 });

export const TeamMember = mongoose.models.TeamMember ?? mongoose.model<ITeamMemberDocument>('TeamMember', teamMemberSchema);