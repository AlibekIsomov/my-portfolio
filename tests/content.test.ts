import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { applyContentToUserData, buildContentMap, DEFAULT_CONTENT, interpolate } from '../lib/content.ts';
import type { ContentItem, ContentMap, UserData } from '../lib/types.ts';

describe('content helpers', () => {
  it('builds a content map by overriding defaults with stored items', () => {
    const items: ContentItem[] = [
      { id: 1, pageSlug: 'global', key: 'navHomeLabel', value: 'Start' },
      { id: 2, pageSlug: 'contact', key: 'pageTitle', value: 'Reach out' },
    ];

    const map = buildContentMap(items, DEFAULT_CONTENT);

    assert.equal(map.global.navHomeLabel, 'Start');
    assert.equal(map.contact.pageTitle, 'Reach out');
    assert.equal(map.global.navAboutLabel, DEFAULT_CONTENT.global.navAboutLabel);
  });

  it('interpolates template variables', () => {
    const template = 'Hello {name}, {role}!';
    assert.equal(interpolate(template, { name: 'Ada', role: 'Engineer' }), 'Hello Ada, Engineer!');
  });

  it('applies profile overrides to user data', () => {
    const user: UserData = {
      name: 'Default',
      role: 'Engineer',
      company: 'Acme',
      bio: 'Bio',
      location: 'Location',
      stats: { views: '1', commits: '2' },
      projects: [],
      commits: [],
      email: 'a@example.com',
      social: { github: 'https://github.com/a', linkedin: 'https://linkedin.com/a' },
    };

    const content: ContentMap = {
      profile: {
        name: 'Override',
        email: 'b@example.com',
        views: '99',
      },
    };

    const updated = applyContentToUserData(user, content);

    assert.equal(updated.name, 'Override');
    assert.equal(updated.email, 'b@example.com');
    assert.equal(updated.stats.views, '99');
    assert.equal(updated.role, 'Engineer');
  });
});
