import { NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export const runtime = 'nodejs';

// GET all projects (Public)
export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get('featured') === 'true';

  try {
    const projects = await prisma.project.findMany({
      where: featured ? { featured: true } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
};

// POST create project (Admin only)
export const POST = async (request: Request) => {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, imageUrl, demoUrl, repoUrl, techStack, featured } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const project = await prisma.project.create({
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

    revalidateTag('projects', 'seconds');
    revalidatePath('/', 'layout');
    return NextResponse.json({ project });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
};
