import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  handleDeleteContent,
  handleGetContent,
  handlePostContent,
  handlePutContent,
} from '../lib/api/contentHandlers.ts';

describe('content API error handling', () => {
  it('returns 500 when database is unavailable for GET', async () => {
    const result = await handleGetContent(new Request('http://localhost/api/content'), async () => {
      throw new Error('no database');
    });
    assert.equal(result.status, 500);
  });

  it('returns 500 when database is unavailable for POST', async () => {
    const result = await handlePostContent(
      new Request('http://localhost/api/content', {
        method: 'POST',
        body: JSON.stringify({ pageSlug: 'home', key: 'heroGreeting', value: 'Hello' }),
      }),
      async () => {
        throw new Error('no database');
      },
    );
    assert.equal(result.status, 500);
  });

  it('returns 500 when database is unavailable for PUT', async () => {
    const result = await handlePutContent(
      new Request('http://localhost/api/content/1', {
        method: 'PUT',
        body: JSON.stringify({ pageSlug: 'home', key: 'heroGreeting', value: 'Hello' }),
      }),
      { id: '1' },
      async () => {
        throw new Error('no database');
      },
    );
    assert.equal(result.status, 500);
  });

  it('returns 500 when database is unavailable for DELETE', async () => {
    const result = await handleDeleteContent(
      { id: '1' },
      async () => {
        throw new Error('no database');
      },
    );
    assert.equal(result.status, 500);
  });
});
