import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Project } from '@/schemas';
import { createProjectSchema, updateProjectSchema, projectQuerySchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { authMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const { search, category, status, featured, sort, order, page, limit } = projectQuerySchema.parse(queryParams);

    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }
    if (category) query.category = category;
    if (status) query.status = status;
    if (featured !== undefined) query.featured = featured;

    const skip = (page - 1) * limit;
    const sortObj: Record<string, 1 | -1> = { [sort]: order === 'asc' ? 1 : -1 };

    const [projects, totalDocs] = await Promise.all([
      Project.find(query).sort(sortObj).skip(skip).limit(limit),
      Project.countDocuments(query),
    ]);

    return ApiResponse.paginated(projects, totalDocs, page, limit);
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Invalid query parameters');
    }
    console.error('Get projects error:', error);
    return ApiResponse.error('Failed to fetch projects');
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const body = await req.json();
    const validatedData = createProjectSchema.parse(body);

    const project = await Project.create(validatedData);

    return ApiResponse.created(project, 'Project created successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Create project error:', error);
    return ApiResponse.error('Failed to create project');
  }
}