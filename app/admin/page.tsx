'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTheme } from '@/app/components/ThemeProvider';
import type { ContentItem, Project } from '@/lib/types';
import { USER_DATA } from '@/lib/data';
import { applyContentToUserData } from '@/lib/content';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';
import { useContent } from '@/app/hooks/useContent';

const pageOptions = ['global', 'profile', 'home', 'about', 'projects', 'contact'];

export default function AdminPage() {
  const { theme: t } = useTheme();
  const { content } = useContent();
  const userData = applyContentToUserData(USER_DATA, content);

  // Content State
  const [items, setItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({ pageSlug: 'home', key: '', value: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ pageSlug: '', key: '', value: '' });

  // Project State
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    demoUrl: '',
    repoUrl: '',
    techStack: '',
    featured: false,
  });
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);

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

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects', { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects ?? []);
      }
    } catch (error) {
      console.error('Failed to load projects', error);
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
      loadProjects();
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
    setProjects([]);
  };

  // Content Handlers
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

  // Project Handlers
  const handleCreateProject = async () => {
    const techStackArray = projectForm.techStack.split(',').map(s => s.trim()).filter(Boolean);
    const response = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...projectForm, techStack: techStackArray }),
    });

    if (response.ok) {
      setProjectForm({ title: '', description: '', imageUrl: '', demoUrl: '', repoUrl: '', techStack: '', featured: false });
      loadProjects();
    } else {
      setError('Failed to create project');
    }
  };

  const handleUpdateProject = async () => {
    if (!editingProjectId) return;
    const techStackArray = projectForm.techStack.split(',').map(s => s.trim()).filter(Boolean);
    const response = await fetch(`/api/projects/${editingProjectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...projectForm, techStack: techStackArray }),
    });

    if (response.ok) {
      setEditingProjectId(null);
      setProjectForm({ title: '', description: '', imageUrl: '', demoUrl: '', repoUrl: '', techStack: '', featured: false });
      loadProjects();
    } else {
      setError('Failed to update project');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const response = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      if (response.ok) {
        loadProjects();
      } else {
        setError('Failed to delete project');
      }
    }
  };

  const startEditProject = (project: Project) => {
    setEditingProjectId(project.id!);
    setProjectForm({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      demoUrl: project.demoUrl || '',
      repoUrl: project.repoUrl || '',
      techStack: project.techStack.join(', '),
      featured: false, // Type definition for Project might miss this if not updated, but API sends it
    });
  };

  const cancelEditProject = () => {
    setEditingProjectId(null);
    setProjectForm({ title: '', description: '', imageUrl: '', demoUrl: '', repoUrl: '', techStack: '', featured: false });
  };


  if (isAuthenticated === null) {
    return (
      <div className={`min-h-screen transition-colors duration-500 ${t.colors.bg}`}>
        <Navbar content={content} />

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
        <Navbar content={content} />

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
      <Navbar content={content} />

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
                <h2 className={`text-2xl font-bold ${t.colors.highlight}`}>Manage Projects</h2>
                <p className={t.colors.subtext}>Add or update your portfolio projects.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                value={projectForm.title}
                onChange={e => setProjectForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Project Title"
                className={`px-3 py-2 rounded-lg ${t.colors.surfaceHighlight} ${t.colors.text} border ${t.colors.border}`}
              />
              <input
                value={projectForm.description}
                onChange={e => setProjectForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Description"
                className={`px-3 py-2 rounded-lg ${t.colors.surfaceHighlight} ${t.colors.text} border ${t.colors.border}`}
              />
              <input
                value={projectForm.imageUrl}
                onChange={e => setProjectForm(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="Image URL"
                className={`px-3 py-2 rounded-lg ${t.colors.surfaceHighlight} ${t.colors.text} border ${t.colors.border}`}
              />
              <input
                value={projectForm.demoUrl}
                onChange={e => setProjectForm(prev => ({ ...prev, demoUrl: e.target.value }))}
                placeholder="Demo URL"
                className={`px-3 py-2 rounded-lg ${t.colors.surfaceHighlight} ${t.colors.text} border ${t.colors.border}`}
              />
              <input
                value={projectForm.repoUrl}
                onChange={e => setProjectForm(prev => ({ ...prev, repoUrl: e.target.value }))}
                placeholder="Repo URL"
                className={`px-3 py-2 rounded-lg ${t.colors.surfaceHighlight} ${t.colors.text} border ${t.colors.border}`}
              />
              <input
                value={projectForm.techStack}
                onChange={e => setProjectForm(prev => ({ ...prev, techStack: e.target.value }))}
                placeholder="Tech Stack (comma separated)"
                className={`px-3 py-2 rounded-lg ${t.colors.surfaceHighlight} ${t.colors.text} border ${t.colors.border}`}
              />
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={projectForm.featured}
                  onChange={e => setProjectForm(prev => ({ ...prev, featured: e.target.checked }))}
                  className="w-5 h-5"
                />
                <label htmlFor="featured-checkbox" className={`${t.colors.text}`}>Featured Project</label>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              {editingProjectId && (
                <button
                  type="button"
                  onClick={cancelEditProject}
                  className={`px-4 py-2 rounded-lg border ${t.colors.border} ${t.colors.text}`}
                >
                  Cancel
                </button>
              )}
              <button
                type="button"
                onClick={editingProjectId ? handleUpdateProject : handleCreateProject}
                className={`px-4 py-2 rounded-lg font-bold ${t.colors.accent === 'text-[#89b4fa]' ? 'bg-[#89b4fa] text-[#1e1e2e]' : 'bg-[#1e66f5] text-white'}`}
              >
                {editingProjectId ? 'Update Project' : 'Add Project'}
              </button>
            </div>

            <div className="mt-8 space-y-4">
              {projects.map(project => (
                <div key={project.id} className={`p-4 rounded-xl border ${t.colors.border} ${t.colors.surfaceHighlight} flex justify-between items-center`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`font-bold ${t.colors.text}`}>{project.title}</h3>
                      {/* {project.featured && <span className="text-yellow-500 text-xs font-bold border border-yellow-500 px-1 rounded">FEATURED</span>} */}
                    </div>
                    <p className={`text-sm ${t.colors.subtext}`}>{project.description}</p>
                    <p className={`text-xs ${t.colors.subtext} mt-1`}>{project.techStack.join(', ')}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditProject(project)}
                      className={`px-3 py-1 rounded-lg border ${t.colors.border} ${t.colors.text} text-sm`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id!)}
                      className="px-3 py-1 rounded-lg border border-red-400 text-red-300 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

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
