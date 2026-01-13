import { NextResponse } from 'next/server';
import { getPgPool } from '../../../../lib/db';
import { handleDeleteContent, handlePutContent } from '../../../../lib/api/contentHandlers';

export const runtime = 'nodejs';

export const PUT = async (request: Request, context: { params: { id: string } }) => {
  const result = await handlePutContent(request, context.params, getPgPool);
  return NextResponse.json(result.body, { status: result.status });
};

export const DELETE = async (_request: Request, context: { params: { id: string } }) => {
  const result = await handleDeleteContent(context.params, getPgPool);
  return NextResponse.json(result.body, { status: result.status });
};
