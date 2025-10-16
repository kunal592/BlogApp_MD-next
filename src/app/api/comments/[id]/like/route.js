
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { errorHandler } from '@/lib/errorHandler'

export async function POST(request, { params }) {
  try {
    const session = await verifySession()
    const { id } = params

    const existingLike = await prisma.commentLike.findUnique({
      where: {
        userId_commentId: {
          userId: session.user.id,
          commentId: id,
        },
      },
    })

    if (existingLike) {
      await prisma.commentLike.delete({
        where: {
          id: existingLike.id,
        },
      })
      return new NextResponse(null, { status: 204 })
    } else {
      const newLike = await prisma.commentLike.create({
        data: {
          userId: session.user.id,
          commentId: id,
        },
      })
      return new NextResponse(JSON.stringify(newLike), { status: 201 })
    }
  } catch (error) {
    return errorHandler(error)
  }
}
