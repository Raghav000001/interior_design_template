import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Testimonial } from '@/schemas';
import { updateTestimonialSchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { adminMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return ApiResponse.notFound('Testimonial not found');
    }

    return ApiResponse.success(testimonial);
  } catch (error) {
    console.error('Get testimonial error:', error);
    return ApiResponse.error('Failed to fetch testimonial');
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const body = await req.json();
    const validatedData = updateTestimonialSchema.parse(body);

    const testimonial = await Testimonial.findByIdAndUpdate(id, validatedData, { new: true });

    if (!testimonial) {
      return ApiResponse.notFound('Testimonial not found');
    }

    return ApiResponse.success(testimonial, 'Testimonial updated successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Update testimonial error:', error);
    return ApiResponse.error('Failed to update testimonial');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
      return ApiResponse.notFound('Testimonial not found');
    }

    return ApiResponse.success(null, 'Testimonial deleted successfully');
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return ApiResponse.error('Failed to delete testimonial');
  }
}