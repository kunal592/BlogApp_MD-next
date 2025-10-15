
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { blogId } = await request.json();

  try {
    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
    return NextResponse.json({ likes: updatedBlog.likes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update clap count' }, { status: 500 });
  }
}
