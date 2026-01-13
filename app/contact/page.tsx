'use client';

import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { THEMES } from '@/lib/theme';
import { USER_DATA } from '@/lib/data';
import { Navbar } from '@/app/components/Navbar';
import { Footer } from '@/app/components/Footer';

export default function Contact() {
  const [currentTheme, setCurrentTheme] = useState<'mocha' | 'latte'>('mocha');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const t = THEMES[currentTheme];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission here (integrate with email service)
    console.log('Form submitted:', formData);
    alert('Thanks for reaching out! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${t.colors.bg}`}>
      <Navbar currentTheme={currentTheme} onThemeChange={setCurrentTheme} theme={t} />
      
      <main className="max-w-5xl mx-auto px-6 md:px-8 py-16 pb-28">
        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <h1 className={`text-5xl md:text-6xl font-extrabold tracking-tight mb-8 ${t.colors.highlight}`}>Get in Touch</h1>
          
          <p className={`text-xl mb-12 max-w-2xl ${t.colors.subtext}`}>
            Have a <span className={t.colors.highlight}>project in mind</span> or want to <span className={t.colors.highlight}>collaborate</span>? I'd love to hear from you!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className={`p-8 rounded-2xl ${t.colors.surface} border ${t.colors.border}`}>
              <h2 className={`text-2xl font-bold mb-6 ${t.colors.highlight}`}>Send me a message</h2>
              
              <div className="space-y-4">
                <div>
                  <label className={`block mb-2 font-medium ${t.colors.text}`}>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg ${t.colors.surfaceHighlight} ${t.colors.text} border ${t.colors.border} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className={`block mb-2 font-medium ${t.colors.text}`}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg ${t.colors.surfaceHighlight} ${t.colors.text} border ${t.colors.border} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className={`block mb-2 font-medium ${t.colors.text}`}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-2 rounded-lg ${t.colors.surfaceHighlight} ${t.colors.text} border ${t.colors.border} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
                    placeholder="Your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-lg font-bold transition-all hover:scale-105 active:scale-95 ${t.colors.accent === 'text-[#89b4fa]' ? 'bg-[#89b4fa] text-[#1e1e2e]' : 'bg-[#1e66f5] text-white'}`}
                >
                  Send Message
                </button>
              </div>
            </form>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className={`p-8 rounded-2xl ${t.colors.surface} border ${t.colors.border}`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${t.colors.surfaceHighlight}`}>
                    <Mail size={24} className={t.colors.accent} />
                  </div>
                  <div>
                    <h3 className={`font-bold mb-1 ${t.colors.text}`}>Email</h3>
                    <a 
                      href={`mailto:${USER_DATA.email}`}
                      className={`${t.colors.accent} hover:opacity-80`}
                    >
                      {USER_DATA.email}
                    </a>
                  </div>
                </div>
              </div>

              <div className={`p-8 rounded-2xl ${t.colors.surface} border ${t.colors.border}`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${t.colors.surfaceHighlight}`}>
                    <Linkedin size={24} className={t.colors.accent} />
                  </div>
                  <div>
                    <h3 className={`font-bold mb-1 ${t.colors.text}`}>LinkedIn</h3>
                    <a 
                      href={USER_DATA.social?.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${t.colors.accent} hover:opacity-80`}
                    >
                      Connect with me
                    </a>
                  </div>
                </div>
              </div>

              <div className={`p-8 rounded-2xl ${t.colors.surface} border ${t.colors.border}`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${t.colors.surfaceHighlight}`}>
                    <Github size={24} className={t.colors.accent} />
                  </div>
                  <div>
                    <h3 className={`font-bold mb-1 ${t.colors.text}`}>GitHub</h3>
                    <a 
                      href={USER_DATA.social?.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${t.colors.accent} hover:opacity-80`}
                    >
                      Check out my repos
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer data={USER_DATA} theme={t} />
    </div>
  );
}
