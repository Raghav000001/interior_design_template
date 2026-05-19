import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  resource_type: string;
}

export async function uploadToCloudinary(
  file: Buffer,
  folder = 'interior-design'
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'auto' },
      (error, result) => {
        if (error) reject(error);
        else if (result) resolve(result as UploadResult);
        else reject(new Error('Upload failed'));
      }
    );
    uploadStream.end(file);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch {
    return false;
  }
}

export async function uploadMultipleToCloudinary(
  files: Buffer[],
  folder = 'interior-design'
): Promise<UploadResult[]> {
  return Promise.all(files.map((file) => uploadToCloudinary(file, folder)));
}

export { cloudinary };