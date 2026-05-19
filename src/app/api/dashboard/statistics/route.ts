import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import { Project, Blog, Lead, Consultation } from '@/schemas';
import { ApiResponse } from '@/lib/utils/ApiResponse';
import { adminMiddleware } from '@/lib/middleware/auth';

export async function GET(req: NextRequest) {
  try {
    const authResult = await adminMiddleware(req);
    if ('status' in authResult) return authResult;

    await connectDB();

    const [
      totalProjects,
      totalBlogs,
      totalLeads,
      totalConsultations,
      recentLeads,
      recentConsultations,
      projectsByCategory,
      leadsByStatus,
    ] = await Promise.all([
      Project.countDocuments({ status: 'published' }),
      Blog.countDocuments({ status: 'published' }),
      Lead.countDocuments(),
      Consultation.countDocuments(),
      Lead.find().sort({ createdAt: -1 }).limit(5),
      Consultation.find().sort({ createdAt: -1 }).limit(5),
      Project.aggregate([
        { $match: { status: 'published' } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
      ]),
      Lead.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ]);

    const projectsByCategoryObj: Record<string, number> = {};
    projectsByCategory.forEach((item) => {
      projectsByCategoryObj[item._id] = item.count;
    });

    const leadsByStatusObj: Record<string, number> = {};
    leadsByStatus.forEach((item) => {
      leadsByStatusObj[item._id] = item.count;
    });

    const stats = {
      totalProjects,
      totalBlogs,
      totalLeads,
      totalConsultations,
      recentLeads,
      recentConsultations,
      projectsByCategory: projectsByCategoryObj,
      leadsByStatus: leadsByStatusObj,
    };

    return ApiResponse.success(stats, 'Dashboard statistics retrieved successfully');
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    return ApiResponse.error('Failed to fetch dashboard statistics');
  }
}