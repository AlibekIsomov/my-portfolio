import { NextResponse } from 'next/server';
import { getPgPool } from '../../../lib/db';
import { handleGetContent, handlePostContent } from '../../../lib/api/contentHandlers';

export const runtime = 'nodejs';

export const GET = async (request: Request) => {
  const result = await handleGetContent(request, getPgPool);
  return NextResponse.json(result.body, { status: result.status });
};

export const POST = async (request: Request) => {
  const result = await handlePostContent(request, getPgPool);
  return NextResponse.json(result.body, { status: result.status });
};
