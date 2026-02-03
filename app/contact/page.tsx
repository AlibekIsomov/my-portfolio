import { applyContentToUserData } from '@/lib/content';
import { USER_DATA } from '@/lib/data';
import { getCachedContent, getCachedStats, getGithubCommits } from '@/lib/data-fetchers';
import { ContactClient } from '@/app/components/ContactClient';

export default async function Contact() {
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
    <ContactClient
      content={content}
      userData={userData}
      stats={stats}
    />
  );
}
