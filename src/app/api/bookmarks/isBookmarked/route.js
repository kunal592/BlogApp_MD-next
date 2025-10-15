
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const blogId = searchParams.get('blogId');
  const userId = session.user.id;

  try {
    const bookmark = await prisma.bookmark.findFirst({
      where: {
        userId,
        blogId,
      },
    });
    return NextResponse.json({ isBookmarked: !!bookmark }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to check bookmark status' }, { status: 500 });
  }
}
