import { Box, ArrowUpRight } from 'lucide-react';
import { Theme, Project } from '@/lib/types';
import { Tag } from './Tag';

export const ProjectCard = ({ project, theme, delay }: { project: Project; theme: Theme; delay: number }) => (
  <div
    className={`p-6 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:animate-glow group opacity-0 animate-fade-in-up ${theme.colors.surface} border ${theme.colors.border}`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex justify-between items-start mb-6">
      <div className={`p-3 rounded-xl ${theme.colors.surfaceHighlight} text-opacity-90 group-hover:animate-scale-in transition-all`}>
        <Box size={24} className={theme.colors.accent} />
      </div>
      <div className="flex gap-2 text-sm font-mono opacity-60 group-hover:opacity-100 transition-opacity">
        <span>★ {project.stars}</span>
        <ArrowUpRight size={18} className="group-hover:animate-float" />
      </div>
    </div>
    <h3 className={`text-2xl font-bold mb-3 ${theme.colors.text} group-hover:${theme.colors.highlight} transition-all`}>{project.title}</h3>
    <p className={`text-sm md:text-base mb-6 leading-relaxed ${theme.colors.subtext}`}>
      {project.description}
    </p>
    <div className="flex flex-wrap gap-2">
      {(project.tags || project.techStack || []).map(tag => <Tag key={tag} text={tag} theme={theme} />)}
    </div>
  </div>
);
