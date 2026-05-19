import { NextResponse } from 'next/server';
import { handlers } from '@/lib/auth/auth';

export const { GET, POST } = handlers;