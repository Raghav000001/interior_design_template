import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Service } from '@/schemas';
import { updateServiceSchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { adminMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const service = await Service.findById(id);

    if (!service) {
      return ApiResponse.notFound('Service not found');
    }

    return ApiResponse.success(service);
  } catch (error) {
    console.error('Get service error:', error);
    return ApiResponse.error('Failed to fetch service');
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const body = await req.json();
    const validatedData = updateServiceSchema.parse(body);

    const service = await Service.findByIdAndUpdate(id, validatedData, { new: true });

    if (!service) {
      return ApiResponse.notFound('Service not found');
    }

    return ApiResponse.success(service, 'Service updated successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Update service error:', error);
    return ApiResponse.error('Failed to update service');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return ApiResponse.notFound('Service not found');
    }

    return ApiResponse.success(null, 'Service deleted successfully');
  } catch (error) {
    console.error('Delete service error:', error);
    return ApiResponse.error('Failed to delete service');
  }
}