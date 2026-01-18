import { NextResponse } from 'next/server';
import { createSessionToken, setAdminSessionCookie, validateCredentials } from '@/lib/auth';

export const runtime = 'nodejs';

export const POST = async (request: Request) => {
  const payload = (await request.json()) as { username?: string; password?: string };
  const username = payload.username?.trim() ?? '';
  const password = payload.password ?? '';

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  if (!validateCredentials(username, password)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  try {
    const token = createSessionToken();
    setAdminSessionCookie(token);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: 'Auth configuration missing' }, { status: 500 });
  }
};
