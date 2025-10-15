
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { errorHandler } from '@/lib/errorHandler'

export async function POST(request, { params }) {
  try {
    const session = await verifySession()
    const { blogId } = params

    const existingLike = await prisma.like.findUnique({
      where: {
        userId_blogId: {
          userId: session.user.id,
          blogId,
        },
      },
    })

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      })
      return new NextResponse(null, { status: 204 })
    } else {
      const newLike = await prisma.like.create({
        data: {
          userId: session.user.id,
          blogId,
        },
      })
      return new NextResponse(JSON.stringify(newLike), { status: 201 })
    }
  } catch (error) {
    return errorHandler(error)
  }
}
