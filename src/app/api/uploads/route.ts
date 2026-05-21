import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary, deleteFromCloudinary, cloudinary } from '@/lib/services/cloudinary';
import { adminMiddleware } from '@/lib/middleware/auth';
import { ApiResponse } from '@/lib/utils/ApiResponse';

export async function GET(req: NextRequest) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    const { searchParams } = new URL(req.url);
    const folder = searchParams.get('folder') || 'interior-design';
    const resourceType = searchParams.get('type') || 'image';
    const max = parseInt(searchParams.get('limit') || '100', 10);

    const result = await cloudinary.search
      .expression(`folder:${folder}/* resource_type:${resourceType}`)
      .max_results(max)
      .execute();

    const uploads = result.resources.map((r: Record<string, unknown>) => ({
      _id: r.public_id as string,
      name: (r.original_filename as string) || (r.public_id as string),
      url: r.secure_url as string,
      type: (r.resource_type as string) === 'image' ? 'image' : (r.resource_type as string) === 'video' ? 'video' : 'document',
      size: formatBytes(r.bytes as number),
      dimensions: r.width && r.height ? `${r.width}x${r.height}` : undefined,
      uploadedAt: r.created_at as string,
      folder: (r.folder as string) || folder,
    }));

    return ApiResponse.success(uploads);
  } catch (error) {
    console.error('List uploads error:', error);
    return ApiResponse.error('Failed to fetch uploads');
  }
}

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

export async function DELETE(req: NextRequest) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    const body = await req.json();
    const { publicId } = body;

    if (!publicId) {
      return ApiResponse.badRequest('No public_id provided');
    }

    const deleted = await deleteFromCloudinary(publicId);
    if (!deleted) {
      return ApiResponse.error('Failed to delete file');
    }

    return ApiResponse.success(null, 'File deleted successfully');
  } catch (error) {
    console.error('Delete upload error:', error);
    return ApiResponse.error('Failed to delete file');
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}