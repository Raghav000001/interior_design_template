import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Consultation } from '@/schemas';
import { createConsultationSchema, updateConsultationSchema, consultationQuerySchema } from '@/lib/validations';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { authMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const { search, status, date, sort, order, page, limit } = consultationQuerySchema.parse(queryParams);

    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }
    if (status) query.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.preferredDate = { $gte: startDate, $lt: endDate };
    }

    const skip = (page - 1) * limit;
    const sortObj: Record<string, 1 | -1> = { [sort]: order === 'asc' ? 1 : -1 };

    const [consultations, totalDocs] = await Promise.all([
      Consultation.find(query).sort(sortObj).skip(skip).limit(limit),
      Consultation.countDocuments(query),
    ]);

    return ApiResponse.paginated(consultations, totalDocs, page, limit);
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Invalid query parameters');
    }
    console.error('Get consultations error:', error);
    return ApiResponse.error('Failed to fetch consultations');
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = createConsultationSchema.parse(body);

    await connectDB();

    const consultation = await Consultation.create({
      ...validatedData,
      preferredDate: new Date(validatedData.preferredDate),
    });

    return ApiResponse.created(consultation, 'Consultation booked successfully');
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ZodError') {
      return ApiResponse.badRequest('Validation failed');
    }
    console.error('Create consultation error:', error);
    return ApiResponse.error('Failed to book consultation');
  }
}