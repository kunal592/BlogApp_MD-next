
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
  const targetUserId = searchParams.get('targetUserId');
  const userId = session.user.id;

  try {
    const follow = await prisma.follows.findFirst({
      where: {
        followerId: userId,
        followingId: targetUserId,
      },
    });
    return NextResponse.json({ isFollowing: !!follow }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to check follow status' }, { status: 500 });
  }
}
