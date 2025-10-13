
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { errorHandler } from '@/lib/errorHandler'

export async function GET(request, { params }) {
  try {
    const blogs = await prisma.blog.findMany({
      where: { authorId: params.id, status: 'published' },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
    })
    return new NextResponse(JSON.stringify(blogs), { status: 200 })
  } catch (error) {
    return errorHandler(error)
  }
}
