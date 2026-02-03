import { applyContentToUserData } from '@/lib/content';
import { USER_DATA } from '@/lib/data';
import { getCachedContent, getCachedProjects, getCachedStats, getGithubCommits } from '@/lib/data-fetchers';
import { ProjectsClient } from '@/app/components/ProjectsClient';

export const revalidate = 3600;

export default async function Projects() {
  const content = await getCachedContent();
  const dbProjects = await getCachedProjects();
  const statsData = await getCachedStats();
  const commits = await getGithubCommits();

  const userData = applyContentToUserData(USER_DATA, content);

  const stats = {
    views: statsData.views,
    clicks: statsData.clicks,
    commits: typeof commits === 'number' ? commits : 1240
  };

  // Use DB projects if available, otherwise fallback to static data
  const projects = dbProjects.length > 0 ? dbProjects : userData.projects;

  return (
    <ProjectsClient
      content={content}
      userData={userData}
      projects={projects}
      stats={stats}
    />
  );
}
