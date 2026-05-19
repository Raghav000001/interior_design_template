import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/services/cloudinary';
import { adminMiddleware } from '@/lib/middleware/auth';
import { ApiResponse } from '@/lib/utils/ApiResponse';

export async function POST(req: NextRequest) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return ApiResponse.badRequest('No file provided');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const folder = formData.get('folder')?.toString() || 'interior-design';
    const result = await uploadToCloudinary(buffer, folder);

    return ApiResponse.created(result, 'File uploaded successfully');
  } catch (error) {
    console.error('Upload error:', error);
    return ApiResponse.error('Failed to upload file');
  }
}