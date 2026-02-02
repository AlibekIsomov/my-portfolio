import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

// GET current click count
export const GET = async () => {
    try {
        let stats = await prisma.globalStats.findFirst();

        if (!stats) {
            stats = await prisma.globalStats.create({
                data: { clicks: 0 },
            });
        }

        return NextResponse.json({ clicks: stats.clicks });
    } catch (error) {
        console.error('Error fetching stats:', error);
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
};

// POST increment click count
export const POST = async (request: Request) => {
    try {
        const body = await request.json().catch(() => ({}));
        const amount = typeof body.amount === 'number' ? body.amount : 1;

        let stats = await prisma.globalStats.findFirst();

        if (!stats) {
            stats = await prisma.globalStats.create({
                data: { clicks: amount },
            });
        } else {
            stats = await prisma.globalStats.update({
                where: { id: stats.id },
                data: { clicks: { increment: amount } },
            });
        }

        return NextResponse.json({ clicks: stats.clicks });
    } catch (error) {
        console.error('Error updating stats:', error);
        return NextResponse.json({ error: 'Failed to update stats' }, { status: 500 });
    }
};
