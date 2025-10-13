
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { errorHandler } from '@/lib/errorHandler'
import { z } from 'zod'
import { validate } from '@/lib/validation'

const updateCommentSchema = z.object({
    content: z.string().min(1).optional(),
  })

export async function PUT(request, { params }) {
    try {
      const session = await verifySession()
      const body = await request.json()
      validate(updateCommentSchema, body)
  
      const comment = await prisma.comment.findUnique({ where: { id: params.id } })
  
      if (!comment) {
        return new NextResponse(JSON.stringify({ error: 'Comment not found' }), { status: 404 });
      }
  
      if (comment.authorId !== session.user.id) {
        return new NextResponse(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
      }
  
      const updatedComment = await prisma.comment.update({
        where: { id: params.id },
        data: body,
      })
      return new NextResponse(JSON.stringify(updatedComment), { status: 200 })
    } catch (error) {
      return errorHandler(error)
    }
  }

export async function DELETE(request, { params }) {
  try {
    const session = await verifySession()
    const comment = await prisma.comment.findUnique({ where: { id: params.id } })

    if (!comment) {
        return new NextResponse(JSON.stringify({ error: 'Comment not found' }), { status: 404 });
    }

    if (comment.authorId !== session.user.id) {
        return new NextResponse(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
    }

    await prisma.comment.delete({ where: { id: params.id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return errorHandler(error)
  }
}
