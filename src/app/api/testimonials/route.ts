import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Testimonial } from '@/schemas';
import { createTestimonialSchema, updateTestimonialSchema, testimonialQuerySchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { authMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const { approved, sort, order, page, limit } = testimonialQuerySchema.parse(queryParams);

    const query: Record<string, unknown> = {};
    if (approved !== undefined) query.approved = approved;

    const skip = (page - 1) * limit;
    const sortObj: Record<string, 1 | -1> = { [sort]: order === 'asc' ? 1 : -1 };

    const [testimonials, totalDocs] = await Promise.all([
      Testimonial.find(query).sort(sortObj).skip(skip).limit(limit),
      Testimonial.countDocuments(query),
    ]);

    return ApiResponse.paginated(testimonials, totalDocs, page, limit);
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Invalid query parameters');
    }
    console.error('Get testimonials error:', error);
    return ApiResponse.error('Failed to fetch testimonials');
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = createTestimonialSchema.parse(body);

    await connectDB();

    const testimonial = await Testimonial.create(validatedData);

    return ApiResponse.created(testimonial, 'Testimonial created successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Create testimonial error:', error);
    return ApiResponse.error('Failed to create testimonial');
  }
}