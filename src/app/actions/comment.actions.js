
'use server'
import prisma from "@/lib/prisma";
import { verifySession } from '@/lib/auth'
import { z } from 'zod'
import { validate } from '@/lib/validation'

const createCommentSchema = z.object({
  content: z.string().min(1),
  blogId: z.string().min(1),
})

const updateCommentSchema = z.object({
    content: z.string().min(1).optional(),
})

export async function getComments(blogId) {
  try {
    const comments = await prisma.comment.findMany({
      where: { blogId },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    })
    return comments
  } catch (error) {
    throw error
  }
}

export async function createComment(data) {
  const session = await verifySession()
  try {
    validate(createCommentSchema, data)

    const newComment = await prisma.comment.create({
      data: { ...data, authorId: session.user.id },
    });

    const blog = await prisma.blog.findUnique({ where: { id: data.blogId } });
    const commenter = await prisma.user.findUnique({ where: { id: session.user.id } });

    if (blog.authorId !== session.user.id) {
        await prisma.notification.create({
          data: {
            userId: blog.authorId,
            type: 'COMMENT',
            actorId: session.user.id,
            entityId: data.blogId,
            message: `${commenter.name} commented on your post: "${data.content.substring(0, 30)}..."`,
          },
        });
    }

    return newComment
  } catch (error) {
    throw error
  }
}

export async function updateComment(id, data) {
  const session = await verifySession()
  try {
    validate(updateCommentSchema, data)

    const comment = await prisma.comment.findUnique({ where: { id } })

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (comment.authorId !== session.user.id) {
      throw new Error('Forbidden')
    }

    const updatedComment = await prisma.comment.update({
      where: { id },
      data,
    })
    return updatedComment
  } catch (error) {
    throw error
  }
}

export async function deleteComment(id) {
  const session = await verifySession()
  try {
    const comment = await prisma.comment.findUnique({ where: { id } })

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (comment.authorId !== session.user.id) {
      throw new Error('Forbidden')
    }

    await prisma.comment.delete({ where: { id } })
  } catch (error) {
    throw error
  }
}
