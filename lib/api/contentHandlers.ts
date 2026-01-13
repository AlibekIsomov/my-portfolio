type PgPool = {
  query: (text: string, values?: unknown[]) => Promise<{ rows: any[]; rowCount?: number }>;
};

const toItem = (row: { id: number; page_slug: string; content_key: string; value: string }) => ({
  id: row.id,
  pageSlug: row.page_slug,
  key: row.content_key,
  value: row.value,
});

export const handleGetContent = async (
  request: Request,
  getPgPool: () => Promise<PgPool>,
) => {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page');
  const query = page
    ? {
        text: 'SELECT id, page_slug, content_key, value FROM content_items WHERE page_slug = $1 ORDER BY id ASC',
        values: [page],
      }
    : {
        text: 'SELECT id, page_slug, content_key, value FROM content_items ORDER BY page_slug ASC, id ASC',
        values: [],
      };

  try {
    const pgPool = await getPgPool();
    const result = await pgPool.query(query.text, query.values);
    return { status: 200, body: { items: result.rows.map(toItem) } };
  } catch (error) {
    return { status: 500, body: { error: 'Database unavailable' } };
  }
};

export const handlePostContent = async (
  request: Request,
  getPgPool: () => Promise<PgPool>,
) => {
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
    const pgPool = await getPgPool();
    const result = await pgPool.query(
      `INSERT INTO content_items (page_slug, content_key, value)
       VALUES ($1, $2, $3)
       ON CONFLICT (page_slug, content_key)
       DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
       RETURNING id, page_slug, content_key, value`,
      [pageSlug, key, value],
    );

    return { status: 201, body: { item: toItem(result.rows[0]) } };
  } catch (error) {
    return { status: 500, body: { error: 'Database unavailable' } };
  }
};

export const handlePutContent = async (
  request: Request,
  params: { id: string },
  getPgPool: () => Promise<PgPool>,
) => {
  const { id } = params;
  const payload = (await request.json()) as { pageSlug?: string; key?: string; value?: string };
  const pageSlug = payload.pageSlug?.trim();
  const key = payload.key?.trim();
  const value = payload.value?.trim();

  if (!pageSlug || !key || !value) {
    return { status: 400, body: { error: 'pageSlug, key, and value are required' } };
  }

  try {
    const pgPool = await getPgPool();
    const result = await pgPool.query(
      `UPDATE content_items
       SET page_slug = $1, content_key = $2, value = $3, updated_at = NOW()
       WHERE id = $4
       RETURNING id, page_slug, content_key, value`,
      [pageSlug, key, value, Number(id)],
    );

    if (result.rowCount === 0) {
      return { status: 404, body: { error: 'Content item not found' } };
    }

    return { status: 200, body: { item: toItem(result.rows[0]) } };
  } catch (error) {
    return { status: 500, body: { error: 'Database unavailable' } };
  }
};

export const handleDeleteContent = async (
  params: { id: string },
  getPgPool: () => Promise<PgPool>,
) => {
  const { id } = params;
  try {
    const pgPool = await getPgPool();
    const result = await pgPool.query('DELETE FROM content_items WHERE id = $1 RETURNING id, page_slug, content_key, value', [
      Number(id),
    ]);

    if (result.rowCount === 0) {
      return { status: 404, body: { error: 'Content item not found' } };
    }

    return { status: 200, body: { item: toItem(result.rows[0]) } };
  } catch (error) {
    return { status: 500, body: { error: 'Database unavailable' } };
  }
};
