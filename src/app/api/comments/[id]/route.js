
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { errorHandler } from '@/lib/errorHandler'

export async function DELETE(request, { params }) {
  try {
    const session = await verifySession()
    const { id: commentId } = params

    const comment = await prisma.comment.findUnique({ where: { id: commentId } })

    if (!comment) {
      return errorHandler({ message: 'Comment not found', status: 404 })
    }

    // Only the author of the blog post can delete a reported comment
    const blog = await prisma.blog.findUnique({ where: { id: comment.blogId } })
    if (blog.authorId !== session.user.id) {
      return errorHandler({ message: 'You are not authorized to delete this comment', status: 403 })
    }

    if (!comment.isReported) {
      return errorHandler({ message: 'Comment has not been reported', status: 400 })
    }

    await prisma.comment.delete({ where: { id: commentId } })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return errorHandler(error)
  }
}
