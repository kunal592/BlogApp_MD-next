
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { errorHandler } from '@/lib/errorHandler'

export async function POST(request, { params }) {
  try {
    const session = await verifySession()
    const followeeId = params.id

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followeeId: {
          followerId: session.user.id,
          followeeId,
        },
      },
    })

    if (existingFollow) {
      return new NextResponse(JSON.stringify({ error: 'Already following' }), { status: 400 });
    }

    await prisma.follow.create({
      data: {
        followerId: session.user.id,
        followeeId,
      },
    })

    await prisma.user.update({
      where: { id: session.user.id },
      data: { followingCount: { increment: 1 } },
    })

    await prisma.user.update({
      where: { id: followeeId },
      data: { followersCount: { increment: 1 } },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return errorHandler(error)
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await verifySession()
    const followeeId = params.id

    const existingFollow = await prisma.follow.findUnique({
        where: {
          followerId_followeeId: {
            followerId: session.user.id,
            followeeId,
          },
        },
      })
  
      if (!existingFollow) {
        return new NextResponse(JSON.stringify({ error: 'Not following' }), { status: 400 });
      }

    await prisma.follow.delete({
      where: {
        followerId_followeeId: {
          followerId: session.user.id,
          followeeId,
        },
      },
    })

    await prisma.user.update({
      where: { id: session.user.id },
      data: { followingCount: { decrement: 1 } },
    })

    await prisma.user.update({
      where: { id: followeeId },
      data: { followersCount: { decrement: 1 } },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return errorHandler(error)
  }
}
