import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Blog } from '@/schemas';
import { updateBlogSchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { adminMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return ApiResponse.notFound('Blog not found');
    }

    blog.views += 1;
    await blog.save();

    return ApiResponse.success(blog);
  } catch (error) {
    console.error('Get blog error:', error);
    return ApiResponse.error('Failed to fetch blog');
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const body = await req.json();
    const validatedData = updateBlogSchema.parse(body);

    const blog = await Blog.findByIdAndUpdate(id, validatedData, { new: true });

    if (!blog) {
      return ApiResponse.notFound('Blog not found');
    }

    return ApiResponse.success(blog, 'Blog updated successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Update blog error:', error);
    return ApiResponse.error('Failed to update blog');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return ApiResponse.notFound('Blog not found');
    }

    return ApiResponse.success(null, 'Blog deleted successfully');
  } catch (error) {
    console.error('Delete blog error:', error);
    return ApiResponse.error('Failed to delete blog');
  }
}