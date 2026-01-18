'use client';

import { useEffect, useMemo, useState } from 'react';
import { THEMES } from '@/lib/theme';
import type { ContentItem } from '@/lib/types';
import { USER_DATA } from '@/lib/data';
import { applyContentToUserData } from '@/lib/content';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { useContent } from '@/app/hooks/useContent';

const pageOptions = ['global', 'profile', 'home', 'about', 'projects', 'contact'];

export default function AdminPage() {
  const [currentTheme, setCurrentTheme] = useState<'mocha' | 'latte'>('mocha');
  const t = THEMES[currentTheme];
  const { content } = useContent();
  const userData = applyContentToUserData(USER_DATA, content);
  const [items, setItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({ pageSlug: 'home', key: '', value: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ pageSlug: '', key: '', value: '' });

  const filteredItems = useMemo(() => {
    if (filter === 'all') {
      return items;
    }
    return items.filter(item => item.pageSlug === filter);
  }, [filter, items]);

  const loadItems = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/content', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to load content');
      }
      const data = (await response.json()) as { items: ContentItem[] };
      setItems(data.items ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
    } finally {
      setIsLoading(false);
    }
  };

  const loadSession = async () => {
    try {
      const response = await fetch('/api/admin/session', { cache: 'no-store' });
      const data = (await response.json()) as { authenticated?: boolean };
      setIsAuthenticated(Boolean(data.authenticated));
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    loadSession();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadItems();
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    setError(null);
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm),
    });

    if (!response.ok) {
      setError('Invalid admin credentials.');
      return;
    }

    setLoginForm({ username: '', password: '' });
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
    setItems([]);
  };

  const handleCreate = async () => {
    if (!form.pageSlug.trim() || !form.key.trim() || !form.value.trim()) {
      setError('All fields are required to create content.');
      return;
    }
    const response = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      setError('Failed to create content.');
      return;
    }
    setForm({ pageSlug: 'home', key: '', value: '' });
    await loadItems();
  };

  const handleEditStart = (item: ContentItem) => {
    setEditingId(item.id);
    setEditForm({ pageSlug: item.pageSlug, key: item.key, value: item.value });
  };

  const handleEditSave = async () => {
    if (!editingId) return;
    const response = await fetch(`/api/content/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    if (!response.ok) {
      setError('Failed to update content.');
      return;
    }
    setEditingId(null);
    await loadItems();
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`/api/content/${id}`, { method: 'DELETE' });
    if (!response.ok) {
      setError('Failed to delete content.');
      return;
    }
    await loadItems();
  };

  if (isAuthenticated === null) {
    return (
      <div className={`min-h-screen transition-colors duration-500 ${t.colors.bg}`}>
        <Navbar currentTheme={currentTheme} onThemeChange={setCurrentTheme} theme={t} content={content} />

        <main className="max-w-2xl mx-auto px-6 md:px-8 py-16 pb-28">
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${t.colors.highlight}`}>Loading admin session…</h1>
            <p className={t.colors.subtext}>Checking credentials and preparing the admin panel.</p>
          </div>
        </main>

        <Footer data={userData} theme={t} content={content} />
      </div>
    );
  }

  if (isAuthenticated === false) {
    return (
      <div className={`min-h-screen transition-colors duration-500 ${t.colors.bg}`}>
        <Navbar currentTheme={currentTheme} onThemeChange={setCurrentTheme} theme={t} content={content} />

        <main className="max-w-2xl mx-auto px-6 md:px-8 py-16 pb-28">
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${t.colors.highlight}`}>
              Admin Login
            </h1>
            <p className={`text-lg mb-10 ${t.colors.subtext}`}>
              Sign in to access the content management panel.
            </p>

            {error && (
              <div className={`mb-6 p-4 rounded-xl border ${t.colors.border} ${t.colors.surface}`}>
                <p className={`text-sm ${t.colors.highlight}`}>{error}</p>
              </div>
            )}

            <section className={`p-6 rounded-2xl border ${t.colors.border} ${t.colors.surface}`}>
              <div className="grid grid-cols-1 gap-4">
                <input
                  value={loginForm.username}
                  onChange={event => setLoginForm(prev => ({ ...prev, username: event.target.value }))}
                  placeholder="Username"
                  className={`px-3 py-2 rounded-lg ${t.colors.surfaceHighlight} ${t.colors.text} border ${t.colors.border}`}
                />
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={event => setLoginForm(prev => ({ ...prev, password: event.target.value }))}
                  placeholder="Password"
                  className={`px-3 py-2 rounded-lg ${t.colors.surfaceHighlight} ${t.colors.text} border ${t.colors.border}`}
                />
                <button
                  type="button"
                  onClick={handleLogin}
                  className={`px-4 py-2 rounded-lg font-bold ${t.colors.accent === 'text-[#89b4fa]' ? 'bg-[#89b4fa] text-[#1e1e2e]' : 'bg-[#1e66f5] text-white'}`}
                >
                  Sign in
                </button>
              </div>
            </section>
          </div>
        </main>

        <Footer data={userData} theme={t} content={content} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${t.colors.bg}`}>
      <Navbar currentTheme={currentTheme} onThemeChange={setCurrentTheme} theme={t} content={content} />

      <main className="max-w-6xl mx-auto px-6 md:px-8 py-16 pb-28">
        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-4 ${t.colors.highlight}`}>Admin Panel</h1>
          <p className={`text-lg mb-10 ${t.colors.subtext}`}>Manage the text slugs that power your public pages.</p>

          {error && (
            <div className={`mb-6 p-4 rounded-xl border ${t.colors.border} ${t.colors.surface}`}>
              <p className={`text-sm ${t.colors.highlight}`}>{error}</p>
            </div>
          )}

          <section className={`p-6 rounded-2xl border ${t.colors.border} ${t.colors.surface} mb-12`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className={`text-2xl font-bold ${t.colors.highlight}`}>Create new content</h2>
                <p className={t.colors.subtext}>Signed in as admin.</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className={`px-4 py-2 rounded-lg border ${t.colors.border} ${t.colors.text}`}
              >
                Sign out
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={form.pageSlug}
                onChange={event => setForm(prev => ({ ...prev, pageSlug: event.target.value }))}
                className={`px-3 py-2 rounded-lg ${t.colors.surfaceHighlight} ${t.colors.text} border ${t.colors.border}`}
              >
                {pageOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <input
                value={form.key}
                onChange={event => setForm(prev => ({ ...prev, key: event.target.value }))}
                placeholder="content key (slug)"
                className={`px-3 py-2 rounded-lg ${t.colors.surfaceHighlight} ${t.colors.text} border ${t.colors.border}`}
              />
              <input
                value={form.value}
                onChange={event => setForm(prev => ({ ...prev, value: event.target.value }))}
                placeholder="content value"
                className={`px-3 py-2 rounded-lg ${t.colors.surfaceHighlight} ${t.colors.text} border ${t.colors.border}`}
              />
              <button
                type="button"
                onClick={handleCreate}
                className={`px-4 py-2 rounded-lg font-bold ${t.colors.accent === 'text-[#89b4fa]' ? 'bg-[#89b4fa] text-[#1e1e2e]' : 'bg-[#1e66f5] text-white'}`}
              >
                Add content
              </button>
            </div>
          </section>

          <section className={`p-6 rounded-2xl border ${t.colors.border} ${t.colors.surface}`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className={`text-2xl font-bold ${t.colors.highlight}`}>Existing content</h2>
              <select
                value={filter}
                onChange={event => setFilter(event.target.value)}
                className={`px-3 py-2 rounded-lg ${t.colors.surfaceHighlight} ${t.colors.text} border ${t.colors.border}`}
              >
                <option value="all">All pages</option>
                {pageOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {isLoading ? (
              <p className={t.colors.subtext}>Loading content…</p>
            ) : (
              <div className="space-y-4">
                {filteredItems.map(item => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border ${t.colors.border} ${t.colors.surfaceHighlight}`}
                  >
                    {editingId === item.id ? (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <input
                          value={editForm.pageSlug}
                          onChange={event => setEditForm(prev => ({ ...prev, pageSlug: event.target.value }))}
                          className={`px-3 py-2 rounded-lg ${t.colors.surface} ${t.colors.text} border ${t.colors.border}`}
                        />
                        <input
                          value={editForm.key}
                          onChange={event => setEditForm(prev => ({ ...prev, key: event.target.value }))}
                          className={`px-3 py-2 rounded-lg ${t.colors.surface} ${t.colors.text} border ${t.colors.border}`}
                        />
                        <input
                          value={editForm.value}
                          onChange={event => setEditForm(prev => ({ ...prev, value: event.target.value }))}
                          className={`px-3 py-2 rounded-lg ${t.colors.surface} ${t.colors.text} border ${t.colors.border}`}
                        />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handleEditSave}
                            className={`px-4 py-2 rounded-lg font-bold ${t.colors.accent === 'text-[#89b4fa]' ? 'bg-[#89b4fa] text-[#1e1e2e]' : 'bg-[#1e66f5] text-white'}`}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className={`px-4 py-2 rounded-lg border ${t.colors.border} ${t.colors.text}`}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div>
                          <p className={`text-sm uppercase tracking-wider ${t.colors.subtext}`}>{item.pageSlug}</p>
                          <p className={`text-lg font-bold ${t.colors.text}`}>{item.key}</p>
                          <p className={t.colors.subtext}>{item.value}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEditStart(item)}
                            className={`px-4 py-2 rounded-lg border ${t.colors.border} ${t.colors.text}`}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="px-4 py-2 rounded-lg border border-red-400 text-red-300"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer data={userData} theme={t} content={content} />
    </div>
  );
}
