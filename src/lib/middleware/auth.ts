import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/auth';

export async function authMiddleware(req: NextRequest) {
  // First try cookie-based NextAuth session
  try {
    const session = await auth();
    if (session?.user) {
      return { user: session.user };
    }
  } catch {
    console.log('Error in authMiddleware');
    // fall through to Bearer token check
  }

  // Fall back to Bearer token
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return NextResponse.json(
      { success: false, message: 'Access denied. No authentication provided.' },
      { status: 401 }
    );
  }

  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired token.' },
        { status: 401 }
      );
    }
    
    return { user: session.user };
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Token verification failed.' },
      { status: 401 }
    );
  }
}

export async function adminMiddleware(req: NextRequest) {
  const authResult = await authMiddleware(req);
  
  if ('status' in authResult) {
    return authResult;
  }
  
  if (authResult.user.role !== 'admin') {
    return NextResponse.json(
      { success: false, message: 'Access denied. Admin privileges required.' },
      { status: 403 }
    );
  }
  
  return authResult;
}

export function withAuth(handler: (req: NextRequest, context: { user: unknown }) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const authResult = await authMiddleware(req);
    
    if ('status' in authResult) {
      return authResult;
    }
    
    return handler(req, authResult);
  };
}

export function withAdmin(handler: (req: NextRequest, context: { user: unknown }) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const authResult = await adminMiddleware(req);
    
    if ('status' in authResult) {
      return authResult;
    }
    
    return handler(req, authResult);
  };
}