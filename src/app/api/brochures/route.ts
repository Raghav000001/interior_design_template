import { NextRequest } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Brochure } from '@/schemas';
import { createBrochureSchema, updateBrochureSchema, brochureQuerySchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { authMiddleware, adminMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const { search, status, sort, order, page, limit } = brochureQuerySchema.parse(queryParams);

    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const sortObj: Record<string, 1 | -1> = { [sort]: order === 'asc' ? 1 : -1 };

    const [brochures, totalDocs] = await Promise.all([
      Brochure.find(query).sort(sortObj).skip(skip).limit(limit),
      Brochure.countDocuments(query),
    ]);

    return ApiResponse.paginated(brochures, totalDocs, page, limit);
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Invalid query parameters');
    }
    console.error('Get brochures error:', error);
    return ApiResponse.error('Failed to fetch brochures');
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = createBrochureSchema.parse(body);

    await connectDB();

    const brochure = await Brochure.create(validatedData);

    return ApiResponse.created(brochure, 'Brochure download recorded successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Create brochure error:', error);
    return ApiResponse.error('Failed to record brochure download');
  }
}
