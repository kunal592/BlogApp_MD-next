
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { errorHandler } from '@/lib/errorHandler'

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
