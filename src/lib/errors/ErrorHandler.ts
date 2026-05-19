import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import mongoose from 'mongoose';
import { AppError } from './AppError';
import { HTTP_STATUS } from './http-status';

interface ErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string>;
  stack?: string;
}

export function errorHandler(err: Error, statusCode = 500): NextResponse<ErrorResponse> {
  let message = err.message || 'Internal server error';
  let errors: Record<string, string> | undefined;
  let status = statusCode;

  if (err instanceof AppError) {
    status = err.statusCode;
    message = err.message;
  } else if (err.name === 'ZodError') {
    status = HTTP_STATUS.BAD_REQUEST;
    message = 'Validation failed';
    const zodError = err as { issues?: Array<{ path: (string | number)[]; message: string }> };
    errors = (zodError.issues || []).reduce((acc: Record<string, string>, e) => {
      const field = e.path.join('.');
      acc[field] = e.message;
      return acc;
    }, {} as Record<string, string>);
  } else if (err instanceof mongoose.Error.ValidationError) {
    status = HTTP_STATUS.BAD_REQUEST;
    message = 'Validation error';
    errors = Object.keys(err.errors).reduce((acc, key) => {
      acc[key] = err.errors[key].message;
      return acc;
    }, {} as Record<string, string>);
  } else if (err instanceof mongoose.Error.CastError) {
    status = HTTP_STATUS.BAD_REQUEST;
    message = 'Invalid ID format';
  } else if ((err as unknown as { code?: number }).code === 11000) {
    status = HTTP_STATUS.CONFLICT;
    message = 'Duplicate entry';
  } else if (err.name === 'JsonWebTokenError') {
    status = HTTP_STATUS.UNAUTHORIZED;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    status = HTTP_STATUS.UNAUTHORIZED;
    message = 'Token expired';
  } else if (err instanceof SyntaxError) {
    status = HTTP_STATUS.BAD_REQUEST;
    message = 'Invalid JSON';
  }

  const isProduction = process.env.NODE_ENV === 'production';

  return NextResponse.json(
    {
      success: false,
      message,
      errors,
      ...(isProduction ? {} : { stack: err.stack }),
    },
    { status }
  );
}

export function asyncHandler<T>(
  fn: (req: Request, context?: unknown) => Promise<T>
): (req: Request, context?: unknown) => Promise<T> {
  return async (req: Request, context?: unknown) => {
    try {
      return await fn(req, context);
    } catch (err) {
      const error = err as Error;
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      throw errorHandler(error, statusCode);
    }
  };
}