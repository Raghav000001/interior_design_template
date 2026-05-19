import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Consultation } from '@/schemas';
import { updateConsultationSchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { authMiddleware, adminMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await authMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const consultation = await Consultation.findById(id);

    if (!consultation) {
      return ApiResponse.notFound('Consultation not found');
    }

    return ApiResponse.success(consultation);
  } catch (error) {
    console.error('Get consultation error:', error);
    return ApiResponse.error('Failed to fetch consultation');
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const body = await req.json();
    const validatedData = updateConsultationSchema.parse(body);

    const consultation = await Consultation.findByIdAndUpdate(id, validatedData, { new: true });

    if (!consultation) {
      return ApiResponse.notFound('Consultation not found');
    }

    return ApiResponse.success(consultation, 'Consultation updated successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Update consultation error:', error);
    return ApiResponse.error('Failed to update consultation');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const consultation = await Consultation.findByIdAndDelete(id);

    if (!consultation) {
      return ApiResponse.notFound('Consultation not found');
    }

    return ApiResponse.success(null, 'Consultation deleted successfully');
  } catch (error) {
    console.error('Delete consultation error:', error);
    return ApiResponse.error('Failed to delete consultation');
  }
}