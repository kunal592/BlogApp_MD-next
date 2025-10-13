
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { errorHandler } from '@/lib/errorHandler'
import { z } from 'zod'
import { validate } from '@/lib/validation'

const createCommentSchema = z.object({
  content: z.string().min(1),
  blogId: z.string().min(1),
})

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const blogId = searchParams.get('blogId')

  try {
    const comments = await prisma.comment.findMany({
      where: { blogId },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    })
    return new NextResponse(JSON.stringify(comments), { status: 200 })
  } catch (error) {
    return errorHandler(error)
  }
}

export async function POST(request) {
  try {
    const session = await verifySession()
    const body = await request.json()
    validate(createCommentSchema, body)

    const newComment = await prisma.comment.create({
      data: { ...body, authorId: session.user.id },
    })
    return new NextResponse(JSON.stringify(newComment), { status: 201 })
  } catch (error) {
    return errorHandler(error)
  }
}
