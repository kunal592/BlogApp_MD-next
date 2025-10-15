
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { targetUserId } = await request.json();
  const userId = session.user.id;

  try {
    await prisma.follows.create({
      data: {
        followerId: userId,
        followingId: targetUserId,
      },
    });
    return NextResponse.json({ message: 'Followed user' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to follow user' }, { status: 500 });
  }
}

export async function DELETE(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { targetUserId } = await request.json();
  const userId = session.user.id;

  try {
    await prisma.follows.deleteMany({
      where: {
        followerId: userId,
        followingId: targetUserId,
      },
    });
    return NextResponse.json({ message: 'Unfollowed user' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to unfollow user' }, { status: 500 });
  }
}
