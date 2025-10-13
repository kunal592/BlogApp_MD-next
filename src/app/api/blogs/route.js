
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { errorHandler } from '@/lib/errorHandler'
import { z } from 'zod'
import { validate } from '@/lib/validation'

const createBlogSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  image: z.string().url().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['published', 'draft']).optional(),
})

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      where: { status: 'published' },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    })
    return new NextResponse(JSON.stringify(blogs), { status: 200 })
  } catch (error) {
    return errorHandler(error)
  }
}

export async function POST(request) {
  try {
    const session = await verifySession()
    const body = await request.json()
    validate(createBlogSchema, body)

    const newBlog = await prisma.blog.create({
      data: { ...body, authorId: session.user.id },
    })
    return new NextResponse(JSON.stringify(newBlog), { status: 201 })
  } catch (error) {
    return errorHandler(error)
  }
}
