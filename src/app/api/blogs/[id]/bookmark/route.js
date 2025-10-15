
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { errorHandler } from '@/lib/errorHandler'

export async function POST(request, { params }) {
  try {
    const session = await verifySession()
    const { blogId } = params

    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_blogId: {
          userId: session.user.id,
          blogId,
        },
      },
    })

    if (existingBookmark) {
      await prisma.bookmark.delete({
        where: {
          id: existingBookmark.id,
        },
      })
      return new NextResponse(null, { status: 204 })
    } else {
      const newBookmark = await prisma.bookmark.create({
        data: {
          userId: session.user.id,
          blogId,
        },
      })
      return new NextResponse(JSON.stringify(newBookmark), { status: 201 })
    }
  } catch (error) {
    return errorHandler(error)
  }
}
