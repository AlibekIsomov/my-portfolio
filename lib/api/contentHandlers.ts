import type { ContentItem } from '@/lib/types';
import {
  deleteContentItem,
  listContentItems,
  updateContentItem,
  upsertContentItem,
} from '@/lib/services/contentService';

const toItem = (row: { id: number; pageSlug: string; contentKey: string; value: string }): ContentItem => ({
  id: row.id,
  pageSlug: row.pageSlug,
  key: row.contentKey,
  value: row.value,
});

export const handleGetContent = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') ?? undefined;

  try {
    const result = await listContentItems(page);
    return { status: 200, body: { items: result.map(toItem) } };
  } catch (error) {
    return { status: 500, body: { error: 'Database unavailable' } };
  }
};

export const handlePostContent = async (request: Request) => {
  const payload = (await request.json()) as {
    pageSlug?: string;
    key?: string;
    value?: string;
  };

  const pageSlug = payload.pageSlug?.trim();
  const key = payload.key?.trim();
  const value = payload.value?.trim();

  if (!pageSlug || !key || !value) {
    return { status: 400, body: { error: 'pageSlug, key, and value are required' } };
  }

  try {
    const item = await upsertContentItem({ pageSlug, key, value });
    return { status: 201, body: { item: toItem(item) } };
  } catch (error) {
    return { status: 500, body: { error: 'Database unavailable' } };
  }
};

export const handlePutContent = async (request: Request, params: { id: string }) => {
  const { id } = params;
  const payload = (await request.json()) as { pageSlug?: string; key?: string; value?: string };
  const pageSlug = payload.pageSlug?.trim();
  const key = payload.key?.trim();
  const value = payload.value?.trim();

  if (!pageSlug || !key || !value) {
    return { status: 400, body: { error: 'pageSlug, key, and value are required' } };
  }

  try {
    const item = await updateContentItem(Number(id), { pageSlug, key, value });
    return { status: 200, body: { item: toItem(item) } };
  } catch (error) {
    return { status: 404, body: { error: 'Content item not found' } };
  }
};

export const handleDeleteContent = async (params: { id: string }) => {
  const { id } = params;
  try {
    const item = await deleteContentItem(Number(id));
    return { status: 200, body: { item: toItem(item) } };
  } catch (error) {
    return { status: 404, body: { error: 'Content item not found' } };
  }
};
