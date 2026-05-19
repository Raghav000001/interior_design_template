import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { TeamMember } from '@/schemas';
import { updateTeamSchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { adminMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const member = await TeamMember.findById(id);

    if (!member) {
      return ApiResponse.notFound('Team member not found');
    }

    return ApiResponse.success(member);
  } catch (error) {
    console.error('Get team member error:', error);
    return ApiResponse.error('Failed to fetch team member');
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const body = await req.json();
    const validatedData = updateTeamSchema.parse(body);

    const member = await TeamMember.findByIdAndUpdate(id, validatedData, { new: true });

    if (!member) {
      return ApiResponse.notFound('Team member not found');
    }

    return ApiResponse.success(member, 'Team member updated successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Update team member error:', error);
    return ApiResponse.error('Failed to update team member');
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { id } = await params;
    const member = await TeamMember.findByIdAndDelete(id);

    if (!member) {
      return ApiResponse.notFound('Team member not found');
    }

    return ApiResponse.success(null, 'Team member deleted successfully');
  } catch (error) {
    console.error('Delete team member error:', error);
    return ApiResponse.error('Failed to delete team member');
  }
}