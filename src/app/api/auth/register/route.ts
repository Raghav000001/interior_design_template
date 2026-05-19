import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { User } from '@/schemas';
import { registerSchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const validatedData = registerSchema.parse(body);

    const existingUser = await User.findOne({ email: validatedData.email.toLowerCase() });
    if (existingUser) {
      return ApiResponse.conflict('Email already registered');
    }

    const user = await User.create({
      name: validatedData.name,
      email: validatedData.email.toLowerCase(),
      password: validatedData.password,
      role: 'viewer',
    });

    return ApiResponse.created(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      'Registration successful'
    );
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Registration error:', error);
    return ApiResponse.error('Registration failed');
  }
}