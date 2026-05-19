import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { SeoSetting } from '@/schemas';
import { updateSeoSchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { adminMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ page: string }> }) {
  try {
    await connectDB();

    const { page } = await params;
    const seoSetting = await SeoSetting.findOne({ page });

    if (!seoSetting) {
      return ApiResponse.notFound('SEO settings not found');
    }

    return ApiResponse.success(seoSetting);
  } catch (error) {
    console.error('Get SEO settings error:', error);
    return ApiResponse.error('Failed to fetch SEO settings');
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ page: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { page } = await params;
    const body = await req.json();
    const validatedData = updateSeoSchema.parse(body);

    const seoSetting = await SeoSetting.findOneAndUpdate({ page }, validatedData, { new: true });

    if (!seoSetting) {
      return ApiResponse.notFound('SEO settings not found');
    }

    return ApiResponse.success(seoSetting, 'SEO settings updated successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Update SEO settings error:', error);
    return ApiResponse.error('Failed to update SEO settings');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ page: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { page } = await params;
    const seoSetting = await SeoSetting.findOneAndDelete({ page });

    if (!seoSetting) {
      return ApiResponse.notFound('SEO settings not found');
    }

    return ApiResponse.success(null, 'SEO settings deleted successfully');
  } catch (error) {
    console.error('Delete SEO settings error:', error);
    return ApiResponse.error('Failed to delete SEO settings');
  }
}