import { NextResponse } from 'next/server';
import { handleDeleteContent, handlePutContent } from '../../../../lib/api/contentHandlers';
import { getAdminSession } from '@/lib/auth';

export const runtime = 'nodejs';

const requireSession = async () => {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
};

export const PUT = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const authResponse = await requireSession();
  if (authResponse) {
    return authResponse;
  }
  const resolvedParams = await params;
  const result = await handlePutContent(request, resolvedParams);
  return NextResponse.json(result.body, { status: result.status });
};

export const DELETE = async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
  const authResponse = await requireSession();
  if (authResponse) {
    return authResponse;
  }
  const resolvedParams = await params;
  const result = await handleDeleteContent(resolvedParams);
  return NextResponse.json(result.body, { status: result.status });
};
