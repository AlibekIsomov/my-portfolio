import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export const runtime = 'nodejs';

// PUT update project (Admin only)
export const PUT = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    if (!(await getAdminSession())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        const body = await request.json();
        const { title, description, imageUrl, demoUrl, repoUrl, techStack, featured } = body;

        const project = await prisma.project.update({
            where: { id },
            data: {
                title,
                description,
                imageUrl,
                demoUrl,
                repoUrl,
                techStack: Array.isArray(techStack) ? techStack : [],
                featured: featured ?? false,
            },
        });

        return NextResponse.json({ project });
    } catch (error) {
        console.error('Error updating project:', error);
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
};

// DELETE project (Admin only)
export const DELETE = async (_request: Request, { params }: { params: Promise<{ id: string }> }) => {
    if (!(await getAdminSession())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const resolvedParams = await params;
        const id = parseInt(resolvedParams.id);
        await prisma.project.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting project:', error);
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
};
