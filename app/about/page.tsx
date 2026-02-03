import { applyContentToUserData } from '@/lib/content';
import { USER_DATA } from '@/lib/data';
import { getCachedContent, getCachedStats, getGithubCommits } from '@/lib/data-fetchers';
import { AboutClient } from '@/app/components/AboutClient';

export default async function About() {
  const content = await getCachedContent();
  const statsData = await getCachedStats();
  const commits = await getGithubCommits();

  const userData = applyContentToUserData(USER_DATA, content);

  const stats = {
    views: statsData.views,
    clicks: statsData.clicks,
    commits: typeof commits === 'number' ? commits : 1240
  };

  return (
    <AboutClient
      content={content}
      userData={userData}
      stats={stats}
    />
  );
}
