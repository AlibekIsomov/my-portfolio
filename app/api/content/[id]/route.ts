import { NextResponse } from 'next/server';
import { handleDeleteContent, handlePutContent } from '../../../../lib/api/contentHandlers';
import { getAdminSession } from '@/lib/auth';

export const runtime = 'nodejs';

const requireSession = () => {
  const session = getAdminSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
};

export const PUT = async (request: Request, context: { params: { id: string } }) => {
  const authResponse = requireSession();
  if (authResponse) {
    return authResponse;
  }
  const result = await handlePutContent(request, context.params);
  return NextResponse.json(result.body, { status: result.status });
};

export const DELETE = async (_request: Request, context: { params: { id: string } }) => {
  const authResponse = requireSession();
  if (authResponse) {
    return authResponse;
  }
  const result = await handleDeleteContent(context.params);
  return NextResponse.json(result.body, { status: result.status });
};
