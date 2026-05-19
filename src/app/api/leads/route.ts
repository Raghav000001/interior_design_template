import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Lead } from '@/schemas';
import { createLeadSchema, updateLeadSchema, leadQuerySchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { authMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const { search, status, sort, order, page, limit } = leadQuerySchema.parse(queryParams);

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

    const [leads, totalDocs] = await Promise.all([
      Lead.find(query).sort(sortObj).skip(skip).limit(limit),
      Lead.countDocuments(query),
    ]);

    return ApiResponse.paginated(leads, totalDocs, page, limit);
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Invalid query parameters');
    }
    console.error('Get leads error:', error);
    return ApiResponse.error('Failed to fetch leads');
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = createLeadSchema.parse(body);

    await connectDB();

    const lead = await Lead.create(validatedData);

    return ApiResponse.created(lead, 'Lead submitted successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Create lead error:', error);
    return ApiResponse.error('Failed to submit lead');
  }
}