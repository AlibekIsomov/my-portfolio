import { NextResponse } from 'next/server';
import { getGithubLanguageStats } from '@/lib/data-fetchers';

export const runtime = 'nodejs';

export const GET = async () => {
    try {
        const languages = await getGithubLanguageStats();
        return NextResponse.json({ languages });
    } catch (error) {
        console.error('Error in language stats API:', error);
        return NextResponse.json({ languages: [] }, { status: 500 });
    }
};
