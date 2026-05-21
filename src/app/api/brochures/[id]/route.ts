import { NextRequest } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Brochure } from '@/schemas';
import { updateBrochureSchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { authMiddleware, adminMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await authMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const brochure = await Brochure.findById(id);

    if (!brochure) {
      return ApiResponse.notFound('Brochure not found');
    }

    return ApiResponse.success(brochure);
  } catch (error) {
    console.error('Get brochure error:', error);
    return ApiResponse.error('Failed to fetch brochure');
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const body = await req.json();
    const validatedData = updateBrochureSchema.parse(body);

    const brochure = await Brochure.findByIdAndUpdate(id, validatedData, { new: true });

    if (!brochure) {
      return ApiResponse.notFound('Brochure not found');
    }

    return ApiResponse.success(brochure, 'Brochure updated successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Update brochure error:', error);
    return ApiResponse.error('Failed to update brochure');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const brochure = await Brochure.findByIdAndDelete(id);

    if (!brochure) {
      return ApiResponse.notFound('Brochure not found');
    }

    return ApiResponse.success(null, 'Brochure deleted successfully');
  } catch (error) {
    console.error('Delete brochure error:', error);
    return ApiResponse.error('Failed to delete brochure');
  }
}
