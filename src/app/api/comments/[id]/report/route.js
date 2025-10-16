
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { verifySession } from '@/lib/auth'
import { errorHandler } from '@/lib/errorHandler'

export async function POST(request, { params }) {
  try {
    await verifySession()
    const { id: commentId } = params

    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { isReported: true },
    })

    return new NextResponse(JSON.stringify(updatedComment), { status: 200 })
  } catch (error) {
    return errorHandler(error)
  }
}
