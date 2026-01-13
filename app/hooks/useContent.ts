'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ContentItem, ContentMap } from '@/lib/types';
import { buildContentMap, DEFAULT_CONTENT } from '@/lib/content';

type ContentState = {
  content: ContentMap;
  isLoading: boolean;
  error: string | null;
};

export const useContent = () => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/content', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Failed to load content');
        }
        const data = (await response.json()) as { items: ContentItem[] };
        if (isMounted) {
          setItems(data.items ?? []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to load content');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchContent();

    return () => {
      isMounted = false;
    };
  }, []);

  const content = useMemo(() => buildContentMap(items, DEFAULT_CONTENT), [items]);

  return { content, isLoading, error } satisfies ContentState;
};
