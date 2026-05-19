import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { TeamMember } from '@/schemas';
import { createTeamSchema, updateTeamSchema, teamQuerySchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { authMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const { isActive, sort, order, page, limit } = teamQuerySchema.parse(queryParams);

    const query: Record<string, unknown> = {};
    if (isActive !== undefined) query.isActive = isActive;

    const skip = (page - 1) * limit;
    const sortObj: Record<string, 1 | -1> = { [sort]: order === 'asc' ? 1 : -1 };

    const [team, totalDocs] = await Promise.all([
      TeamMember.find(query).sort(sortObj).skip(skip).limit(limit),
      TeamMember.countDocuments(query),
    ]);

    return ApiResponse.paginated(team, totalDocs, page, limit);
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Invalid query parameters');
    }
    console.error('Get team error:', error);
    return ApiResponse.error('Failed to fetch team members');
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const body = await req.json();
    const validatedData = createTeamSchema.parse(body);

    const member = await TeamMember.create(validatedData);

    return ApiResponse.created(member, 'Team member created successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Create team member error:', error);
    return ApiResponse.error('Failed to create team member');
  }
}