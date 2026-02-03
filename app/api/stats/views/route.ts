import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const POST = async () => {
    try {
        const stats = await prisma.globalStats.findFirst();

        if (stats) {
            await prisma.globalStats.update({
                where: { id: stats.id },
                data: { views: { increment: 1 } },
            });
        } else {
            await prisma.globalStats.create({
                data: { views: 1, clicks: 0 },
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update views' }, { status: 500 });
    }
};
