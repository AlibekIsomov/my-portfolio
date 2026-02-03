import { applyContentToUserData } from '@/lib/content';
import { USER_DATA } from '@/lib/data';
import { getCachedContent, getCachedProjects, getCachedStats, getGithubCommits } from '@/lib/data-fetchers';
import { HomeClient } from '@/app/components/HomeClient';

export default async function Home() {
  const content = await getCachedContent();
  const featuredProjects = await getCachedProjects(true);
  const statsData = await getCachedStats();
  const commits = await getGithubCommits();

  const userData = applyContentToUserData(USER_DATA, content);

  const stats = {
    views: statsData.views,
    clicks: statsData.clicks,
    commits: typeof commits === 'number' ? commits : 1240
  };

  return (
    <HomeClient
      content={content}
      userData={userData}
      featuredProjects={featuredProjects}
      stats={stats}
    />
  );
}
