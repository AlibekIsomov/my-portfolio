import { NextResponse } from 'next/server';
import { clearAdminSessionCookie } from '@/lib/auth';

export const runtime = 'nodejs';

export const POST = async () => {
  await clearAdminSessionCookie();
  return NextResponse.json({ ok: true });
};
