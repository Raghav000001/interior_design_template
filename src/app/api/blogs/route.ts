import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Blog } from '@/schemas';
import { createBlogSchema, updateBlogSchema, blogQuerySchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { authMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const { search, category, status, tag, sort, order, page, limit } = blogQuerySchema.parse(queryParams);

    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }
    if (category) query.category = category;
    if (status) query.status = status;
    if (tag) query.tags = { $in: [tag] };

    const skip = (page - 1) * limit;
    const sortObj: Record<string, 1 | -1> = { [sort]: order === 'asc' ? 1 : -1 };

    const [blogs, totalDocs] = await Promise.all([
      Blog.find(query).sort(sortObj).skip(skip).limit(limit),
      Blog.countDocuments(query),
    ]);

    return ApiResponse.paginated(blogs, totalDocs, page, limit);
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Invalid query parameters');
    }
    console.error('Get blogs error:', error);
    return ApiResponse.error('Failed to fetch blogs');
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const body = await req.json();
    const validatedData = createBlogSchema.parse(body);

    const existingBlog = await Blog.findOne({ slug: validatedData.slug });
    if (existingBlog) {
      return ApiResponse.conflict('Blog with this slug already exists');
    }

    const blog = await Blog.create(validatedData);

    return ApiResponse.created(blog, 'Blog created successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Create blog error:', error);
    return ApiResponse.error('Failed to create blog');
  }
}