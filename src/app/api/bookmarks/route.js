
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { blogId } = await request.json();
  const userId = session.user.id;

  try {
    await prisma.bookmark.create({
      data: {
        userId,
        blogId,
      },
    });
    return NextResponse.json({ message: 'Bookmark added' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add bookmark' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { blogId } = await request.json();
  const userId = session.user.id;

  try {
    await prisma.bookmark.deleteMany({
      where: {
        userId,
        blogId,
      },
    });
    return NextResponse.json({ message: 'Bookmark removed' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove bookmark' }, { status: 500 });
  }
}
