
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { errorHandler } from '@/lib/errorHandler'
import { z } from 'zod'
import { validate } from '@/lib/validation'

const updateBlogSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  image: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['published', 'draft']).optional(),
})

export async function GET(request, { params }) {
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: params.id },
      include: { author: true },
    })
    if (!blog) {
      return new NextResponse(JSON.stringify({ error: 'Blog not found' }), { status: 404 })
    }
    return new NextResponse(JSON.stringify(blog), { status: 200 })
  } catch (error) {
    return errorHandler(error)
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await verifySession()
    const body = await request.json()
    validate(updateBlogSchema, body)

    const blog = await prisma.blog.findUnique({ where: { id: params.id } })
    if (blog.authorId !== session.user.id) {
      throw new Error('Unauthorized')
    }

    const updatedBlog = await prisma.blog.update({
      where: { id: params.id },
      data: body,
    })
    return new NextResponse(JSON.stringify(updatedBlog), { status: 200 })
  } catch (error) {
    return errorHandler(error)
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await verifySession()
    const blog = await prisma.blog.findUnique({ where: { id: params.id } })
    if (blog.authorId !== session.user.id) {
      throw new Error('Unauthorized')
    }

    await prisma.blog.delete({ where: { id: params.id } })
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return errorHandler(error)
  }
}
