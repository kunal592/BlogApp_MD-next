
import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { errorHandler } from '@/lib/errorHandler'

export async function GET(request, { params }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    })
    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), { status: 404 })
    }
    return new NextResponse(JSON.stringify(user), { status: 200 })
  } catch (error) {
    return errorHandler(error)
  }
}
