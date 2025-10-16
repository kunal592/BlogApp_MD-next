
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { errorHandler } from '@/lib/errorHandler'
import { z } from 'zod'
import { validate } from '@/lib/validation'

const replySchema = z.object({
  content: z.string().min(1, 'Reply cannot be empty.'),
})

export async function POST(request, { params }) {
  try {
    const session = await verifySession()
    const { id: commentId } = params
    const body = await request.json()
    validate(replySchema, body)

    const reply = await prisma.comment.create({
      data: {
        content: body.content,
        authorId: session.user.id,
        blogId: (await prisma.comment.findUnique({ where: { id: commentId } })).blogId,
        parentId: commentId,
      },
      include: {
        author: true,
      },
    })

    return new NextResponse(JSON.stringify(reply), { status: 201 })
  } catch (error) {
    return errorHandler(error)
  }
}
