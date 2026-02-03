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

        const rawCommits = events
            .map((event: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                const repoName = event.repo?.name || 'unknown';
                const repoShort = repoName.split('/')[1] || repoName;
                const date = event.created_at;

                if (event.type === 'PushEvent') {
                    const payload = event.payload;
                    let commitMessage = `Pushed to ${payload?.ref?.replace('refs/heads/', '') || 'repository'}`;
                    const commitUrl = `https://github.com/${repoName}`;

                    if (payload?.commits && payload.commits.length > 0) {
                        const lastCommit = payload.commits[payload.commits.length - 1];
                        return {
                            id: event.id,
                            repo: repoShort,
                            message: lastCommit.message,
                            date: date,
                            url: `https://github.com/${repoName}/commit/${lastCommit.sha}`
                        };
                    } else if (payload?.head) {
                        return {
                            id: event.id,
                            repo: repoShort,
                            message: commitMessage,
                            date: date,
                            url: `https://github.com/${repoName}/commit/${payload.head}`,
                            _needsFetch: true,
                            _head: payload.head,
                            _repoName: repoName
                        };
                    }
                }

                if (event.type === 'PullRequestEvent' && event.payload.action === 'closed' && event.payload.pull_request?.merged) {
                    return {
                        id: event.id,
                        repo: repoShort,
                        message: `Merged: ${event.payload.pull_request.title}`,
                        date: date,
                        url: event.payload.pull_request.html_url
                    };
                }

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

        // Process items that need deep fetching
        const commits = await Promise.all(rawCommits.map(async (item: any) => {
            if (item._needsFetch && item._repoName && item._head) {
                try {
                    // Fetch the individual commit to get the message
                    const commitRes = await fetch(`https://api.github.com/repos/${item._repoName}/commits/${item._head}`, {
                        headers,
                        next: { revalidate: 3600 }
                    });
                    if (commitRes.ok) {
                        const commitData = await commitRes.json();
                        return { ...item, message: commitData.commit.message, _needsFetch: undefined, _head: undefined, _repoName: undefined }; // Clean up
                    }
                } catch (e) {
                    console.error('Failed to fetch individual commit:', e);
                }
            }
            // Remove internal flags before returning
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { _needsFetch, _head, _repoName, ...cleanItem } = item;
            return cleanItem;
        }));

        return NextResponse.json({ commits });
    } catch (error) {
        console.error('Error fetching GitHub commits:', error);
        return NextResponse.json({ commits: [] }, { status: 200 });
    }
};
