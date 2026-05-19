import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Project } from '@/schemas';
import { updateProjectSchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { adminMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const project = await Project.findById(id);

    if (!project) {
      return ApiResponse.notFound('Project not found');
    }

    return ApiResponse.success(project);
  } catch (error) {
    console.error('Get project error:', error);
    return ApiResponse.error('Failed to fetch project');
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const body = await req.json();
    const validatedData = updateProjectSchema.parse(body);

    const project = await Project.findByIdAndUpdate(id, validatedData, { new: true });

    if (!project) {
      return ApiResponse.notFound('Project not found');
    }

    return ApiResponse.success(project, 'Project updated successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Update project error:', error);
    return ApiResponse.error('Failed to update project');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return ApiResponse.notFound('Project not found');
    }

    return ApiResponse.success(null, 'Project deleted successfully');
  } catch (error) {
    console.error('Delete project error:', error);
    return ApiResponse.error('Failed to delete project');
  }
}