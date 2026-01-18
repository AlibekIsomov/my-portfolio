import { NextResponse } from 'next/server';
import { handleGetContent, handlePostContent } from '../../../lib/api/contentHandlers';
import { getAdminSession } from '@/lib/auth';

export const runtime = 'nodejs';

export const GET = async (request: Request) => {
  const result = await handleGetContent(request);
  return NextResponse.json(result.body, { status: result.status });
};

export const POST = async (request: Request) => {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const result = await handlePostContent(request);
  return NextResponse.json(result.body, { status: result.status });
};
