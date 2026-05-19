import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { SeoSetting } from '@/schemas';
import { createSeoSchema, updateSeoSchema, seoQuerySchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { adminMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const { page, search, page_number, limit } = seoQuerySchema.parse(queryParams);

    const query: Record<string, unknown> = {};
    if (page) query.page = { $regex: page, $options: 'i' };
    if (search) {
      query.$or = [
        { page: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page_number - 1) * limit;

    const [seoSettings, totalDocs] = await Promise.all([
      SeoSetting.find(query).skip(skip).limit(limit),
      SeoSetting.countDocuments(query),
    ]);

    return ApiResponse.paginated(seoSettings, totalDocs, page_number, limit);
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Invalid query parameters');
    }
    console.error('Get SEO settings error:', error);
    return ApiResponse.error('Failed to fetch SEO settings');
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const body = await req.json();
    const validatedData = createSeoSchema.parse(body);

    const existingSeo = await SeoSetting.findOne({ page: validatedData.page });
    if (existingSeo) {
      return ApiResponse.conflict('SEO settings for this page already exist');
    }

    const seoSetting = await SeoSetting.create(validatedData);

    return ApiResponse.created(seoSetting, 'SEO settings created successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Create SEO settings error:', error);
    return ApiResponse.error('Failed to create SEO settings');
  }
}