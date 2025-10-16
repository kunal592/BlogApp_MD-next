
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { errorHandler } from '@/lib/errorHandler'

export async function POST(request, { params }) {
  try {
    const session = await verifySession()
    const { id: followeeId } = params
    const followerId = session.user.id

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followeeId: {
          followerId,
          followeeId,
        },
      },
    })

    if (existingFollow) {
      await prisma.follow.delete({
        where: {
          id: existingFollow.id,
        },
      })

      // Remove the corresponding notification
      await prisma.notification.deleteMany({
        where: {
          type: 'FOLLOW',
          actorId: followerId,
          entityId: followeeId,
        },
      })

      return new NextResponse(null, { status: 204 })
    } else {
      const newFollow = await prisma.follow.create({
        data: {
          followerId,
          followeeId,
        },
      })

      const follower = await prisma.user.findUnique({ where: { id: followerId } });

      // Create a notification for the user being followed
      await prisma.notification.create({
        data: {
          userId: followeeId,
          type: 'FOLLOW',
          actorId: followerId,
          entityId: followeeId,
          message: `${follower.name} started following you.`,
        },
      })

      return new NextResponse(JSON.stringify(newFollow), { status: 201 })
    }
  } catch (error) {
    return errorHandler(error)
  }
}
