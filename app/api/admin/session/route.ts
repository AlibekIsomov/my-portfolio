import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';

export const runtime = 'nodejs';

export const GET = async () => {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
  return NextResponse.json({ authenticated: true });
};
