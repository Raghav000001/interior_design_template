import { NextResponse } from 'next/server';
import { PaginationMeta } from '@/lib/types';

export class ApiResponse {
  static success<T>(data: T, message = 'Success', statusCode = 200) {
    return NextResponse.json(
      { success: true, message, data },
      { status: statusCode }
    );
  }

  static created<T>(data: T, message = 'Resource created successfully') {
    return this.success(data, message, 201);
  }

  static error(message: string, statusCode = 500, errors?: Record<string, string>) {
    return NextResponse.json(
      { success: false, message, errors },
      { status: statusCode }
    );
  }

  static badRequest(message = 'Bad request') {
    return this.error(message, 400);
  }

  static unauthorized(message = 'Unauthorized') {
    return this.error(message, 401);
  }

  static forbidden(message = 'Forbidden') {
    return this.error(message, 403);
  }

  static notFound(message = 'Resource not found') {
    return this.error(message, 404);
  }

  static conflict(message = 'Resource already exists') {
    return this.error(message, 409);
  }

  static paginated<T>(
    docs: T[],
    totalDocs: number,
    page: number,
    limit: number,
    message = 'Resources retrieved successfully'
  ) {
    const meta = this.buildPaginationMeta(page, limit, totalDocs);
    return NextResponse.json(
      { success: true, message, data: docs, meta },
      { status: 200 }
    );
  }

  static buildPaginationMeta(page: number, limit: number, totalDocs: number): PaginationMeta {
    const totalPages = Math.ceil(totalDocs / limit);
    return {
      page,
      limit,
      totalDocs,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }
}