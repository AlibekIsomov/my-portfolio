import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const GET = async () => {
    if (!GITHUB_USERNAME) {
        return NextResponse.json({ error: 'GitHub username not configured' }, { status: 500 });
    }

    try {
        const headers: HeadersInit = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Portfolio-App',
        };

        if (GITHUB_TOKEN) {
            headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
        }

        // Fetch user's public events
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=50`, {
            headers,
            next: { revalidate: 60 } // Cache for 1 minute
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const events = await response.json();

        const commits = events
            .map((event: any) => {
                const repoName = event.repo?.name || 'unknown';
                const repoShort = repoName.split('/')[1] || repoName;
                const date = event.created_at;

                // Handle PushEvent
                if (event.type === 'PushEvent') {
                    const commitCount = event.payload?.commits?.length || 0;
                    const lastCommit = commitCount > 0 ? event.payload.commits[commitCount - 1] : null;

                    return {
                        id: event.id,
                        repo: repoShort,
                        message: lastCommit?.message || `Pushed to ${event.payload?.ref?.replace('refs/heads/', '') || 'repository'}`,
                        date: date,
                        url: lastCommit ? `https://github.com/${repoName}/commit/${lastCommit.sha}` : `https://github.com/${repoName}`
                    };
                }

                // Handle Merged Pull Requests
                if (event.type === 'PullRequestEvent' && event.payload.action === 'closed' && event.payload.pull_request?.merged) {
                    return {
                        id: event.id,
                        repo: repoShort,
                        message: `Merged: ${event.payload.pull_request.title}`,
                        date: date,
                        url: event.payload.pull_request.html_url
                    };
                }

                // Handle Repository Creation
                if (event.type === 'CreateEvent' && event.payload.ref_type === 'repository') {
                    return {
                        id: event.id,
                        repo: repoShort,
                        message: `Created repository ${repoShort}`,
                        date: date,
                        url: `https://github.com/${repoName}`
                    };
                }

                return null;
            })
            .filter((item: any) => item !== null)
            .slice(0, 5);

        return NextResponse.json({ commits });
    } catch (error) {
        console.error('Error fetching GitHub commits:', error);
        return NextResponse.json({ commits: [] }, { status: 200 });
    }
};
