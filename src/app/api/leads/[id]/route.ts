import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Lead } from '@/schemas';
import { updateLeadSchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { authMiddleware, adminMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await authMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const lead = await Lead.findById(id);

    if (!lead) {
      return ApiResponse.notFound('Lead not found');
    }

    return ApiResponse.success(lead);
  } catch (error) {
    console.error('Get lead error:', error);
    return ApiResponse.error('Failed to fetch lead');
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const body = await req.json();
    const validatedData = updateLeadSchema.parse(body);

    const lead = await Lead.findByIdAndUpdate(id, validatedData, { new: true });

    if (!lead) {
      return ApiResponse.notFound('Lead not found');
    }

    return ApiResponse.success(lead, 'Lead updated successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Update lead error:', error);
    return ApiResponse.error('Failed to update lead');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const lead = await Lead.findByIdAndDelete(id);

    if (!lead) {
      return ApiResponse.notFound('Lead not found');
    }

    return ApiResponse.success(null, 'Lead deleted successfully');
  } catch (error) {
    console.error('Delete lead error:', error);
    return ApiResponse.error('Failed to delete lead');
  }
}