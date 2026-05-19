import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Service } from '@/schemas';
import { createServiceSchema, updateServiceSchema, serviceQuerySchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { authMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const { search, isActive, sort, order, page, limit } = serviceQuerySchema.parse(queryParams);

    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (isActive !== undefined) query.isActive = isActive;

    const skip = (page - 1) * limit;
    const sortObj: Record<string, 1 | -1> = { [sort]: order === 'asc' ? 1 : -1 };

    const [services, totalDocs] = await Promise.all([
      Service.find(query).sort(sortObj).skip(skip).limit(limit),
      Service.countDocuments(query),
    ]);

    return ApiResponse.paginated(services, totalDocs, page, limit);
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Invalid query parameters');
    }
    console.error('Get services error:', error);
    return ApiResponse.error('Failed to fetch services');
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const body = await req.json();
    const validatedData = createServiceSchema.parse(body);

    const service = await Service.create(validatedData);

    return ApiResponse.created(service, 'Service created successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Create service error:', error);
    return ApiResponse.error('Failed to create service');
  }
}